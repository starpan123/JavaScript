"use strict";

{
  var a = 10;
  var b = 1;
} // 转码前

b = [1, 2, 3].map(function (item) {
  return item + 1;
});
console.log(b);