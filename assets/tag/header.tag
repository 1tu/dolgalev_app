<header>
  <div class="VA inner">
    <back class="button" if={ !is_index } onclick={ goBack }></back>
    <createRequest class="button" if={ is_index } onclick={ changeRoute }>Записаться на прием</createRequest>

    <title if={ !is_index }>{ title }</title>

    <nav-toggler class="button" onclick={ toggleNav }></nav-toggler>
  </div>
  

  <nav class={ opened: is_nav_opened } >
    <nav-item each={ key, value in nav } onclick={ parent.changeRoute }>{ value }</menu-item>
  </nav>

  // save link
  var t = this
    , rc = RiotControl
    , s = stores


  t.title = ''
  t.nav = {
    'requests/new': 'Записаться',
    reports: 'Отчеты',
    settings: 'Настройки',
    about: 'О клинике',
    doctors: 'Врачи',
    'auth/reset': 'Восстановить пароль',
  }
  t.is_index = true
  t.is_nav_opened = false

  goBack() {
    t.is_nav_opened = false
    s.router.goBack()
  }

  toggleNav(e) {
    e.stopPropagation()
    t.is_nav_opened = !t.is_nav_opened
  }

  changeRoute(e) {
    e.stopPropagation()
    t.is_nav_opened = false
    if (e.target.tagName == 'CREATEREQUEST') return riot.route( '/requests/new' )
    riot.route( '/'+e.item.key )
  }

  rc.on('toggle_nav', function (action) {
    t.update({ is_nav_opened: (action === 'close')? false : !t.is_nav_opened  })
  })

  rc.on('set_title', function (data) {
    t.update({title: data})
  })

  rc.on('index_changed', function(bool) {
    t.update({is_index: bool})    
  })

  t.on('mount', function() {
    tags.add(t, true)
  })

</header>

