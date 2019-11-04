const ERR  = "\u001b[31m"; // RED
const WARN = "\u001b[33m"; // YELLOW
const INFO = "\u001b[32m"; // GREEN
const CLR  = "\u001b[0m";  // WHITE

const { MessagePassing } = require("../dist/MessagePassing.cjs.js");

class Sub1 {
  constructor(msg) {
    msg.register(this, ["Hello"]);
  }
  onmessage(selector, options) {
    switch (selector) {
      case "Hello": return "World";
    }

  }
}
class Sub2 {
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
const sub1 = new Sub1(msg);
const sub2 = new Sub2(msg);

msg.to(sub1, sub2).post("Hello"); // multicast no result
msg.to().remove(sub1).post("Happy", [1, 2, 3]); // broadcast(exclude sub1)

const result1 = msg.to(sub1, sub2).send("Hello"); // multicast no result
const result2 = msg.to().remove(sub1).send("Happy", [1, 2, 3]); // broadcast(exclude sub1)

if (result1.get(sub1) === "World" &&
    result1.get(sub2) === undefined &&
    result2.get(sub1) === undefined &&
    result2.get(sub2) === "Halloween" &&
    result2.list(sub2).join("") === ["Halloween"].join("") ) {
  console.log(INFO + "OK" + CLR);
} else {
  console.log(ERR + "NG" + CLR);
}
