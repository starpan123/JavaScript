// {
//   let a = 10;
//   var b = 1;
// }
// a
// b


// for (let i = 0; i < 10; i++) {
//   const element = i;
// }
// console.log(i)

// var arr = []

// for (let n = 0; n < 10; n++) {

//   arr[n] = function(){
//     console.log(n)
//   }
// }

// arr[1]()

// for (let i = 0; i < 3 ; i++) {
//   let i = 'sss'
//   console.log(i)
// }

// // 不存在变量提升
// console.log(foo);
// var foo = 2;

// console.log(bar);
// let bar = 2;

// // 暂时性死区
// var tmp = 123;
// if(true){
//   tmp = 'abc';
//   console.log(tmp)
//   let tmp;
// }

// // 暂时性死区意味者typeof不在是一个百分百安全的操作
// typeof x;
// let x;

// // 不允许在相同作用域内重复声明同一个变量
// function func() {
//   let a = 123
//   console.log(a)
//   //let a =2
// }

// func()
// // 不允许重复声明
// function func1(arg) {
//   {
//     let arg;
//   }
// }

// func1()

// 为什么要用块级作用域
// 第一种场景，内存变量可能会覆盖外层变量
// var tmp = new Date();
// function f() {

//   console.log(tmp);

//   if (true) {
//    var tmp = 'hello world'
//    console.log(tmp);

//   }

// }

// f()

// // 块级作用域内部函数声明语句，建议不要使用
// {
//   let a = 'secret'
//   function f() {
//     return a;
//   }

// }

// // 块级作用域内部，优先使用函数表达式
// {
//   let a ='secret'
//   let f = function(){
//     return a;
//   }
// }

// // const 命令 一旦声明就不能改变 只声明不赋值也报错
// const PI = 3.1415
// PI
// PI = 3

// const foo = {}

// foo.prop = 123;
// foo.prop
// // 将foo指向另外一个对象，就会报错
// foo = {}

// const a = []
// a.push('hello')
// a.length = 0
// a = ['hello']

// // 冻结整个对象 Object.freeze 严格模式下会报错
// 'use strict'
// const foo1 = Object.freeze({})
// foo1.prop =111
// console.log(foo1)

var constantize = (obj)=>{
  Object.freeze(obj);
  Object.keys(obj).forEach((key,i)=>{
    if(typeof obj[key] === 'object'){
      constantize(obj[key])
    }
  })
}

// es6 有6种声明变量的方式 var function let const import class

// 顶层对象属性
window.a = 1
console.log(1)
a = 2
console.log(window.a)

// var、function声明的全局变量属于顶层对象属性
// let const class 声明的全局变量不属于顶层对象属性

