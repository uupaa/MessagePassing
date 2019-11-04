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
</script> 
</body> 
</html> 
```

# Class

## Class MessagePassing

```ts
export class MessagePassing {
}  

```
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
