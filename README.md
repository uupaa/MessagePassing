# Implementation of lightweight message passing logic for TypeScript.

# PREPARE

```sh
$ npm i -S @uupaa/MessagePassing
```

# Build and Bundle modules

`npm run build` command build to `dist/MessagePassing.js` file.

`npm run bundle:all` command bundle to `dist/MessagePassing.esm.js` and `dist/MessagePassing.cjs.js` files.

and other commands.

| commands             | input file    | output file(s) |
|----------------------|---------------|-------------|
| `npm run build`      | `ts/*.ts`     | `dist/MessagePassing.js` |
| `npm run bundle`     | `dist/MessagePassing.js` | `dist/MessagePassing.esm.js` |
| `npm run bundle:esm` | `dist/MessagePassing.js` | `dist/MessagePassing.esm.js` |
| `npm run bundle:cjs` | `dist/MessagePassing.js` | `dist/MessagePassing.cjs.js` |
| `npm run bundle:all` | `dist/MessagePassing.js` | `dist/MessagePassing.esm.js` <br />`dist/MessagePassing.cjs.js` |
| `npm run watch`      |  |  |

# Browser and runtime support

| Browser                   | `<script type>`<br/>`import` | `<script>` | `require()` |
|---------------------------|----------|----------------|---------------|
| Chrome                    | 61+   | :o: |     |
| Chrome (Android)          | 61+   | :o: |     |
| Safari                    | 10.1+ | :o: |     |
| Safari (iOS)              | 10.3+ | :o: |     |
| Firefox                   | 60+   | :o: |     |
| Edge                      | 16+   | :o: |     |
| new Edge (Chromium based) | 76+   | :o: |     |
| IE                        | :x:   | :x: |     |
| Electron(render)          | :o:   | :o: |     |
| Electron(main)            |       |     | :o: |
| Node.js                   |       |     | :o: |

# USAGE

Use `import` and `<script type="module">` style.

```html
// test/esm.html
<!DOCTYPE html><html><head> 
<title>MessagePassing browser test</title> 
</head> 
<body>
<script type="module">
import { MessagePassing } from "./dist/MessagePassing.esm.js";


class Subscriber1 {
  constructor(msg) {
    msg.register(this, ["Hello"]);
  }
  onmessage(selector, options) {
    switch (selector) {
      case "Hello": return "World";
    }

  }
}
class Subscriber2 {
  constructor(msg) {
    msg.register(this, ["Happy"]);
  }
  onmessage(selector, options) {
    switch (selector) {
      case "Happy": return "Halloween";
    }
  }
}

const msg = new MessagePassing();
const sub1 = new Subscriber1(msg);
const sub2 = new Subscriber2(msg);

// post() is no result
msg.to(sub1, sub2).post("Hello"); // multicast
msg.to().remove(sub1).post("Happy", [1, 2, 3]); // broadcast(exclude sub1)

// send() with result
const result1 = msg.to(sub1, sub2).send("Hello"); // multicas
const result2 = msg.to().remove(sub1).send("Happy", [1, 2, 3]); // broadcast(exclude sub1)

if (result1.get(sub1) === "World" &&
    result1.get(sub2) === undefined &&
    result2.get(sub1) === undefined &&
    result2.get(sub2) === "Halloween" &&
    result2.list(sub2).join("") === ["Halloween"].join("") ) {
  document.body.style.backgroundColor = "lime";
} else {
  document.body.style.backgroundColor = "red";
}
</script> 
</body> 
</html> 
```

Use CommonJS style.

```js
// test/cjs.js
const MessagePassing = require("../dist/MessagePassing.cjs.js").MessagePassing;
```

Use `<script src="MessagePassing.es5.js">` style.

```html
// test/es5.html
<!DOCTYPE html><html><head> 
<title>MessagePassing browser test</title> 
</head> 
<body>
<script src="../dist/MessagePassing.es5.js"></script>
<script>
const MessagePassing = MessagePassingLib.MessagePassing;

const msg = new MessagePassing();

/* omit */

</script> 
</body> 
</html> 
```

# Class

## Class MessagePassing and Message

```ts
export class MessagePassing {
  to(...subscribers:Array<MessageSubscriber>):Message,
  register(subscriber:MessageSubscriber, selectors:Array<SelectorString> = ["ping"]),
  unregister(subscriber:MessageSubscriber):MessagePassing,
  unregisterAll():MessagePassing,
}  

export class Message {
  constructor(selectors:Map<MessageSubscriber, Array<SelectorString>>, to:Set<MessageSubscriber>),
  remove(subscriber:MessageSubscriber):Message,
  send(selector:SelectorString, options:MessageOptions = undefined):MessageResult,
  post(selector:SelectorString, options:MessageOptions = undefined):void,
}
```

## other Classes and Interfaces

```ts
type SelectorString = string;

interface MessageSubscriber {
  onmessage(selector:SelectorString, options:any):any|void,
}
type MessageOptions = number|string|undefined|object|Array<number>|Array<string>;

export class MessageResult {
  set(subscriber:MessageSubscriber, value:any):void,
  get(subscriber:MessageSubscriber):any,
  has(subscriber:MessageSubscriber):any,
  list():Array<any>,
}
```

# LICENSE

MIT License

Copyright (c) 2019 uupa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
