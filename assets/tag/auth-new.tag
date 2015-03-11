<auth-new>
  <form-item each={ formData.items } src={ 'formData' }></form-item>
  <div class="tar">
    <a href="#/auth/login">У меня уже есть аккаунт</a>
  </div>
  <button class={ 'connect' + (checkFields(formData)? ' ' : ' disabled') } onclick={ submit.bind(this, formData) }>Зарегистрироваться</button>

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

  checkFields(form) {
    for (var i = 0, item; (item = form.items[i]); i++) 
      if (item.required && !form.query[ item.name ]) return false

    if (form.compare && (form.query[ form.compare[0] ] !== form.query[ form.compare[1] ]) ) 
      return false

    return true
  }

  submit(form) {
    if (!t.checkFields(form)) return
    rc.trigger('try_register', form.query)
  }
  
  t.on('mount', function() {
    rc.trigger('set_title','Регистрация')
    tags.add(t)
  });

</auth-new>