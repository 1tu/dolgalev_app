<auth-reset>
  <p class="tm nmt">Ключ для восстановления пароля прийдет на почту на которую зарегистрирован аккаунт</p>
  <form-item each={ formData.items } src={ 'formData' }></form-item>
  <button class={ 'connect' + (checkFields(formData)? ' ' :' disabled') } onclick={ submit.bind(this, formData) }>Получить ключ</button>

  var t = this
    , rc = RiotControl
    , s = stores

  t.formData = {
    query: {},
    items: [
      {
        name: 'first_name',
        tag: 'input',
        title: 'Ваш email',
        type: 'text',
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

  }


  t.on('mount', function() {
    rc.trigger('set_title','Смена пароля')
    tags.add(t)
  });

</auth-reset>