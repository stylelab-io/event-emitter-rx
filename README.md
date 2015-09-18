# EventEmitterRx

EventEmitter using [RxJS](https://github.com/Reactive-Extensions/RxJS).

## Install

### Source by npm

```bash
$ npm install --save-dev eventemitter-rx
```

### or by jspm

```bash
$ jspm install --save eventemitter-rx
```

### TSD files are available at our [stylelab-io/DefinitelyTyped](https://github.com/stylelab-io/DefinitelyTyped/tree/master/eventemitter-rx) fork

```bash
$ tsd install eventemitter-rx --save
```

## Build

```bash
$ npm run start
```

## Usage

```typescript

// import of EventEmitter
import EventEmitter from 'eventemitter-rx';

// create an instance of it
const emitter:EventEmitter = new EventEmitter();

// dispatching an event
const EVENT:string = 'myEvent';
emitter.next(EVENT);

// dispatching an event with data
const DATA: string = 'myData';
emitter.next(EVENT, DATA);

// subscribing to an event
emitter.subscribe(EVENT, () => {
    console.log('handle event');
});

// subscribing to an event and handling of its data
emitter.subscribe(EVENT, (DATA) => {
    console.log('event data', DATA);
});

// unsubscribing to an event
var observer:Rx.IDisposable = emitter.subscribe(EVENT, () => {
    console.log('handle event');
});
observer.dispose();

```


## Test

![Running tests](/wiki/screenshot_test.png)

Clone project:

```bash
$ git clone https://github.com/stylelab-io/event-emitter-rx.git && cd $_
```

Install dependencies (only once):

```bash
$ npm i
```

Run tests:

```bash
$ npm test
```

## Release History

[History](./HISTORY.md)


## License

[MIT license](./LICENSE.md).