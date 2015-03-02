<receptions-item>
  <date>{ fn.parseDate(data.datetime) }</date>
  <time>{ fn.parseTime(data.datetime) }</time>
  <p>{ fn.data.rec_types[ data.type ] }</p>
  <span>Ваш врач: { stores.doctors.getFullname( data.doctor_id ) }</span>

  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    tags.add(t)
    t.update({data: s.receptions.getCurrent()})
  });
  
</receptions-item>

