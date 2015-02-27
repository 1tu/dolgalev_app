var $id = document.getElementById.bind(document)
  , $ = document.querySelectorAll.bind(document)

;(function(f, rc, s) {

  f.data = {
    days: ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
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
              (oldTmp[key]['updatedAt'] != newTmp[key]['updatedAt']) ) newTmp[key]['_status'] = 'updated'
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
    return f.data.days[ z.getDay() ]+', '+z.getDate()+' '+f.data.month[ z.getMonth() ]
  }

  f.parseTime = function (date) {
    var z = (date instanceof Date)? date : new Date(date)
    return z.getHours()+':'+z.getMinutes()
  }


})(fn, RiotControl, stores)


;(function(s, rt, fn, ls) {

s.header = new (function () {

  rt.observable(this)
  var t = this

  t.title = ''
  t.nav = {
      createRequest: 'Записаться',
      report: 'Отчеты',
      settings: 'Настройки',
      about: 'О клинике',
      doctors: 'Врачи',
    }

  t.on('set_title', function(str) {
    t.title = str
    t.trigger('title_changed', t.title)
  })

})

// ______________

s.app = new (function () {
  
  rt.observable(this)
  var t = this

  t.mod = ( ls.mod && JSON.parse(ls.mod) ) || {
      doctors: new Date(0),
      request: new Date(0),
      receptions: new Date(0)
    }

  t.server = 'localhost:1337'
  t.is_synced = false
  t.is_auth = false

  t._init = function () {
    t.checkUpdates()
  }

  t.checkUpdates = function () {
    var xhr = new XMLHttpRequest()
      , data
    xhr.open('GET', t.server+'/check_updates'+ fn.toQuery(t.mod), true)
    xhr.timeout = 3000
    xhr.onreadystatechange = function () {
      alert('changed')
      if (xhr.readyState == 4 && xhr.status == 200) {

        data = (typeof xhr.responseText == 'string')? JSON.parse(xhr.responseText) : xhr.responseText
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
      }
    }
  }

  t.updateMod = function (entity, data) {
    t.mod[entity] = data
    ls.mod = JSON.stringify(t.mod)
  }

})

// ______________

s.user = new (function () {
  
  rt.observable(this)
  var t = this

  t.data = ( ls.user && JSON.parse(ls.user) ) || {}

  t.setData = function (newData) {
    t.data = newData
    ls.user = JSON.stringify(t.data)
  }
  
})

// ______________

s.doctors = new (function () {
  
  rt.observable(this)
  var t = this
  t._name = 'doctors'

  t.data = ( ls.doctors && JSON.parse(ls.doctors) ) || []
  t.currentId = null

  t._init = function () {
    if (!t.data[0]) t.data = fake[t._name] || [];
  }

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

  t._init = function () {
    if (!t.data[0]) t.data = fake[t._name] || [];
  }

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

  t._init = function () {
    if (!t.data[0]) t.data = fake[t._name] || [];
  }

  t.getCurrent = function () {
    return fn.getById.call(t, t.currentId)
  }

  t.setData = fn.syncData

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
        name: 'index',
      }, {
        name: 'doctors',
      }, {
        name: 'doctor',
        className: 'isle',
      }, {
        name: 'reception',
        className: 'isle',
      }, {
        name: 'request',
        className: 'isle',
      }, {
        name: 'settings'
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
  t.exceptions = ['requests', 'receptions']
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
    RiotControl.trigger('set_title', stores.header.nav[ path[0] ] ) 
    t.checkIndexUpdate()

    if (path[1] && !isNaN(parseInt( path[1] ))) {
      fn.setActiveId()
      t.changeViewTo( [path[0].slice(0, -1)] )
    } else 
      t.changeViewTo( [path[0]] )
  })

})


// ____ROUTER INIT
riot.route(function () {
  RiotControl.trigger('route_changed', [].slice.call(arguments, 1) )
})

riot.route('/index')


})(stores, riot, fn, RiotControl)


;(function() {

// CONTROLLER FOR STORES
tags._init()
for (var key in stores) {
  if (stores[key]._init) stores[key]._init();
  RiotControl.addStore( stores[key] )
}


// MOUNT TAGS
riot.mount( $id('header'), 'header')
riot.mount( $id('index'), 'index')

})()

app = new (function(window, $) {

  var self = this

  self.elem = {
    body: $('body')
  }


})( window, document.querySelectorAll.bind(document) )





