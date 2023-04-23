/*
 * @Author: pan m13110032289@163.com
 * @Date: 2023-03-02 17:47:46
 * @LastEditors: pan m13110032289@163.com
 * @LastEditTime: 2023-04-12 14:27:08
 * @FilePath: \ES6\src\11.operator\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 1.指数运算符
// ES2016新增了一个指数运算符(**)
console.log(2 ** 2)
console.log(2 ** 3)

// 该运算符是右结合，多个指数运算符连用时，从最右边开始计算
console.log(2 ** 3 ** 2)
// 等价于
console.log(2 ** (3 ** 2))

// 指数运算符也可以与等号结合，形成一个新的赋值运算符（**=）
let a = 1.5
a **= 2
// 等同于 a = a * a

let b = 4
b **= 3
// 等同于 b = b * b * b

// 2.链判断运算符
// 获取对象内部属性，需要逐层判断，属性的上层对象是否存在。
// 比如为了读取message.body.user.name属性
// 错误的写法
// const name = message.body.user.name || 'default'
// 正确的写法
let message
const nameRight = (message && message.body && message.body.user &&
  message.body.user.name) || 'default'
console.log(nameRight)
// 上面name属性在对象的第四层，所以需要判断四次，每层是否有值。
// 三元运算符?:也常用于判断对象是否存在
// const fooInput = myForm.querySelector('input[name=foo]')
// const fooValue = fooInput ? fooInput.value : undefined
// 上述的都需要层层判断非常麻烦，因此ES2020引入了"链判断运算符"?.，简化上面的写法
const userName = message?.body?.user?.userName || 'default'
//const fooValue = myForm.querySelector('input[name=foo]')?.value
console.log(userName)
//（1）短路机制
// 本质上，?.运算符相当于一种短路机制，只要不满足条件，就不再往下执行
// a?.[++x]
// 等同于  a == null ? undefined : a[++x]

//（2）括号的影响
// 如果属性链有圆括号，链判断运算符对圆括号外部没有影响，只对圆括号内部有影响
// (a?.b).c
// 等价于 (a == null ? undefined : a.b).c

//（3）报错场合
// 以下写法是禁止的，会报错
// 构造函数
// 