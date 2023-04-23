// 1.Object.is()
// 与严格相等运算符（===）的行为基本一致
console.log(Object.is("foo", "foo"));
console.log(Object.is({}, {}));

// 不同之处只有两个：一是+0不等于-0，二是NaN等于自身
console.log(+0 === -0);
console.log(NaN === NaN);

console.log(Object.is(+0, -0));
console.log(Object.is(NaN, NaN));

// 2.Object.assign()
/**
 * 基本用法
 * Object.assign()
 * 用于对象合并，将源对象的所有可枚举属性，复制到目标对象
 */
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
console.log(Object.assign(target, source1, source2));
/**
 *  注意：如果目标对象与源对象有同名属性，或多个源对象有同名属性
 *  则后面的属性会覆盖前面的属性
 */
console.log(Object.assign({ a: 1, b: 1 }, source1, source2));

// 如果只有一个参数，Object.assign()会直接返回该参数
const obj = { a: 1 };
console.log(Object.assign(obj) === obj);

// 如果该参数不是对象，则会先转成对象，然后返回
console.log(typeof Object.assign(2));
console.log(Object.assign(2));

// 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错
// console.log(Object.assign(undefined));
// console.log(Object.assign(null));

// 如果非对象参数出现在源对象的位置（即非首参数），所有参数都会转成对象
// 如果无法转成对象，就会跳过。undefined和null
let objU = { a: 1 };
console.log(Object.assign(objU, undefined) === objU);
console.log(Object.assign(objU, null) === objU);

// 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错
// 但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果
const v1 = "abc";
const v2 = true;
const v3 = 10;

const objV = Object.assign({}, v1, v2, v3);
console.log(objV);

// 字符串包装对象，会产生可枚举属性
console.log(Object(true));
console.log(Object(10));
console.log(Object("abc"));

// 注意点
//（1）浅拷贝
/**
 * Object.assign()方法实行的是浅拷贝，而不是深拷贝
 * 也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝
 * 得到的是这个对象的引用
 */
const obj1 = { a: { b: 1 } };
const obj2 = Object.assign({}, obj1);
obj1.a.b = 2;
console.log(obj2.a.b);

//（2）同名属性的替换
/**
 * 对于嵌套的对象，一旦遇到同名属性，Object.assign()的处理方法是替换
 * 而不是添加
 */
const targetT = { a: { b: "c", d: "e" } };
const sourceT = { a: { b: "hello" } };
console.log(Object.assign(targetT, sourceT));

//（3）数组的处理
/**
 * Object.assgin()可以用来处理数组，但是会把数组视为对象
 */
console.log(Object.assign([1, 2, 3], [4, 5]));

// （4）取值函数的处理
// Object.assign()只能进行值的复制，如果复制的值是一个取值函数，
// 那么将求值后再复制
const source = {
  get foo() {
    return 1;
  },
};

const targetSS = {};
Object.assign(targetSS, source);
console.log(targetSS);
console.log(Object.assign(targetSS, source));

// 常见用途
// Object.assign()方法有很多用处
//（1）为对象添加属性
class Point {
  constructor(x, y) {
    Object.assign(this, { x, y });
  }
}

//（2）为对象添加方法
class SomeClass { }
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    //...
  },
  antherMethod() {
    //...
  },
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (ar1, arg2) { };
SomeClass.prototype.antherMethod = function () { };

//（3）克隆对象
function clone(origin) {
  return Object.assign({}, origin);
}
// 上面的代码只能克隆原始对象的本身，不能克隆它继承的值
// 下面的代码可以实现克隆继承的值
function cloneI(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}

//（4）合并多个对象
// 将多个对象合并到某个对象
const merge = (target, ...sources) => Object.assign(target, ...sources);
// 如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并
const mergeEmpty = (...sources) => Object.assign({}, ...sources);

// //（5）为属性指定默认值
const defaults = {
  level: 0,
  type: "html",
  obj: {
    name: "test",
  },
};
function processContent(options) {
  options = Object.assign({}, defaults, options);
  console.log(options);
}
processContent({ level: 1, other: 2 });

// 由于是浅拷贝，如果存在复杂类型，贼会替换原有对象，不是完全拷贝
processContent({ obj: { name222: "dasdasdas" } });

// 3.Object.getOwnPropertyDescriptors()
// ES5的Object.getOwnPropertyDescriptor()方法返回某个对象属性的描述对象
// ES2017引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身对象所有自身属性（非继承属性）的描述对象
const obj22 = {
  foo: 123,
  get bar() { return 'abc' }
}
console.log(Object.getOwnPropertyDescriptors(obj22))
// 引入该方法的目的，主要是为了解决Object.assign()无法正确拷贝get
// set属性的问题
const source222 = {
  set foo111(value) {
    console.log(value)
  }
}
console.log(Object.getOwnPropertyDescriptors(source222))
const tar111 = {}
// assign拷贝不了foo111属性取值的方法，只拷贝值
Object.assign(tar111, source222)
console.log(tar111)
console.log(Object.getOwnPropertyDescriptors(tar111))
// 需要Object.getOwnPropertyDescriptors()结合Object.defineProperties()进行拷贝
const tar222 = {}
Object.defineProperties(tar222, Object.getOwnPropertyDescriptors(source222))
console.log(tar222)
console.log(Object.getOwnPropertyDescriptors(tar222))

// 上面的代码可以写成一个函数
const shallowMerge = (target, source) => Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))

//  Object.getOwnPropertyDescriptors()另外一个用处，配合Objcet.create()方法，将对象属性克隆到一个新对象，属于浅拷贝
const clonesss = Object.create(Object.getPrototypeOf(tar222),
  Object.getOwnPropertyDescriptors(tar222))
console.log(clonesss)
// 写成一个方法
const shallowClone = (obj) => Object.create(Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj))
console.log(shallowClone(tar111))

// Object.getOwnPropertyDescriptors()方法可以实现一个对象继承另一个对象
// 之前的继承另外一个对象的写法
let protoX = {
  x: 1
}
const objj = {
  __proto__: protoX,
  foo: 123
}
console.log(protoX)
// ES6规定__proto__只有浏览器要部署，其他环境不用部署。如果去除__proto__，使用下面写法实现
const objsss = Object.create(protoX)
objsss.foo = 123
// 或者
const objwww = Object.assign(Object.create(protoX), { foo: 123 })
console.log(objsss)
console.log(objwww)
// 使用Object.getOwnPropertyDescriptors()来实现
const objddd = Object.create(
  protoX,
  Object.getOwnPropertyDescriptors({
    foo: 123
  })
)
// 4.__proto___属性，Object.setPrototypeOf()Object.getPrototypeOf()
// JavaScript语言的对象继承是通过原型链实现的。
// __proto__尽量不要使用
// Object.setPrototypeOf()方法的作用与__proto__相同，用来设置一个对象的原型对象(prototype)，返回参数对象本身。它是es6正式推荐的设置原型对象的方法
// 格式
// Object.setPrototypeOf(object, prototype)
// 用法
Object.setPrototypeOf({}, null)

// 该方法等同于下面的函数
function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto
  return obj
}

// 下面就是一个例子将protoss设置为objzz对象的原型，objzz可以读取protoss对象的属性
let protoss = { a: 1, b: 2 }
let objzz = { c: 3 }
Object.setPrototypeOf(objzz, protoss)
console.log(objzz.a)
// 非对象类型先转为对象，返回同样的参数，不会产生任何效果
// undefined和null无法转为对象类型
let x = 1
console.log(Object.setPrototypeOf(x, { a: 1 }) === 1)

// Object.getPrototypeOf()
// 该方法与 Object.setPrototypeOf()方法配套使用，用于读取一个对象的原型对象
// 格式
// Object.getPrototypeOf(obj)
// 无法获取null和undefined的原型，这两种类型无法转为对象
console.log(Object.getPrototypeOf(1))

// 5.Object.keys() Object.values() Object.entries()
// Object.keys()
// ES5引入Object.keys()方法，返回一个数组，遍历对象自身（不含继承）所有可以遍历属性的键值
var objsk = { a: 1, b: 2 }
console.log(Object.keys(objsk))

//ES2017引人Object.values() Object.entries()可以更加方便的遍历对象，可以使用for...of循环

let { keys, values, entries } = Object
for (const k of keys(objsk)) {
  console.log(k)
}

for (const v of values(objsk)) {
  console.log(v)
}

for (const e of entries(objsk)) {
  console.log(e)
}

// Object.values()
// Object.values()返回一个数组，成员是参数对象自身（不含继承的）所有可遍历属性的键值
// 键值为数字则按键值排序输出值
console.log(Object.values({ 2: 'a', 1: 'b', 4: 'c' }))
// 会自动过滤掉属性名为symbol类型的值
console.log(Object.values({ [Symbol()]: 123, foo: 'abc' }))
// 只返回自身的可遍历属性
// 参数为字符串则返回字符组成的数组
console.log(Object.values('foo'))

//Object.entries()
// Object.entries()方法返回一个数组，成员是参数对象自身（不含继承的）所有可遍历属性的键值对数组 
console.log(Object.entries('foo'))
// 会自动过滤掉属性名为symbol类型
console.log(Object.entries({ [Symbol()]: 123, foo: 'abc' }))
// 基本用途是遍历对象的属性
for (const [k, v] of Object.entries('foo')) {
  console.log(`${k}:${v}`)
}

// 另外一个用处就是将对象转为map结构
const mapss = new Map(Object.entries('foo'))
console.log(mapss)

// 6.Object.fromEntries()
// Object.fromEntries()是Object.entries的逆操作，用于将一个键值对数组转为对象
console.log(Object.fromEntries([[1, 2], [3, 4]]))
// 该方法的主要目的是将键值对的数据结构还原为对象，特别适合将map结构转为对象
console.log(Object.fromEntries(mapss))

// 7.Object.hasOwn()
// 用于对象判断是否为自身属性
const oObject = Object.create({ a: 123 })
oObject.b = 456
console.log(Object.hasOwn(oObject, 'a'))
console.log(Object.hasOwn(oObject, 'b'))
// Object.hasOwn()对于不继承的对象不会报错，hasOwnProperty()会报错
const objectNull = Object.create(null)
console.log(Object.hasOwn(objectNull, 'a')) // 正常处理
//console.log(objectNull.hasOwnProperty('a'))// 报错

