

// Global variables
const directoryName = __dirname;
const filename = __filename;

// Exports
exports.loggerFunc = function (msg) {
  console.log(`I don't do much, I just log: ${msg}`)
}

exports.obj = {
  foo: 'Foo',
  bar: 'Bar'
}

// Face suprascriere de cele mai sus
// module.exports =  {
  // loggerFunc,
  // obj
// }

const foo = 'Foo';

setTimeout(() => {
  console.log('A second has passed!')
}, 1000)

console.log(global);