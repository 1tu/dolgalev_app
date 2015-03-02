<reports>


  var t = this
    , rc = RiotControl
    , s = stores

  
  t.on('mount', function() {
    rc.trigger('set_title', 'Отчеты')
    tags.add(t)
  });

</reports>