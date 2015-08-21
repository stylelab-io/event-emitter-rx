# EventEmitterRx

EventEmitter using [RxJS](https://github.com/Reactive-Extensions/RxJS).

## Install

```bash
$ npm install --save-dev eventemitterrx
```

## Usage

```typescript

// import of EventEmitter
import EventEmitter from 'EventEmitter';

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
$ git clone git@bitbucket.org:stylelounge/eventemitterrx.git && cd $_
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
