
Origami.fastclick.FastClick.attach(document.body);

tags._init()
for (var key in stores) {
  if (stores[key]._init) stores[key]._init();
  RiotControl.addStore( stores[key] )
}

riot.mount( $id('header'), 'header')
if (stores.user.is_registered) riot.route('/index')
else riot.route('/auth/new')

navigator.splashscreen.hide()
