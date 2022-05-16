import 'core-js'
import 'regenerator-runtime/runtime'

{
  let a = 10;
  var b = 1;
}
// 转码前
b = [1,2,3].map(item => item + 1);
console.log(b)
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
