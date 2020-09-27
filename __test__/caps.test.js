jest.useFakeTimers();
const events = require('../events');
require('../caps');

const order = {
  storeName: 'good man',
  orderId: '112233',
  customerName: 'ahmed hany',
  address: 'gaza',
};

it('should log pickup', () => {
  console.log = jest.fn();
  events.emit('pickup', order);
  expect(console.log).toHaveBeenLastCalledWith(
    'EVENT LOG',
    expect.objectContaining({ event: 'pickup' }),
  );
});

it('should log in-transit', () => {
  console.log = jest.fn();
  events.emit('in-transit', order);
  expect(console.log).toHaveBeenLastCalledWith(
    'EVENT LOG',
    expect.objectContaining({ event: 'in-transit' }),
  );
});

it('should log delivered', () => {
  console.log = jest.fn();
  events.emit('delivered', order);
  expect(console.log).toHaveBeenLastCalledWith(
    'EVENT LOG',
    expect.objectContaining({ event: 'delivered' }),
  );
});
