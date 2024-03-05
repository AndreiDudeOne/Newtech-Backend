const EventEmitter = require('node:events');

const firstEventEmitter = new EventEmitter();
const eventEmitterWithPersonData = new EventEmitter();

firstEventEmitter.on('start', () => {
  console.log('Emitted');
})

setTimeout(() => {
  firstEventEmitter.emit('start');
}, 2000)


const listenerFunction = (data) => {
  const { name, surname } = data;
  if (name && surname) console.log(`Name: ${name}  surname: ${surname}`);
}

eventEmitterWithPersonData.on('withData', listenerFunction);
eventEmitterWithPersonData.emit('withData', {name: 'John', surname: 'Doe'});

eventEmitterWithPersonData.removeListener('withData', listenerFunction);
eventEmitterWithPersonData.emit('withData', {name: 'John 2', surname: 'Doe 2'});






