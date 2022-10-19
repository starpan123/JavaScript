// 1.RegExp构造函数
// 参数是字符串时，第二个参数表示正则表达式的修饰符(flag)
let regex = new RegExp("xyz", "i");
console.log(regex);
// 参数时正则表达式
let regex1 = new RegExp(/wxyz/i);
console.log(regex1);
// es5这种写法会报错
let regex2 = new RegExp(/xyz/, "i");
console.log(regex2);
let regex3 = new RegExp(/xyz/gi, "i");
console.log(regex3);

// 2.u修饰符
// 添加u之后会将\uD83D\uDC2A识别为一个字符，所以结果为false
console.log(/^\uD83D/u.test("\uD83D\uDC2A"));
// es5将\uD83D\uDC2A识别为2个字符，使用匹配成功结果为true
console.log(/^\uD83D/.test("\uD83D\uDC2A"));
// (1)点字符
/**
 * .正则表达式中含义是除了换行符以外的任意单个字符，
 * 对于码点大于0xFFFF的Unicode
 * 必须加上u修饰符才能识别
 * */
var s = "𠮷";
console.log(/^.$/.test(s));
console.log(/^.$/u.test(s));

// (2)Unicode 字符表示法
/**
 * Unicode增加了{}表示法，正则表达式这种表示必须加上u修饰符，
 * 才能识别当中的{}，否则会被解读为量词
 * */
console.log(/\u{61}/.test("a"));
console.log(/\u{61}/u.test("a"));
console.log(/\u{20BB7}/u.test("𠮷"));

// (3)量词
/**
 * 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的Unicode字符
 */
console.log(/a{2}/.test("aa"));
console.log(/a{2}/u.test("aa"));
console.log(/𠮷{2}/.test("𠮷𠮷"));
console.log(/𠮷{2}/u.test("𠮷𠮷"));

// (4)预定义模式
/**
 * u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的Unicode字符
 * \S匹配所有非空白字符，只有加了u修饰符才能正确匹配码点大于0xFFFF的Unicode字符
 */
console.log(/^\S$/.test("𠮷"));
console.log(/^\S$/u.test("𠮷"));

// (5)i修饰符
// 有些Unicode字符的编码不同，但是字型很相近，比如，\u0048与\u212A都是K
// 不加u修饰符无法识别非规范的K字符
console.log(/[a-z]/i.test("\u212A"));
console.log(/[a-z]/iu.test("\u212A"));

// (6)转义
/**
 * 没有u修饰符的情况下，正则中没有定义的转义(如逗号的转义\，)无效，
 * 而在u模式会报错
 */
console.log(/\,/);
// console.log(/\,/u)

// 4.RegExp.prototype.unicode属性
// 正则实例对象新增unicode属性，表示是否设置了u修饰符
const r1 = /hello/;
const r2 = /hello/u;
console.log(r1.unicode);
console.log(r2.unicode);

// 5.y修饰符与g不同需要从头部开始匹配，粘连修饰符
var s = "aaaa_aa_a";
var r = /a+/g;
var ry = /a+/y;
console.log(r.exec(s));
console.log(ry.exec(s));
console.log(r.exec(s));
console.log(ry.exec(s));

// 5.RegExp.prototype.sticky属性
// 表示是否设置了y修饰符
var rss = /hello\d/y;
console.log(rss.sticky);

// 6.RegExp.prototype.flags属性
// 返回正则表示修饰符
// source返回表达式正文
console.log(/abc/gi.source);
// flags返回表达式修饰符
console.log(/abc/gi.flags);

// 7.s修饰符：dotAll模式
// .不匹配\n
console.log(/foo.bar/.test("foo\nbar"));
// [^]可以匹配\n
console.log(/foo[^]bar/.test("foo\nbar"));
// ES2018引入s修饰符，使得.可以匹配任意单个字符
console.log(/foo.bar/s.test("foo\nbar"));
// 被称为dotAll模式
const re = /foo.bar/s;
// 另外一种写法
// const re = new RegExp('foo.bar','s')
console.log(re.test("foo\nbar"));
console.log(re.dotAll);
console.log(re.flags);

// 8.后行断言
// 先行断言：必须写成/x(?=y)/ 只匹配%之前的数字，写成/\d+(?=%)/
// 先行否定断言：必须写成/x(?!y)/ 只匹配不在%之前的数字，写成/\d+(?!%)/
console.log(/\d+(?=%)/.exec("100% aaaa_aa_a"));
console.log(/\d+(?!%)/.exec("100 88sss"));
// 后行断言：必须写成/(?<=y)x/ 只匹配$之后的数字，写成/(?<=\$)\d+/
// 后行否定断言：必须写成/(?<!y)x/ 只匹配不在$之后的数字，写成/(?<!\$)\d+/
console.log(/(?<=\$)\d+/.exec("100$333 555 aaaa_aa_a"));
console.log(/(?<!\$)\d+/.exec("100$ 88sss"));

// 9.Unicode属性类 \p{...}和\P{...}(\P是\p的否定形式)

// 10.v 修饰符：Unicode 属性类的运算

// 11.具名组匹配
// 正则表达式使用圆括号进行组匹配
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
const matchObj = RE_DATE.exec("2022-10-18");
console.log(matchObj);
// ES2018引入具名组匹配，允许为每一个组匹配指定一个码字，便于阅读代码，又便于引用
const date = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const matchDateObj = date.exec("2022-10-18");
console.log(matchDateObj);

// 解构赋值和替换
// 有了具名组匹配以后，可以使用解构赋值直接从匹配结果上为变量解构
let {
  groups: { one, two },
} = /^(?<one>.*):(?<two>.*)$/u.exec("foo:bar");
console.log(/^(?<one>.*):(?<two>.*)$/u.exec("foo:bar"));
console.log(one);
console.log(two);
// 字符串替换时，使用$<组名>引用具名组
let ress = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u
console.log('2022-10-19'.replace(ress, '$<day>/$<month>'))

// 引用
// 正则表达式内部使用某个"具名组匹配"，可以使用\k<组名>或者(\1) 的写法
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
console.log(RE_TWICE.exec('aaa!aaa'))
console.log(RE_TWICE.test('aaa!aaa'))
console.log(RE_TWICE.test('aaa!aa'))

// 12.d修饰符：正则匹配索引
/**
 * ES2022之前 组匹配exec()方法只能获取开始位置index，不能获取结束位置
 * ES2022新增d修饰符
 * 让exec()多了一个属性indices能获取到匹配结果的开始位置和结束位置集合
 *  */
