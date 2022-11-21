// 函数拓展
// 1.函数参数的默认值
//【1】基础用法
// ES6之前，不能直接为函数的参数指定默认值，只能采用变通的方法
// 在方法内部判断参数是否为空或者undefined，给一个默认值
function log(x, y) {
  y = y || "World";
  console.log(x, y);
}
log("Hello");
log("Hello", "China");

// ES6允许函数的参数设置默认值，即直接写在参数定义的后面
function logES6(x, y = "World") {
  console.log(x, y);
}
logES6("Hello");
logES6();
logES6("Hello", "");
logES6("Hello", "China");

function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
const p = new Point();
console.log(p);

// 参数变量是默认声明的，所以不能用let和const再次声明
// 使用函数默认值时，函数不能有同名参数
// function foo(x, x = 1) {
//   let x = 2;
//   const x = 2;
// }
// foo()

// 参数默认值每次调用重新计算默认表达式的值
let xx = 99;
function fooo(f = xx + 1) {
  console.log(f);
}
fooo();
xx = 100;
fooo();

//【2】与解构赋值默认值结合使用
// 参数默认值可以与解构赋值的默认值，结合起来使用
function fooD({ xd, yd = 5 }) {
  console.log(xd, yd);
}
fooD({});
fooD({ xd: 1 });
fooD({ xd: 1, yd: 2 });
// 没有给默认值，当调用时不传参数会报错
// fooD();
// 解决方法，给解构参数赋一个默认值
function fooDd({ xdd, ydd = 5 } = {}) {
  console.log(xdd, ydd);
}
fooDd();

// 多参数解构
function fooDm(url, { body, method = "Get", headers = {} } = {}) {
  console.log(headers);
}
fooDm();

//函数参数的默认值生效后，参数解构赋值依然会进行
function f({ a, b = "world" } = { a: "hello" }) {
  console.log(a, b);
}
f();
// 下面2种写法的区别
// 写法一
function m1({ x = 0, y = 0 } = {}) {
  return [x, y];
}
//写法二
function m2({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}
console.log(m1(), m2());
console.log(m1({ x: 1, y: 3 }), m2({ x: 1, y: 3 }));
console.log(m1({ x: 1 }), m2({ x: 1 }));
console.log(m1({}), m2({}));
console.log(m1({ z: 1 }), m2({ z: 1 }));

//【3】参数默认值的位置
// 多个参数时，有默认值参数放在最后面，可选参数，如果放在最前面，每次都要传参
// undefined可以触发参数等于默认值，null没有这种效果，仍然是null
function sss(x = 1, y) {
  console.log([x, y]);
}
sss();
sss(2);
sss(undefined, 2);
sss(null, 2);
function ss(x = 1, y = 1) {
  console.log([x, y]);
}
ss();

//【4】函数的length属性
// 返回没有指定默认值的参数个数，也就是说，指定了默认值后，length属性将失真
console.log(function (a) {}.length);
console.log(function (a = 5) {}.length);
console.log(function (a, b, c = 5) {}.length);
/**
 * length属性的含义是，该函数预期传入参数个数。参数指定默认值之后，预期参数
 * 不包括此参数。rest参数也不会计入其中
 */
console.log(function (...a) {}.length);
//设置了默认值的参数不是尾参数，那么length属性不再计入后面的参数了
console.log(function (a, b = 1, c) {}.length);
console.log(function (a = 1, b, c) {}.length);

//【5】作用域
// 参数单独形成一个作用域，首先找参数里面是否有对于的变量，没有就找全局变量，
// 全局没有就会报错
function dsa(xxx, y = xxx) {
  console.log(y);
}
dsa(1);
let xxx = 1;

function sda(y = xxx) {
  let xxx = 6666;
  console.log(y);
}
sda();
// 暂时性死区
// function sws(xxx = xxx) {}
// sws()

// 默认参数是一个函数，函数的作用域也遵守这个规则
let foos = "outer";

function bar(func = () => foos) {
  let foos = "inner";
  console.log(func());
}
bar(() => 001);
// 下面这种写法fooss没有定义会报错
// function barr(func = () => fooss) {
//   let fooss = "inner";
//   console.log(func());
// }
// barr();
var x111 = 1;
var x222 = 4;
function foox(
  x111,
  x222,
  y = function () {
    x111 = 2; // 指向foox的参数x111
    x222 = 2; // 指向foox的参数x222
  }
) {
  var x111 = 3; // 指向自己
  x222 = 5; // 指向foox的参数x222
  y(); // 改变foox参数变量x111和x222
  console.log(x111); // 指向foox内部定义x111
  console.log(x222); // 指向foox的参数x222
}

foox(); // 3:结果指向foox函数内部x111 2:指向foox的参数x222
x111; // 1:指向全局x111
//【6】应用
// 参数不可省略
function throwIfMissing() {
  throw new Error("Missing parameter");
}

function fooaa(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

//fooaa();
// Error: Missing parameter
fooaa(123);
// 参数可省略，给参数默认赋值undefined
function foobb(opt = undefined) {}
foobb();

// 2.rest参数
/**
 * ES6引入rest参数（形式为...变量名），用于获取函数的多余参数，
 * 这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，
 * 该变量将多余的参数放入数组中。
 */
function add(...values) {
  let sum = 0;
  for (const val of values) {
    sum += val;
  }
  console.log(sum);
}
add(1, 2, 3, 4);
// 下面是一个rest参数代替arguments变量的例子，rest写法更加简洁
/**
 * arguments对象不是数组，而是一个类似数组的对象
 * 所以使用数组的方法需要用Array.from将其转换为数组
 * rest参数就不存在这个问题，就是一个数组，k
 */
function sortNumbers() {
  console.log(Array.from(arguments).sort());
}
sortNumbers(5, 6, 45, 2);
const sortNumbersRest = (...numbers) => numbers.sort();
console.log(sortNumbersRest(3, 2, 5, 1));
/**
 * 利用rest参数改写数组push方法
 */
function push(arr, ...items) {
  items.forEach((item) => {
    arr.push(item);
    console.log(item);
  });
}
var ap = [];
push(ap, 1, 2, 3);
// rest参数之后不能再有其他参数（只能是最后一个参数），否则会报错
// function error(params,...aaa,dsa) {
// }
// 函数的length属性，不包括rest参数
console.log(function (s) {}.length);
console.log(function (...s) {}.length);
console.log(function (a, ...s) {}.length);

// 3.严格模式
// ES6函数内部不能使用严格模式
function Strict(a, b) {
  "use strict";
  console.log("sss");
}
Strict("s", "s");

// 4.name属性
function fooName(params) {}
console.log(fooName.name);
// 匿名函数返回变量名
var sf = function () {};
console.log(sf.name);
// 具名函数返回函数名
const barf = function bazf(params) {};
console.log(barf.name);
// Function构造函数返回的函数实例，name属性的值为anonymous
console.log(new Function().name);
// bind返回的函数，name属性值会加上bound前缀
function fooBind() {}
console.log(fooBind.bind({}).name);
// 匿名函数bind只返回bound
console.log(function () {}.bind({}).name);

// 5.箭头函数
// 基本用法ES6允许使用箭头(=>)定义函数
var fv = (v) => v;
// 等同于
var fvv = function (v) {
  return v;
};
// 箭头函数不需要参数或者多个参数，就使用一个圆括号代表参数部分
var fss = () => 5;
// 等同于
var fssf = function () {
  return 5;
};
console.log(fss());
// 带参数的箭头函数
var sumf = (num1, num2) => num1 + num2;
// 等同于
var sumf1 = function (num1, num2) {
  return num1 + num2;
};
console.log(sumf(1, 2));
console.log(sumf1(1, 2));

/**
 * 如果箭头函数的代码块部分多于一条语句，就要使用大括号将他们括起来，
 * 并使用return语句返回
 * 如果要返回一个对象，需要用()将对象包裹，不然会被误判断为函数代码块
 */
var sumf2 = (num1, num2) => {
  let a = 1;
  let b = 2;
  return a;
};
console.log(sumf2(1, 1));
let getTempItem = (id) => ({
  id: id,
  nams: "sss",
});
console.log(getTempItem(1));
// 下面这种情况可以运行，但是返回的为undefined
let unf = () => {
  a: 1;
};
console.log(unf());
// 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了
let fn = () => void doesNotReturn();
console.log(fn());
function doesNotReturn() {
  console.log("doesNotReturn");
}
// 箭头函数可以与变量解构结合使用
const full = ({ first, last }) => first + " " + last;
// 等同于
function fullf(person) {
  return person.first + " " + person.last;
}
console.log(full({ first: 1, last: 2 }));
// 箭头函数使得表达更加简洁
const isEven = (n) => n % 2 === 0;
const square = (n) => n * n;
// 箭头函数简化回调函数
// 普通函数写法
[1, 2, 3].map(function (x) {
  return x * x;
});
var resss = [2, 3, 1].sort(function (a, b) {
  return a - b;
});
console.log(resss);
// 箭头函数写法
console.log([1, 2, 3].map((x) => x * x));
console.log([2, 3, 1].sort((a, b) => a - b));
// rest参数与箭头函数结合的例子
const numbers11 = (...nums) => nums;
console.log(numbers11(1, 3, 5, 7, 9, 11));
// 箭头函数内部的this指向是固定的，指向上层作用域中的this
// 普通函数this指向是可变的
function foost() {
  setTimeout(() => {
    console.log("id:", this.id);
  }, 100);
}
var id = 21;
foost.call({ id: 42 });
// 普通函数和箭头函数，内部this指向
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}
var timer = new Timer();
setTimeout(() => console.log("s1: ", timer.s1), 3100); // 指向Timer函数
setTimeout(() => console.log("s2: ", timer.s2), 3100); // 指向全局对象
// 箭头函数this指向固化，绑定this使得其不再改变，有利于封装回调函数
var handler = {
  id: "123456",
  init: function () {
    document.addEventListener(
      "click",
      (event) => this.doSomething(event.type),
      false
    );
  },
  doSomething: function (type) {
    console.log("Handling " + type + " for " + this.id);
  },
};
