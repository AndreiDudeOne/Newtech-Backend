// Basics of Node

// Asyncronicitate (file system, events, streams, database, http)
// File system (cititi fisiere, scrieti in fisiere)
// Modules CommonJs / Es6 Import Export  
// Events, streams, buffers
// Web server module -> HTTP
// Procese (child processes)
// Handle Errors


// Basic creation, debugging

console.log('Hello World');

let foo = 'foo';

const showMessage = (msg) => {
  const dummyMessage = 'Welcome to the showmessage function'
  function innerMessage() {
    console.log("I'm a inner message :(");
  }

  innerMessage();
  console.log(msg + ' ' + dummyMessage);
}

showMessage(foo);

foo = 'FOO';

console.log('Bye world!');









