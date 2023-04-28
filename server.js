var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")

app.use(express.static("."));



app.get('/', function (req, res) {
        res.redirect('index.html');
});

server.listen(3000, function () {
        console.log("server is run")
});

function matrixGenerator(matrixSize, grass, grassEater, predator, flower, rabbit, water, fire) {
        var matrix = []
        ////  matrix սարքելու հատված
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([])
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0)
                }
        }

        // 1 -եր այսինքն խոտեր քցելու հատված մատռիքսում
        for (let i = 0; i < grass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 1
        }
        //GrassEater 2

        for (let i = 0; i < grassEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 2
        }
        //3 predator


        for (let i = 0; i < predator; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 3
        }

        //4 flower


        for (let i = 0; i < flower; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 4
        }

        //5 rabbit


        for (let i = 0; i < rabbit; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 5
        }
        //6 water

        for (let i = 0; i < water; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 6
        }
        //7 fire

        for (let i = 0; i < water; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 7
        }


        /////







        return matrix
}

matrix = matrixGenerator(25, 17, 5, 10, 50, 5, 1, 1)

io.sockets.emit('send matrix', matrix)

grassArr = []
grassEaterArr = []
predatorArr = []
flowerArr = []
rabbitArr = []
waterArr = []
fireArr = []

Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Fire = require("./fire")
Water = require("./water")
Flower = require("./flower")
Rabbit = require("./Rabbit")

function createObject() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if (matrix[y][x] == 2) {
                                let grEat = new GrassEater(x, y)
                                grassEaterArr.push(grEat)
                        } else if (matrix[y][x] == 3) {
                                let pre = new Predator(x, y)
                                predatorArr.push(pre)
                        } else if (matrix[y][x] == 4) {
                                let flow = new Flower(x, y)
                                flowerArr.push(flow)
                        } else if (matrix[y][x] == 5) {
                                let rab = new Rabbit(x, y)
                                rabbitArr.push(rab)
                        } else if (matrix[y][x] == 6) {
                                let wat = new Water(x, y)
                                waterArr.push(wat)
                        } else if (matrix[y][x] == 7) {
                                let fir = new Fire(x, y)
                                fireArr.push(fir)
                        }


                }
        }
        io.sockets.emit('send matrix', matrix)

}


function game() {
        for (let i in grassArr) {
                grassArr[i].mul()
        }
        for (let i in grassEaterArr) {
                grassEaterArr[i].eat()
        }
        for (let i in predatorArr) {
                predatorArr[i].eat()
        }
        for (let i in flowerArr) {
                flowerArr[i].eat()
        }
        for (let i in rabbitArr) {
                rabbitArr[i].eat()
        }
        for (let i in rabbitArr) {
                rabbitArr[i].die()
        }
        for (let i in waterArr) {
                waterArr[i].mul()
        }
        for (let i in fireArr) {
                fireArr[i].mul()
        }
        for (let i in waterArr) {
                waterArr[i].eat()
        }
        for (let i in fireArr) {
                fireArr[i].eat()
        }
        io.sockets.emit('send matrix', matrix)

}


setInterval(game,300)

io.on("connection",function(){
        createObject()
})

//sds