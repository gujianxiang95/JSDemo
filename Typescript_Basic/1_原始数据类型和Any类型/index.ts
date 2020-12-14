let isDOne:boolean = false
let age:number = 10
let firstName:string = "顾哥哥"
let msg:string = `hello, ${firstName}`
let u:undefined = undefined
let n:null = null
let getName:Object = (name:String)=>{
    console.log(name)
}


//未明确类型是使用any
let notsure:any = 4
notsure = '猪猪'
notsure = null
notsure = undefined
notsure = getName