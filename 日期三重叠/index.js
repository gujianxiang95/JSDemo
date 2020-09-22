// 实现一个日程安排函数，可以不断地登记行程安排，但不允许时间上出现三重重叠
// *三重重叠的含义为：有某个日期，同时被三次登记覆盖到
// *不考虑不同月份，并且假定每个月都是 31 天

// const mySchedule = new Calendar();
// mySchedule.book(1, 10) true
// mySchedule.book(8, 14) true (8-10 双重重叠)
// mySchedule.book(22, 30) true
// mySchedule.book(2, 9) false (8-9 三重重叠)
// mySchedule.book(18，20) true

function mySchedule (){
    let schedule = new Array(32).fill(0)
    let threeDateArrReal = [] // 三次重叠数组
    let twoDateArrReal = [] // 三次重叠数组
    return function testMySchedule(d1, d2){
        let scheduleArr = JSON.parse( JSON.stringify(schedule) )
        for(let i=d1; i<=d2; i++){
            scheduleArr[i]++
        }
        if(scheduleArr.includes(3) ){ //发现三次重叠
            let threeDateArr = [] // 三次重叠数组
            for(let i=0;i<scheduleArr.length;i++){
                if(scheduleArr[i] === 3){
                    threeDateArr.push(i)
                    while(scheduleArr[i+1] === 3 ){
                        threeDateArr.push(i+1)
                        i++
                    }
                    threeDateArrReal.push(threeDateArr)
                    threeDateArr = []
                }
            }
            let val = ''
            threeDateArrReal.map((item,index)=>{
                if(item.length>=2){
                    val +=item[0]+'-'+item[item.length-1]+' '
                }else{
                    val +=item[0]+' '
                }
            })
            val+='三重叠'
            console.log('val',val)
            console.log('threeDateArrReal',threeDateArrReal)
            threeDateArrReal = []
            return val
        }else{
            schedule = JSON.parse( JSON.stringify(scheduleArr) )
        }
        if(scheduleArr.includes(2) ){
            let twoDateArr = [] // 二次重叠数组
            for(let i=0;i<scheduleArr.length;i++){
                if(scheduleArr[i] === 2){
                    twoDateArr.push(i)
                    while(scheduleArr[i+1] === 2 ){
                        twoDateArr.push(i+1)
                        i++
                    }
                    twoDateArrReal.push(twoDateArr)
                    twoDateArr = []
                }
            }
            let val = ''
            twoDateArrReal.map((item,index)=>{
                if(item.length>=2){
                    val +=item[0]+'-'+item[item.length-1]+' '
                }else{
                    val +=item[0]+' '
                }
            })
            val+='二重叠'
            console.log('val',val)
            console.log('twoDateArr',twoDateArrReal)
            twoDateArrReal = []
            return val
        }
    }
}

let volite = mySchedule()
volite(1,5)
volite(8,10)
volite(3,8)
volite(4,8)
