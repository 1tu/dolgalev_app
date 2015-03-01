var obs = new (function() {

  var callbacks = {}
    , list = []
    , _id = 0

  function Obj () {
    list.push(this)
    this._id = _id++
  }

  function fnInCb (event, fn) {
    return callbacks[event] && callbacks[event].indexOf(fn) !== -1? true : false
  }

  function ownerOfFn (id, fn) {
    return (fn.owners && fn.owners.indexOf(id) !== -1)? true : false
  }

  function delOwnerCbs (id, fns) {
    fns.forEach(function (fn) {
      delFn(id, fns, fn)
    })
  }

  function delFn (id, fns, fn, bool) {
    if ( !bool && !ownerOfFn(id, fn) ) return
    if (fn.owners.length === 1) {
      delete fn.owners;
      fns.splice( fns.indexOf(fn), 1 )
    }else 
      fn.owners.splice( fn.owners.indexOf(id), 1)
  }


  Obj.prototype.on = function(events, fn) {
    var self = this
    if (typeof fn == 'function') {
      (fn.owners = fn.owners || []).push( self._id )

      events.replace(/\S+/g, function(name, pos) {
        if ( fnInCb(name, fn) ) return
        (callbacks[name] = callbacks[name] || []).push( fn )
      })
    }
    return self
  }


  Obj.prototype.off = function(events, fn) {
    var self = this

    // TODO: filter all funcs with their OWNERS
    if (events == '*') 
      for (var key in callbacks) delOwnerCbs(self._id, callbacks[key])
    else {
      events.replace(/\S+/g, function(name) {
        delOwnerCbs(self._id, callbacks[name])
      })
    }
    
    return self
  }

  // only single event supported
  Obj.prototype.one = function(name, fn) {
    if (fn) (fn.one = fn.one || []).push( this._id )
    return this.on(name, fn)
  }

  Obj.prototype.trigger = function(name) {
    var args = [].slice.call(arguments, 1)
      , fns = callbacks[name] || []

    for (var i = 0, fn; (fn = fns[i]); ++i) {

      fn.owners.forEach(function (owner) {
        fn.apply(list[owner], args)

        if (fn.one && fn.one.indexOf(owner) !== -1 ) {
          delFn(owner, fns, fn, true)

          if (fn.one.length === 1) delete fn.one;
          else fn.one.splice( fn.one.indexOf(owner), 1 )
        }
      })

      // else if (fns[i] !== fn) { i-- } // Makes self-removal possible during iteration

    }

    return this
  }

  return {
    Obj: Obj,
    cb: callbacks,
    id: _id
  }

})

var z = new obs.Obj()
  , x = new obs.Obj()
  , y = new obs.Obj()


function ss (data) {
  console.log(this, data);
}

z.on('test', ss)
y.on('test', ss)

x.trigger('test', '1')

z.off('test')

x.trigger('test', '2')
