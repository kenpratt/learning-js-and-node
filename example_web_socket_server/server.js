var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");

// create a server to host the static files
var app = express();
app.use(express.static(__dirname + "/public"));

// listen for connections port
var server = http.createServer(app);
var port = 8080;
server.listen(port);

// create a web socket server
var wss = new WebSocketServer({server: server});
wss.on("connection", function(socket) {
  console.log("Someone connected");

  var counter = 1;
  var chatter = setInterval(function() {
    socket.send(JSON.stringify({counter: counter++}));
  }, 1000);

  socket.on("message", function(message) {
    console.log("Someone sent a message", JSON.parse(message));
  });

  socket.on("close", function() {
    console.log("Someone disconnected");
    clearInterval(chatter);
  });
});

console.log("Web Socket server alive and rocking out at http://localhost:" + port)
