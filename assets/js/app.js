// ERROR TYPES:
// 1 = not logined
// 2 = validate error
// 3 = invalid email/password

;(function(s, rt, fn, ls, rc) {


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



  t.on('password_reset', function (query) {
    socket.post('/auth/reset', query, function (data) {
      if (fn.isError(data)) return
      
      navigator.notification.alert('Пароль был успешно сменен.')
      t.trigger('clear_emailpass')
      rt.route('/auth/login')
    })
  });

  t.on('password_reset_request', function (query) {
    socket.post('/auth/reset', query, function (data) {
      if (fn.isError(data)) return
      
      navigator.notification.alert('На ваш email было отправлено письмо с ключом.')
    })
  });

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

  t.is_auth = false
  t.badges = ( ls.badges && (ls.badges >> 0 )) || 0

  t._init = function () {
    // t.connect()
    if (fn.isNetwork) 
      t.connect()
    else
      on('online', t.connect)
  }

  t.isOnline = function () {
    if (socket && socket.isConnected()) 
      return true 
    else {
      socket.on('connect', t.checkUpdates)
      navigator.notification.alert('Отсутствует подключение к интернету, попробуйте позже')
      return false
    }
  }

  t.connect = function () {
    // navigator.notification.alert('internet SUCCESS');
    if (socket) 
      socket._raw.connect()
    else {
      socket = io.sails.connect()
      socket.on('update', t.checkUpdates)
    }


    socket.on('connect', t.checkUpdates)
    off('online', t.connect)
    on('offline', t.disconnect)
  }

  t.disconnect = function () {
    // navigator.notification.alert('internet FAILED');
    socket.disconnect()
    off('offline', t.disconnect)
    on('online', t.connect)
  }


  t.checkUpdates = function () {
    if (!t.isOnline()) return
    if (!s.user.is_registered) return rt.route('/auth/new');

    socket.off('connect', t.checkUpdates)
    socket.get('/api/check_updates', t.mod, function (data) {
      if (fn.isError(data)) return
      console.log(data);

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

  t.addBadge = function () {
    t.badges++
    ls.badges = t.badges
    cordova.plugins.notification.badge.set( t.badges )
  }

  t.clearBadges = function () {
    t.badges = ls.badges = 0
  }

  t.try_login = function () {
    if (!s.user.email || !s.user.password) 
      return rt.route('/auth/new')

    if (!t.isOnline()) return

    socket.post('/auth/login', {
      email: s.user.email,
      password: s.user.password
    }, function (data) {
      if (fn.isError(data)) return
      
      !s.user.is_registered && (s.user.is_registered = ls.is_registered = "1")
      rt.route('/index')
      t.is_auth = 'true'
      t.checkUpdates()
    })
  }


  t.try_register = function (query) {
    if (!t.isOnline()) return

    socket.post('/auth/create', query, function (data) {
      if (fn.isError(data)) return
      
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





