interface IPerson {
    name:string;
    age:number;
    tel?:number;//?可选 代表  (不强制实现该属性)
    readonly id?:number; //readonly只读，赋值后不可改变
}

let viking:IPerson = {
    name: 'viking',
    age:20,

}