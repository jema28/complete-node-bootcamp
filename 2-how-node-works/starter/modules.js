// arguments in an array in js - contains all the arguments passed into a function
console.log(arguments);
/*
[Arguments] {
  '0': {},
  '1':
   { [Function: require]
     resolve: { [Function: resolve] paths: [Function: paths] },
     main:
      Module {
        id: '.',
        exports: {},
        parent: null,
        filename:
         '/Users/Jem/Documents/complete-node-bootcamp/2-how-node-works/starter/modules.js',
        loaded: false,
        children: [],
        paths:
         [ '/Users/Jem/Documents/complete-node-bootcamp/2-how-node-works/starter/node_modules',
           '/Users/Jem/Documents/complete-node-bootcamp/2-how-node-works/node_modules',
           '/Users/Jem/Documents/complete-node-bootcamp/node_modules',
           '/Users/Jem/Documents/node_modules',
           '/Users/Jem/node_modules',
           '/Users/node_modules',
           '/node_modules' ] },
     extensions:
      [Object: null prototype] { '.js': [Function], '.json': [Function], '.node': [Function] },
     cache:
      [Object: null prototype] {
        '/Users/Jem/Documents/complete-node-bootcamp/2-how-node-works/starter/modules.js':
         Module {
           id: '.',
           exports: {},
           parent: null,
           filename:
            '/Users/Jem/Documents/complete-node-bootcamp/2-how-node-works/starter/modules.js',
           loaded: false,
           children: [],
           paths:
            [ '/Users/Jem/Documents/complete-node-bootcamp/2-how-node-works/starter/node_modules',
              '/Users/Jem/Documents/complete-node-bootcamp/2-how-node-works/node_modules',
              '/Users/Jem/Documents/complete-node-bootcamp/node_modules',
              '/Users/Jem/Documents/node_modules',
              '/Users/Jem/node_modules',
              '/Users/node_modules',
              '/node_modules' ] } } },
  '2':
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename:
      '/Users/Jem/Documents/complete-node-bootcamp/2-how-node-works/starter/modules.js',
     loaded: false,
     children: [],
     paths:
      [ '/Users/Jem/Documents/complete-node-bootcamp/2-how-node-works/starter/node_modules',
        '/Users/Jem/Documents/complete-node-bootcamp/2-how-node-works/node_modules',
        '/Users/Jem/Documents/complete-node-bootcamp/node_modules',
        '/Users/Jem/Documents/node_modules',
        '/Users/Jem/node_modules',
        '/Users/node_modules',
        '/node_modules' ] },
  '3':
   '/Users/Jem/Documents/complete-node-bootcamp/2-how-node-works/starter/modules.js',
  '4':
   '/Users/Jem/Documents/complete-node-bootcamp/2-how-node-works/starter' }

*/

console.log(require('module').wrapper);
// [ '(function (exports, require, module, __filename, __dirname) { ',
//   '\n});' ]

// we can call the module anything - doesn't have to be Calculator
// module.exports
const C = require('./test-module');
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
// this var is now the exports object
const { add, multiply } = require('./test-module-2');
console.log('calc2:', calc2);
console.log(add(2, 5));
console.log(multiply(2, 5));

// caching
require('./test-module-3');
// hello from the module was only called once because it was cached.
