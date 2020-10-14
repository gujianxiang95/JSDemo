const PENDDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

class MyPromise {
    constructor(callBack) {
        this.status = PENDDING
        this.succ_data = undefined
        this.err_data = undefined
        this.then = this.then.bind(this) //绑定下this指向， 类比较特殊
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
        this.queue = [] //存储任务队列
        try{
            callBack(this.resolve, this.reject)
        }catch(err){
            this.reject(err)
        }
    }
    resolve(val) {
        if (this.status !== PENDDING) { //状态只能从PENDDING而来
            return false 
        }
        this.succ_data = val //存储成功数据
        this.status = FULFILLED // 改变状态，处理ok
        if( this.queue.length > 0 ){
            this.queue.map((item,index)=>{
                item.resolve(val)
            })
        }
    }
    reject(err) {
        if (this.status !== PENDDING) { //状态只能从PENDDING而来
            return false 
        }
        this.err_data = err //存储失败数据
        this.status = REJECTED // 改变状态，处理ok
        if( this.queue.length > 0 ){
            this.queue.map((item,index)=>{
                item.resolve(err)
            })
        }
    }
    then(onFulFilled, onRejected ){
        if(this.status === FULFILLED){
            onFulFilled(this.succ_data)
        }else if(this.status === REJECTED){
            onRejected(this.err_data)
        }else{
            this.queue.push({resolve:onFulFilled,reject:onRejected})
        }
    }    
}

new MyPromise((resolve, reject) => {
    setTimeout(()=>{
        resolve(222);
    },2000)
}).then(res => {
    console.log('res',res);
});
