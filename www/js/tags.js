riot.tag('about', '<p class="tm nmt">Созданный в 2005г. на базе Клиники реконструктивной стоматологии ИП Долгалева А.А., ООО «Северо-Кавказский медецинский учебно-методический центр» (ООО «СКМУМЦ»)</p><div class="field"><span class="fieldTitle">Адрес</span><div class="innerField"><span>г. Ставрополь, ул. Ленина 287/3</span></div></div><div class="field"><span class="fieldTitle">Электронная почта</span><div class="innerField"><a href="mailto: dolgalev@dolgalev-sk.ru">dolgalev@dolgalev-sk.ru</a></div></div><div class="field"><span class="fieldTitle">Телефоны</span><div class="innerField"><a href="tel: +78652370762">+7 (8652) 37-07-62</a><span style="margin: 0 10px">|</span><a href="tel: +78652355885">+7 (8652) 35-58-85</a></div></div><p>ИНН 2635060581, КПП 263401001</p><h2 class="tac">Адреса и телефоны контролирующих организаций</h2><h3>Управление федеральной службы по надзору в сфере защиты прав потребителей в СК:</h3>', function(opts) {


  var t = this
    , rc = RiotControl
    , s = stores

  
  t.on('mount', function() {
    rc.trigger('set_title','О клинике')
    tags.add(t)
  });


});
riot.tag('auth-login', '<form-item each="{ name, prop in list }" data="{ this }"></form-item><div class="tar"><a href="#/auth/reset">Забыли пароль или хотите его сменить?</a></div><button class="{ \'connect\' + (checkFields()? \' \' : \' disabled\') }" onclick="{ submit }">Войти</button>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores


  t._name = 'form_login_auth_changed'
  t.list = {
    email: {
      tag: 'input',
      title: 'Email',
      type: 'email',
      required: 1
    },
    password: {
      tag: 'input',
      title: 'Пароль',
      type: 'password',
      required: 1
    },
  }

  this.checkFields = function(query) {
    for (var key in t.list) {
      var inp = t.list[key]
      if (inp.required && !inp.value) return false;
      query && inp.value && (query[key] = inp.value)
    }
    return true
    this.update()
  }.bind(this);

  this.submit = function() {
    var query = {}
    if (!t.checkFields(query)) return
    rc.trigger('need_login_with', query)
    this.update()
  }.bind(this);

  t.on(t._name, function (data) {
    t.list[ data.name ].value = data.value || null
    t.update()
  })
  
  t.on('mount', function() {
    rc.trigger('set_title','Войти')
    tags.add(t)
  });


});
riot.tag('auth-new', '<form-item each="{ name, prop in list }" data="{ this }"></form-item><div class="tar"><a href="#/auth/login">У меня уже есть аккаунт</a></div><button class="{ \'connect\' + (checkFields()? \' \' : \' disabled\') }" onclick="{ submit }">Зарегистрироваться</button>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores


  t._name = 'form_new_auth_changed'
  t.list = {
    first_name: {
      tag: 'input',
      title: 'Имя',
      type: 'text',
      required: 1
    },
    last_name: {
      tag: 'input',
      title: 'Фамилия',
      type: 'text',
      required: 1
    },
    email: {
      tag: 'input',
      title: 'Email',
      type: 'email',
      required: 1
    },
    password: {
      tag: 'input',
      title: 'Пароль',
      type: 'password',
      required: 1
    },
    confirmPassword: {
      tag: 'input',
      title: 'Повторите пароль',
      type: 'password',
      required: 1
    },
  }

  this.checkFields = function(query) {
    for (var key in t.list) {
      var inp = t.list[key]
      if (inp.required && !inp.value) return false;
      query && inp.value && (query[key] = inp.value)
    }
    if (list.password.value !== list.confirmPassword.value) return false
    return true
    this.update()
  }.bind(this);

  this.submit = function() {
    var query = {}
    if (!t.checkFields(query)) return
    rc.trigger('try_register', query)
    this.update()
  }.bind(this);

  t.on(t._name, function (data) {
    t.list[ data.name ].value = data.value || null
    t.update()
  })
  
  t.on('mount', function() {
    rc.trigger('set_title','Регистрация')
    tags.add(t)
  });


});
riot.tag('auth-reset', '<p class="tm nmt">Ключ для восстановления пароля прийдет на почту на которую зарегистрирован аккаунт</p><form-item each="{ name, prop in list }" data="{ this }"></form-item><button class="{ \'connect\' + (checkFields()? \' \' :\' disabled\') }" onclick="{ submit }">Получить ключ</button>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores


  t._name = 'form_new_auth_changed'
  t.list = {
    first_name: {
      tag: 'input',
      title: 'Ваш email',
      type: 'text',
      required: 1
    }
  }

  this.checkFields = function(query) {
    for (var key in t.list) {
      var inp = t.list[key]
      if (inp.required && !inp.value) return false;
      query && inp.value && (query[key] = inp.value)
    }
    return true
    this.update()
  }.bind(this);

  this.submit = function() {
    var query = {}
    if (!t.checkFields(query)) return

    this.update()
  }.bind(this);

  t.on(t._name, function (data) {
    t.list[ data.name ].value = data.value || null
    t.update()
  })
  
  t.on('mount', function() {
    rc.trigger('set_title','Смена пароля')
    tags.add(t)
  });


});
riot.tag('doctors-item', '<p>{ data.last_name }</p><p>{ data.first_name }</p><p>{ data.second_name }</p><h2>График работы</h2><table if="{ data.schedule }"><tr each="{ day, i in data.schedule }" ><td>{ fn.data.rusDays[i] }</td><td>{ day.begin }</td><td>{ day.end }</td></tr></table>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    tags.add(t)
    rc.trigger('set_title', 'Врач')
    t.update({data: s.doctors.getCurrent()})
  console.log(t.data);
  });
  

});
riot.tag('doctors', '<a href="{ \'#/doctors/\'+id }" class="{ \'isle\' }" each="{ data }"><p>{ last_name }</p><p>{ first_name }</p><p>{ second_name }</p></a>', function(opts) {


  var t = this
    , rc = RiotControl
    , s = stores

  t.data = s.doctors.data || []

  rc.on('doctors_update', function(data) {
    t.update({data: data})
  });
  
  t.on('mount', function() {
    rc.trigger('set_title', 'Врачи')
    tags.add(t)
  });


});
riot.tag('form-item', '<div name="test" class="form-item"><p>{ prop.title }</p></div>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores
    , parent = t.parent.parent

  t.name = t.opts.data.item.name
  t.prop = t.opts.data.item.prop

  this.onChange = function() {
    var val = t.input.value
    if (val) {
      if (!t.prop.pattern || (t.prop.pattern && val.search(t.prop.pattern) !== -1 )) {
        parent.trigger(parent._name, {name: t.name, value: val})
        t.input.className = 'valid'  
      }
      else {
        parent.trigger(parent._name, {name: t.name})
        t.input.className = 'invalid'
      }
    }else{
      parent.trigger(parent._name, {name: t.name})
      if (t.prop.required) t.input.className = 'invalid' 
      else t.input.className = '' 
    }
    this.update()
  }.bind(this);

  t.on('mount', function() {
    t.input = fn.createFormItem(t.name, t.prop)
    t.test.appendChild( t.input )
    t.input.onchange = t.onChange
    t.input.onfocus = fn.onFocus
    t.input.onblur = fn.onBlur
    t.onChange()
  });


});
riot.tag('header', '<back class="button" if="{ !is_index }" onclick="{ goBack }"></back><createRequest class="button" if="{ is_index }" onclick="{ changeRoute }">Записаться на прием</createRequest><title if="{ !is_index }">{ title }</title><nav-toggler class="button" onclick="{ toggleNav }"></nav-toggler><nav if="{ is_nav_opened }"><nav-item each="{ key, value in nav }" onclick="{ parent.changeRoute }">{ value }</menu-item></nav>', function(opts) {
  var t = this
    , rc = RiotControl
    , s = stores


  t.title = ''
  t.nav = {
    'requests/new': 'Записаться',
    reports: 'Отчеты',
    settings: 'Настройки',
    about: 'О клинике',
    doctors: 'Врачи',
    'auth/reset': 'Восстановить пароль',
  }
  t.is_index = true
  t.is_nav_opened = false

  this.goBack = function() {
    t.is_nav_opened = false
    s.router.goBack()
    this.update()
  }.bind(this);

  this.toggleNav = function(e) {
    e.stopPropagation()
    t.is_nav_opened = !t.is_nav_opened
    this.update()
  }.bind(this);

  this.changeRoute = function(e) {
    e.stopPropagation()
    t.is_nav_opened = false
    if (e.target.tagName == 'CREATEREQUEST') return riot.route( '/requests/new' )
    riot.route( '/'+e.item.key )
    this.update()
  }.bind(this);

  rc.on('toggle_nav', function (action) {
    t.update({is_nav_opened: (action === 'close')? false : !t.is_nav_opened })
  })

  rc.on('set_title', function (data) {
    t.update({title: data})
  })

  rc.on('index_changed', function(bool) {
    t.update({is_index: bool})    
  })

  t.on('mount', function() {
    tags.add(t, true)
  })


});


riot.tag('index', '<button onclick="{ beep }">set badge 1</button><button onclick="{ beepLater }">set 5 badge</button><button onclick="{ getBadges }">get badges</button><h2 if="{ receptions[0] }" onclick="{ toggleState.bind(this, \'is_rec_visible\') }">Текущие записи</h2><tab if="{ receptions[0] && is_rec_visible }"><a href="{ \'#/receptions/\'+id }" class="{ \'isle cf\' }" each="{ receptions }"><div class="datetime VA"><div><p class="time">{ fn.parseTime(datetime) }</p><p>{ fn.parseDate(datetime) }</p><p class="day">{ fn.parseDay(datetime) }</p></div></div><div class="withDoctor"><p class="name">{ stores.doctors.getFullname(doctor_id) } </p></div></a></tab><h2 if="{ requests[0] }" onclick="{ toggleState.bind(this, \'is_req_visible\') }">Текущие заявки</h2><tab if="{ requests[0] && is_req_visible }"><a href="{ \'#/requests/\'+id }" class="{ \'isle cf \' }" each="{ requests }"><div class="{ \'datetime VA\' + (doctor_id? \' \' : \' withoutDoctor\') }"><div><p if="{ time_begin }">{ time_begin && time_begin } { (time_begin && time_end) && (\' - \'+time_end) }</p><p>{ fn.parseDate(date) }</p><p class="day">{ fn.parseDay(date) }</p></div></div><div if="{ doctor_id }" class="withDoctor"><p class="name">{ stores.doctors.getFullname(doctor_id) } </p></div></a></tab><h2 if="{ !requests[0] && !receptions[0] }">Вы не записывались на приём</h2>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.is_rec_visible = true
  t.is_req_visible = true
  t.receptions = s.receptions.data || [];
  t.requests = s.requests.data || [];

  this.beep = function() {
    cordova.plugins.notification.badge.set(1)
    this.update()
  }.bind(this);

  this.beepLater = function() {
    cordova.plugins.notification.badge.set(5)
    this.update()
  }.bind(this);

  this.getBadges = function() {
    cordova.plugins.notification.badge.get(function (badge) {
      navigator.notification.alert( badge )
    })
    this.update()
  }.bind(this);

  this.toggleState = function(item) {
    t[ item ] = !t[ item ]
    this.update()
  }.bind(this);

  t.on('mount', function() {
    tags.add(t)
  })

  rc.on('requests_updated', function (data) {
    t.update({requests: data})  
  })

  rc.on('receptions_updated', function (data) {
    t.update({receptions: data})  
  })


});
// <form-item>
//   <p>{ parent.item.prop.title }</p>

//   this.input = fn.createFormItem(this.parent.item.key, this.parent.item.prop)
//   this.input.onchange = function () {
//     this.parent.parent.onChange(this)
//     return 2
//   }.bind(this)

//   this.on('mount', function() {
//     console.log('MOUNT');
//     this.root.appendChild( this.input )
//   });

// </form-item>

// <itu-form>
//   <form-item each={ key, prop in data.list } key={ key } prop={ prop }/>
//   <button class={ 'connect' + (checkFields()? ' ' : ' disabled') } onclick={ submit }>{ data.submitTitle }</button>

//   var t = this
//     , rc = RiotControl
//     , s = stores
//     , parent = t.parent.parent
//     , cls = t.opts.data.itemClass

//   t.data = t.opts.data
//   t.itemClass = t.data.itemClass

//   console.log(t.data);

//   checkFields(query) {
//     for (var key in t.data.list) {
//       var input = t.data.list[key]
//       if (input.required && !input.value) return false;
//       query && input.value && (query[key] = input.value)
//     }
//     return true
//   }

//   onChange(el) {
//     var input = el.input
//       , val = input.value
//       , prop = t.data.list[ el.parent.key ]

//     if (input.value) {
//       if (!prop.pattern || (prop.pattern && val.search(prop.pattern) !== -1 )) {
//         prop.value = val
//         input.className = 'valid'  
//       }
//       else {
//         prop.value = null
//         input.className = 'invalid'
//       }
//     }else{
//       prop.value = null
//       if (prop.required) input.className = 'invalid' 
//       else input.className = '' 
//     }
//   }

//   submit(){
//     var query = {}
//     if (!t.checkFields(query)) return
//     t.data.onSubmit(query)
//   }

// </itu-form>

// fn.onChange = function (el) {
//     var input = el.input
//       , val = input.value
//       , prop = t.data.list[ el.parent.key ]

//     if (input.value) {
//       if (!prop.pattern || (prop.pattern && val.search(prop.pattern) !== -1 )) {
//         prop.value = val
//         input.className = 'valid'  
//       }
//       else {
//         prop.value = null
//         input.className = 'invalid'
//       }
//     }else{
//       prop.value = null
//       if (prop.required) input.className = 'invalid' 
//       else input.className = '' 
//     }
//   }
riot.tag('notifications', '', function(opts) {
  

  var t = this
    , rc = RiotControl
    , s = stores

  
  t.on('mount', function() {
    tags.add(t)
  });


});
riot.tag('receptions-item', '<date>{ fn.parseDate(data.datetime) }</date><time>{ fn.parseTime(data.datetime) }</time><p>{ fn.data.rec_types[ data.type ] }</p><span>Ваш врач: { stores.doctors.getFullname( data.doctor_id ) }</span>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    tags.add(t)
    rc.trigger('set_title', 'Запись к врачу')
    t.update({data: s.receptions.getCurrent()})
  });
  

});


riot.tag('reports', '', function(opts) {


  var t = this
    , rc = RiotControl
    , s = stores

  
  t.on('mount', function() {
    rc.trigger('set_title', 'Отчеты')
    tags.add(t)
  });


});
riot.tag('requests-item', '<p>{ fn.parseDate(data.date) }, { fn.parseDay(data.date) }</p><button class="connect">Отменить запрос</button>', function(opts) {


  var t = this
    , rc = RiotControl
    , s = stores


  t.on('mount', function() {
    tags.add(t)
    rc.trigger('set_title', 'Обрабатывается...')
    t.update({data: s.requests.getCurrent()})
  });
  

});


riot.tag('requests-new', '<form-item each="{ name, prop in list }" data="{ this }"></form-item><button class="{ \'connect\' + (checkFields()? \' \' : \' disabled\') }" onclick="{ submit }">Записаться</button>', function(opts) {
  var t = this
    , rc = RiotControl
    , s = stores

  t._name = 'form_new_request_changed'

  t.list = {
    date: {
      title: 'Дата на которую вы хотите записаться',
      tag: 'input',
      type: 'date',
      required: 1
    },

    time_begin: {
      title: 'На промежуток с',
      tag: 'input',
      type: 'time'
    },

    time_end: {
      title: 'по',
      tag: 'input',
      type: 'time'
    },

    doctor_id: {
      title: 'К доктору',
      tag: 'select',
      src: fn.prepareToForm(s.doctors.data, 'doctors')
    }
  }

  this.checkFields = function(query) {
    for (var key in t.list) {
      var inp = t.list[key]
      if (inp.required && !inp.value) return false;
      query && inp.value && (query[key] = inp.value)
    }
    return true
    this.update()
  }.bind(this);

  this.submit = function() {
    var query = {}
    if (!t.checkFields(query)) return
    rc.trigger('create_request', query)
    this.update()
  }.bind(this);

  t.on(t._name, function (data) {
    t.list[ data.name ].value = data.value || null
    t.update()
  })

  
  t.on('mount', function() {
    rc.trigger('set_title', 'Форма для записи')
    tags.add(t)
  });


});
riot.tag('settings', '<h2>{ email }</h2>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.email = s.user.email

  t.list = {
    last_name: {
      named: 'Фамилия',
      required: 1
    },
    first_name: {
      named: 'Имя',
      required: 1
    },
    

  }
  
  t.on('mount', function() {
    rc.trigger('set_title', 'Настройки')
    tags.add(t)
  });


});