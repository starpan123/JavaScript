// 1.扩展运算符

const { Array } = require("core-js");

/**
 * 含义
 * 扩展运算符（spread）是三个点（...）。好比rest参数的逆运算，
 * 将一个数组转为用逗号分隔的参数序列
 * */
console.log(...[1, 2, 3]);
console.log(1, ...[2, 3, 4], 5);

//[...document.querySelectorAll('div')]
function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
console.log(add(...numbers));

// 扩展运算符与正常函数参数可以结合使用
function f(v, w, x, y, z) {
  console.log(v, w, x, y, z);
}
const args = [0, 1];
f(-1, ...args, 2, ...[3]);
// 扩展运算符后面还可以放置表达式
const arr = [...(1 > 0 ? ["a", "b"] : []), "b"];
console.log(arr);
// 如果扩展运算符后面是一个空数组，则不产生任何效果
console.log(...[], 1);
// 只有在函数调用传入时可以使用圆括号，否则会报错
// console.log((...[]),1);

// 替代函数的apply()方法
/**
 * 由于扩展运算符可以展开数组，所以不需要apply()方法将数组转为函数的参数了
 */
// apply写法
function applyF(x, y, z) {
  console.log(...[x, y, z]);
}
var params = [0, 1, 3];
applyF.apply(null, params);

// 扩展运算符写法
function kzF(x, y, z) {
  console.log(...[x, y, z]);
}
kzF(...[1, 2, 3]);

// 计算数组元素最大值，使用Math.max()
// apply写法
console.log(Math.max.apply(null, [4, 3, 5, 6, 9]));
// 扩展运算符写法
console.log(Math.max(...[4, 3, 5, 6, 9]));
// 不使用特殊处理
console.log(Math.max(4, 3, 5, 6, 9));

// 使用push()方法将数组push
// apply写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1);
// 扩展运算符写法
arr1.push(...arr2);
console.log(arr1);

// 日期年月日
console.log(new (Date.bind.apply(Date, [null, 2015, 1, 1]))());
console.log(new Date(...[2022, 12, 7]));

// 扩展运算符的应用
//（1）复制数组
// 直接复制，复制了指向底层数据结构的指针，而不是克隆一个全新的数组，
// 改变变量复制的变量对应改变
const a1 = [1, 2];
const a2 = a1;
a2[0] = 0;
console.log(a1);

// 使用concat()进行复制数组
const ac1 = [1, 2];
const ac2 = ac1.concat();
ac1[0] = 0;
console.log(ac2);

// 使用扩展运算符进行扩展
const ak1 = [1, 2];
const ak2 = [...ak1];
ak1[0] = 0;
console.log(ak2);

//（2）合并数组
// 扩展运算符提供了数组合并的新写法
const b1 = ["a", "b"];
const b2 = ["c"];
const b3 = ["d", "e"];
// 使用concat()进行合并
console.log(b1.concat(b2, b3));
console.log([...b1, ...b2, ...b3]);

// 上面两种方法都只能实现浅拷贝，如果数组元素时对象无效
const bb1 = [{ foo: 1 }];
const bb2 = [{ bar: 2 }];
const bb3 = bb1.concat(bb2);
const bb4 = [...bb1, ...bb2];
// 数组的对象成员还是指向的原来的引用属于浅拷贝，当修改原数组对象的值时
bb1[0].foo = 3;
console.log(bb3, bb4);

//（3）与解构赋值结合
// 扩展运算符可以与解构赋值结合起来，用于生成数组
// ES5 需要使用slice()对数组进行截取
const list = [1, 2, 3, 4];
const one = list[0];
const other = list.splice(1);
console.log(...["other", other]);
// ES6使用扩展运算符进行生成数组，扩展运算符只能放在参数最后一位，否则会报错
const [two, ...rest] = [1, 2, 3, 4];
console.log(...["rest", rest]);

//（4）字符串
// 扩展运算符还可以将字符串转为真正的数组
console.log([..."hello"]);

//（5）实现了Iterator接口的对象
// 任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组
// let nodeList = document.querySelectorAll("div");
// let arrNodeList = [...nodeList];
// 定义Number对象的遍历器接口数值类型转为Number实例后会调用该接口
// ，返回自定义结果
Number.prototype[Symbol.iterator] = function* () {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i++;
  }
};
console.log(...5);

/**
 * 对于没有部署Iterator接口的类似数组的对象，
 * 扩展运算符无法将其转为真正的数组
 * 需要使用Array.from()将其转为数组
 * */
let arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
// console.log(...arrayLike);
console.log(Array.from(arrayLike));

//（6）Map和Set结构，Generator函数
/**
 * 扩展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象
 * 都可以使用扩展运算符
 */
let map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);

let mapArr = [...map.keys()];
console.log(mapArr);
// Generator函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符
const go = function* () {
  yield 1;
  yield 2;
  yield 3;
};
console.log([...go()]);

// 如果对没有Iterator接口的对象，使用扩展运算符，将会报错
const obj = { a: 1, b: 2 };
// let arrObj = [...obj];

// 2.Array.from()
/**
 * Array.from()方法用于将两类对象转为真正的数组，类似数组的对象
 * （array-likeobject）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）
 */
let arrayLikeF = { 0: "a", 1: "b", 2: "c", length: 3 };
// ES5的写法
var arrNew1 = [].slice.call(arrayLike);
console.log(arrNew1);
var arrNew2 = Array.from(arrayLikeF);
console.log(arrNew2);

/**
 * 实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合
 * 以及函数内部的arguments对象。Array.form()都可以将它们转为真正的数组
 */
// NodeList对象
// let ps = document.querySelectorAll("p");
// Array.from(ps).filter((p) => {
//   return p.textContent.length > 100;
// });

// arguments对象
function foos(params) {
  var args = Array.from(arguments);
  console.log(args);
}
foos(1, 23, 3);

// 只要是部署了Iterator接口的数据结构，Array.from()都能将其转为数组
// 字符串和Set结构都具有Iterator接口
console.log(Array.from("Hello"));
let namesSet = new Set(["a", "b"]);
console.log(Array.from(namesSet));

// 如果参数是一个真正的数组，Array.from()会返回一个一模一样的新数组
console.log(Array.from([1, 2, 3]));
// 扩展运算符只支持具有Iterator接口转为数组
// Array.from()还能将类似数组的对象转为数组，本质特点就是有length属性
// 如何具有length属性的对象都可以使用Array.from()转为数组
console.log(Array.from({ length: 3 }));
