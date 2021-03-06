Origami.fastclick.FastClick.attach(document.body);

var $id = document.getElementById.bind(document)
	, $ = document.querySelectorAll.bind(document)
	, on = function (eventName, fn) {document.addEventListener(eventName, fn, false)}
	, off = function (eventName, fn) {document.removeEventListener(eventName, fn,false)}
	, input_stub = $id('input-stub')

// для запуска на phone
on('deviceready', onDeviceReady)
// -----------------------------
// для запуска на PC

// navigator = {};
// navigator.notification = {
// 	alert: function (data) {console.log(data)}
// }

// navigator.connection = {
// 	type: 'wifi'
// }

// var cordova = {
// 	plugins: {
// 		notification:{
// 			badge: {
// 				set: function () {}
// 			}
// 		}
// 	}
// }

// var Connection = {
// 	NONE: 'fsafsaf'
// }


// onDeviceReady();


function onDeviceReady () {
	if (navigator && navigator.vendor && navigator.vendor.toLowerCase().search('google') !== -1) document.body.style.fontSize = window.devicePixelRatio+'em';

	on('backbutton', stores.router.goBack)
	on('resume', stores.app.clearBadges);
	on('menubutton', function () {
		stores.router.trigger('toggle_nav')
	})
	document.body.onclick = function () {
		stores.router.trigger('toggle_nav', 'close')
	}
	

	tags._init()
	for (var key in stores) {
		if (stores[key]._init) stores[key]._init();
		RiotControl.addStore( stores[key] )
	}

	riot.route.start()
	riot.mount( $id('header'), 'header')
	riot.route('/', 'Клиника Долгалева')
	if (stores.user.is_registered) riot.route('/index')
	else riot.route('/auth/new')

	cordova.plugins.notification.badge.configure({ 
		autoClear: true,
		title: 'Новое уведомление!',
		smallIcon: 'icon'
	})

	navigator.splashscreen.hide()
}

