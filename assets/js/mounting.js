;(function(s) {

// CONTROLLER FOR STORES
tags._init()
for (var key in stores) {
  if (stores[key]._init) stores[key]._init();
  RiotControl.addStore( stores[key] )
}


// MOUNT TAGS
riot.mount( $id('header'), 'header')
if (s.user.is_registered) riot.route('/index')
else riot.route('/auth/new')
navigator.splashscreen.hide()
navigator.notification.alert(JSON.stringify(localStorage))
 
})(stores)