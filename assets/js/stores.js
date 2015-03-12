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
      if (fn.isError(data)) return

      rt.route('/index')
    })
  }

  t.reject_request = function (id) {
    socket.put('/request/'+id+'/reject', function (data) {
      if (fn.isError(data)) return

      rt.route('/index')
      s.app.checkUpdates()
    })
  }

  t.on('create_request', t.create_request)
  t.on('reject_request', t.reject_request)

})

})(stores, riot, fn, localStorage)

