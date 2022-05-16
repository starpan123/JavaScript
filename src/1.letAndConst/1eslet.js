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
var tmp = new Date();
function f() {
  console.log(tmp);

  if (true) {
    var tmp = 'hello world'
  }

}

f()
