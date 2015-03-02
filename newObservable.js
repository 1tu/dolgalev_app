var obs = (function() {

  var callbacks = {}
    , list = {}
    , _id = 0

  function Obj () {
    this._id = _id++
    list[this._id] = this
    // extend(this, data)
  }

  Obj.prototype.on = function(events, fn) {
    if (typeof fn === 'function') {
      (fn.owners || (fn.owners = {}))[this._id] = 1

      events.replace(/\S+/g, function(name, pos) {
        if ( callbacks[name] && callbacks[name].indexOf(fn) !== -1 ) return
        (callbacks[name] = callbacks[name] || []).push( fn )
      })
    }
    return this
  }

  Obj.prototype.off = function(events, fn) {
    var self = this

    function delOwnerCbs (id, fns) {
      for (var i = 0, fn; (fn = fns[i]); ++i) delete fn.owners[id]
    }

    if (events === '*') 
      for (var key in callbacks) delOwnerCbs(self._id, callbacks[key])
    else {
      events.replace(/\S+/g, function(name) {
        delOwnerCbs(self._id, callbacks[name])
      })
    }
    return self
  }

  Obj.prototype.one = function(name, fn) {
    if (fn) (fn.one || (fn.one = {}))[this._id] = 1
    return this.on(name, fn)
  }

  Obj.prototype.remove = function() {
    delete list[this._id]
  }

  Obj.prototype.trigger = trigger

  function trigger (name) {
    var args = [].slice.call(arguments, 1)
      , fns = callbacks[name] || []

    for (var i = 0, fn; (fn = fns[i]); ++i) {
      for (var ownerId in fn.owners) {
        if (!fn.busy) {
          fn.busy = 1
          if (list[ownerId]) fn.apply(list[ownerId], args)
          else delete fn.owners[ownerId]

          if (fn.one && fn.one[ownerId]) {
            delete fn.owners[ownerId]
            delete fn.one[ownerId]
          }
          fn.busy = 0
        }
      }
    }
  }

  return {
    Obj: Obj,
    trigger: trigger
  }

})()



var Next = function (data) {
  obs.Obj.call(this)
  this.data = data
}

Next.prototype = obs.Obj.prototype


Next.prototype.say = function () {
  console.log(this._id)
}

var start = (new Date()).getTime()

var z = new obs.Obj()
  , x = new obs.Obj()
  , y = new obs.Obj()
  , b = new obs.Obj()
  , q = new obs.Obj()
  , w = new obs.Obj()
  , e = new obs.Obj()

var zz = new Next('test111')
var xx = new Next('test222')



function ss (data) {
  console.log(this, data);
}

console.log(zz._id);
zz.say()

zz.on('test', ss)
xx.on('test', ss)
x.on('test', ss)

x.trigger('test', '1')

// console.log((new Date()).getTime() - start)