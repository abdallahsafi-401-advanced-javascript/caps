'use strict';

const net = require('net');
const server = net.createServer();
const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`server is running on ${port}`));

//a pool of connected clients
let socketPool = {};

server.on('connection', (socket) => {

  //set ID for every socket connected
  const id = `Socket-${Math.floor(Math.random() * 100000)}`;
  socketPool[id] = socket;

  socket.on('data', (buffer) => {
    let msg = JSON.parse(buffer.toString());
    if(!(msg.event && msg.payload)){
      throw new Error('invalid data');
    }
    console.log('EVENT', msg);
    console.log('---------------------------------');
    //broadcast the raw data back out to each of the other connected clients
    broadcast(msg);
  });

  server.on('error', (e) => {
    console.log('error ------>', e);
  });
  
  server.on('close', () => {
    delete socketPool[id];
  });
});

function broadcast(msg) {
  let payload = JSON.stringify(msg);
  for (let id in socketPool) {
    socketPool[id].write(payload);
  }
}
