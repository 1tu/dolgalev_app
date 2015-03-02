<index>
  <h2 if={ receptions[0] } onclick={ toggleState.bind(this, 'is_rec_visible') }>Ваши текущие записи</h2>
  <tab if={ receptions[0] && is_rec_visible }>
    <a href={ '#/receptions/'+id } class={ 'isle cf' }  each={ receptions }>
      <div class="datetime">
        <p class="time">{ fn.parseTime(datetime) }</p>
        <p>{ fn.parseDate(datetime) }</p>
        <p>{ fn.parseDay(datetime) }</p>
      </div>
      <div class="inner">
        <p style="font-size: 14px; margin-bottom: 10px">Консультация у врача</p>
        <p class="name">{ stores.doctors.getFullname(doctor_id) }  </p>
      </div>
    </a>
  </tab>

  <h2 if={ requests[0] } onclick={ toggleState.bind(this, 'is_req_visible') }>Ваши текущие заявки</h2>
  <tab if={ requests[0] && is_req_visible }>
    <a href={ '#/requests/'+id } class={ 'isle cf ' } each={ requests }>
      <div class="datetime">
        <p>{ time_begin && time_begin } { (time_begin && time_end) && (' - '+time_end) }</p>
        <p>{ fn.parseDate(date) }</p>
        <p>{ fn.parseDay(date) }</p>
      </div>
      <div class="inner">
        <p style="font-size: 14px; margin-bottom: 10px">Врач</p>
        <p class="name">{ stores.doctors.getFullname(doctor_id) }  </p>
      </div>
    </a>
  </tab>

  <h2 if={ !requests[0] && !receptions[0] }>Вы не записывались на приём</h2>

  var t = this
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