
const fs = require('fs');
const path = require('path');

const writeStream = fs.createWriteStream('dummy-large.txt');
const readStream = fs.createReadStream('dummy-large.txt')

fs.readFile('dummy.txt', (err, data) => {
  // Initially it comes as a binary buffer in one go (the whole file)

  // We can change it to a readable format
  console.log(data.toString());
})


function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 1000000;
  write();

  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // Last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
} 

// writeOneMillionTimes(writeStream, 'Dummy data', 'utf-8', () => {
//   console.log('Function finisehd');
// });

// Investigat
fs.readFile('dummy-large.txt', (err, data) => {
   console.log(data);
  // if (fs.existsSync('dummy-large.txt')) {
  //   console.log(data);
  // }
   // if (err) console.log(err);
})

// Copiere / modificare dintr-un stream in altul
// const readable = fs.createReadStream('dummy.txt');
// // Create a writable stream
// const writable = fs.createWriteStream('output.txt');
 
// // Calling pipe method
// readable.pipe(writable);

// readStream.on('data', (chunk) => {
//   console.log(chunk.toString());
//   // console.log(chunk.toString());
// })





