const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1 - without streams - you can use this for a small file
  fs.readFile('test-file.txt', (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
  // Solution 2: streams
  const readable = fs.createReadStream('test-file.txt');
  readable.on('data', chunk => {
    res.write(chunk);
  });
  readable.on('end', () => {
    res.end();
  });
  readable.on('error', error => {
    res.statusCode(500);
    res.end('file not found');
  });
  // Solution 3 - pipe in the input into an input. Fix the problem of 'back-pressure?' / speed of data coming in and data coming out
  const readable = fs.createReadStream('test-file.txt');
  // readableSource.pipe(writeableDestination)
  readable.pipe(res);
});

server.listen(8000, () => {
  console.log('listening');
});
