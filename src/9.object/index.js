// 1.属性的简洁表示法
// ES6允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。
// 这样的书写更加简洁
const foo = "bar";
const baz = { foo };
console.log(baz);

// 等价于
const baz1 = { foo: foo };
console.log(baz1);

function f(x, y) {
  console.log({ x, y });
}
f(1, 3);

// 除了属性简写，方法也可以简写
const o = {
  method() {
    return "Hello!";
  },
};
console.log(o.method());

// 下面是一个实际例子
let birth = "2000/01/01";

const Person = {
  name: "张三",

  // 等同于birth:birth
  birth,

  // 等同于hello:function(){}
  hello() {
    console.log("hello");
  },
};
console.log(Person);

// 这种写法用于函数的返回值，将会非常方便
function getPoint() {
  const x = 1;
  const y = 10;
  console.log({ x, y });
}
getPoint();

// CommonJS模块输出一组变量，就非常合适使用简洁写法
function getItem() {}
function setItem() {}
function clear() {}
module.exports = { getItem, setItem, clear };

// 属性的赋值器（setter）和取值器（getter），也是采取这种写法

// 打印也可以使用
const user = {
  name: "test",
};
const newFoo = {
  bar: "baz",
};
console.log(user, newFoo);
// 简单写法
console.log({ user, newFoo });

// 注意：简写的对象方法不能用作构造函数，会报错
const obj = {
  f() {
    console.log(2222);
  },
};
// 下面代码会报错
// new obj.f()

// 2.属性名表达式
// JavaScript定义对象的属性，有两种方法
const objName = {};
// 方法一；直接使用标识作为属性名
objName.foo = true;

// 方法二：用表达式作为属性名
objName["a" + "bc"] = 123;

console.log(objName);

// 表达式还可以用于定义方法名
let objFun = {
  ["h" + "ello"]() {
    console.log("hi");
  },
};
objFun.hello();

// 注意：属性名表达式与简洁表示法，不能同时使用，会报错
const fooss = "barss";
const barss = "abc";
// const bazss = { [fooss]}; 报错
const bazss = { [fooss]: "bcd" };
console.log(bazss);

// 注意：属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[obj,obj]
const keyA = { a: 1 };
const keyB = { b: 2 };

const myObject = {
  [keyA]: "valueA",
  [keyB]: "valueB",
};
console.log(myObject);

// 3.方法的name属性
// 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。
const person = {
  sayName() {
    console.log("hello!");
  },
};
console.log(person.sayName.name);

// 4.属性的可枚举性和遍历
// 可枚举性
/**
 * 对象的每个属性都有一个描述对象（Descriptor）
 */

// 属性的遍历
// 1.for...in

// 5.super关键字
/**
 * this关键字总是指向函数所在的当前对象，ES6又新增了另一个类似的关键字super
 * 指向当前对象的原型对象
 */
const proto = {
  foo: "hello",
};

const objp = {
  foo: "world",
  find() {
    console.log(this.foo);
    return super.foo;
  },
};
Object.setPrototypeOf(objp, proto);
console.log(objp.find());

// 注意：super关键字表示原型对象时，只能用在对象的方法之中
// 只能使用在对象的简写方法中
// const objSS = {
//   foo: super.foo, // 报错
//   foos:function(){
//     return super.foos // 报错
//   }
// };

// 6.对象的扩展运算符
/**
 * 对象的结构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）
 * 但尚未被读取的属性，分配到指定的对象上面。
 * 所有你的键和他们的值都会拷贝到新的对象上面
 */
let { x, y, ...z } = { x: 1, y: 1, a: 2, b: 3 };
console.log(z);

/**
 * 由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，
 * 就会报错，因为他们无法转为对象
 */
// let { ...z1 } = null;
// let { ...z2 } = undefined;

// 解构赋值必须是最后一个参数，否则会报错
// let {...a1,b1,c1} = {a1:1,b1:2,c1:3,d1:4}
let { a1, b1, ...c1 } = { a1: 1, b1: 2, c1: 3, d1: 4 };
console.log(c1);

/**
 * 注意：解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值
 * （数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本
 */
let objj = { a: { b: 1 } };
let { ...x22 } = objj;
objj.a.b = 2;
console.log(x22);

// 扩展运算符的解构赋值，不能复制继承自原型对象的属性
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
console.log(o3);
console.log(o3.a);
console.log(o2.__proto__);

const ox = Object.create({ xx: 1, yy: 2 });
ox.zz = 3;
let { xx, ...newObj } = ox;
console.log(xx);
console.log(newObj);
let { yy, zz } = newObj;
console.log(yy);
console.log(zz);

// 解构赋值的一个用处，是扩展某个函数的参数，引入其他操作
function baseFunction({ a, b }) {}
function wrapperFunction({ x, y, ...restCongfig }) {
  return baseFunction(restCongfig);
}

// 扩展运算符
// 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中
let w = { a: 3, b: 4 };
let n = { ...w };
console.log(n);
// 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组
let foow = { ...["a", "b", "c"] };
console.log(foow);

// 如果扩展运算符后面是一个空对象，则没有任何效果
console.log({ ...{}, a: 1 });

// 如果扩展运算符后面不是对象，则会自动将其转为对象
// Number、Boolean、undefined、null类型没有自身属性返回为一个空对象
console.log({ ...1, ...true, ...undefined, ...null });

// 如果扩展运算符后面是字符串，自动转换为一个类似数组的对象，返回的不是空对象
console.log({ ..."hello" });

// 对象的扩展运算符，只会返回参数对象自身的、可枚举的属性，这一点要特别小心
// 尤其是用于类的实例对象时
class C {
  p = 12;
  m() {}
}

let c = new C();
let clone = { ...c };
console.log(c.p);
console.log(c.m.name);
console.log(clone.p);
console.log(clone.m);

// 对象的扩展运算符等同于使用Object.assign()方法
let xgg = [1, 2, 3];
let aClone = { ...xgg };
// 等同于
let aClone1 = Object.assign({}, xgg);
console.log(aClone);
console.log(aClone1);

// 想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的方法
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj,
};

// 写法二
const clone2 = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);

// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptor(obj)
);

// 扩展运算符可以用于合并两个对象
let ab = { ...{ 0: 1, 1: 2 }, ...{ 3: 3, 4: 4 } };
// 等价于
let aba = Object.assign({}, { 0: 1, 1: 2 }, { 3: 3, 4: 4 });
console.log(ab);
console.log(aba);

// 用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖
console.log({ ...{ x: 1, y: 2 }, x: 2, y: 3 });
// 扩展运算符在最后 后面相同属性覆盖前面用户自定义属性
console.log({ x: 2, y: 3, ...{ x: 1, y: 2 } });

// 与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式
const objB = {
  ...(2 > 1 ? { a: 1 } : {}),
  b: 1,
};
console.log(objB);

// 扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的
let af = {
  get x() {
    console.log('www')
  },
};
let afff = { ...af };

// 7.AggregateError错误对象
// AggregateError(errors[, message])

// 8.Error对象的cause属性 主要用于描述错误原因
const actual = new Error('an error!', { cause: 'Error cause' });
actual.cause; // 'Error cause'
