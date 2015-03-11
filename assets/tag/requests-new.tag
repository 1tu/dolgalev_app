<requests-new>
  <form-item each={ formData.items } src={ 'formData' }></form-item>
  <button class={ 'connect' + (checkFields(formData)? ' ' : ' disabled') } onclick={ submit.bind(this, formData) }>Записаться</button>
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

  checkFields(form) {
    for (var i = 0, item; (item = form.items[i]); i++) 
      if (item.required && !form.query[ item.name ]) return false

    if (form.compare && (form.query[ form.compare[0] ] !== form.query[ form.compare[1] ]) ) 
      return false

    return true
  }

  submit(form) {
    if (!t.checkFields(form)) return
    rc.trigger('create_request', form.query)
  }

  
  t.on('mount', function() {
    rc.trigger('set_title', 'Форма для записи')
    tags.add(t)
  });

</requests-new>