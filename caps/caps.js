'use strict';

const io = require('socket.io')(3000);
const caps = io.of('/caps');

caps.on('connection', (socket) => {
  socket.on('join', (payload) => {
    socket.join(payload);
  });

  socket.on('pickup', (payload) => log('pickup', payload));
  socket.on('in-transit', (payload) => log('in-transit', payload));
  socket.on('delivered', (payload) => log('delivered', payload));

});
function log(event, payload) {
  let time = new Date();
  console.log('EVENT LOG', { time, event, payload });
  if (event === 'pickup') {
    caps.emit(event, payload);
  }

  if (event === 'in-transit' || event === 'delivered') {
    caps.to('vendor').emit(event, payload);
  }
}
