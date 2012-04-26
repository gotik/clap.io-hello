var http = require('http')

var startTime = new Date()
   , i=0


setInterval(function() {
  i++
})

http.createServer(function (req, res) {
  var time = (new Date() - startTime)/1000
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.write('time: '+time+' seg\n')
  res.end(i+'\n')
}).listen(1337)
