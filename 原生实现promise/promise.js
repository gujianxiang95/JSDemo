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
    then(onFulFilled, onRejected) {
        let that = this
        return new MyPromise((resFn,rejFn)=>{
            if( that.status === FULFILLED ){
                handleFulFilled(that.succ_data)
            }else if(that.status === FULFILLED){
                handleRejected(that.err_data)
            }else {
                that.queue.push({resolve:handleFulFilled, reject:handleRejected})
            }
            function handleFulFilled(val){
                let returnVal = onFulFilled instanceof Function && onFulFilled(val) || val
                // console.log('returnval' ,returnVal)
                // return
                if(returnVal['then'] instanceof Function){
                    returnVal.then(res=>{
                        resFn(res)
                    },err=>{
                        rejFn(err)
                    })
                }else {
                    resFn(returnVal)
                }
            }
            function handleRejected(val){
                if(onRejected instanceof Function ){
                    let returnVal = onFulFilled instanceof Function && onFulFilled(val) || val
                    if(returnVal['then'] instanceof Function){
                        returnVal.then(res=>{
                            resFn(res)
                        },err=>{
                            rejFn(err)
                        })
                    }else {
                        resFn(returnVal)
                    }
                }else {
                    rejFn(val)
                }
            }
        })
    }    
}



new MyPromise((resolve,rejected)=>{
    setTimeout(()=>{
        console.log(1000)
        resolve(4)
    },1000)
}).then(res=>{
    return new MyPromise((resolve,rejected)=>{
       
    })
}).then(res=>{
    // console.log('latest')
   
})