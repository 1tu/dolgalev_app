// ERROR TYPES:
// 1 = not logined
// 2 = validate error


;(function(s, rt, fn, ls) {

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

  t.on('need_login_with', function (data) {
    t.email = ls.email = data.email
    t.password = ls.password = data.password
    t.trigger('login')
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
    off('online', t.connect)
    on('offline', t.disconnect)
  }

  t.disconnect = function () {
    socket.disconnect()
    off('offline', t.disconnect)
    on('online', t.connect)
  }

  t.login = function () {
    if (!s.user.email || !s.user.password) 
      return r.route('/auth/login')

    if (!t.isOnline()) return

    socket.post('/auth/login', {
      email: s.user.email,
      password: s.user.password
    }, function (data) {
      if (data.errorType) {
        console.log('Авторизация не удалась по причине '+data.error)
        return 
      }

      t.is_auth = true
      t.chechUpdates()
      rt.route('/index')
    })

  }

  t.checkUpdates = function () {
    if (!t.isOnline()) return

    socket.off('connect', t.checkUpdates)
    socket.get('/api/check_updates', t.mod, function (data) {

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

  t.on('login', t.login)

})


})(stores, riot, fn, localStorage)





