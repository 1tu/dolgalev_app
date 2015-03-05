// ERROR TYPES:
// 1 = not logined
// 2 = validate error
// 3 = invalid email/password

// window.devicePixelRatio
// window.innerHeight
// window.innerWidth

;(function(s, rt, fn, ls, rc) {


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

  t.server = '192.168.1.38:1337'
  t.is_auth = false

  t._init = function () {
    if (fn.isNetwork) 
      t.connect()
    else
      on('online', t.connect)
  }

  t.isOnline = function () {
    if (socket && socket.isConnected()) 
      return true 
    else {
      navigator.notification.alert('Отсутствует подключение к интернету, попробуйте позже')
      return false
    }
  }

  t.connect = function () {
    navigator.notification.alert('internet SUCCESS');
    if (socket) 
      socket._raw.connect()
    else {
      socket = io.sails.connect()
      // socket.on('reconnect', t.checkUpdates)
    }

    socket.on('connect', t.checkUpdates)
    off('online', t.connect)
    on('offline', t.disconnect)
  }

  t.disconnect = function () {
    navigator.notification.alert('internet FAILED');
    socket.disconnect()
    off('offline', t.disconnect)
    on('online', t.connect)
  }


  t.checkUpdates = function () {
    if (!t.isOnline()) return socket.on('connect', t.checkUpdates)
    if (!s.user.is_registered) return rt.route('/auth/new');

    navigator.notification.alert('CHECK UPDATES');

    socket.off('connect', t.checkUpdates)
    socket.get('/api/check_updates', t.mod, function (data) {
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
    })
  }

  t.updateMod = function (entity, data) {
    t.mod[entity] = data
    ls.mod = JSON.stringify(t.mod)
  }


  t.try_login = function () {
    if (!s.user.email || !s.user.password) 
      return rt.route('/auth/new')

    if (!t.isOnline()) 
      return socket.on('connect', t.checkUpdates)

    socket.post('/auth/login', {
      email: s.user.email,
      password: s.user.password
    }, function (data) {

      if (data && data.errorType) {
        if (data.errorType == 3) {
          t.is_registered = false
          delete ls.is_registered
          rc.trigger('clear_emailpass')
        }
        return navigator.notification.alert('Авторизация не удалась по причине '+data.error)
      }
      
      !s.user.is_registered && (s.user.is_registered = ls.is_registered = "1")
      rt.route('/index')
      t.is_auth = 'true'
      t.checkUpdates()
    })
  }


  t.try_register = function (query) {

    if (!t.isOnline()) return socket.on('connect', t.checkUpdates)

    socket.post('/auth/create', query, function (data) {
      if (data && data.errorType) {
        navigator.notification.alert('Регистрация не удалась по причине '+data.error)
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





