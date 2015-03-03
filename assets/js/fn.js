var $id = document.getElementById.bind(document)
  , $ = document.querySelectorAll.bind(document)
  , on = function (eventName, fn, bool) {
      return this.addEventListener
        ? this.addEventListener(eventName, fn, bool || false) 
        : this.attachEvent('on' + eventName, fn)
    }
  , off = function (eventName, fn, bool) {
      return this.removeEventListener
        ? this.removeEventListener(eventName, fn, bool || false) 
        : this.detachEvent ('on' + eventName, fn)
    }

on('DOMContentLoaded', function () {
  Origami.fastclick.FastClick.attach(document.body);
})

;(function(f, rc, s) {

  f.data = {
    days: ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    rusDays: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"],
    month: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    rec_types: {
        reception: 'Приём у врача',
        pull_tooth: 'Вырывание зуба'
      },
  }


  f.toQuery = function (obj) {
    var query = ''
      , is_start = true

    for (var key in obj) {
      if (is_start) {
        is_start = false
        query += '?'
      } else query += '&'

      query += key+'='+obj[key];
    }
    return query
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
          (oldTmp[key]['updatedAt'] != newTmp[key]['updatedAt']) ) 
            newTmp[key]['_status'] = 'updated'
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
    return z.getDate()+' '+f.data.month[ z.getMonth() ]
  }

  f.parseDay = function (date) {
    var z = (date instanceof Date)? date : new Date(date)
    return f.data.days[ z.getDay() ]
  }

  f.parseTime = function (date) {
    var z = (date instanceof Date)? date : new Date(date)
      , h = z.getHours()+''
      , m = z.getMinutes()+''
    return (h.length ===1? '0'+h : h)+':'+(m.length ===1? '0'+m : m)
  }

  f.isNetwork = function () {
    return navigator.connection.type === Connection.NONE? false : true
  }

  f.createFormItem = function (name, opts) {
    var el = document.createElement(opts.tag)
    el.name = name
    opts.type && (el.type = opts.type)
    if (opts.tag === 'select' && opts.src) {
      opts.src.forEach(function (item) {
        var opt = document.createElement('option')

        item.value && (opt.value = item.value)
        item.text && (opt.innerHTML = item.text)
        el.appendChild(opt)
      })
    }
    return el
  }


  f.prepareToForm = function (arr, entity) {
    var tmpArr = [{}]
      , textPattern = {
          doctors: ['last_name', 'first_name', 'second_name'],
        }

    function createText (item) {
      return textPattern[entity].map(function (key) {
        return item[key]
      }).join(' ')
    }

    arr.forEach(function (item) {
      tmpArr.push({value: item.id, text: createText(item)})
    })
    return tmpArr
  }


})(fn, RiotControl, stores)

