<auth-login>
  <form-item each={ name, prop in list } data={ this }></form-item>
  <div class="tar">
    <a href="#/auth/reset">Забыли пароль или хотите его сменить?</a>
  </div>
  <button class={ 'connect' + (checkFields()? ' ' : ' disabled') } onclick={ submit }>Войти</button>

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
    rc.trigger('need_login_with', query)
  }

  t.on(t._name, function (data) {
    t.list[ data.name ].value = data.value || null
    t.update()
  })
  
  t.on('mount', function() {
    rc.trigger('set_title','Войти')
    tags.add(t)
  });

</auth-login>