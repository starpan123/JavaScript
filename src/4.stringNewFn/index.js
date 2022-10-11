// 1.String.fromCodePoint()
// String.fromCharCode()方法，不能识别大于0xFFFF
console.log(String.fromCharCode(0x20bb7));
console.log("\u{20BB7}");

console.log(String.fromCodePoint(0x20bb7));
console.log(String.fromCodePoint(0x78, 0x1f680, 0x79));
console.log("x\uD83D\uDE80y");

// 2.String.raw()
// 自动转义
console.log(String.raw`Hi\n${2 + 3}`);
console.log(String.raw`Hi\\n`);
//  `foo${1+2}bar`等同于
String.raw({ raw: ["foo", "bar"] }, 1 + 2);

// 3.实例方法 includes(),startsWith(),endsWith()
let s = "Hello World!";
console.log(s.includes("H", 0));
console.log(s.startsWith("W", 6));
console.log(s.endsWith(" ", 6));

// 4.repeat() 返回一个新的字符串，将原字符串复制n次
let re = "Starpan";
console.log(re.repeat(2));

// 5.padStart()用于头部补全 padEnd用于尾部补全
console.log("x".padStart(3, "a"));
console.log("x".padEnd(3, "a"));

// 6.trimStart()用于消除头部空格 trimEnd()用于消除尾部空格
const t = "  a  ";
console.log(t);
console.log(t.trim());
console.log(t.trimStart());
console.log(t.trimEnd());

// 7.replace() 只能替换第一个匹配 replaceAll() ES2021 可以一次性替换所有匹配
console.log('aabbcc'.replace(/b/g, '_'))
console.log('aabbcc'.replaceAll('b','_'))
//String.prototype.replaceAll(searchValue, replacement)
// searchValue 搜索模式(搜索被替换的字符)，字符串或者全局正则表达式(replaceAll必须带g，replace可以不带)
// replacement 表示替换的字符，可以是函数或者一些特殊的字符

// 8.at()返回参数指定位置的字符，负数代表倒数的位置
console.log('abc'.at(1)) 
console.log('abc'.at(-1)) 

