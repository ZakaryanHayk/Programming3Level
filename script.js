
let side = 30
///օբյեկտներ պահելու զանգվածներ
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var flowerArr = []
var rabbitArr = []
var waterArr = []
var fireArr = []


function setup() {
        frameRate(15)
        createCanvas(matrix[0].length * side, matrix.length * side)
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if(matrix[y][x] == 2){
                             let grEat = new  GrassEater(x,y)
                             grassEaterArr.push(grEat)
                        }else if(matrix[y][x] ==  3){
                             let pre = new Predator(x,y)
                             predatorArr.push(pre)
                        }else if(matrix[y][x] == 4){
                                let flow = new Flower(x,y)
                                flowerArr.push(flow)
                        }else if(matrix[y][x] == 5){
                                let rab = new Rabbit(x,y)
                                rabbitArr.push(rab)
                        }else if(matrix[y][x] == 6){
                                let wat = new Water(x,y)
                                waterArr.push(wat)
                        }else if(matrix[y][x] == 7){
                                let fir = new Fire(x,y)
                                fireArr.push(fir)
                        }


                }
        }

}


function draw() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                fill("green")
                        } else if(matrix[y][x] == 2){
                                fill ("yellow")
                        }else if(matrix[y][x] == 3){
                                fill ("red")
                        }else if(matrix[y][x] == 4){
                                fill ("violet")
                        }else if(matrix[y][x]== 5){
                                fill("white")
                        }else if(matrix[y][x]==6){
                                fill("aqua")
                        }else if(matrix[y][x]==7){
                                fill("orange")
                        }
                              
                        
                        
                        else {
                                fill("gray")
                        }
                        rect(x * side, y * side, side, side)

                }
        }



                for (let i in grassArr) {
                        grassArr[i].mul()
                }


                for(let i in grassEaterArr){
                        grassEaterArr[i].eat()
                }

             

                for(let i in predatorArr){
                        predatorArr[i].eat()
                }
 

                for(let i in flowerArr){
                        flowerArr[i].eat()
                }
                for(let i in rabbitArr){
                        rabbitArr[i].eat()
                }
                for(let i in rabbitArr){
                        rabbitArr[i].die()
                }
                for(let i in waterArr){
                        waterArr[i].mul()
                }
                for(let i in fireArr){
                        fireArr[i].mul()
                }
                for(let i in waterArr){
                        waterArr[i].eat()
                }
                for(let i in fireArr){
                        fireArr[i].eat()
                }
                
                
                
 

        }



