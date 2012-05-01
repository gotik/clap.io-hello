var hookio = require('hook.io')

var i = 0

setInterval(function() {
  i++
}, 1)

var hookB = hookio.createHook({
  name: "b",
  m: true
})

hookB.on('master::get', function(){
  hookB.emit('ans', i)
  i=0
})

hookB.start()
