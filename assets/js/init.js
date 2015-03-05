
var $id = document.getElementById.bind(document)
  , $ = document.querySelectorAll.bind(document)
  , on = function (eventName, fn) {
      document.addEventListener(eventName, fn, false) 
    }
  , off = function (eventName, fn) {
      document.removeEventListener(eventName, fn,false) 
    }
  , input_stub = $id('input-stub')

document.body.style.fontSize = window.devicePixelRatio+'em'
on('deviceready', onDeviceReady)

function onDeviceReady () {
  on('backbutton', stores.router.goBack)
  on('menubutton', function () {
    stores.router.trigger('toggle_nav')
  })

  tags._init()
  for (var key in stores) {
    if (stores[key]._init) stores[key]._init();
    RiotControl.addStore( stores[key] )
  }

  riot.mount( $id('header'), 'header')
  if (stores.user.is_registered) riot.route('/index')
  else riot.route('/auth/new')

  navigator.splashscreen.hide()
}


// onDeviceReady()

