// three step process
// 1 - We're going to use the dog.txt file, we'll the dog read.
// 2 - we'll do an http request to do a random image of a dog which this breed
// 3 - save this iamge to another file

const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  superagent
    .get(`http://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);
      console.log(res.body.message);
      fs.writeFile('dog-img.txt', res.body.message, err => {
        console.log('Random dog images saved to file');
      });
    });
});
