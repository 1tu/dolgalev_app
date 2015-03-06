<index>
  <button onclick={ addBadge }>add badge</button>
  <button onclick={ getBadges }>get badges</button>

  <h2 if={ receptions[0] } onclick={ toggleState.bind(this, 'is_rec_visible') }>Текущие записи</h2>
  <tab if={ receptions[0] && is_rec_visible }>
    <a href={ '#/receptions/'+id } class={ 'isle cf' }  each={ receptions }>
      <div class="datetime VA">
        <div>
          <p class="time">{ fn.parseTime(datetime) }</p>
          <p>{ fn.parseDate(datetime) }</p>
          <p class="day">{ fn.parseDay(datetime) }</p>
        </div>
      </div>
      <div class="withDoctor">
        <p class="name">{ stores.doctors.getFullname(doctor_id) }  </p>
      </div>
    </a>
  </tab>

  <h2 if={ requests[0] } onclick={ toggleState.bind(this, 'is_req_visible') }>Текущие заявки</h2>
  <tab if={ requests[0] && is_req_visible }>
    <a href={ '#/requests/'+id } class={ 'isle cf ' } each={ requests }>
      <div class={ 'datetime VA' + (doctor_id? ' ' : ' withoutDoctor') }>
        <div>
          <p if={ time_begin }>{ time_begin && time_begin } { (time_begin && time_end) && (' - '+time_end) }</p>
          <p>{ fn.parseDate(date) }</p>
          <p class="day">{ fn.parseDay(date) }</p>
        </div>
      </div>
      <div if={ doctor_id } class="withDoctor">
        <p class="name">{ stores.doctors.getFullname(doctor_id) }  </p>
      </div>
    </a>
  </tab>

  <h2 if={ !requests[0] && !receptions[0] }>Вы не записывались на приём</h2>

  var t = this
    , rc = RiotControl
    , s = stores

  t.is_rec_visible = true
  t.is_req_visible = true
  t.receptions = s.receptions.data || [];
  t.requests = s.requests.data || [];

  addBadge() {
    s.app.addBadge()
  }

  getBadges(){
    navigator.notification.alert( s.app.badges )
  }

  toggleState(item) {
    t[ item ] = !t[ item ]
  }

  t.on('mount', function() {
    tags.add(t)
  })

  rc.on('requests_updated', function (data) {
    t.update({requests: data})  
  })

  rc.on('receptions_updated', function (data) {
    t.update({receptions: data})  
  })

</index>