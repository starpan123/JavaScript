"use strict";

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
var arr = [];

var _loop = function _loop(n) {
  arr[n] = function () {
    console.log(n);
  };
};

for (var n = 0; n < 10; n++) {
  _loop(n);
}

arr[1]();