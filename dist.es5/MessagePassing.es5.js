(function () {
    'use strict';

    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) { throw t[1]; } return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) { throw new TypeError("Generator is already executing."); }
            while (_) { try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) { return t; }
                if (y = 0, t) { op = [op[0] & 2, t.value]; }
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) { _.ops.pop(); }
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; } }
            if (op[0] & 5) { throw op[1]; } return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var MessageResult =  (function () {
        function MessageResult() {
            this._result = new Map();
        }
        MessageResult.prototype.set = function (subscriber, value) {
            this._result.set(subscriber, value);
        };
        MessageResult.prototype.get = function (subscriber) {
            return this._result.get(subscriber);
        };
        MessageResult.prototype.has = function (subscriber) {
            return this._result.has(subscriber);
        };
        MessageResult.prototype.list = function () {
            return Array.from(this._result.values());
        };
        return MessageResult;
    }());
    exports.MessageResult = MessageResult;
    var MessagePassing =  (function () {
        function MessagePassing() {
            this._subscribers = new Set();
            this._selectors = new Map();
        }
        MessagePassing.prototype.to = function () {
            var arguments$1 = arguments;
            var subscribers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                subscribers[_i] = arguments$1[_i];
            }
            var to = new Set(subscribers.length ? subscribers.concat()
                : this._subscribers.keys());
            return new Message(this._selectors, to);
        };
        MessagePassing.prototype.register = function (subscriber, selectors) {
            if (selectors === void 0) { selectors = ["ping"]; }
            if (!subscriber) {
                throw new TypeError("Invalid subscriber: " + subscriber);
            }
            if (!Array.isArray(selectors)) {
                throw new TypeError("Invalid selectors: " + selectors);
            }
            if (typeof subscriber.onmessage !== "function") {
                throw new TypeError(subscriber.constructor.name + " has not onmessage function");
            }
            if (selectors.filter(function (selector) { return !selector; }).length) {
                throw new TypeError("Invalid selectors: selectors has null, from " + subscriber.constructor.name);
            }
            this._subscribers.add(subscriber);
            this._selectors.set(subscriber, selectors.slice());
            return this;
        };
        MessagePassing.prototype.unregister = function (subscriber) {
            this._subscribers.delete(subscriber);
            this._selectors.delete(subscriber);
            return this;
        };
        MessagePassing.prototype.unregisterAll = function () {
            this._subscribers.clear();
            this._selectors.clear();
            return this;
        };
        return MessagePassing;
    }());
    exports.MessagePassing = MessagePassing;
    var Message =  (function () {
        function Message(selectors, to) {
            this._selectors = selectors;
            this._to = to;
        }
        Message.prototype.remove = function (subscriber) {
            this._to.delete(subscriber);
            return this;
        };
        Message.prototype.post = function (selector, options) {
            var _this = this;
            if (options === void 0) { options = undefined; }
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var to, result, i, iz, subscriber, selectors, r, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            to = Array.from(this._to.values());
                            result = new MessageResult();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 7]);
                            i = 0, iz = to.length;
                            _a.label = 2;
                        case 2:
                            if (!(i < iz)) { return [3 , 5]; }
                            subscriber = to[i];
                            if (!subscriber) { return [3 , 4]; }
                            selectors = this._selectors.get(subscriber);
                            if (!(selectors && selectors.includes(selector))) { return [3 , 4]; }
                            return [4 , subscriber.onmessage(selector, options)];
                        case 3:
                            r = _a.sent();
                            result.set(subscriber, r);
                            return [3 , 4];
                        case 4:
                            ++i;
                            return [3 , 2];
                        case 5:
                            resolve(result);
                            return [3 , 7];
                        case 6:
                            err_1 = _a.sent();
                            console.error(err_1);
                            reject(err_1);
                            return [3 , 7];
                        case 7: return [2 ];
                    }
                });
            }); });
        };
        return Message;
    }());
    exports.Message = Message;

}());
