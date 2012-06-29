var http = require('http');
var hookio = require('hook.io');
var i=0;
var startTime = new Date();

setInterval(function() {
  i++;
});

var hookMaster = hookio.createHook({
  name: "master",
  silent: true,
  m: true
});

hookMaster.on('*:::ans', function(data){
  i += data;
});

hookMaster.start();

//hookMaster.on('hook:::ready', function () {
  http.createServer(function (req, res) {
    hookMaster.emit('get');
    var time = (new Date() - startTime)/1000;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('time: '+time+' seg\n');
    res.end(i+'\n');
  }).listen(5000);
//});

