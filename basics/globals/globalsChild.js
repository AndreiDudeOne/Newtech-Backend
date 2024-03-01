
// Require - global variable -<> logger is an imported created module
const logger = require('./globals.js');

// Built in node js modules
const path = require('path');
const fs = require('fs');
const os = require('os');
const http = require('http');

logger.loggerFunc("From globalsChild");

// Path
const joinedPath = path.join("dir1", "/dir2", "file.txt");
const fileFromJoinedPath = path.basename(joinedPath);
const resolvedPath = path.resolve(joinedPath);
const parsedPath = path.parse(joinedPath);
const dirName = path.dirname(joinedPath);

// Os
const OSCpus= os.cpus();
const OSPlatform = os.platform();
const OS = os.userInfo();

console.log(joinedPath, fileFromJoinedPath, resolvedPath, parsedPath)

// Fs
// Reading a file async
const newFilePath = path.join(__dirname, 'readModules.txt');

fs.readFile(newFilePath, 'utf-8', (er,data) => {
  if (er) {
    throw new Error('File not good');
  }
  console.log(data);
});

const writeableFilePath = path.join(__dirname, 'writeModules.txt');

const data = 'querystring, url, zlib';

fs.writeFile(writeableFilePath, data, (er) => {
  if (er) {
    throw new Error('File write went wrong good');
  }
})

console.log('Execution has finished');

