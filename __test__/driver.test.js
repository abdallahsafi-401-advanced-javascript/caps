const driver = require('../driver');
const events = require('../events');

jest.useFakeTimers();
beforeEach(jest.clearAllTimers);

const order = {
  storeName: 'good man',
  orderId: '112233',
  customerName: 'ahmed hany',
  address: 'gaza',
};

describe('handle pick up event', () => {
  it('should emit in-transit event at right time', () => {
    console.log = jest.fn();
    const inTransitHandler = jest.fn();
    events.on('in-transit', inTransitHandler);
    events.emit('pickup', order);
    expect(inTransitHandler).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1000);
    expect(inTransitHandler).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      `DRIVER: picked up ${order.orderId}`,
    );
  });

  it('should emit delivered event at right time', () => {
    console.log = jest.fn();
    const deliveredHandler = jest.fn();
    events.on('delivered', deliveredHandler);
    events.emit('pickup', order);
    expect(deliveredHandler).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(4000);
    expect(deliveredHandler).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith('Delivered');
  });
});
