/**
 * 数组解构
 */
// 以前的定义变量
// let a = 1
// let b = 2

// let c = 3
let [a, b, c] = [1, 2, 3]
console.log(a)
console.log(b)
console.log(c)

let [foo, [[bar], baz]] = [1, [[2], 3]]
console.log(foo)
console.log(bar)
console.log(baz)

let [, , third] = ['foo', 'bar', 'baz']
console.log(third)

let [x, , y] = [1, 2, 3]
console.log(x)
console.log(y)

let [head, ...tail] = [1, 2, 3, 4]
console.log(head)
console.log(tail)

let [m, n, ...z] = ['a']
console.log(m)
console.log(n)
console.log(z)

// 如果解构不成功，变量值就等于undefined
let [aaa] = []
let [ccc, www] = [1]
console.log(aaa)
console.log(www)

// 不完全解构
let [aa, bb] = [1, 2, 3]

console.log(aa)
console.log(bb)

let [x1, [x2], x3] = [1, [2, 3], 4]

console.log(x1, x2, x3)
let [x4, x5, x6] = new Set(['a', 'b', 'c'])
console.log(x4)

function* fibs() {
  let a = 0;
  let b = 1;
  while(true){
    yield a;
    [a,b] = [b,a + b];
  }
}
var fs = fibs()
console.log(fs.next(),fs.next(),fs.next(),
fs.next(),fs.next(),fs.next(),fs.next())

// 解构赋值允许指定默认值
let [foo1 = true] = [];
console.log(foo)

let [x11, y11 = 'b'] = ['a']
let [x111, y1111 = 'b'] = ['a', undefined]
console.log(x11, y11, x111, y1111)


let [x211 = 1] = [undefined]
let [x311 = 1] = [null]

console.log(x211)
console.log(x311)

function f(){
  console.log('aaa');
}

let [x411=f()] = [1]
console.log(x411)

let x511;
if([1][0] === undefined){
  x511 = f();
}else{
  x511 = [1][0];
}

console.log(x511)


