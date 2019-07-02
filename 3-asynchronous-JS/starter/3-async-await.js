const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = file => {
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

// makes our code look like syncrhronous code
// in an async function we can have one or more await expressions
const getDogPic = async () => {
  try {
    // write await before our promise
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `http://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePromise('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err);
  }
  return 'Ready';
};

(async () => {
  try {
    console.log('1: Will get dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics');
  } catch (err) {
    console.log('ERROR!');
  }
})();

// try and catch aren't related to aync await but it's a way we can include error handling
