<auth-login>
  <itu-form data={ formData }>
    <div class="tar">
      <a href="#/auth/reset">Забыли пароль или хотите его сменить?</a>
    </div>
  </itu-form>

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

</auth-login>