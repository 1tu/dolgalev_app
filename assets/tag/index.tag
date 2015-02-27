<index>
  <h2 if={ receptions[0] } onclick={ toggleState.bind(this, 'is_rec_visible') }>Ваши текущие записи</h2>
  <tab if={ receptions[0] && is_rec_visible }>
    <a href={ '#/receptions/'+id } class={ 'isle cf '+ state }  each={ receptions }>
      <date>{ fn.parseDate(datetime) }</date>
      <time>{ fn.parseTime(datetime) }</time>
      <p>{ fn.data.rec_types[ type ] }</p>
      <span>Ваш врач: { stores.doctors.getFullname(doctor_id) }</span>
    </a>
  </tab>

  <h2 if={ requests[0] } onclick={ toggleState.bind(this, 'is_req_visible') }>Ваши текущие заявки</h2>
  <tab if={ requests[0] && is_req_visible }>
    <a href={ '#/requests/'+id } class={ 'isle cf '+ state } each={ requests }>
      <date>{ fn.parseDate(date) }</date>
      <time>{ time_begin } - { time_end }</time>
      <p>{ fn.data.rec_types[ type ] }</p>
      <span>К врачу: { stores.doctors.getFullname(doctor_id) }</span>
    </a>
  </tab>

  var t = this
    , rc = RiotControl
    , s = stores

  t.is_rec_visible = true
  t.is_req_visible = true
  t.receptions = s.receptions.data || [];
  t.requests = s.requests.data || [];

  toggleState(item) {
    t[ item ] = !t[ item ]
  }

  t.on('mount', function() {
    tags.add(t)
  })

  t.on('requests_updated', function (data) {
    t.update({requests: data})  
  })

  t.on('receptions_updated', function (data) {
    t.update({receptions: data})  
  })

</index>