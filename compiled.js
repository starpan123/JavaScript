"use strict";

require("core-js");

require("regenerator-runtime/runtime");

{
  var a = 10;
  var b = 1;
} // 转码前

b = [1, 2, 3].map(function (item) {
  return item + 1;
});
console.log(b);
var arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
}; // ES6的写法

var arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
