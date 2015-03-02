<settings>
  <h2>{ email }</h2>

  var t = this
    , rc = RiotControl
    , s = stores

  t.email = s.user.email

  t.list = {
    last_name: {
      named: 'Фамилия',
      required: 1
    },
    first_name: {
      named: 'Имя',
      required: 1
    },
    

  }
  
  t.on('mount', function() {
    rc.trigger('set_title', 'Настройки')
    tags.add(t)
  });

</settings>