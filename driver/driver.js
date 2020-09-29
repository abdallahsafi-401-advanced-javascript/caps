'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

socket.on('connect', () => {
  
  //join room driver
  socket.emit('join', 'driver');

  socket.on('pickup', (payload) => {
    setTimeout(() => {
      console.log(`DRIVER: picked up ${payload.orderId}`);
      socket.emit('in-transit', payload);
      setTimeout(() => {
        console.log(`delivered ${payload.orderId}`);
        socket.emit('delivered', payload);
      }, 3000);
    }, 1500);
  });
});
