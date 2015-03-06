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
    if (t.current[0] === 'index') 
      navigator.notification.confirm(
        'Если вы хотите чтобы уведомления продолжали поступать, то нужно свернуть приложение (значек "домой"), а не закрыть.', 
        function(){ navigator.app.exitApp() }, 
        'Закрыть приложение?',
        ['Да','Нет']
      )
    else 
      riot.route( '/'+t.reducePath(t.current) )
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

