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

