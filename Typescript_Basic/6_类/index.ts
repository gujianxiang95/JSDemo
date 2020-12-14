// 类（class）定义了一切事物的抽象特点
// 对象（Object） 类的实例
// 面向对象

//public private protected protected子类可以访问方法
 
//接口对类的内容抽象
//累可以使用implements实现接口
//1、比如某些类中存在某些共性
class Car{
    switchRadio(trigger: Boolean){
    }
}
class Radio {
    switchRadio(trigger: Boolean){

    }
}
//2、抽离出switchRadio特性
interface Radios {
    switchRadio(trigger: Boolean): void
}
//类实现 接口
class Cellphone implements Radios {
    switchRadio(trigger: Boolean){
    }
}
//继承多个接口
interface Radios1 {
    switchRadio1(trigger: Boolean): void
}
interface Radios2 {
    switchRadio2(trigger: Boolean): void
}
class Cellphone1 implements Radios1,Radios2 {
    switchRadio1(trigger: Boolean){
    }
    switchRadio2(trigger: Boolean){
    }
}
//接口继承接口
interface Radios3 extends Radios1 {
    switchRadio2(trigger: Boolean){
    }
}