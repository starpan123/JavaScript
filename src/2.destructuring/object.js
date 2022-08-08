// 对象的解构赋值
let { foo, bar } = { foo: "foo", bar: "bar" };
let { baz } = { foo: "foo", bar: "bar" };
console.log(baz); //undefined

let { log, sin, cos } = Math;
// 变量名与属性名不一致 foo是匹配模式，bazz是变量，
// 真正被赋值的是变量，而不是模式foo
let { foo: bazz } = { foo: "aaa", bar: "bbb" };
console.log(bazz);
let obj = { first: "hello", last: "world" };
let { first: f, last: l } = obj;
let obj2 = {
  p: ["Hello", { y: "World" }],
};
let {
  p: [x, { y }],
} = obj2;

console.log(x, y);
let {
  p,
  p: [x1, { y: y1 }],
} = obj2;
console.log(x1, y1, p);

const node = {
  loc: {
    start: {
      line: 1,
      column: 5,
    },
  },
};

let {
  loc,
  loc: { start },
  loc: {
    start: { line },
  },
} = node;

console.log(line, loc, start);

let obj3 = {};
let arr = [];
({ foo: obj3.prop, bar: arr[0] } = { foo: 123, bar: true });

// let {
//   foo: { bar1 },
// } = { baz: "baz" };

// 对象的解构可以取到继承的属性
let obj22 = {};
let obj33 = { foo: "bar" };
Object.setPrototypeOf(obj22, obj33);
const { foo: foo1 } = obj22;
console.log(foo1);

// 对象解构也可以有默认值
var { x22 = 3 } = {};
var { x222, y222 = 5 } = { x222: 1 };

// 默认值生效的条件是，对象的属性值严格等于undefined
var { x333 = 3 } = { x: undefined };
// x333 3
var { x444 = 3 } = { x: null };
// x444 null

let x123;
({ x123 } = { x123: 1 });


({} = [true, false]);
({} = "abc");
({} = []);

let arrs = [1,2,3]
let {0:first,[arrs.length-1]:last} = arrs
console.log(first,last)

