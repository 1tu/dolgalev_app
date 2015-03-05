var $id = document.getElementById.bind(document)
  , $ = document.querySelectorAll.bind(document)
  , on = function (eventName, fn, bool) {
      this.addEventListener
        ? this.addEventListener(eventName, fn, bool || false) 
        : this.attachEvent('on' + eventName, fn)
    }
  , off = function (eventName, fn, bool) {
      this.removeEventListener
        ? this.removeEventListener(eventName, fn, bool || false) 
        : this.detachEvent ('on' + eventName, fn)
    }
  , input_stub = $id('input-stub')


on('deviceready', function() {
  document.body.style.background = 'green'
  navigator.notification.alret('DEVICE IS READY')
  console.log('DEVICE IS READY');

  on('backbutton', stores.router.goBack)
  on('menubutton', function () {
    stores.router.trigger('toggle_nav')
  })
})

document.body.style.fontSize = window.devicePixelRatio+'em'