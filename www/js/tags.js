riot.tag('doctors', '<a href="{ \'#doctors/\'+id }" class="{ \'isle\' }" each="{ data }"><p>{ last_name }</p><p>{ first_name }</p><p>{ second_name }</p></a>', function(opts) {


  var t = this
    , rc = RiotControl
    , s = stores

  t.data = s.doctors.data || []

  rc.on('doctors_update', function(data) {
    t.update({data: data})
  });
  
  t.on('mount', function() {
    tags.add(t)
  });


});
riot.tag('doctor', '<p>{ data.last_name }</p><p>{ data.first_name }</p><p>{ data.second_name }</p><table if="{ data.schedule }"><tr><td each="{ data.schedule }">{begin}</td></tr></table>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    tags.add(t)
    t.update({data: s.doctors.getCurrent()})
    console.log(s.doctors.getCurrent());
  });
  

});
riot.tag('header', '<back class="button" if="{ !is_index }" onclick="{ goBack }">< </back><createRequest class="button" if="{ is_index }" onclick="{ changeRoute }">Записаться на прием</createRequest><title if="{ !is_index }">{ title }</title><nav-toggler class="button" onclick="{ toggleNav }"></nav-toggler><nav if="{ is_nav_opened }"><nav-item each="{ key, value in nav }" if="{ parent.navFilter(key) }" onclick="{ parent.changeRoute }">{ value }</menu-item></nav>', function(opts) {
  var t = this
    , rc = RiotControl
    , s = stores

  t.title = ''
  t.nav = s.header.nav
  t.is_index = true
  t.is_nav_opened = false

  this.goBack = function() {
    t.is_nav_opened = false
    fn.goBack()
    this.update()
  }.bind(this);

  this.navFilter = function(test) {
    return s.router.current[0] !== test
    this.update()
  }.bind(this);

  this.toggleNav = function() {
    t.is_nav_opened = !t.is_nav_opened
    this.update()
  }.bind(this);

  this.changeRoute = function(e) {
    t.is_nav_opened = false
    if (e.target.tagName == 'CREATEREQUEST') return riot.route( 'createRequest' )
    riot.route( e.item.key )
    this.update()
  }.bind(this);

  rc.on('title_changed', function (data) {
    t.update({title: data})
  })

  rc.on('index_changed', function(bool) {
    t.update({is_index: bool})    
  })

  t.on('mount', function() {
    tags.add(t, true)
  })


});


riot.tag('index', '<h2 if="{ receptions[0] }" onclick="{ toggleState.bind(this, \'is_rec_visible\') }">Ваши текущие записи</h2><tab if="{ receptions[0] && is_rec_visible }"><a href="{ \'#receptions/\'+id }" class="{ \'isle cf \'+ state }" each="{ receptions }"><date>{ fn.parseDate(datetime) }</date><time>{ fn.parseTime(datetime) }</time><p>{ fn.data.rec_types[ type ] }</p><span>Ваш врач: { stores.doctors.getFullname(doctor_id) }</span></a></tab><h2 if="{ requests[0] }" onclick="{ toggleState.bind(this, \'is_req_visible\') }">Ваши текущие заявки</h2><tab if="{ requests[0] && is_req_visible }"><a href="{ \'#requests/\'+id }" class="{ \'isle cf \'+ state }" each="{ requests }"><date>{ fn.parseDate(date) }</date><time>{ time_begin } - { time_end }</time><p>{ fn.data.rec_types[ type ] }</p><span>К врачу: { stores.doctors.getFullname(doctor_id) }</span></a></tab>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.is_rec_visible = true
  t.is_req_visible = true
  t.receptions = s.receptions.data || [];
  t.requests = s.requests.data || [];

  this.toggleState = function(item) {
    t[ item ] = !t[ item ]
    this.update()
  }.bind(this);

  t.on('mount', function() {
    tags.add(t)
  })

  t.on('requests_updated', function (data) {
    t.update({requests: data})  
  })

  t.on('receptions_updated', function (data) {
    t.update({receptions: data})  
  })


});
riot.tag('reception', '<date>{ fn.parseDate(data.datetime) }</date><time>{ fn.parseTime(data.datetime) }</time><p>{ fn.data.rec_types[ data.type ] }</p><span>Ваш врач: { stores.doctors.getFullname( data.doctor_id ) }</span>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    tags.add(t)
    t.update({data: s.receptions.getCurrent()})
  });
  

});


riot.tag('request', '<p>request</p>', function(opts) {

  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    tags.add(t)
    t.update({data: s.requests.getCurrent()})
  });
  

});


