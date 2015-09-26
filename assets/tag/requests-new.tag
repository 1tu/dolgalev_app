<requests-new>
  <itu-form data={ formData }></itu-form>
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

</requests-new>