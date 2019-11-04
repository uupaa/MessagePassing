declare type SelectorString = string;
interface MessageSubscriber {
    onmessage(selector: SelectorString, options: any): any | void;
}
declare type MessageOptions = number | string | undefined | object | Array<number> | Array<string>;
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
    register(subscriber: MessageSubscriber, selectors?: Array<SelectorString>): MessagePassing;
    unregister(subscriber: MessageSubscriber): MessagePassing;
    unregisterAll(): MessagePassing;
}
export declare class Message {
    private _selectors;
    private _to;
    constructor(selectors: Map<MessageSubscriber, Array<SelectorString>>, to: Set<MessageSubscriber>);
    remove(subscriber: MessageSubscriber): Message;
    send(selector: SelectorString, options?: MessageOptions): MessageResult;
    post(selector: SelectorString, options?: MessageOptions): void;
}
export {};
