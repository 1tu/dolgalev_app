// ERROR TYPES:
// 1 = not logined
// 2 = validate error


;(function(s, rt, fn, ls) {

on('deviceready', function () {

  // INITIATE ALL STORES
  for (var key in stores) {
    if (stores[key]._init) stores[key]._init();
  }


})


// ______________


s.user = new rt.observable.Obj({
  
  email: ls.email || null,
  password: ls.password || null,
  data: ( ls.user && JSON.parse(ls.user) ) || {},
  settings: ( ls.settings && JSON.parse(ls.settings) ) || {},

  setData: function (newData) {
    this.data = newData
    ls.user = JSON.stringify(this.data)
  },

  setSettings: function (newSettings) {
    this.settings = newSettings
    ls.settings = JSON.stringify(this.settings)
  }

}).on('need_login_with', function (data) {
  var t = this
  t.email = ls.email = data.email
  t.password = ls.password = data.password
  t.trigger('login')
})


// ______________


s.app = new rt.observable.Obj({

  mod: ( ls.mod && JSON.parse(ls.mod) ) || {
      doctors: null,
      requests: null,
      receptions: null
    },

  server: 'localhost:1337',
  is_auth: false,

  _init: function () {
    // this.connect()

    // on('online', this.connect)
  },

  isOnline: function () {
    return (socket && socket.isConnected())? true : false
  },

  connect: function () {
    if (socket) 
      socket._raw.connect()
    else 
      socket = io.sails.connect()

    socket.on('connect', this.checkUpdates)
    off('online', this.connect)
    on('offline', this.disconnect)
  },

  disconnect: function () {
    socket.disconnect()
    off('offline', this.disconnect)
    on('online', this.connect)
  },

  login: function () {
    if (!s.user.email || !s.user.password) 
      return r.route('/auth/login')

    var t = this
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

  },

  checkUpdates: function () {
    if (!t.isOnline()) return
    var t = this

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
  },

  updateMod: function (entity, data) {
    this.mod[entity] = data
    ls.mod = JSON.stringify(this.mod)
  }

}).on('login', this.login)


})(stores, riot, fn, localStorage)





