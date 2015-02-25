;(function() {

// CONTROLLER FOR STORES
tags._init()
for (var key in stores) {
  if (stores[key]._init) stores[key]._init();
  RiotControl.addStore( stores[key] )
}


// MOUNT TAGS
riot.mount(['header, index'])


// tags.changeViewTo('index')

// setTimeout(function () {
//   tags.changeViewTo('index')
// }, 0);

})()