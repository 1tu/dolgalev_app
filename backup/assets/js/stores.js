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

