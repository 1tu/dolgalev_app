<header>
  <back class="button" if={ !is_index } onclick={ goBack }> < </back>
  <createRequest class="button" if={ is_index } onclick={ changeRoute }>Записаться на прием</createRequest>

  <title if={ !is_index }>{ title }</title>

  <nav-toggler class="button" onclick={ toggleNav }></nav-toggler>

  <nav if={ is_nav_opened }>
    <nav-item each={ key, value in nav } if={ parent.navFilter(key) } onclick={ parent.changeRoute }>{ value }</menu-item>
  </nav>

  // save link
  var t = this
    , rc = RiotControl
    , s = stores

  t.title = ''
  t.nav = s.header.nav
  t.is_index = true
  t.is_nav_opened = false

  goBack() {
    t.is_nav_opened = false
    s.router.goBack()
  }

  navFilter(test) {
    return s.router.current[0] !== test
  }

  toggleNav() {
    t.is_nav_opened = !t.is_nav_opened
  }

  changeRoute(e) {
    t.is_nav_opened = false
    if (e.target.tagName == 'CREATEREQUEST') return riot.route( '/createRequest' )
    riot.route( '/'+e.item.key )
  }

  rc.on('title_changed', function (data) {
    t.update({title: data})
  })

  rc.on('index_changed', function(bool) {
    t.update({is_index: bool})    
  })

  t.on('mount', function() {
    tags.add(t, true)
  })

</header>

