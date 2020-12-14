//一、泛型<> T相当于占位符，可以更改。使用的时候指定类型即可

function echo<T>(arg: T): T {{
    return arg
}}

const val:string = 'str'
let res1 = echo(val)

//也可以根据类型推断直接传值
let res2 = echo(123)

function swqp<T,u>(tuple:[T,u]): [u,T]{
    return [tuple[1] , tuple[0]]
}

//二、约束泛型
//在函数内部，由于不清楚函数类型某些方法无法使用,可以通过对泛型做出约束解决
function echoWithArr<T>(arg: T): T {
    console.log(arg.length) //errror，不清楚arg类型，无法使用length
    return arg
}
//解决方案 只允许包含length属性的值传入
interface IWithLength {
    length: number
}
function echoWithArr2<T extends IWithLength>(arg: T): T {
    console.log(arg.length) //errror，不清楚arg类型，无法使用length
    return arg
}
//三、泛型在类和接口中的使用
class Queue <T>{
    private data = []
    push(item: T){
        return this.data.push(item)
    }

}
const queue = new Queue<number>() //希望传入的是number类型

interface IKeyPair<T,U> {
    key: T,
    val: U
}
let kp1:IKeyPair<number,string> = {
    key:1,
    val:'str'
}
