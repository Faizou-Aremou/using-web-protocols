const WebSocket = require('ws');

const WebSocketServer = new WebSocket.Server({
  port: 3000,
});

WebSocketServer.on('connection', (socket) => {
  socket.on('message', (msg) => {
    stringMessage = msg.toString()
    console.log('Received', stringMessage);
    if (stringMessage === 'Hello') {
      socket.send('World!');
    }
  });
});
