var http = require('http')
var hookio = require('hook.io')

var hookMaster = hookio.createHook({
  name: "master"
})
hookMaster.on('*::ans', function(data){
  // outputs b::sup::dog
  console.log('AQUI: '+data);
});
hookMaster.start()

http.createServer(function (req, res) {
  hookMaster.emit('get')
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('hola\n')
}).listen(1337)

