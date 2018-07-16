var ws = require("nodejs-websocket")
var PORT = 3000
var clientCount = 0
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	clientCount++;
	conn.nickname = 'user' + clientCount;
	var mes = {}
	mes.type = "enter";
	mes.data = conn.nickname + 'comes in';
	broadcast(mes);
	conn.on("text", function (str) {
		console.log("Received "+str)
		var mes = {}
		mes.type = "message";
		mes.data = str;
		broadcast(JSON.stringify(mes));
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		var mes = {}
		mes.type = "leave";
		mes.data = str;
		broadcast(JSON.stringify(mes));
	})
	conn.on("error", function (err) {
		console.log("Hand error")
		console.log(err)
	})
}).listen(PORT)

console.log("WebSocket server listening on port " + PORT);

function broadcast(str){
	server.connections.forEach(function(connection){
		connection.sendText(str);
	});
}
