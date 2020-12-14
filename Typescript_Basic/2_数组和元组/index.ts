let arrOfNumbers:number[] = [1,2,3,'123'] //不可，元素必须为number
arrOfNumbers.push('123')//不可，进入元素必须为number

//元组
let user:[string,number] = ['111',111]
user.push('111') //仅能添加已定义类型其中一种
user.push(22)
user.push(undefined)//不可，进入元素必须为string/number
