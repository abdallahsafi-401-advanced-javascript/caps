'use strict';
const events = require('./events.js');
var faker = require('faker');

require('./caps.js');
require('./driver.js');

// make a 20 order with 5 sec timeout
function start(){
  let i = 0;
  while (i < 100) {
    setTimeout(() => {
      let order = {
        storeName: faker.company.companyName(),
        orderId: faker.random.number(),
        customerName: faker.name.findName(),
        address: faker.address.city(),
      };
    
      events.emit('pickup', order);
    }, i * 1000);
    i += 5;
  }
}
start();


// console log thank you when delivered
events.on('delivered', deliveredHandler);

function deliveredHandler() {
  console.log('thank you');
}

module.exports.start = start;