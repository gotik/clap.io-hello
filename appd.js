var cluster = require('cluster');
var http = require('http');
var numReqs = 0;
var worker = {};

if (cluster.isMaster) {
  var master_i = 0;

  setInterval(function () {
    master_i++
  })
  // Fork workers.
  for (var i = 0; i < 4; i++) {
    worker[i] = cluster.fork();
    worker[i].i = 0;
    worker[i].on('message', function(msg) {
      // we only want to intercept messages that have a chat property
      if (msg.chat) {
        console.log('worker: ', msg.chat);
        //this.send({ chat: 'Ok worker, Master got the message! Over and out!' });
        console.log('master: ', master_i)
	master_i += msg.chat
        console.log('total: ', master_i, '\n')
      }
    });

  }
} else {
  process.on('message', function(msg) {
    // we only want to intercept messages that have a chat property
    if (msg.chat) {
      console.log('Master to worker: ', msg.chat);
    }
  });
  setInterval(function() {
    process.i++
  })
  // Worker processes have a http server.
  http.Server(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
    // Send message to master process
    process.send({ chat: process.i });
    process.i = 0;
  }).listen(4444);
}
