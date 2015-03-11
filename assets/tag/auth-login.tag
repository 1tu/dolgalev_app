<auth-login>
  <form-item each={ formData.items } src={ 'formData' }></form-item>
  <div class="tar">
    <a href="#/auth/reset">Забыли пароль или хотите его сменить?</a>
  </div>
  <button class={ 'connect' + (checkFields(formData)? ' ' : ' disabled') } onclick={ submit.bind(this, formData) }>Войти</button>

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

  checkFields(form) {
    for (var i = 0, item; (item = form.items[i]); i++) 
      if (item.required && !form.query[ item.name ]) return false

    if (form.compare && (form.query[ form.compare[0] ] !== form.query[ form.compare[1] ]) ) 
      return false

    return true
  }

  submit(form) {
    if (!t.checkFields(form)) return
    rc.trigger('need_login_with', form.query)
  }

  
  t.on('mount', function() {
    rc.trigger('set_title','Войти')
    tags.add(t)
  });

</auth-login>