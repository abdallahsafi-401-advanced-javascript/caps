"use strict";

var faker = require('faker');
const io = require("socket.io-client");
const socket = io.connect("http://localhost:3000/caps");

socket.on("connect", () => {

  //join room vendor
  socket.emit('join', 'vendor');
  
  // emit a pickup every 5 sec
  let i = 0;
  while (i < 100) {
    setTimeout(() => {
      let order = {
        storeName: faker.company.companyName(),
        orderId: faker.random.number(),
        customerName: faker.name.findName(),
        address: faker.address.city(),
      };
      sendMessageToServer("pickup", order);
    }, i * 1000);
    i += 5;
  }

  //Listen for the delivered event coming in from the CAPS server
  socket.on('delivered', (payload) =>{
    console.log(`thank you for delivering ${payload.orderId}`);
  });
});

// function to manag the emit
function sendMessageToServer(event, payload) {
  socket.emit(event, payload);
}
