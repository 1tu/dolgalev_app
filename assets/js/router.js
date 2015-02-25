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

