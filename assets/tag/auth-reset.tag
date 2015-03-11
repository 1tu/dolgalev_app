<auth-reset>
  <p class="tm nmt">Ключ для восстановления пароля прийдет на почту на которую зарегистрирован аккаунт</p>
  <form-item each={ formData.items } src={ 'formData' }></form-item>
  <button class={ 'connect' + (checkFields(formData)? ' ' :' disabled') } onclick={ submit.bind(this, formData) }>Получить ключ</button>
  <p class="tm" style="margin-top: 2em">Если у вас уже есть ключ - вы можете сменить пароль</p>
  <form-item each={ formPass.items } src={ 'formPass' }></form-item>
  <button class={ 'connect' + (checkFields(formPass)? ' ' :' disabled') } onclick={ submitPass.bind(this, formPass) }>Сменить пароль</button>

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

  checkFields(form) {
    for (var i = 0, item; (item = form.items[i]); i++) 
      if (item.required && !form.query[ item.name ]) return false

    if (form.compare && (form.query[ form.compare[0] ] !== form.query[ form.compare[1] ]) ) 
      return false

    return true
  }

  submit(form) {
    if (!t.checkFields(form)) return
    rc.trigger('password_reset_request', form.query)
  }

  submitPass(form) {
    if (!t.checkFields(form)) return
    rc.trigger('password_reset', form.query)
  }


  t.on('mount', function() {
    rc.trigger('set_title','Смена пароля')
    tags.add(t)
  });

</auth-reset>