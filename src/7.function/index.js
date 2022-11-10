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
bar();
