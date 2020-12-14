function add(x: number, y: number):number{
    return x + y
}

add(1,2,3)//×error: 不能多加参数

let result = add(1,2)

//如何实现可选参数

function add2(x: number, y: number, z?:number ):number{
    if( typeof z === 'number'){
        return x+y+z
    }
    return x + y
}

// 声明函数类型
let add3:(x: number, y: number, z?:number )=>number = add 

// 使用interface描述函数
interface ISum {
    (x: number, y: number, z?:number ):number
}
let add4:ISum = (x: number, y: number):number{
    return x + y
}