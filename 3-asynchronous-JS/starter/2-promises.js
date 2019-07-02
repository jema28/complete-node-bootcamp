const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = file => {
  // promise constructor takes an executer function which gets called immediately after the promise is created
  //
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('I could not write the file');
      resolve('success');
    });
  });
};

// the trick is to always return a promise so we can chain the then statements
readFilePromise(`${__dirname}/dog.txt`)
  .then(data =>
    superagent.get(`http://dog.ceo/api/breed/${data}/images/random`)
  )
  .then(res => writeFilePromise('dog-img.txt', res.body.message))
  .then(() => console.log('Random dog image saved to file'))
  .catch(err => console.log(err));
