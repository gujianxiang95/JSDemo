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
            this.err_data = err
            this.status = REJECTED
            this.queue.forEach(function(item) {
                item.reject(err);
            });
        }
    }
    resolve(val) {
        setTimeout(()=>{
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
        })
    }
    reject(err) {
        setTimeout(()=>{
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
        })
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
                let returnVal = null
                // console.log('returnval' ,returnVal)
                // return
                if(onFulFilled instanceof Function ){
                    try {
                        returnVal = onFulFilled(val) || val
                    } catch (error) {
                        reject(error)
                        return
                    }
                }
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
                    try{
                        let returnVal = onRejected(val) || val
                    }catch(err){
                        rejFn(err);
                        return;
                    }
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

MyPromise.resolve = function (arg){
    if( typeof arg === undefined || arg === null ){
        return new MyPromise((resolve,reject)=>{
            resolve(arg)
        })
    }else if(arg instanceof MyPromise){
        return arg
    }else if(arg['then'] instanceof Function){
        return new MyPromise((resolve,reject)=>{
            arg.then(res=>{
                resolve(res)
            },err=>{
                rejected(err)
            })
        })
    }else {
        return new MyPromise((resolve,reject)=>{
            resolve(arg)
        })
    }
}
MyPromise.reject = function(err){
    return new MyPromise((resolve,reject)=>{
        reject(arg)
    })
}
MyPromise.all = function(arr){
    if(!Array.isArray(arr) || arr.length ===0 ){
        throw new Error('参数不行啊')
    }
    return new MyPromise((resolve,reject)=>{
        let i=0,result = [];
        next()
        function next(){
            MyPromise.resolve(arr[i]).then(res=>{
                result.push(res);
                i++;
                if( i===arr.length ){
                    resolve(result)
                }else{
                    next()
                }
            })
        }
    })
}
MyPromise.race = function(arr){
    let done = false;
    return new MyPromise((resolve,reject)=>{
        arr.forEach(item=>{
            MyPromise.resolve(item).then(res=>{
                if(!done){
                    done = true
                    resolve(res)
                }
            },err=>{
                if(!done){
                    done = true
                    reject(err)
                }
            })
        }) 
    })
}
MyPromise.catch = function(err) {
    return this.then(undefined, err)
}
MyPromise.finally = function(handleFinal) {
    return this.then(handleFinal, handleFinal)
}

// //验证异步 then 链式调用
// new MyPromise((resolve,rejected)=>{
//     setTimeout(()=>{
//         console.log(1000)
//         resolve(4)
//     },1000)
// }).then(res=>{
//     return new MyPromise((resolve,rejected)=>{
       
//     })
// }).then(res=>{
//     // console.log('latest')
// })

// //验证 myresolve功能
// MyPromise.resolve(12312).then(res=>{
//     console.log(res)
// })

// 验证promise.all功能
// let timer1 = new MyPromise((resolve,rejected)=>{
//     setTimeout(()=>{
//         resolve(1000)
//     },1000)
// })
// let timer2 = new MyPromise((resolve,rejected)=>{
//     setTimeout(()=>{
//         resolve(2000)
//     },2000)
// })
// let timer3 = new MyPromise((resolve,rejected)=>{
//     setTimeout(()=>{
//         resolve(3000)
//     },3000)
// })

// MyPromise.race([timer1, timer2, timer3]).then(res=>{
//     console.log('res',res)
// })