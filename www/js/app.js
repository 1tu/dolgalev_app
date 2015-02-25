;(function(f, rc, s) {

  f.data = {
    days: ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    month: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    rec_types: {
        reception: 'Приём у врача',
        pull_tooth: 'Вырывание зуба'
      },
  }


  f.goBack = function () {
    var path = s.router.current
    if (path[0] === 'index') return false
    else if (path.length === 1) riot.route('index')
    else riot.route( f.reducePath(path) )
  }

  f.reducePath = function (path) {
    if (path.length === 1) return 'index'
    var tmp = path.slice(0, -1)
    return (s.router.exceptions.indexOf( tmp[ tmp.length-1 ] ) === -1)
      ? tmp.join('/')
      : f.reducePath(tmp)
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

  t.lastDataUpdate = ( ls.lastDataUpdate && JSON.parse(ls.lastDataUpdate) ) || {
      doctors: new Date(0),
      request: new Date(0),
      receptions: new Date(0)
    }

  t.is_synced = false

  t._init = function () {
    // t.checkUpdates()
  }

  t.checkUpdates = function () {
    var xhr = new XMLHttpRequest()
      , data
    xhr.open('GET', 'localhost:8080/check_updates', true)
    xhr.timeout = 3000
    xhr.onreadystatechange = function () {
      alert('changed')
      if (xhr.readyState == 4 && xhr.status == 200) {

        data = (typeof xhr.responseText == 'string')? JSON.parse(xhr.responseText) : xhr.responseText
        if (data.doctors) {
          s.doctors.setData(data.doctors)
          t.dataUpdate('doctors', data.syncedAt)
        }
        if (data.requests) {
          s.requests.setData(data.requests)
          t.dataUpdate('requests', data.syncedAt)
        }
        if (data.receptions) {
          s.receptions.setData(data.receptions)
          t.dataUpdate('receptions', data.syncedAt)
        }

        t.is_synced = true
      }
    }
  }

  t.dataUpdate = function (entity, data) {
    t.lastDataUpdate[entity] = data[entity]
    ls.lastDataUpdate = JSON.stringify(t.lastDataUpdate)
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
        parent: 'body',
        is_static: true
      }, {
        name: 'index',
        parent: 'main',
      }, {
        name: 'doctors',
        parent: 'main',
      }, {
        name: 'doctor',
        className: 'isle',
        parent: 'main',
      }, {
        name: 'reception',
        className: 'isle',
        parent: 'main',
      }, {
        name: 'request',
        className: 'isle',
        parent: 'main',
      }
    ]

  t.Tag = function (obj) {
    this.is_static = obj.is_static || false
    this.className = obj.className || null
    this.is_mounted = false
    this.parent = document.getElementById( obj.parent )
  }

  t.data = {}

  t._init = function () {
    t._all.forEach(function (item) {
      t.data[item.name] = new t.Tag(item)
      // t.data[item.name] = { 
      //   is_static: item.is_static || false,
      //   id: item.id || null,
      //   className: item.className || null,
      //   is_mounted: false,
      //   parent: document.getElementById( item.parent )
      // } 
    })
  }

  t.add = function (tag) {
    var name = tag.root.tagName.toLowerCase()
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
    z.tag.unmount()
    delete z.tag
    z.is_mounted = false
  }

  t.mount = function (name) {
    var z = t.data[name]
      , el
    if (z.is_mounted) return
    el = document.createElement(name)
    el.id = name
    z.className && (el.className = z.className)
    z.parent.appendChild( el )
    rt.mountTo(el, name)
  }

  t.changeViewTo = function (names) {
    for (var key in t.data) {
      if ( names.indexOf(key) === -1 && !t.data[key].is_static ) t.unmount(key)
      else if (names.indexOf(key) !== -1) t.mount(key)
    }
  }


})();

// ____ROUTER STORE
s.router = new (function () {

  rt.observable(this)
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


  t.on('route_changed', function(path) {
    t.current = path
    rc.trigger('set_title', s.header.nav[ path[0] ] ) 
    t.checkIndexUpdate()

    if (path[1] && !isNaN(parseInt( path[1] ))) {
      fn.setActiveId()
      tags.changeViewTo( path[0].slice(0, -1) )
    } else 
      tags.changeViewTo( path[0] )
  })

})


// ____ROUTER INIT
rt.route(function () {
  rc.trigger('route_changed', [].slice.call(arguments) )
})

rt.route('index')


})(stores, riot, fn, RiotControl)


;(function() {

// CONTROLLER FOR STORES
tags._init()
for (var key in stores) {
  if (stores[key]._init) stores[key]._init();
  RiotControl.addStore( stores[key] )
}


// MOUNT TAGS
riot.mount(['header, index'])


// tags.changeViewTo('index')

// setTimeout(function () {
//   tags.changeViewTo('index')
// }, 0);

})()

app = new (function(window, $) {

  var self = this

  self.elem = {
    body: $('body')
  }


})( window, document.querySelectorAll.bind(document) )





