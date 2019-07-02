const fs = require('fs')

// Blocking, synchronous
const textInput = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textInput)

const textOutput = `This is what we know about the avocado: ${textInput}.\nCreated on ${Date.now()} `
fs.writeFileSync('./txt/output.txt', textOutput)
// console.log('File written')

/*
// Non-blocking, asynchronous The third parameter instead is a callback function
// with two arguments. First one is the error, second is the data. Error first
// callback style is very typical is node.js.
*/
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2)
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      console.log(data3)
      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
        console.log('Your file has been written 😎')
      })
    })
  })
})
console.log('will read file')