'use strict';

const events = require('./events.js');

events.on('pickup', pickupHandler);

function pickupHandler(payload) {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    events.emit('in-transit', payload);
    setTimeout(() => {
      console.log('Delivered');
      events.emit('delivered', payload);
    }, 3000);
  }, 1000);
}
