var hookio = require('hook.io');

var i = 0

setInterval(function() {
  i++
})

var hookB = hookio.createHook({
  name: "b"
});
hookB.on('master::get', function(){
  hookB.emit('ans', i)
  i=0
});
hookB.start();
