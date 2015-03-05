<requests-item>
  <p>{ fn.parseDate(data.date) }, { fn.parseDay(data.date) }</p>
  <button class="connect">Отменить запрос</button>


  var t = this
    , rc = RiotControl
    , s = stores


  t.on('mount', function() {
    tags.add(t)
    rc.trigger('set_title', 'Обрабатывается...')
    t.update({data: s.requests.getCurrent()})
  });
  
</requests-item>

