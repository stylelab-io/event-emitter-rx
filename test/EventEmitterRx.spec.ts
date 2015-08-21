/// <reference path="../typings/tsd.d.ts" />

import * as Rx from 'rx';
import EventEmitterRx from '../src/EventEmitterRx';
import {expect} from 'chai';
import * as sinon from 'sinon';

describe('EventEmitterRx', () => {

    var emitter: EventEmitterRx;

    beforeEach(() => {
        emitter = new EventEmitterRx();
    });

    it('subscribes an Observer', () => {
        var callback:Sinon.SinonSpy = sinon.spy();
        const EVENT:string = 'myEvent';
        var result:Rx.IDisposable = emitter.subscribe(EVENT, callback);
        emitter.next(EVENT);
        expect(callback.calledOnce).to.be.ok;
    });

    it('has no Observers by default', () => {
        expect(emitter.hasObserver('anyEvent')).to.be.false;
    });

    it('has Observers', () => {
        const EVENT:string = 'myEvent';
        var result:Rx.IDisposable = emitter.subscribe(EVENT, sinon.spy());
        expect(emitter.hasObserver(EVENT)).to.be.ok;
    });

    it('calls the Observer with data', () => {
        var callback:Sinon.SinonSpy = sinon.spy();
        const EVENT:string = 'myEvent';
        const DATA: string = 'myData';
        var result:Rx.IDisposable = emitter.subscribe(EVENT, callback);
        emitter.next(EVENT, DATA);
        expect(callback.calledWith(DATA)).to.be.ok;
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
        expect(callback.callCount).to.be.equal(1);
    });

    it('clean up a Subject', () => {
        var callback:Sinon.SinonSpy = sinon.spy();
        const EVENT:string = 'myEvent';
        var resultA:Rx.IDisposable = emitter.subscribe(EVENT, callback);
        // observers has to be there
        expect(emitter.hasObserver(EVENT)).to.be.ok;
        // dispose all
        emitter.dispose(EVENT);
        // no observer has to be there now
        expect(emitter.hasObserver(EVENT)).to.be.false;
    });

    it('clean up all Subjects and its Observers', () => {
        var callback:Sinon.SinonSpy = sinon.spy();
        const EVENT_A:string = 'myEventA';
        const EVENT_B:string = 'myEventB';
        var resultA:Rx.IDisposable = emitter.subscribe(EVENT_A, callback);
        var resultB:Rx.IDisposable = emitter.subscribe(EVENT_B, callback);
        // observers has to be there
        expect(emitter.hasObserver(EVENT_A)).to.be.ok;
        expect(emitter.hasObserver(EVENT_B)).to.be.ok;
        // dispose all
        emitter.disposeAll()
        // no observer has to be there now
        expect(emitter.hasObserver(EVENT_A)).to.be.false;
        expect(emitter.hasObserver(EVENT_B)).to.be.false;
    });

});
