;(function(f, rc, s) {

  f.data = {
    days: ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    month: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    rec_types: {
        reception: 'Приём у врача',
        pull_tooth: 'Вырывание зуба'
      },
  }


  f.goBack = function () {
    var path = s.router.current
    if (path[0] === 'index') return false
    else if (path.length === 1) riot.route('index')
    else riot.route( f.reducePath(path) )
  }

  f.reducePath = function (path) {
    if (path.length === 1) return 'index'
    var tmp = path.slice(0, -1)
    return (s.router.exceptions.indexOf( tmp[ tmp.length-1 ] ) === -1)
      ? tmp.join('/')
      : f.reducePath(tmp)
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
              (oldTmp[key]['updatedAt'] != newTmp[key]['updatedAt']) ) newTmp[key]['_status'] = 'updated'
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
    return f.data.days[ z.getDay() ]+', '+z.getDate()+' '+f.data.month[ z.getMonth() ]
  }

  f.parseTime = function (date) {
    var z = (date instanceof Date)? date : new Date(date)
    return z.getHours()+':'+z.getMinutes()
  }


})(fn, RiotControl, stores)

