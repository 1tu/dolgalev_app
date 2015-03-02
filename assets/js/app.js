// ERROR TYPES:
// 1 = not logined
// 2 = validate error
// 3 = invalid email/password


;(function(s, rt, fn, ls, rc) {

on('deviceready', function () {

  // INITIATE ALL STORES
  for (var key in stores) {
    if (stores[key]._init) stores[key]._init();
    RiotControl.addStore( stores[key] )
  }


})


// ______________


s.user = new (function () {
  
  rt.observable(this)
  var t = this

  t.email = ls.email || null
  t.password = ls.password || null
  t.is_registered = ls.is_registered || false
  t.data = ( ls.user && JSON.parse(ls.user) ) || {}
  t.settings = ( ls.settings && JSON.parse(ls.settings) ) || {}

  t.setData = function (newData) {
    t.data = newData
    ls.user = JSON.stringify(t.data)
  }

  t.setSettings = function (newSettings) {
    t.settings = newSettings
    ls.settings = JSON.stringify(t.settings)
  }

  t.on('set_emailpass', function(data) {
    t.email = ls.email = data.email
    t.password = ls.password = data.password
  });

  t.on('registration_done', function() {
    t.is_registered = ls.is_registered = "1"
  })

  t.on('clear_emailpass', function(data) {
    delete ls.email; t.email = null
    delete ls.password; t.password = null
  });

  t.on('need_login_with', function (data) {
    t.trigger('set_emailpass',data)
    rc.trigger('try_login')
  })

})


// ______________


s.app = new (function () {
  
  rt.observable(this)
  var t = this

  t.mod = ( ls.mod && JSON.parse(ls.mod) ) || {
      doctors: null,
      requests: null,
      receptions: null
    }

  t.server = 'localhost:1337'
  t.is_auth = false

  t._init = function () {
    t.connect()
    // on('online', t.connect)
  }

  t.isOnline = function () {
    return (socket && socket.isConnected())? true : false
  }

  t.connect = function () {
    if (socket) 
      socket._raw.connect()
    else 
      socket = io.sails.connect()

    socket.on('connect', t.checkUpdates)
    // off('online', t.connect)
    // on('offline', t.disconnect)
  }

  t.disconnect = function () {
    socket.disconnect()
    // off('offline', t.disconnect)
    // on('online', t.connect)
  }


  t.checkUpdates = function () {
    if (!t.isOnline()) return
    if (!s.user.is_registered) return rt.route('/auth/new');

    socket.off('connect', t.checkUpdates)
    socket.get('/api/check_updates', t.mod, function (data) {
      alert(JSON.stringify(data))

      if (data.errorType === 1) 
        return t.try_login()

      if (data.doctors) {
        s.doctors.setData(data.doctors)
        t.updateMod('doctors', data.mod_doctors)
      }
      if (data.requests) {
        s.requests.setData(data.requests)
        t.updateMod('requests', data.mod_requests)
      }
      if (data.receptions) {
        s.receptions.setData(data.receptions)
        t.updateMod('receptions', data.mod_receptions)
      }

      t.is_synced = true
    })
  }

  t.updateMod = function (entity, data) {
    t.mod[entity] = data
    ls.mod = JSON.stringify(t.mod)
  }


  t.try_login = function () {
    alert('start login')
    if (!s.user.email || !s.user.password) 
      return rt.route('/auth/new')

    if (!t.isOnline()) return

    socket.post('/auth/login', {
      email: s.user.email,
      password: s.user.password
    }, function (data) {
      alert(JSON.stringify(data))

      if (data && data.errorType) {
        if (data.errorType == 3) {
          t.is_registered = ls.is_registered = false
          rc.trigger('clear_emailpass')
        }
        // TODO: notification
        alert('Авторизация не удалась по причине '+data.error)
        // console.log('Авторизация не удалась по причине '+data.error)
        return 
      }

      rt.route('/index')
      socket.off('connect', t.try_login)
      t.is_auth = true
      t.checkUpdates()
    })
  }

  t.try_register = function (query) {
    alert('start reg')

    // if (!t.isOnline()) {
    //   // TODO: notification
    //   return
    // }

    alert(t.isOnline())

    socket.post('/auth/create', query, function (data) {

      alert( 'register created' )

      if (data && data.errorType) {
        // TODO: notification
        alert('Регистрация не удалась')
        // console.log('Регистрация не удалась по причине '+data.error)
        return 
      }

      s.user.is_registered = ls.is_registered = "1"
      rc.trigger('set_emailpass', data)
      rt.route('/index')
      t.checkUpdates()
    })
  }

  t.on('try_register', t.try_register)

  t.on('try_login', t.try_login)

})


})(stores, riot, fn, localStorage, RiotControl)





