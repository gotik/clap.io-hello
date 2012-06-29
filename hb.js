var hookio = require('hook.io');

var i = 0;

setInterval(function() {
  i++;
});

var hookSlave = hookio.createHook({
  name: "b",
  silent: true,
  "hook-port" : 9999,  
  m: true
});

//hookSlave.on('hook:::ready', function () {
	hookSlave.on('master:::get', function(){
	  hookSlave.emit('ans', i);
	  i=0;
	});
//});

hookSlave.start()
