'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class MessageResult {
    constructor() {
        this._result = new Map();
    }
    set(subscriber, value) {
        this._result.set(subscriber, value);
    }
    get(subscriber) {
        return this._result.get(subscriber);
    }
    has(subscriber) {
        return this._result.has(subscriber);
    }
    list() {
        return Array.from(this._result.values());
    }
}
class MessagePassing {
    constructor() {
        this._subscribers = new Set();
        this._selectors = new Map();
    }
    to(...subscribers) {
        const to = new Set(subscribers.length ? subscribers.concat()
            : this._subscribers.keys());
        return new Message(this._selectors, to);
    }
    register(subscriber, selectors = ["ping"]) {
        if (!subscriber) {
            throw new TypeError(`Invalid subscriber: ${subscriber}`);
        }
        if (!Array.isArray(selectors)) {
            throw new TypeError(`Invalid selectors: ${selectors}`);
        }
        if (typeof subscriber.onmessage !== "function") {
            throw new TypeError(`${subscriber.constructor.name} has not onmessage function`);
        }
        if (selectors.filter(selector => !selector).length) {
            throw new TypeError(`Invalid selectors: selectors has null, from ${subscriber.constructor.name}`);
        }
        this._subscribers.add(subscriber);
        this._selectors.set(subscriber, selectors.slice());
        return this;
    }
    unregister(subscriber) {
        this._subscribers.delete(subscriber);
        this._selectors.delete(subscriber);
        return this;
    }
    unregisterAll() {
        this._subscribers.clear();
        this._selectors.clear();
        return this;
    }
}
class Message {
    constructor(selectors, to) {
        this._selectors = selectors;
        this._to = to;
    }
    remove(subscriber) {
        this._to.delete(subscriber);
        return this;
    }
    send(selector, options = undefined) {
        const to = Array.from(this._to.values());
        const result = new MessageResult();
        try {
            for (let i = 0, iz = to.length; i < iz; ++i) {
                const subscriber = to[i];
                if (subscriber) {
                    const selectors = this._selectors.get(subscriber);
                    if (selectors && selectors.includes(selector)) {
                        const r = subscriber.onmessage(selector, options);
                        result.set(subscriber, r);
                    }
                    else {
                    }
                }
            }
        }
        catch (err) {
            console.error(err);
        }
        return result;
    }
    post(selector, options = undefined) {
        const to = Array.from(this._to.values());
        try {
            setTimeout(() => {
                for (let i = 0, iz = to.length; i < iz; ++i) {
                    const subscriber = to[i];
                    if (subscriber) {
                        const selectors = this._selectors.get(subscriber);
                        if (selectors && selectors.includes(selector)) {
                            subscriber.onmessage(selector, options);
                        }
                        else {
                        }
                    }
                }
            }, 0);
        }
        catch (err) {
            console.error(err);
        }
    }
}

exports.Message = Message;
exports.MessagePassing = MessagePassing;
exports.MessageResult = MessageResult;
