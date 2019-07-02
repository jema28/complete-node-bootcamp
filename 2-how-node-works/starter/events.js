const EventEmitter = require('events');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const emitter = new Sales();

// observer pattern
emitter.on('newSale', () => {
  console.log('There was a new sale');
});
emitter.on('newSale', () => {
  console.log('There are now 9 items left in stock');
});
emitter.on('newSale', stock => {
  console.log(`There are now ${stock} items left in stock`);
});

emitter.emit('newSale', 9);

////////////////////

const http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
  res.end('Request received');
});

server.on('close', () => console.log('Server closed'));

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests');
});
