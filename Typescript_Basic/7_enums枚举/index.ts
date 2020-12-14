
enum Direction {
    Up,
    Down,
    Left,
    Right
}
//枚举成员会自动被赋值为0,1,2,3,4……
console.log(Direction.Up)
console.log(Direction.Down)
console.log(Direction.Left)
console.log(Direction.Right)
console.log(Direction[0])

// 手动赋值

enum Direction1 {
    Up = 10,
    Down, //Down为11
    Left, //Left为13
    Right //Right为14
}

const enum Direction2 {
    Up = 'Up',
    Down = 'Down', //Down为11
    Left = 'Left', //Left为13
    Right = 'Right' //Right为14
}

