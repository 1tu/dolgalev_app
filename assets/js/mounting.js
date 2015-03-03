;(function(s) {

// CONTROLLER FOR STORES
on('deviceready', function () {
  tags._init()
  for (var key in s) {
    if (s[key]._init) s[key]._init();
    RiotControl.addStore( s[key] )
  }

  riot.mount( $id('header'), 'header')
  if (s.user.is_registered) riot.route('/index')
  else riot.route('/auth/new')

  navigator.splashscreen.hide()
})


 
})(stores)