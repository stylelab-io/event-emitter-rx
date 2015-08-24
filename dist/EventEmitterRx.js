/// <reference path="../typings/tsd.d.ts" />
define(["require", "exports", 'rx'], function (require, exports, Rx) {
    var EventEmitterRx = (function () {
        function EventEmitterRx() {
            this.subjects = {};
        }
        EventEmitterRx.prototype.next = function (name, data) {
            if (data === void 0) { data = {}; }
            this.subjects[name] || (this.subjects[name] = new Rx.Subject());
            this.subjects[name].onNext(data);
        };
        EventEmitterRx.prototype.subscribe = function (name, handler) {
            this.subjects[name] || (this.subjects[name] = new Rx.Subject());
            return this.subjects[name].subscribe(handler);
        };
        EventEmitterRx.prototype.hasObserver = function (name) {
            return this.subjects[name] !== undefined && this.subjects[name].hasObservers();
        };
        EventEmitterRx.prototype.dispose = function (name) {
            if (this.subjects[name]) {
                this.subjects[name].dispose();
                delete this.subjects[name];
            }
        };
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
    exports.default = EventEmitterRx;
});
