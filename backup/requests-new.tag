<requests-new>
  <itu-form data={ formData }></itu-form>
  var t = this
    , rc = RiotControl
    , s = stores

  t._name = 'form_new_request_changed'

  t.formData = {
    list: {
      date: {
        title: 'Дата на которую вы хотите записаться',
        tag: 'input',
        type: 'date',
        required: 1
      },
  
      time_begin: {
        title: 'На промежуток с',
        tag: 'input',
        type: 'time'
      },
  
      time_end: {
        title: 'по',
        tag: 'input',
        type: 'time'
      },
  
      doctor_id: {
        title: 'К доктору',
        tag: 'select',
        src: fn.prepareToForm(s.doctors.data, 'doctors')
      }
    },
    
    submitTitle: 'Записаться',
    onSubmit: function (query) {
      rc.trigger('create_request', query)
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


  setInput (data) {
    t.list[ data.name ].value = data.value || null
    t.update()
  }

  // t.on(t._name, function (data) {
  //   t.list[ data.name ].value = data.value || null
  //   t.update()
  // })

  
  t.on('mount', function() {
    rc.trigger('set_title', 'Записаться на прием')
    tags.add(t)
  });

</requests-new>