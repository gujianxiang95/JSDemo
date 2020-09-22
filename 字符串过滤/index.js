// 写一个算法 实现一个字符串的规则解析：
// 例子：a(b)<2>c 输出：abbc，
// a(b(c)<3>de)<2>f 输出abcccdebcccdef；
// ()代表重复内容，<>代表重复的次数
function handleStr (str) {
    let val = ''
    let beginIndex = null
    let endIndex =null
    for( let i = 0; i < str.length; i++ ){
        let char = str.charAt(i)
        // if( beginIndex || beginIndex === 0  ){ //如果输入了其实位置，且循环到了起始位置之间 跳过本次循环
        //     if( i<=endIndex  && i>=beginIndex ){  //可以更改i 不需要你啦
        //         continue
        //     }
        // }
        if( char === '(' ){      //是否遇到左括号
            beginIndex = i
            endIndex = beginIndex + 1   //也许空括号+1检查
            let leftpartTimes = 1      //左括号数量
            let rightpartTimes = 0      //右括号数量
            while( leftpartTimes !== rightpartTimes ){  //左右括号数量相等=>确定括号位置匹配成功
                if( str.charAt(endIndex) === '(' ){   
                    leftpartTimes++
                }
                if( str.charAt(endIndex) === ')' ){
                    rightpartTimes++
                }
                endIndex++
            }
            endIndex-- // 减去多加的1
            let index1= beginIndex+1
            let index2= endIndex
            let params = str.substring(index1, index2)
            let repeatStr = handleStr(params)  
            let repactTimes = parseInt(str.charAt(index2+2)) 
            val += repeatStr.repeat( repactTimes )
            i = endIndex + 3 //跳过不需要遍历的字符串遍历
        }else{
            val +=char
        }
    }
    return val
}
console.log('a(b(c)<3>de)<2>f',handleStr('a(b(c)<3>de)<2>f'))
console.log('a(b)<2>c(dd)<2>e',handleStr('a(b)<2>c(dd)<2>e'))
console.log('a(b)<2>c(dd)<2>(e)<2>f',handleStr('a(b)<2>c(dd)<2>(e)<2>f'))
console.log('a(b(c)<3>de(gg)<2>)<2>f',handleStr('a(b(c)<3>de(gg)<2>)<2>f'))
