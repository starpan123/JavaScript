// 1.二进制和八进制表示法
// 最新的二级制和八进制数值的新写法，分别用前缀0b(或0B)和0o(或0O)
// Number将二进制和八进制转为十进制
console.log("二进制", Number(0b111));
console.log("八进制", Number(0o111));

// 2.数值分隔符
// ES2021 数值可以使用下划线(_)作为分隔符
console.log(1_000);
// Number() parseInt() parseFloat() 不支持分隔符写法

// 3.Number.isFinite(),Number.isNaN()
// Number.isFinite()用来检查一个数值是否有限，参数不是数值都返回false
console.log(Number.isFinite(15)); // true
console.log(Number.isFinite("aaa"));
console.log(Number.isFinite(NaN));
console.log(Number.isFinite("15")); // false
// Number.isNaN()参数不是NaN一律返回false
console.log(Number.isNaN(NaN));
console.log(Number.isNaN("NaN"));
// 传统的isFinite()和isNaN()先进行数值转换，再判断，新方法只对数值有效
console.log(isFinite("15"));
console.log(isNaN("NaN"));

// 4.Number.parseInt(),Number.parseFloat()
/**
 * ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，
 * 行为完全保持不变。
 * 目的减少全局性方法，使得语言逐步模块化
 */
console.log(Number.parseInt("12.01"));
console.log(Number.parseFloat("12.01a"));

// 5.Number.isInteger() 用来判断一个数值是否为整数
console.log(Number.isInteger(12.1));
console.log(Number.isInteger(12));
console.log(Number.isInteger(12.0));
console.log(Number.isInteger());
console.log(Number.isInteger(null));
console.log(Number.isInteger("aaa"));
/**
 * 如果参数不是数值，Number.isInteger()返回false
 * 如果数值的绝对值小于Number.MIN_VALUE(5E-324)，
 * 小于JavaScript可以分辨的最小值会被转为0，结果也为true
 * 精度要求高不建议使用Number.isInteger()进行判断
 */
console.log(Number.isInteger(3.0000_0000_0000_0002));
console.log(Number.isInteger(5e-324));
console.log(Number.isInteger(5e-325));

// 6.Number.EPSILON 表示1.00...0001后面连续51个0，减去1表示的值2的-52次方
// 表示JavaScript的最小精度
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 - 0.3);
// Number.EPSILON可以用来设置能够接受的误差范围，误差范围为2的-50次方
Number.EPSILON * Math.pow(2, 2);
console.log(0.1 + 0.2 - 0.3 < Number.EPSILON);

// 7.安全整数和Number.isSafeInteger()
/**
 * JavaScript能够准确表示的整数范围在-2^53到2^53之间（不包含2个端点），
 * 超过
 */
console.log(Math.pow(2, 53));
console.log(Math.pow(2, 53) + 1);
// ES6引入了Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER这两个常量
// 用来表示这个范围的上下限
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
// Number.isSafeInteger()用来判断一个整数是否落在这个范围之内
console.log(Number.isSafeInteger("a"));
console.log(Number.isSafeInteger(1.2));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1));
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER));
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1));
console.log(9007199254740993 - 990);
console.log(9007199254740993 === Math.pow(2, 53));

// 8.Math对象的扩展
// ① Math.trunc()
// Math.trunc()用于去除一个数的小数部分，返回整数部分
console.log(Math.trunc(4.1));
console.log(Math.trunc(-0.2));
console.log(Math.trunc(0.2));

// Math.trunc()对于非数值类型，首先使用Number将参数转为数值
console.log(Math.trunc("123.333"));
console.log(Math.trunc("123.32aaa"));
console.log(Math.trunc(""));
console.log(Math.trunc(null));
console.log(Math.trunc(false));
console.log(Math.trunc(true));

// Math.trunc()对于空值和无法截取整数的值，返回NaN
console.log(Math.trunc("aaa"));
console.log(Math.trunc(NaN));
console.log(Math.trunc());
console.log(Math.trunc(undefined));
console.log(Math.trunc("123.32aaa"));

// 没有Math.trunc()方法的可以用以下的方法代替
function ReplaceMathTrunc(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}
console.log(ReplaceMathTrunc(1.11));

//② Math.sign()
/**
 * Math.sign()用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转为数值
 * 返回5种值
 * 参数为正数，返回+1；
 * 参数为负数，返回-1；
 * 参数为0，返回0；
 * 参数为-0，返回-0；
 * 其他值，返回NaN；
 */
console.log(Math.sign(-3));
console.log(Math.sign(3));
console.log(Math.sign(0));
console.log(Math.sign(-0));
console.log(Math.sign(""));
console.log(Math.sign("aaa"));
console.log(Math.sign(null));
console.log(Math.sign(NaN));
console.log(Math.sign(undefined));
console.log(Math.sign());
// 对于没有部署这个方法的环境，可以用下面的代码模拟
function ReplaceMathSign(x) {
  x = +x; //convert to number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
}
console.log(ReplaceMathSign(111));

//③ Math.cbrt()
/**
 * Math.cbrt()方法用于计算一个数的立方根
 * 对于非数值，Math.cbrt()方法内部也是先使用Number()方法将其转为数值
 */
console.log(Math.cbrt(-1));
console.log(Math.cbrt(0));
console.log(Math.cbrt(27));
console.log(Math.cbrt(1));
console.log(Math.cbrt(2));
console.log(Math.cbrt("hello"));
console.log(Math.cbrt("8"));
console.log(Math.abs(-1));
// 对于没有部署这个方法的环境，可以用下面的方法模拟
function ReplaceMathCbrt(x) {
  var res = Math.pow(Math.abs(x), 1 / 3);
  return x < 0 ? -res : res;
}
console.log(ReplaceMathCbrt(-8));

//④ Math.clz32()
/**
 * Math.clz32()方法将参数转为32位无符号整数的形式，
 * 然后返回这个32位值里面有多少个前导0。
 */
console.log(Math.clz32(0));
console.log(Math.clz32(1));
console.log(Math.clz32(3));
// 左移运算符(<<)与Math.clz32方法直接相关
console.log(Math.clz32(0));
console.log(Math.clz32(1));
console.log(Math.clz32(1 << 1));
console.log(Math.clz32(1 << 2));
console.log(Math.clz32(1 << 31));
// 对于小数，Math.clz32方法只考虑整数部分
console.log(Math.clz32(1.1));
console.log(Math.clz32(3.1));
console.log(Math.clz32(7.9));
// 对于空值或其他类型的值，Math.clz32方法会先转为数值，然后再计算
console.log(Math.clz32());
console.log(Math.clz32(NaN));
console.log(Math.clz32(null));
console.log(Math.clz32(true));

//⑤ Math.imul()
/**
 * Math.imul方法返回两个数以32位带符号整数形式相乘的结果
 * 返回的也是一个32位带符号整数
 */
console.log(Math.imul(2, 4));
console.log(Math.imul(-1, 8));
console.log(Math.imul(-2, -2));

//⑥ Math.fround()
/**
 * Math.fround()方法返回一个数的32位单精度浮点数形式 -2^24~2^24不包含2端
 * 参数绝对值大于2^24就开始丢失精度
 */
console.log(Math.fround(2 ** 24));
console.log(Math.fround(2 ** 24 + 1));
console.log(Math.fround(1.125));
console.log(0.3);
console.log(Math.fround(0.3));

//⑦ Math.hypot()
/**
 * Math.hypot方法返回所有参数的平方和的平方根
 */
console.log(Math.hypot(3, 4));
console.log(Math.hypot(1, 1));
// 参数不是数值先进行数值转换，有一个参数无法转换则返回NaN
console.log(Math.hypot("3", "1"));
console.log(Math.hypot("3", "aa"));
console.log(Math.hypot(true));
console.log(Math.hypot(NaN));

//⑧ 对数方法
// ES6新增了4个相关方法
/**
 * (1)Math.expm1()
 * Math.expm1(x)返回e^x-1，即Math.exp(x)-1
 */
console.log(Math.expm1(0));
console.log(Math.expm1(-1));
console.log(Math.expm1(1));
/**
 * (2)Math.log1p()
 * Math.log1p(x)方法返回1+x的自然对数，即Math.log(1+x)。
 * 如果x小于-1，返回NaN
 */
console.log(Math.log1p(1));
console.log(Math.log1p(-1));
console.log(Math.log1p(0));
console.log(Math.log1p(-2));
console.log(Math.log1p(3));
console.log(Math.log1p(Math.exp(1) - 1));
/**
 * (3)Math.log10()
 * Math.log10(x)方法返回以10为底的x的对数，如果x小于0，则返回NaN
 * 没有部署这个方法的，可以使用Math.log(x)/Math.LN10代替
 */
console.log(Math.log10(2));
console.log(Math.log10(1));
console.log(Math.log10(0));
console.log(Math.log10(-2));
console.log(Math.log10(100));
console.log(Math.log(10) / Math.LN10);
/**
 * (4)Math.log2()
 * Math.log2(x)返回以2为的x的对数。如果x小于0返回NaN
 * 没有部署这个方法的，可以使用Math.log(x)/Math.LN2代替
 */
console.log(Math.log2(3));
console.log(Math.log2(1));
console.log(Math.log2(8));
console.log(Math.log2(-1));
console.log(Math.log2(0));
console.log(Math.log2(2));
console.log(Math.log(16) / Math.LN2);

/**
 * 双曲函数方法
 * ES6新增了6个双曲函数方法
 */
// 正弦
console.log(Math.sinh(0.5));
// 余弦
console.log(Math.cosh(30));
// 正切
console.log(Math.tanh(30));
// 反正弦
console.log(Math.asinh(0.5));
// 反余弦
console.log(Math.acosh(30));
// 反正切
console.log(Math.atanh(30));

//⑨ BigInt数据类型
// 超过 53 个二进制位的数值，无法保持精度
console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1); // true
// 超过 2 的 1024 次方的数值，无法表示
console.log(Math.pow(2, 1024)); // Infinity
// 为了解决以上的问题ES2020引入了BigInt数据类型，只用来表述整数没有位数限制
const a = 2172141653n;
const b = 15346349309n;
// BigInt可以保持精度
console.log(a * b);
// 普通整数无法保持精度
console.log(Number(a) * Number(b));
// 为了和Number类型区别，BigInt类型的数据必须添加后缀n，各种进制数也同样适用。
1234; // 普通整数
1234n;
console.log(1n + 2n);
// BigInt与普通整数是两种值，它们之间并不相等。
console.log(42n === 42);
// typeof运算符对于BigInt类型的数据返回bigint。
console.log(typeof 123n);
// BinInt只能用负号(-)号不能用正号(+)，因为会与asm.js冲突
console.log(-42n);
//console.log(+42n)
// JavaScript以前不能计算70的阶乘(即70!)
let p = 1;
for (let i = 1; i <= 70; i++) {
  p *= i;
}
console.log(p)
// 现在支持大整数了，就可以算
let pn = 1n;
for (let iN = 1n; iN <= 70n; iN++) {
  pn *= iN;
}
console.log(pn)

//⑩ BigInt函数
//
