riot.tag('about', '<p class="tm nmt">Созданный в 2005г. на базе Клиники реконструктивной стоматологии ИП Долгалева А.А., ООО «Северо-Кавказский медецинский учебно-методический центр» (ООО «СКМУМЦ»)</p><div class="field"><span class="fieldTitle">Адрес</span><div class="innerField"><span>г. Ставрополь, ул. Ленина 287/3</span></div></div><div class="field"><span class="fieldTitle">Электронная почта</span><div class="innerField"><a href="mailto: dolgalev@dolgalev-sk.ru">dolgalev@dolgalev-sk.ru</a></div></div><div class="field"><span class="fieldTitle">Телефоны</span><div class="innerField"><a href="tel: +78652370762">+7 (8652) 37-07-62</a><span style="margin: 0 10px">|</span><a href="tel: +78652355885">+7 (8652) 35-58-85</a></div></div><p>ИНН 2635060581, КПП 263401001</p><h2 class="tac">Адреса и телефоны контролирующих организаций</h2><h3>Управление федеральной службы по надзору в сфере защиты прав потребителей в СК:</h3>', function(opts) {


  var t = this
    , rc = RiotControl
    , s = stores

  
  t.on('mount', function() {
    rc.trigger('set_title','О клинике')
    tags.add(t)
  });


});
riot.tag('auth-login', '<form-item each="{ formData.items }" src="{ \'formData\' }"></form-item><div class="tar"><a href="#/auth/reset">Забыли пароль или хотите его сменить?</a></div><button class="{ \'connect\' + (checkFields(formData)? \' \' : \' disabled\') }" onclick="{ submit.bind(this, formData) }">Войти</button>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.formData = {
    query: {},
    items: [
      {
        name: 'email',
        tag: 'input',
        title: 'Email',
        type: 'email',
        required: 1
      },{
        name: 'password',
        tag: 'input',
        title: 'Пароль',
        type: 'password',
        required: 1
      }
    ]
  }

  this.checkFields = function(form) {
    for (var i = 0, item; (item = form.items[i]); i++) 
      if (item.required && !form.query[ item.name ]) return false

    if (form.compare && (form.query[ form.compare[0] ] !== form.query[ form.compare[1] ]) ) 
      return false

    return true
    this.update()
  }.bind(this);

  this.submit = function(form) {
    if (!t.checkFields(form)) return
    rc.trigger('need_login_with', form.query)
    this.update()
  }.bind(this);

  
  t.on('mount', function() {
    rc.trigger('set_title','Войти')
    tags.add(t)
  });


});
riot.tag('auth-new', '<form-item each="{ formData.items }" src="{ \'formData\' }"></form-item><div class="tar"><a href="#/auth/login">У меня уже есть аккаунт</a></div><button class="{ \'connect\' + (checkFields(formData)? \' \' : \' disabled\') }" onclick="{ submit.bind(this, formData) }">Зарегистрироваться</button>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.formData = {
    query: {},
    items: [
      {
        name: 'first_name',
        tag: 'input',
        title: 'Имя',
        type: 'text',
        required: 1
      },{
        name: 'last_name',
        tag: 'input',
        title: 'Фамилия',
        type: 'text',
        required: 1
      },{
        name: 'email',
        tag: 'input',
        title: 'Email',
        type: 'email',
        required: 1
      },{
        name: 'password',
        tag: 'input',
        title: 'Пароль',
        type: 'password',
        required: 1
      },{
        name: 'confirmPassword',
        tag: 'input',
        title: 'Повторите пароль',
        type: 'password',
        required: 1
      }
    ],
    compare: ['password', 'confirmPassword'],

  }

  this.checkFields = function(form) {
    for (var i = 0, item; (item = form.items[i]); i++) 
      if (item.required && !form.query[ item.name ]) return false

    if (form.compare && (form.query[ form.compare[0] ] !== form.query[ form.compare[1] ]) ) 
      return false

    return true
    this.update()
  }.bind(this);

  this.submit = function(form) {
    if (!t.checkFields(form)) return
    rc.trigger('try_register', form.query)
    this.update()
  }.bind(this);
  
  t.on('mount', function() {
    rc.trigger('set_title','Регистрация')
    tags.add(t)
  });


});
riot.tag('auth-reset', '<p class="tm nmt">Ключ для восстановления пароля прийдет на почту на которую зарегистрирован аккаунт</p><form-item each="{ formData.items }" src="{ \'formData\' }"></form-item><button class="{ \'connect\' + (checkFields(formData)? \' \' :\' disabled\') }" onclick="{ submit.bind(this, formData) }">Получить ключ</button><p class="tm" style="margin-top: 2em">Если у вас уже есть ключ - вы можете сменить пароль</p><form-item each="{ formPass.items }" src="{ \'formPass\' }"></form-item><button class="{ \'connect\' + (checkFields(formPass)? \' \' :\' disabled\') }" onclick="{ submitPass.bind(this, formPass) }">Сменить пароль</button>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.formData = {
    query: {},
    items: [
      {
        name: 'email',
        tag: 'input',
        title: 'Ваш email',
        type: 'email',
        required: 1
      }
    ]
  }

  t.formPass = {
    query: {},
    items: [
      {
        name: 'resetToken',
        tag: 'textarea',
        title: 'Ключ для смены пароля',
        required: 1
      },{
        name: 'password',
        tag: 'input',
        title: 'Новый пароль',
        type: 'password',
        required: 1
      },{
        name: 'confirmPassword',
        tag: 'input',
        title: 'Повторите пароль',
        type: 'password',
        required: 1
      }
    ],
    compare: ['password', 'confirmPassword'],
  }

  this.checkFields = function(form) {
    for (var i = 0, item; (item = form.items[i]); i++) 
      if (item.required && !form.query[ item.name ]) return false

    if (form.compare && (form.query[ form.compare[0] ] !== form.query[ form.compare[1] ]) ) 
      return false

    return true
    this.update()
  }.bind(this);

  this.submit = function(form) {
    if (!t.checkFields(form)) return
    rc.trigger('password_reset_request', form.query)
    this.update()
  }.bind(this);

  this.submitPass = function(form) {
    if (!t.checkFields(form)) return
    rc.trigger('password_reset', form.query)
    this.update()
  }.bind(this);


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
riot.tag('form-item', '<p>{ parent.title }</p><div if="{ invalids }" class="invalid_reasons"><p each="{ reason in invalids }">{ reason }</p></div>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores
    , parent = t.parent.parent

  t.src = t.opts.src

  this.onChange = function() {
    var val = t.input.value
    if (val) {
      if (!t.parent.pattern || (t.parent.pattern && val.search(t.parent.pattern) !== -1 )) {
        parent[ t.src ].query[ t.name ] = val
        t.input.className = 'valid'  
      }else {
        delete parent[ t.src ].query[ t.name ]
        t.input.className = 'invalid'
      }
    }else{
      delete parent[ t.src ].query[ t.name ]
      if (t.parent.required) t.input.className = 'invalid' 
      else t.input.className = '' 
    }
    parent.update()
    this.update()
  }.bind(this);

  rc.on('form_invalid', function (data) {
    if (!data[ t.name ]) return
    t.update({invalids: data[ t.name ]})
  })

  t.on('mount', function() {
    t.input = fn.createFormItem(t.parent)
    t.root.insertBefore( t.input, t.root.firstChild.nextSibling )
    t.input.onchange = t.onChange
    t.input.onfocus = fn.onFocus
    t.input.onblur = fn.onBlur
    t.onChange()
  });


});
riot.tag('header', '<div class="VA inner"><back class="button" if="{ !is_index }" onclick="{ goBack }"></back><createRequest class="button" if="{ is_index }" onclick="{ changeRoute }">Записаться на прием</createRequest><title if="{ !is_index }">{ title }</title><nav-toggler class="button" onclick="{ toggleNav }"></nav-toggler></div><nav if="{ is_nav_opened }" ><nav-item each="{ key, value in nav }" onclick="{ parent.changeRoute }">{ value }</menu-item></nav>', function(opts) {
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
    t.update({ is_nav_opened: (action === 'close')? false : !t.is_nav_opened  })
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


riot.tag('index', '<h2 if="{ receptions[0] }" onclick="{ toggleState.bind(this, \'is_rec_visible\') }">Текущие записи</h2><tab if="{ receptions[0] && is_rec_visible }"><a href="{ \'#/receptions/\'+id }" class="{ \'isle cf\' }" each="{ receptions }"><div class="datetime VA"><div><p class="time">{ fn.parseTime(datetime) }</p><p>{ fn.parseDate(datetime) }</p><p class="day">{ fn.parseDay(datetime) }</p></div></div><div class="withDoctor"><p class="name">{ stores.doctors.getFullname(doctor_id) } </p></div></a></tab><h2 if="{ requests[0] }" onclick="{ toggleState.bind(this, \'is_req_visible\') }">Текущие заявки</h2><tab if="{ requests[0] && is_req_visible }"><a href="{ \'#/requests/\'+id }" class="{ \'isle cf \' }" each="{ requests }"><div class="{ \'datetime VA\' + (doctor_id? \' \' : \' withoutDoctor\') }"><div><p if="{ time_begin }">{ time_begin && time_begin } { (time_begin && time_end) && (\' - \'+time_end) }</p><p>{ fn.parseDate(date) }</p><p class="day">{ fn.parseDay(date) }</p></div></div><div if="{ doctor_id }" class="withDoctor"><p class="name">{ stores.doctors.getFullname(doctor_id) } </p></div></a></tab><h2 if="{ !requests[0] && !receptions[0] }">Вы не записывались на приём</h2>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.is_rec_visible = true
  t.is_req_visible = true
  t.receptions = s.receptions.data || [];
  t.requests = s.requests.data || [];


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
riot.tag('requests-item', '<p>{ fn.parseDate(data.date) }, { fn.parseDay(data.date) }</p><button class="connect" onclick="{ reject }">Отменить запрос</button>', function(opts) {


  var t = this
    , rc = RiotControl
    , s = stores

  this.reject = function() {
    s.requests.trigger('reject_request', t.data.id)
    this.update()
  }.bind(this);

  t.on('mount', function() {
    tags.add(t)
    rc.trigger('set_title', 'Обрабатывается...')
    t.update({data: s.requests.getCurrent()})
  });
  

});


riot.tag('requests-new', '<form-item each="{ formData.items }" src="{ \'formData\' }"></form-item><button class="{ \'connect\' + (checkFields(formData)? \' \' : \' disabled\') }" onclick="{ submit.bind(this, formData) }">Записаться</button>', function(opts) {
  var t = this
    , rc = RiotControl
    , s = stores

  t.formData = {
    query: {},
    items: [
      {
        name: 'date',
        title: 'Дата на которую вы хотите записаться',
        tag: 'input',
        type: 'date',
        required: 1
      },{
        name: 'time_begin',
        title: 'На промежуток с',
        tag: 'input',
        type: 'time'
      },{
        name: 'time_end',
        title: 'по',
        tag: 'input',
        type: 'time'
      },{
        name: 'doctor_id',
        title: 'К доктору',
        tag: 'select',
        options: fn.prepareToForm(s.doctors.data, 'doctors')
      }
    ]
    
  }

  this.checkFields = function(form) {
    for (var i = 0, item; (item = form.items[i]); i++) 
      if (item.required && !form.query[ item.name ]) return false

    if (form.compare && (form.query[ form.compare[0] ] !== form.query[ form.compare[1] ]) ) 
      return false

    return true
    this.update()
  }.bind(this);

  this.submit = function(form) {
    if (!t.checkFields(form)) return
    rc.trigger('create_request', form.query)
    this.update()
  }.bind(this);

  
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