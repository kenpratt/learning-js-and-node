// open the socket
var url = "ws://" + window.location.host;
console.log("Opening web socket to", url);
var socket = window['MozWebSocket'] ? new MozWebSocket(url) : new WebSocket(url);

// install listeners
socket.onopen = function() {
  console.log("Socket opened");
  socket.send(JSON.stringify({foo: "Bar!"}));
};
socket.onmessage = function(message) {
  console.log("Got a message from the server", JSON.parse(message.data));
};
socket.onerror = function(error) {
  console.log("Socket had an error", error);
};
socket.onclose = function() {
  console.log("Socket closed");
};
