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

// 使用扩展运算符进行复制
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

// 对于还没有部署该方法的浏览器，可以用Array.prototype.slice()方法替代
const toArray = () => (Array.from ? Array.from : (obj) => [].slice.call(obj))();

// Array.from()还可以接受一个函数作为第二个参数，作用类似于数组的map()方法
// 用来对每个元素进行处理，将处理后的值放入返回的数组
console.log(Array.from([1, 2, 3], (x) => x * x));
console.log(Array.from([1, , 2, , 4], (n) => n || 0));

// 返回各种数据类型
function typesOf() {
  return Array.from(arguments, (value) => typeof value);
}

console.log(typesOf(1, "sss", null, undefined));

console.log(Array.from({ length: 2 }, () => "star"));

// 3.Array.of()
console.log(Array.of(3, 11, 8));
console.log(Array.of(3));
console.log(Array.of(3).length);
// 该方法主要的目的是弥补数组构造函数Array()的不足，参数个数不同
// 会导致Array()的行为有差异
console.log(Array());
console.log(Array(3)); // 一个参数时用来指定数组长度
console.log(Array(1, 2, 3));

// Array.of()基本上可以用来替代Array()或new Array()，
// 并且不存在由于参数不同而导致的重载。它的行为非常统一
console.log(Array.of()); // []
console.log(Array.of(undefined));
console.log(Array.of(1));
console.log(Array.of(1, 2));

// 4.实例方法：copyWithin()
/**
 * 数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员
 * 复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法
 * 会修改当前数组
 */
// Array.prototype.copyWithin(target, (start = 0), (end = this.length));
console.log([1, 2, 3, 4, 5].copyWithin(0, 3));

console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4));

console.log([1, 2, 3, 4, 5].copyWithin(0, -2, -1));

console.log([].copyWithin.call({ length: 5, 3: 1 }, 0, 3));

let i32a = new Int32Array([1, 2, 3, 4, 5]);
console.log(i32a.copyWithin(0, 2));

// 5.实例方法：find()，findIndex()，findLast()，findLastIndex()
/**
 * 数组实例的find()方法，用于找出第一个符合条件的数组成员。
 * 它的参数是一个回调函数，所有数组成员依次执行该回调函数
 * 直到找出第一个返回值为true的成员，然后返回该成员。
 * 如果没有符合条件的成员，则返回undefined
 */

console.log([1, 4, -5, 10].find((n) => n < 0));

/**
 * find()方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组
 */

console.log(
  [1, 4, -5, 10].find(function (value, index, arr) {
    return value > 1;
  })
);

/**
 * findIndex()和find()类似，区别是返回位置
 */
console.log([1, 2, 5, -1].findIndex((n) => n > 2));

// find()和findIndex()都可以接受第二个参数，用来绑定回调函数的this对象
function ff(v) {
  return v > this.age;
}

let person = { name: "Starpan", age: 11 };
console.log([1, 2, 3, 4, 44].find(ff, person));

// find()和findIndex()可以发现NaN，弥补了数组的indexOf()方法的不足
// 借助Object.is()方法做到
[NaN].indexOf(NaN);
console.log([NaN].findIndex((y) => Object.is(NaN, y)));

// ES2022新增了2个方法findLast()和findLastIndex()
// 从数组的最后一个成员开始，依次向前检查，其他保持不变
console.log([2, 3, 5, 7, -1].findLast((n) => n > 1));
console.log([2, 3, 5, 7, -1].findLastIndex((n) => n > 1));

// 6.实例方法：fill()
// fill方法使用给定值，填充一个数组
console.log(["a", "b", "c"].fill(7));
console.log(new Array(3).fill(7));
// fill用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去
// fill方法可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置
console.log(["a", "b", "c"].fill(7, 1, 2));

// 注意：如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝

// 7.实例方法：entries()，keys()和values()
/**
 * 上述三种方法都是用来遍历数组的
 * 使用for...of循环遍历数组
 * entries()返回键值对 keys()返回键名 values()返回键值
 */
for (const iterator of [1, 2, 3].entries()) {
  console.log(...iterator);
}

for (const iterator of [1, 2, 3].keys()) {
  console.log(iterator);
}

for (const iterator of [1, 2, 3].values()) {
  console.log(iterator);
}
console.log(...[1, 2, 3].keys());
console.log(...[1, 2, 3].values());
console.log(...[1, 2, 3].entries());

// 不使用for...of进行遍历的话可以使用next进行遍历
let letter = ["a", "b", "c"];
let entriesL = letter.entries();
console.log(entriesL.next());
console.log(entriesL.next());

// 8.实例方法：includes()
/**
 * Array.prototype.includes方法返回一个布尔值
 * 表示某个数组是否包含给定的值
 * 可以接收第二个参数，表示搜索的起始位置
 * 负数表示倒数的起始位置
 */
console.log([1, 2, 3].includes(2));
console.log([1, 2, 3, NaN].includes(NaN));
console.log([1, 2, 3].includes(2, -2));

// 9.实例方法：flat()，flatMap()
/**
 * 数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组
 * "拉平"，变成一维数组。该方法返回一个新数组，对原数组没有影响
 */
console.log([1, 2, 3, [3, 6], 2].flat());
// flat()默认只会拉平一层，如果嵌套多层需要指定嵌套层数参数
// flat()会直接跳过空数据
// flat()参数为Infinity不用管多少层
console.log([1, 23, , 4, [1, 2, 3, [7, 8]]].flat(2));

/**
 * flatMap()方法对原数组的每个成员执行一个函数，相当于执行Array.prototype.map()
 * 然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组
 * 只能展开一层数组
 */
console.log([2, 3, 4].flatMap((x) => [x, x * 2]));

// 10.实例方法：at()
// 接受一个整数作为参数，可以为负数，支持负索引
const arrat = [5, 12, 8, 130, 44];
console.log(arrat.at(-1))
console.log(arrat.at(1))

// 11.实例方法：toReversed()，toSorted()，toSpliced()，with()

