riot.tag2('about', '<p class="tm nmt">Созданный в 2005г. на базе Клиники реконструктивной стоматологии ИП Долгалева А.А., ООО «Северо-Кавказский медецинский учебно-методический центр» (ООО «СКМУМЦ»)</p><div class="field"><span class="fieldTitle">Адрес</span><div class="innerField"><span>г. Ставрополь, ул. Ленина 287/3</span></div></div><div class="field"><span class="fieldTitle">Электронная почта</span><div class="innerField"><a href="mailto: dolgalev@dolgalev-sk.ru">dolgalev@dolgalev-sk.ru</a></div></div><div class="field"><span class="fieldTitle">Телефоны</span><div class="innerField"><a href="tel: +78652370762">+7 (8652) 37-07-62</a><span style="margin: 0 10px">|</span><a href="tel: +78652355885">+7 (8652) 35-58-85</a></div></div><p>ИНН 2635060581, КПП 263401001</p><h2 class="tac">Адреса и телефоны контролирующих организаций</h2><h3>Управление федеральной службы по надзору в сфере защиты прав потребителей в СК:</h3>', '', '', function(opts) {


  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    rc.trigger('set_title','О клинике')
    tags.add(t)
  });

});
riot.tag2('auth-login', '<itu-form data="{formData}"><div class="tar"><a href="#/auth/reset">Забыли пароль или хотите его сменить?</a></div></itu-form>', '', '', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.formData = {
    query: {},
    submit: {
      name: 'Войти',
      event: 'need_login_with'
    },
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

  t.on('mount', function() {
    rc.trigger('set_title','Войти')
    tags.add(t)
  });

}, '{ }');
riot.tag2('auth-new', '<itu-form data="{formData}"><div class="tar"><a href="#/auth/login">У меня уже есть аккаунт</a></div></itu-form>', '', '', function(opts) {

	var t = this
		, rc = RiotControl
		, s = stores

	t.formData = {
		query: {},
		submit: {
			name: 'Зарегистрироваться',
			event: 'try_register'
		},
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

	t.on('mount', function() {
		rc.trigger('set_title','Регистрация')
		tags.add(t)
	});

}, '{ }');
riot.tag2('auth-reset', '<p class="tm nmt">Ключ для восстановления пароля прийдет на почту на которую зарегистрирован аккаунт</p><itu-form data="{formData}"></itu-form><p class="tm" style="margin-top: 2em">Если у вас уже есть ключ - вы можете сменить пароль</p><itu-form data="{formPass}"></itu-form>', '', '', function(opts) {

	var t = this
		, rc = RiotControl
		, s = stores

	t.formData = {
		query: {},
		submit: {
			name: 'Получить ключ',
			event: 'password_reset_request'
		},
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
		submit: {
			name: 'Сменить пароль',
			event: 'password_reset'
		},
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

	t.on('mount', function() {
		rc.trigger('set_title','Смена пароля')
		tags.add(t)
	});

}, '{ }');
riot.tag2('doctors-item', '<p>{data.last_name}</p><p>{data.first_name}</p><p>{data.second_name}</p><h2>График работы</h2><table if="{data.schedule}"><tr each="{day, i in data.schedule}"><td>{fn.data.rusDays[i]}</td><td>{day.begin}</td><td>{day.end}</td></tr></table>', '', '', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    tags.add(t)
    rc.trigger('set_title', 'Врач')
    t.update({data: s.doctors.getCurrent()})
  });

}, '{ }');
riot.tag2('doctors', '<a href="{\'#/doctors/\'+id}" class="{\'isle\'}" each="{data}"><p>{last_name}</p><p>{first_name}</p><p>{second_name}</p></a>', '', '', function(opts) {


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

}, '{ }');
riot.tag2('form-item', '<p>{title}</p><div if="{invalids}" class="invalid_reasons"><p each="{reason in invalids}">{reason}</p></div>', '', '', function(opts) {

	var t = this
		, rc = RiotControl
		, s = stores

	this.onChange = function() {
		var val = t.input.value
		if (val) {
			if (!t.pattern || (t.pattern && val.search(t.pattern) !== -1 )) {
				t.parent.data.query[ t.name ] = val
				t.input.className = 'valid'
			}else {
				delete t.parent.data.query[ t.name ]
				t.input.className = 'invalid'
			}
		}else{
			delete t.parent.data.query[ t.name ]
			if (t.required) t.input.className = 'invalid'
			else t.input.className = ''
		}
		t.parent.parent.update()
	}.bind(this)

	rc.on('form_invalid', function (data) {
		if (!data[ t.name ]) return
		t.update({invalids: data[ t.name ]})
	})

	t.on('mount', function() {
		t.input = fn.createFormItem(t)
		t.root.insertBefore( t.input, t.root.firstChild.nextSibling )
		t.input.onchange = t.onChange
		t.input.onkeyup = t.onChange
		t.input.onfocus = fn.onFocus
		t.input.onblur = fn.onBlur
		t.onChange()
	});

}, '{ }');
riot.tag2('itu-form', '<form-item each="{data.items}"></form-item><yield></yield><button class="{\'connect\' + (checkFields(data)? \' \' : \' disabled\')}" onclick="{submit.bind(this, formData)}">{data.submit.name}</button>', '', '', function(opts) {

	var t = this
		, rc = RiotControl
		, s = stores

	t.data = t.opts.data

	this.checkFields = function() {
		for (var i = 0, item; (item = t.data.items[i]); i++)
			if (item.required && !t.data.query[ item.name ]) return false

		if (t.data.compare && (t.data.query[ t.data.compare[0] ] !== t.data.query[ t.data.compare[1] ]) )
			return false

		return true
	}.bind(this)

	this.submit = function() {
		if (!t.checkFields()) return
		rc.trigger(t.data.submit.event, t.data.query)
	}.bind(this)

}, '{ }');
riot.tag2('header', '<div class="VA inner"><back class="button" if="{!is_index}" onclick="{goBack}"></back><createrequest class="button" if="{is_index}" onclick="{changeRoute}">Записаться на прием</createRequest><title if="{!is_index}">{title}</title><nav-toggler class="button" onclick="{toggleNav}"></nav-toggler></div><nav if="{is_nav_opened}"><nav-item each="{key, value in nav}" onclick="{parent.changeRoute}">{value}</menu-item></nav>', '', '', function(opts) {


  var t = this
    , rc = RiotControl
    , s = stores

  t.title = ''
  t.nav = {
    'requests/new': 'Записаться',

    about: 'О клинике',
    doctors: 'Врачи',
    'auth/reset': 'Восстановить пароль',
  }
  t.is_index = true
  t.is_nav_opened = false

  this.goBack = function() {
    t.is_nav_opened = false
    s.router.goBack()
  }.bind(this)

  this.toggleNav = function(e) {
    e.stopPropagation()
    t.is_nav_opened = !t.is_nav_opened
  }.bind(this)

  this.changeRoute = function(e) {
    e.stopPropagation()
    t.is_nav_opened = false
    if (e.target.tagName == 'CREATEREQUEST') return riot.route( '/requests/new' )
    riot.route( '/'+e.item.key )
  }.bind(this)

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

}, '{ }');


riot.tag2('index', '<h2 if="{receptions[0]}" onclick="{toggleState.bind(this, \'is_rec_visible\')}">Текущие записи</h2><tab if="{receptions[0] && is_rec_visible}"><a href="{\'#/receptions/\'+id}" class="{\'isle cf\'}" each="{receptions}"><div class="datetime VA"><div><p class="time">{fn.parseTime(datetime)}</p><p>{fn.parseDate(datetime)}</p><p class="day">{fn.parseDay(datetime)}</p></div></div><div class="withDoctor"><p class="name">{stores.doctors.getFullname(doctor_id)} </p></div></a></tab><h2 if="{requests[0]}" onclick="{toggleState.bind(this, \'is_req_visible\')}">Текущие заявки</h2><tab if="{requests[0] && is_req_visible}"><a href="{\'#/requests/\'+id}" class="{\'isle cf \'}" each="{requests}"><div class="{\'datetime VA\' + (doctor_id? \' \' : \' withoutDoctor\')}"><div><p if="{time_begin}">{time_begin && time_begin} {(time_begin && time_end) && (\' - \'+time_end)}</p><p>{fn.parseDate(date)}</p><p class="day">{fn.parseDay(date)}</p></div></div><div if="{doctor_id}" class="withDoctor"><p class="name">{stores.doctors.getFullname(doctor_id)} </p></div></a></tab><h2 if="{!requests[0] && !receptions[0]}">Вы не записывались на приём</h2>', '', '', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.is_rec_visible = true
  t.is_req_visible = true
  t.receptions = s.receptions.data || [];
  t.requests = s.requests.data || [];

  this.toggleState = function(item) {
    t[ item ] = !t[ item ]
  }.bind(this)

  t.on('mount', function() {
    tags.add(t)
  })

  rc.on('requests_updated', function (data) {
    t.update({requests: data})
  })

  rc.on('receptions_updated', function (data) {
    t.update({receptions: data})
  })

}, '{ }');
riot.tag2('notifications', '', '', '', function(opts) {


  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    tags.add(t)
  });

});
riot.tag2('receptions-item', '<div class="mar-b06"><date class="mar-r1">{fn.parseDate(data.datetime)}</date><time>{fn.parseTime(data.datetime)}</time></div><p>Ваш врач: <a class="mar-l1" href="#/doctors/{data.doctor_id}">{stores.doctors.getFullname( data.doctor_id )}</a></p>', '', '', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    tags.add(t)
    rc.trigger('set_title', 'Запись к врачу')
    t.update({data: s.receptions.getCurrent()})
  });

}, '{ }');


riot.tag2('reports', '', '', '', function(opts) {


  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    rc.trigger('set_title', 'Отчеты')
    tags.add(t)
  });

});
riot.tag2('requests-item', '<p>{fn.parseDate(data.date)}, {fn.parseDay(data.date)}</p><button class="connect" onclick="{reject}">Отменить запрос</button>', '', '', function(opts) {


  var t = this
    , rc = RiotControl
    , s = stores

  this.reject = function() {
    s.requests.trigger('reject_request', t.data.id)
  }.bind(this)

  t.on('mount', function() {
    tags.add(t)
    rc.trigger('set_title', 'Обрабатывается...')
    t.update({data: s.requests.getCurrent()})
  });

}, '{ }');


riot.tag2('requests-new', '<itu-form data="{formData}"></itu-form>', '', '', function(opts) {
  var t = this
    , rc = RiotControl
    , s = stores

  t.formData = {
    query: {},
    submit: {
      name: 'Записаться',
      event: 'create_request'
    },
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

  t.on('mount', function() {
    rc.trigger('set_title', 'Форма для записи')
    tags.add(t)
  });

}, '{ }');
riot.tag2('settings', '<h2>{email}</h2>', '', '', function(opts) {

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

}, '{ }');