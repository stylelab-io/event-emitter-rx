/// <reference path="../typings/tsd.d.ts" />

// Based on Angular 2's [EventEmitter](https://github.com/angular/angular/blob/master/modules/angular2/src/facade/async.ts#L98)

import * as Rx from 'rx';


export interface Observable {
  observer(generator: any): Rx.IDisposable;
}

export default class EventEmitter implements Observable {

  private _subject: Rx.Subject<any>;
  private _immediateScheduler;

  constructor() {
    this._subject = new Rx.Subject<any>();
    this._immediateScheduler = (<any>Rx.Scheduler).immediate;
  }

  observer(generator: any): Rx.IDisposable {
    return this._subject.observeOn(this._immediateScheduler)
        .subscribe((value) => { setTimeout(() => generator.next(value)); },
                   (error) => generator.throw ? generator.throw(error) : null,
                   () => generator.return ? generator.return () : null);
  }

  toRx(): Rx.Observable<any> {
      return this._subject;
  }

  next(value: any) {
      this._subject.onNext(value);
  }

  throw(error: any) {
      this._subject.onError(error);
  }

  return (value?: any) {
      this._subject.onCompleted();
  }

}
