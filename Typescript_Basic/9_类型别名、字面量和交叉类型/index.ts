//类型别名
type PlusType = (x:number,y:number)=> number
let sum2:PlusType
const res = sum2(2,3)

//字面量 可以限制常量范围
const number:1 = 1
type Directions = 'up' | 'dowm'
let toWhere: Directions = 'up'

//交叉类型
interface  IName {
    name: string
}
type IPerson = IName & {
    age:number
}
let person:IPerson = {
    name:'hu',
    age: 11
}

