;(function(s, rt, fn) {

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
        name: 'doctors-item', 
        className: 'isle',
      }, {
        name: 'receptions-item',
        className: 'isle',
      }, {
        name: 'requests-item',
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
s.router = new rt.observable.Obj({

  is_index: true,
  exceptions: ['requests', 'receptions'],
  current: [],

  checkIndexUpdate: function () {
    if ((this.current[0] === 'index' && !this.is_index) 
    || (this.current[0] !== 'index' && this.is_index)) {
      this.is_index = !this.is_index
      this.trigger('index_changed', this.is_index)
    }
  },

  changeViewTo: function (names) {
    for (var key in tags.data) {
      if ( names.indexOf(key) === -1 && !tags.data[key].is_static ) tags.unmount(key)
      else if (names.indexOf(key) !== -1) tags.mount(key)
    }
  },

  goBack: function () {
    if (this.current[0] === 'index') return false
    else riothis.route( '/'+this.reducePath(this.current) )
  },

  reducePath: function (path) {
    if (path.length === 1) return 'index'
    path = path.slice(0, -1)
    return (this.exceptions.indexOf( path[ path.length-1 ] ) === -1)
      ? path.join('/')
      : this.reducePath(path)
  }

}).on('route_changed', function(path) {
  var t = this
  t.current = path
  rt.observable.trigger('set_title', stores.header.nav[ path[0] ] ) 
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


// ____ROUTER INIT
rt.route(function () {
  rt.observable.trigger('route_changed', [].slice.call(arguments, 1) )
})

rt.route('/index')


})(stores, riot, fn)

