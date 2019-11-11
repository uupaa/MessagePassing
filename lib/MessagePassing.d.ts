export declare type Selector = string | number;
export interface MessageSubscriber {
    onmessage(selector: Selector, options: any): any | void;
}
export declare type MessageOptions = number | string | undefined | object | Array<number> | Array<string>;
export declare class MessageResult {
    private _result;
    set(subscriber: MessageSubscriber, value: any): void;
    get(subscriber: MessageSubscriber): any;
    has(subscriber: MessageSubscriber): any;
    list(): Array<any>;
}
export declare class MessagePassing {
    private _subscribers;
    private _selectors;
    to(...subscribers: Array<MessageSubscriber>): Message;
    register(subscriber: MessageSubscriber, selectors?: Array<Selector>): MessagePassing;
    unregister(subscriber: MessageSubscriber): MessagePassing;
    unregisterAll(): MessagePassing;
}
export declare class Message {
    private _selectors;
    private _to;
    constructor(selectors: Map<MessageSubscriber, Array<Selector>>, to: Set<MessageSubscriber>);
    remove(subscriber: MessageSubscriber): Message;
    send(selector: Selector, options?: MessageOptions): MessageResult;
    post(selector: Selector, options?: MessageOptions): void;
}
