// function declaration
function test_dec() {}

// function expression
const test_ex = function () {};

// First Class Function
// We can pass function inside function

// IIFE
((input) => {
  console.log("IIFE", input);
})("Prem");

//THIS Keyword
const user = {
  total: 0,
  add: function (a) {
    this.total += a;
    return this;
  },
  substract: function (b) {
    this.total -= b;
    return this;
  },
  read: function () {
    return "Total: " + this.total;
  },
};

const testFunc = {
  userName: "Prem",
  getUserName: () => {
    return () => {
      return this.userName;
    };
  },
  getUserNameWithFunc: function () {
    return () => {
      return this.userName;
    };
  },
};

// console.log(user.add(10).substract(2).read());
// console.log(testFunc.getUserName()());

// Call, Bind, Apply
var obj = { name: "Prem" };
function sayHello(greeting) {
  return "Hello => " + this.name + " " + greeting;
}

console.log(sayHello.call(obj, "Good Day"));
console.log(sayHello.apply(obj, ["Good Day"]));
const curryingFunc = sayHello.bind(obj);
console.log(curryingFunc("Good Morning"));
console.log(curryingFunc("Good Afternoon"));

// Apply => Question merge array without taking new array
const array = [1, 2];
const elem = [4, 5];
array.push.apply(array, elem);
console.log(array);

// Find max number
const numMaxArr = [1, 2, 5, 7, 3];
console.log(Math.max.apply(null, numMaxArr));

// Polyfills ( Call ,Bind, Apply )
Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + " is not callable");
  }
  context.fn = this;
  context.fn(...args);
};

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error(this + " is not callable");
  }
  if (!Array.isArray(args)) {
    throw new Error("Arguments should be array");
  }
  context.fn = this;
  context.fn(...args);
};

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + " is not callable");
  }

  context.fn = this;
  return function (...newArgs) {
    return context.fn(...args, ...newArgs);
  };
};

// Test Polyfill
let car = {
  color: "red",
};

function purchaseCar(price) {
  console.log("I have " + this.color + " car with price " + price);
}

// purchaseCar.myCall(car, 1200);
// purchaseCar.myApply(car, [1200]);
// const newFunc = purchaseCar.myBind(car);
// newFunc(1234);

// Currying Uses Closures,  func(a,b) => func(a)(b)
// higher order, pure function, avoid passing same variable again and again
function f(a) {
  return function (b) {
    console.log("currying", a, b);
  };
}

f(1)(2);

// N Number currying
function sum(a) {
  return function (b) {
    if (b) return sum(a + b);
    return a;
  };
}

// console.log(sum(1)(2)());

// Curry Imlementation func(a,b,c) => func(a)(b)(c)
function curry(func) {
  return function curryingFunc(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curryingFunc(...args, ...next);
      };
    }
  };
}

const sumCurry = (a, b, c) => a + b + c;
const totalSum = curry(sumCurry);
console.log(totalSum(1)(2)(3));

// Event Bubbling
// Event occur to child and propogate to parent and then grandparent

// Event Capturing or Event Trickling
// Event occur to parent and move to child

// Event Delegation -> Add event on parent and handle child actions

// Polyfill of deboucing and throttle

const myThrottle = (func, time) => {
  let last;
  return function (...args) {
    let now = new Date().getTime();
    if (now - last < d) return;
    last = now;
    func(...args);
  };
};

const myDebounce = (func, time) => {
  let timer;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    func(...args);
  }, time);
};

// async defer
// script tag found then it will be downloaded and excuted then only rest of the process will happen (blocks rendering)
// async => script fetch during parsing of html once fetched then parsing stop for execution and parsing continue
// defer => parsing and fetching of script happend together once parsing of html done then only script will be executed

// Polyfills Map,Filter,Reduce

Array.prototype.myMap = function (cb) {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(cb(this[i], i, this));
  }
  return arr;
};

Array.prototype.myFilter = function (cb) {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      arr.push(cb(this[i]));
    }
  }
  return arr;
};

Array.prototype.myReduce = function (cb, initialValue) {
  let acc = initialValue;
  for (let i = 0; i < this.length; i++) {
    acc = acc ? cb(acc, this[i], i, this) : this[i];
  }
  return acc;
};

console.log(
  [1, 2, 3].myReduce((acc, curr, i, ar) => {
    acc.push({ name: curr });
    return acc;
  }, [])
);

// Prefix
function findLongest(input) {
  let prefix = input[0];
  for (let i = 1; i < input.length; i++) {
    while (!input[i].startsWith(prefix)) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (!prefix) return "";
    }
  }
  return prefix;
}

function findLongest2(input) {
  let counter = 0;
  let prefix = "";
  while (counter < input[0].length && checkForEvery(input, prefix)) {
    counter++;
    prefix = input[0].substring(0, counter);
  }
  return input[0].substring(0, counter);
}

function checkForEvery(input, prefix) {
  return input.every((element) => element.startsWith(prefix));
}
console.log(findLongest2(["fliaght", "fliayover", "flistudio"]));
