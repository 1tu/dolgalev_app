;(function() {

// CONTROLLER FOR STORES
tags._init()
for (var key in stores) {
  if (stores[key]._init) stores[key]._init();
}


// MOUNT TAGS
riot.mount( $id('header'), 'header')
riot.mount( $id('index'), 'index')

})()