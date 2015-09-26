<receptions-item>
  <div class="mar-b06">
    <date class="mar-r1">{ fn.parseDate(data.datetime) }</date>
    <time>{ fn.parseTime(data.datetime) }</time>
  </div>
  <p>Ваш врач: <a class="mar-l1" href="#/doctors/{data.doctor_id}">{ stores.doctors.getFullname( data.doctor_id ) }</a></p>

  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    tags.add(t)
    rc.trigger('set_title', 'Запись к врачу')
    t.update({data: s.receptions.getCurrent()})
  });
  
</receptions-item>

