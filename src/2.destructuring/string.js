// 3.字符串的解构

// 字符串也可以解构赋值。就因为此时，字符串被转换成了类似数组的对象
const [a, b, c, d, e] = "hello";
console.log(a, b, c, d, e);
let { length: len } = "hello";
console.log(len);

// 4.数值和布尔值的解构赋值
// 解构赋值时，如果等号右边时数值或者布尔值，就会先转为对象
// 数值对象有toFixed属性，布尔对象有toString属性
let { toFixed: n } = 123;
console.log(n);
let { toString: s } = true;
console.log(s);
// undefined和null无法转为对象，对他们解构就会报错
// let { prop: x } = undefined;
// let { prop: y } = null;
// console.log(x, y);

// 5.函数参数的解构赋值
// 函数参数也可以使用解构赋值
function add([x, y]) {
  return x + y;
}

console.log(add([1, 2]));

[
  [1, 2],
  [3, 4],
].map(([a, b]) => a + b);

// 函数参数的解构也可以使用默认值
function move({ x = 0, y = 0 } = {}) {
  return [x, y];
}

move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]

// undefined就会触发函数参数
[1, undefined, 3].map((x = "yes") => x);
// [1, 'yes', 3]

// 括号的问题
// 不能使用括号的3种情况
// 1.变量声明
// let [(a)] = [1]
// 2.函数参数
// function f([(z)]) {return z; }
// function f([z,(x)]){return x; }
// 3.赋值语句的模式
// ({p:a}) = {p:42};
// ([a]) = [5];
// 可以使用圆括号的情况3
[cb] = [3];

// 7.用途
// (1)交换变量的值
let x333 = 1;
let y333 = 2;
[x333, y333] = [y333, x333];
// (2)从函数返回多个值
function example() {
  return [1, 2, 3];
}

let [a1, b1, c1] = example();

function example1() {
  return {
    foo2: 1,
    bar2: 2,
  };
}
let { foo2, bar2 } = example1();
// (3) 函数参数定义
// 参数是一组有次序的值
function f([x1, y1, z1]) {}
f([1, 2, 3]);
// 参数是一组无次序的值
function f11({ x2, y2, z2 }) {}
f11({ z2: 1, y2: 2, x2: 3 });
// (4) 提取JSON数据
// 解构赋值对提取JSON对象中的数据，尤其有用
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309],
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);
// (5) 函数参数的默认值
//jQuery.ajax = function (url, { s = function () {} } = {}) {};

// (6) 遍历Map结构
const map = new Map();
map.set("first", "hello");
map.set("second", "world");
for (let [key, value] of map) {
  let { log } = console;
  log(key, value);
}

// 只获取键名
for (let [key] of map) {
}

// 只获取键值
for (let [, value] of map) {
  console.log(value);
}

// (7) 输入模块的指定方法

const { SourceMapConsumer, SourceNode } = require("source-map");
