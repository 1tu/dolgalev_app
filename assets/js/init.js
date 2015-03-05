
var $id = document.getElementById.bind(document)
  , $ = document.querySelectorAll.bind(document)
  , on = function (eventName, fn) {
      document.addEventListener(eventName, fn, false) 
    }
  , off = function (eventName, fn) {
      document.removeEventListener(eventName, fn,false) 
    }
  , input_stub = $id('input-stub')

function DRfun () {
  document.body.style.background = 'green'
  navigator.notification.alret('DEVICE IS READY')
  console.log('DEVICE IS READY');

  document.addEventListener('backbutton', stores.router.goBack, false)
  document.addEventListener('menubutton', function () {
    stores.router.trigger('toggle_nav')
  }, false)

  // navigator.app.overrideBackButton(stores.router.goBack)
  // navigator.app.overrideButton(function () {
  //   stores.router.trigger('toggle_nav')
  // })
}

function DRfunR () {
  document.body.style.background = 'red'
  navigator.notification.alret('DEVICE IS READY')
  console.log('DEVICE IS READY');

  on('backbutton', stores.router.goBack)
  on('menubutton', function () {
    stores.router.trigger('toggle_nav')
  })

  // navigator.app.overrideBackButton(stores.router.goBack)
  // navigator.app.overrideButton(function () {
  //   stores.router.trigger('toggle_nav')
  // })
}




document.body.style.fontSize = window.devicePixelRatio+'em'