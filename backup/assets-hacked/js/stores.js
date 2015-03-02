;(function(s, rt, fn, ls) {

s.header = new rt.observable.Obj({

  title: '',
  nav: {
    createRequest: 'Записаться',
    report: 'Отчеты',
    settings: 'Настройки',
    about: 'О клинике',
    doctors: 'Врачи',
  }


}).on('set_title', function(str) {
  this.title = str
  this.trigger('title_changed', this.title)
})


// ______________

s.doctors = new rt.observable.Obj({
  
  _name: 'doctors',
  data: ( ls.doctors && JSON.parse(ls.doctors) ) || [],
  currentId: null,

  _init: function () {
    if (!this.data[0]) this.data = fake[this._name] || [];
  },

  getFullname: function (id) {
    return fn.getById.call(this, id, function (doctor) {
      return doctor.last_name+' '+doctor.first_name+' '+doctor.second_name
    })
  },

  getCurrent: function () {
    return fn.getById.call(this, this.currentId)
  },

  setData: fn.syncData

})

// ______________

s.receptions = new rt.observable.Obj({
  
  _name: 'receptions',
  data: ( ls.receptions && JSON.parse(ls.receptions) ) || [],
  currentId: null,

  _init: function () {
    if (!this.data[0]) this.data = fake[this._name] || [];
  },

  getCurrent: function () {
    return fn.getById.call(this, this.currentId)
  },

  setData: fn.syncData

})

// ______________

s.requests = new rt.observable.Obj({

  _name: 'requests',
  currentId: null,
  data: ( ls.requests && JSON.parse(ls.requests) ) || [],

  _init: function () {
    if (!this.data[0]) this.data = fake[this._name] || [];
  },

  getCurrent: function () {
    return fn.getById.call(this, this.currentId)
  },

  setData: fn.syncData

})

})(stores, riot, fn, localStorage)

