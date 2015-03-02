<auth-reset>
  <p>Ключ для восстановления пароля прийдет на почту на которую зарегистрирован аккаунт</p>
  <form-item each={ name, prop in list } data={ this }></form-item>
  <button class={ 'connect' + (checkFields()? ' ' :' disabled') } onclick={ submit }>Получить ключ</button>
  <itu-form data={ testt }></itu-form>

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

  t.testt = {
    list: {
      first_name: {
        tag: 'input',
        title: 'Ваш email',
        type: 'text',
        required: 1
      }
    },
    onSubmit: function (query) {
      rc.trigger('try_register', query)
    }
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

  }

  t.on(t._name, function (data) {
    t.list[ data.name ].value = data.value || null
    t.update()
  })
  
  t.on('mount', function() {
    rc.trigger('set_title','Восстановление пароля')
    tags.add(t)
  });

</auth-reset>