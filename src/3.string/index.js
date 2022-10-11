// 1.字符串unicode表示法
console.log("\u0061");
// 表示范围\u0000~\uffff，超出范围的字符必须使用两个字节的形式表示
console.log("\uD842\uDFB7");
// 直接在\u后面跟上超过0xFFFF的数值(比如\u20BB7)，\u20BB是一个不可打印的字符 只会展示一个数字7
console.log("\u20BB7");
// ES6改进了超过字符的值，使用大括号把超过的码点包含在其中
console.log("\u{20BB7}");

// 2.字符串的遍历器接口

for (let codePoint of "foo") {
  console.log(codePoint);
}

let text = String.fromCodePoint(0x20bb7);
console.log(text);
for (const i of text) {
  console.log(i);
}

console.log(JSON.stringify("\u{D834}"));
// 3.模板字符串
let a = 123;
console.log(
  `print ${a}，
\`sss\``.trim()
);

// 4.模板编译
// 使用<%...%>放置JavaScript代码
// 使用<%=...%>输出JavaScript表达式
// 5.标签模板
function tag(v1, ...v2) {
  console.log(v1, v2);
}
let b = 222;
tag`hello ${a} world ${b}`;
