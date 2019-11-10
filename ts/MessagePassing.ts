type SelectorString = string;

export interface MessageSubscriber {
  onmessage(selector:SelectorString, options:any):any|void,
}
type MessageOptions = number|string|undefined|object|Array<number>|Array<string>;

export class MessageResult {
  private _result:Map<MessageSubscriber, any> = new Map();

  set(subscriber:MessageSubscriber, value:any):void {
    this._result.set(subscriber, value);
  }
  get(subscriber:MessageSubscriber):any {
    return this._result.get(subscriber);
  }
  has(subscriber:MessageSubscriber):any {
    return this._result.has(subscriber);
  }
  list():Array<any> {
    return Array.from(this._result.values());
  }
}

export class MessagePassing {
  private _subscribers:Set<MessageSubscriber> = new Set();
  private _selectors:Map<MessageSubscriber, Array<SelectorString>> = new Map();
  to(...subscribers:Array<MessageSubscriber>):Message {
    const to = new Set(subscribers.length ? subscribers.concat() // broadcast
                                          : this._subscribers.keys()); // unicast, multicast
    return new Message(this._selectors, to);
  }
  register(subscriber:MessageSubscriber, selectors:Array<SelectorString> = ["ping"]):MessagePassing {
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
    this._selectors.set(subscriber, selectors.slice()); // shallow copy
    return this;
  }
  unregister(subscriber:MessageSubscriber):MessagePassing {
    this._subscribers.delete(subscriber);
    this._selectors.delete(subscriber);
    return this;
  }
  unregisterAll():MessagePassing {
    this._subscribers.clear();
    this._selectors.clear();
    return this;
  }
}

export class Message {
  private _selectors:Map<MessageSubscriber, Array<SelectorString>>;
  private _to:Set<MessageSubscriber>; // unique array

  constructor(selectors:Map<MessageSubscriber, Array<SelectorString>>, to:Set<MessageSubscriber>) {
    this._selectors = selectors;
    this._to = to;
  }
  remove(subscriber:MessageSubscriber):Message {
    this._to.delete(subscriber)
    return this;
  }
  send(selector:SelectorString, options:MessageOptions = undefined):MessageResult {
    const to = Array.from(this._to.values());
    const result = new MessageResult();

    try {
      for (let i = 0, iz = to.length; i < iz; ++i) {
        const subscriber:MessageSubscriber = to[i];

        if (subscriber) {
          const selectors = this._selectors.get(subscriber); // [ "ping", ... ]

          if (selectors && selectors.includes(selector) ) {
            const r:any = subscriber.onmessage(selector, options);
            result.set(subscriber, r);
          } else {
            //console.warn(`Selector (${selector}) not allowed by the subscriber (${subscriber.constructor.name}) have been ignored.`);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  post(selector:SelectorString, options:MessageOptions = undefined):void {
    const to = Array.from(this._to.values());

    try {
      setTimeout(() => {
        for (let i = 0, iz = to.length; i < iz; ++i) {
          const subscriber:MessageSubscriber = to[i];

          if (subscriber) {
            const selectors = this._selectors.get(subscriber); // [ "ping", ... ]

            if (selectors && selectors.includes(selector) ) {
              subscriber.onmessage(selector, options);
            } else {
              //console.warn(`Selector (${selector}) not allowed by the subscriber (${subscriber.constructor.name}) have been ignored.`);
            }
          }
        }
      }, 0);
    } catch (err) {
      console.error(err);
    }
  }
}
