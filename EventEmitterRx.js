/// <reference path="./typings/tsd.d.ts" />
var Rx = require('rx');
/**
 * EventEmitter
 * Based on "How do I create a custom event emitter?"
 * @see https://github.com/Reactive-Extensions/RxJS/blob/master/doc/howdoi/eventemitter.md
 */
var EventEmitterRx = (function () {
    function EventEmitterRx() {
        /**
         * Hash map of subjects
         * @type {{Rx.Subject}}
         */
        this.subjects = {};
    }
    /**
     * Emits events through a subject to all subscribed broadcaster
     * @param name {string} Name of an event
     * @param data {Object} Event data
     */
    EventEmitterRx.prototype.next = function (name, data) {
        if (data === void 0) { data = {}; }
        this.subjects[name] || (this.subjects[name] = new Rx.Subject());
        this.subjects[name].onNext(data);
    };
    /**
     * Subscribes a Observer (listener) to an event.
     * @param name {string} Name of an event
     * @param handler {any} Callback of the listener (subscriber)
     * @returns {Rx.IDisposable}
     */
    EventEmitterRx.prototype.subscribe = function (name, handler) {
        this.subjects[name] || (this.subjects[name] = new Rx.Subject());
        return this.subjects[name].subscribe(handler);
    };
    /**
    * Indicates whether a Subject has Observers subscribed to it.
    * @param name {string} Name of an event
    * @returns {boolean} Returns true if the Subject has observers, else false.
    */
    EventEmitterRx.prototype.hasObserver = function (name) {
        return this.subjects[name] !== undefined && this.subjects[name].hasObservers();
    };
    /**
     * Cleans up a Subject and remove all its observers.
     * Also it removes the subject from subject map.
     */
    EventEmitterRx.prototype.dispose = function (name) {
        if (this.subjects[name]) {
            this.subjects[name].dispose();
            delete this.subjects[name];
        }
    };
    /**
     * Clean up all Observers and clean up map of Subjects
     */
    EventEmitterRx.prototype.disposeAll = function () {
        var subjects = this.subjects;
        var hasOwnProp = {}.hasOwnProperty;
        for (var prop in subjects) {
            if (hasOwnProp.call(subjects, prop)) {
                subjects[prop].dispose();
            }
        }
        this.subjects = {};
    };
    return EventEmitterRx;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventEmitterRx;
