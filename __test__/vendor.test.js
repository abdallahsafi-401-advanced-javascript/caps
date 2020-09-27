'use strict';

const events = require('../events');
const vendor = require('../vendor.js');

jest.useFakeTimers();

it('should log thanks message when delivered ', () => {
  console.log = jest.fn();
  events.emit('delivered', { orderID: '1234' });
  expect(console.log).toHaveBeenCalledWith('thank you');
});

it('should emit 20 order ', () => {
  const callback = jest.fn();
  events.on('pickup', callback);
  vendor.start();
  jest.runOnlyPendingTimers();
  expect(callback).toHaveBeenCalledTimes(20);
});
