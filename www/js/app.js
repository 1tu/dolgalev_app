;(function(f, rc, s) {

  f.data = {
    days: ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    rusDays: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"],
    month: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    rec_types: {
        reception: 'Приём у врача',
        pull_tooth: 'Вырывание зуба'
      },
  }


  f.toQuery = function (obj) {
    var query = ''
      , is_start = true

    for (var key in obj) {
      if (is_start) {
        is_start = false
        query += '?'
      } else query += '&'

      query += key+'='+obj[key];
    }
    return query
  }


  f.indexBy = function (arr, index) {
    var tmp = {}
    for (var i = 0; i < arr.length; i++) {
      if (index in arr[i]) tmp[ arr[i][index] ] = arr[i];
    };
    return tmp
  }


  f.getById = function (id, fn) {
    var tmp
    this.data.some(function (item) {
      return item.id == id && (tmp = item)
    })
    return fn? fn(tmp) : tmp 
  }


  f.setActiveId = function () {
    var path = s.router.current
    s[ path[0] ].currentId = path[1] >> 0
    s[ path[0] ].trigger( path[0]+'_id_changed', path[1] >> 0 )
  }


  f.syncData = function (newData) {

    var result = []
    if ( this._name === 'doctors' ) result = newData
    else {
      var oldTmp = fn.indexBy(this.data, 'id')
        , newTmp = fn.indexBy(newData, 'id')

      for (var key in newTmp) {
        if (oldTmp[key] && 
          (oldTmp[key]['updatedAt'] != newTmp[key]['updatedAt']) ) 
            newTmp[key]['_status'] = 'updated'
        else if ( !oldTmp[key] )
          newTmp[key]['_status'] = 'new'

        result.push( newTmp[key] )
      }
    }

    this.data = result
    localStorage[ this._name ] = JSON.stringify(result)
    this.trigger( this._name+'_updated', result)
  }


  f.parseDate = function (date) {
    var z = (date instanceof Date)? date : new Date(date)
    return z.getDate()+' '+f.data.month[ z.getMonth() ]
  }

  f.parseDay = function (date) {
    var z = (date instanceof Date)? date : new Date(date)
    return f.data.days[ z.getDay() ]
  }

  f.parseTime = function (date) {
    var z = (date instanceof Date)? date : new Date(date)
      , h = z.getHours()+''
      , m = z.getMinutes()+''
    return (h.length ===1? '0'+h : h)+':'+(m.length ===1? '0'+m : m)
  }

  f.isNetwork = function () {
    return navigator.connection.type === Connection.NONE? false : true
  }

  f.createFormItem = function (name, opts) {
    var el = document.createElement(opts.tag)
    el.name = name
    opts.type && (el.type = opts.type)
    if (opts.tag === 'select' && opts.src) {
      opts.src.forEach(function (item) {
        var opt = document.createElement('option')

        item.value && (opt.value = item.value)
        item.text && (opt.innerHTML = item.text)
        el.appendChild(opt)
      })
    }
    return el
  }


  f.prepareToForm = function (arr, entity) {
    var tmpArr = [{}]
      , textPattern = {
          doctors: ['last_name', 'first_name', 'second_name'],
        }

    function createText (item) {
      return textPattern[entity].map(function (key) {
        return item[key]
      }).join(' ')
    }

    arr.forEach(function (item) {
      tmpArr.push({value: item.id, text: createText(item)})
    })
    return tmpArr
  }


  f.onFocus = function () {
    input_stub.style.display = 'block'
    window.scrollTo(0, this.offsetTop - this.scrollHeight*2)
  }

  f.onBlur = function () {
    input_stub.style.display = 'none'
  }

})(fn, RiotControl, stores)


;(function(s, rt, fn, ls) {

// ______________

s.doctors = new (function () {
  
  rt.observable(this)
  var t = this
  t._name = 'doctors'

  t.data = ( ls.doctors && JSON.parse(ls.doctors) ) || []
  t.currentId = null

  t._init = function () { }

  t.getFullname = function (id) {
    return fn.getById.call(t, id, function (doctor) {
      return doctor.last_name+' '+doctor.first_name+' '+doctor.second_name
    })
  }

  t.getCurrent = function () {
    return fn.getById.call(t, t.currentId)
  }

  t.setData = fn.syncData

})

// ______________

s.receptions = new (function () {
  
  rt.observable(this)
  var t = this
  t._name = 'receptions'

  t.data = ( ls.receptions && JSON.parse(ls.receptions) ) || []
  t.currentId = null

  t._init = function () { }

  t.getCurrent = function () {
    return fn.getById.call(t, t.currentId)
  }

  t.setData = fn.syncData

})

// ______________

s.requests = new (function () {
  
  rt.observable(this)
  var t = this
  t._name = 'requests'
  t.currentId = null

  t.data = ( ls.requests && JSON.parse(ls.requests) ) || []

  t._init = function () {}
  t.getCurrent = function () {
    return fn.getById.call(t, t.currentId)
  }

  t.setData = fn.syncData

  t.create_request = function (query) {
    socket.post('/request', query, function (data) {
      console.log(typeof data, data);
      if (data.errorType) {
        // TODO: notification
        return
      }

      rt.route('/index')
      t.data.push(data)
      s.app.updateMod('requests', data.createdAt) 
      ls.requests = JSON.stringify(t.data)
      t.trigger('requests_updated', t.data)
    })
  }

  t.on('create_request', t.create_request)

})

})(stores, riot, fn, localStorage)


;(function(s, rt, fn, rc) {

// ______________
// NOT OBSERVABLE
;(function () {

  var t = tags

  t._all = [
      {
        name: 'header',
        is_static: true
      }, {
        name: 'notifications',
        is_static: true
      }, {
        name: 'index',
      }, {
        name: 'about',
        className: 'isle',
      }, {
        name: 'reports',
      }, {
        name: 'doctors',
      }, {
        name: 'doctors-item', 
        className: 'isle',
      }, {
        name: 'receptions-item',
        className: 'isle',
      }, {
        name: 'requests-item',
        className: 'isle',
      }, {
        name: 'requests-new',
        className: 'isle',
      }, {
        name: 'settings',
        className: 'isle',
      }, {
        name: 'auth-login',
        className: 'isle',
      }, {
        name: 'auth-reset',
        className: 'isle',
      }, {
        name: 'auth-new',
        className: 'isle',
      }
    ]

  t.Tag = function (obj) {
    this.is_static = obj.is_static || false
    this.className = obj.className || ''
    this.is_mounted = false
    this.tag = null
  }

  t.data = {}

  t._init = function () {
    t._all.forEach(function (item) {
      t.data[item.name] = new t.Tag(item)
    })
  }

  t.add = function (tag) {
    var name = tag.root.id.toLowerCase()
    if ( t.data[name] ) {
      t.data[name].is_mounted = true
      t.data[name].tag = tag
    } else 
      alert('Добавь тэг '+name+' в инициализацию! ');

  }

  t.remove = function (name) {
    if (t.data[name]) delete t.data[name]
  }

  t.unmount = function (name) {
    var z = t.data[name]
    if (!z.is_mounted) return
    z.tag.root.className = ''
    z.tag.unmount()
    z.tag = null 
    z.is_mounted = false
  }

  t.mount = function (name) {
    var z = t.data[name]
    if (z.is_mounted) return
    var el = document.getElementById(name)
    z.className && (el.className = z.className)
    riot.mount(el, name)
  }


})();

// ____ROUTER STORE
s.router = new (function () {

  riot.observable(this)
  var t = this

  t.is_index = true
  t.exceptions = ['requests', 'receptions', 'auth']
  t.current = []


  t.checkIndexUpdate = function () {
    if ((t.current[0] === 'index' && !t.is_index) || (t.current[0] !== 'index' && t.is_index)) {
      t.is_index = !t.is_index
      t.trigger('index_changed', t.is_index)
    }
  }

  t.changeViewTo = function (names) {
    for (var key in tags.data) {
      if ( names.indexOf(key) === -1 && !tags.data[key].is_static ) tags.unmount(key)
      else if (names.indexOf(key) !== -1) tags.mount(key)
    }
    window.scrollTo(0, 0)
  }

  t.goBack = function () {
    if (t.current[0] === 'index') return false
    else riot.route( '/'+t.reducePath(t.current) )
  }

  t.reducePath = function (path) {
    if (path.length === 1) return 'index'
    path = path.slice(0, -1)
    return (t.exceptions.indexOf( path[ path.length-1 ] ) === -1)
      ? path.join('/')
      : t.reducePath(path)
  }


  t.on('route_changed', function(path) {
    t.current = path
    t.checkIndexUpdate()

    if (path[2]) {
      fn.setActiveId();
      t.changeViewTo( [path[0]+'-item-'+path[2]] )
    }else if (path[1]) {
      if ( !isNaN(parseInt( path[1] )) ) {
        fn.setActiveId();
        t.changeViewTo( [path[0]+'-item'] )
      }else
        t.changeViewTo( [path[0]+'-'+path[1]] )
    }else 
      t.changeViewTo( [path[0]] )
  })

})


// ____ROUTER INIT
rt.route(function () {
  rc.trigger('route_changed', [].slice.call(arguments, 1) )
})

})(stores, riot, fn, RiotControl)


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
      navigator.notification && navigator.notification.alert('Отсутствует подключение к интернету, попробуйте позже')
      return false
    }
  }

  t.connect = function () {
    navigator.notification && navigator.notification.alert('internet SUCCESS');
    if (socket) 
      socket._raw.connect()
    else {
      socket = io.sails.connect()
      socket.on('reconnect', t.checkUpdates)
    }

    socket.on('connect', t.checkUpdates)
    off('online', t.connect)
    on('offline', t.disconnect)
  }

  t.disconnect = function () {
    navigator.notification && navigator.notification.alert('internet FAILED');
    socket.disconnect()
    off('offline', t.disconnect)
    on('online', t.connect)
  }


  t.checkUpdates = function () {
    if (!t.isOnline()) return socket.on('connect', t.checkUpdates)
    if (!s.user.is_registered) return rt.route('/auth/new');

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

    if (!t.isOnline()) return socket.on('connect', t.checkUpdates)

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

    if (!t.isOnline()) return

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







var $id = document.getElementById.bind(document)
  , $ = document.querySelectorAll.bind(document)
  , on = function (eventName, fn, bool) {
      this.addEventListener
        ? this.addEventListener(eventName, fn, bool || false) 
        : this.attachEvent('on' + eventName, fn)
    }
  , off = function (eventName, fn, bool) {
      this.removeEventListener
        ? this.removeEventListener(eventName, fn, bool || false) 
        : this.detachEvent ('on' + eventName, fn)
    }
  , input_stub = $id('input-stub')

function DRfun () {
  document.body.style.background = 'green'
  navigator.notification.alret('DEVICE IS READY')
  console.log('DEVICE IS READY');
}




document.body.style.fontSize = window.devicePixelRatio+'em'
document.addEventListener('deviceready', DRfun, false)

Origami.fastclick.FastClick.attach(document.body);

tags._init()
for (var key in stores) {
  if (stores[key]._init) stores[key]._init();
  RiotControl.addStore( stores[key] )
}

riot.mount( $id('header'), 'header')
if (stores.user.is_registered) riot.route('/index')
else riot.route('/auth/new')

navigator.splashscreen.hide()
on('backbutton', stores.router.goBack)
on('menubutton', function () {
  stores.router.trigger('toggle_nav')
})

navigator.app.overrideBackButton(stores.router.goBack)
navigator.app.overrideButton(function () {
  stores.router.trigger('toggle_nav')
})