/// <reference path="../typings/tsd.d.ts" />

import * as Rx from 'rx';
import EventEmitter from '../src/EventEmitter';
import * as chai from 'chai';
import * as sinon from 'sinon';

describe('EventEmitter', () => {

    var emitter: EventEmitter;

    beforeEach(() => {
        emitter = new EventEmitter();
    });

    it('subscribes an Observer', () => {
        var callback:Sinon.SinonSpy = sinon.spy();
        const EVENT:string = 'myEvent';
        var result:Rx.IDisposable = emitter.subscribe(EVENT, callback);
        emitter.next(EVENT);
        chai.expect(callback.calledOnce).to.be.ok;
    });

    it('has no Observers by default', () => {
        chai.expect(emitter.hasObserver('anyEvent')).to.be.false;
    });

    it('has Observers', () => {
        const EVENT:string = 'myEvent';
        var result:Rx.IDisposable = emitter.subscribe(EVENT, sinon.spy());
        chai.expect(emitter.hasObserver(EVENT)).to.be.ok;
    });

    it('calls the Observer with data', () => {
        var callback:Sinon.SinonSpy = sinon.spy();
        const EVENT:string = 'myEvent';
        const DATA: string = 'myData';
        var result:Rx.IDisposable = emitter.subscribe(EVENT, callback);
        emitter.next(EVENT, DATA);
        chai.expect(callback.calledWith(DATA)).to.be.ok;
    });

    it('unsubscribes an Observer', () => {
        var callback:Sinon.SinonSpy = sinon.spy();
        const EVENT:string = 'myEvent';
        var result:Rx.IDisposable = emitter.subscribe(EVENT, callback);
        // first call
        emitter.next(EVENT);
        // unsubscribes event
        result.dispose();
        // second call
        emitter.next(EVENT);
        // callback should be called only once
        chai.expect(callback.callCount).to.be.equal(1);
    });

    it('clean up a Subject', () => {
        var callback:Sinon.SinonSpy = sinon.spy();
        const EVENT:string = 'myEvent';
        var resultA:Rx.IDisposable = emitter.subscribe(EVENT, callback);
        // observers has to be there
        chai.expect(emitter.hasObserver(EVENT)).to.be.ok;
        // dispose all
        emitter.dispose(EVENT);
        // no observer has to be there now
        chai.expect(emitter.hasObserver(EVENT)).to.be.false;
    });

    it('clean up all Subjects and its Observers', () => {
        var callback:Sinon.SinonSpy = sinon.spy();
        const EVENT_A:string = 'myEventA';
        const EVENT_B:string = 'myEventB';
        var resultA:Rx.IDisposable = emitter.subscribe(EVENT_A, callback);
        var resultB:Rx.IDisposable = emitter.subscribe(EVENT_B, callback);
        // observers has to be there
        chai.expect(emitter.hasObserver(EVENT_A)).to.be.ok;
        chai.expect(emitter.hasObserver(EVENT_B)).to.be.ok;
        // dispose all
        emitter.disposeAll()
        // no observer has to be there now
        chai.expect(emitter.hasObserver(EVENT_A)).to.be.false;
        chai.expect(emitter.hasObserver(EVENT_B)).to.be.false;
    });

});
