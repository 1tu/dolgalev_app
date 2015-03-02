<auth-new>
  <form-item each={ name, prop in list } data={ this }></form-item>
  <button class={ 'connect' + (checkFields()? ' ' : ' disabled') } onclick={ submit }>Зарегистрироваться</button>

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

  checkFields(query) {
    for (var key in t.list) {
      var inp = t.list[key]
      if (inp.required && !inp.value) return false;
      query && inp.value && (query[key] = inp.value)
    }
    return true
  }

  submit() {
    var query = {}
    if (!t.checkFields(query)) return
    rc.trigger('try_register', query)
  }

  t.on(t._name, function (data) {
    t.list[ data.name ].value = data.value || null
    t.update()
  })
  
  t.on('mount', function() {
    rc.trigger('set_title','Зарегистрироваться')
    tags.add(t)
  });

</auth-new>