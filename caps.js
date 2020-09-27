'use strict';

const events = require('./events.js');

events.on('pickup', (payload) => log('pickup', payload));
events.on('in-transit', (payload) => log('in-transit', payload));
events.on('delivered', (payload) => log('delivered', payload));

function log(event, payload) {
  let time = new Date();
  console.log('EVENT LOG', { time, event, payload });
}
