//类型推论 在初始赋值未指定类型是会推测一个类型

let str = '123'
str = 1213 //error:已被推测为字符串，不可赋值为数字

//union types | 在未确定类型时，只能访问联合类型共有属性或方法
let numberOrString : number | string
numberOrString = 'abc'
numberOrString = 123

//类型断言 使用as指定联合类型中的变量类型  , 且编译器不应该报错
//可以使用typeof instance判断数据类型，提高代码容错率
function getLength(input : string | number):number{
    const str = input as string
    if(str.length){
        return str.length
    }else {
        const number  = input as number
        return number.toString().length
    }
}
