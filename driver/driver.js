// 'use strict';

// const events = require('./events.js');

// events.on('pickup', pickupHandler);

// function pickupHandler(payload) {
//   setTimeout(() => {
//     console.log(`DRIVER: picked up ${payload.orderId}`);
//     events.emit('in-transit', payload);
//     setTimeout(() => {
//       console.log('Delivered');
//       events.emit('delivered', payload);
//     }, 3000);
//   }, 1000);
// }

'use strict';

const net = require('net');

const client = new net.Socket(); // create a socket connection
// connect it to server.js : localhost port: 4000;

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

client.connect(port, host, () => {
  console.log('Driver is connected to Server! .. ');
});

client.on('data', (data) => {
  let msg = JSON.parse(data);
  if (msg.event === 'pickup') {
    setTimeout(() => {
      console.log(`DRIVER: picked up ${msg.payload.orderId}`);
      sendMessageToServer('in-transit',msg.payload);
      setTimeout(() => {
        sendMessageToServer('delivered',msg.payload);
      }, 3000);
    }, 1000);
  }
});

client.on('close', function () {
  console.log('connection is closed!!');
});

function sendMessageToServer(event, payload) {
  const msg = JSON.stringify({event: event, payload: payload});
  client.write(msg);
}
