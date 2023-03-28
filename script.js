
var CANVAS;
var CONTEXT;
var SCOREBOARD;
var Score = 0;

var BlockSize = 20;
var BlockBorder = 2;

var WindowWidth = 400 + BlockBorder;
var WindowHeight = 400 + BlockBorder;

var Food;
var SnakeHead;
var SnakeBody = [];



window.onload = function() {

    CANVAS = document.getElementById("GameSpace");
    CONTEXT = CANVAS.getContext("2d");
    CANVAS.width = WindowWidth;
    CANVAS.height = WindowHeight;
    SCOREBOARD = document.getElementById("ScoreBoard");

    document.addEventListener("keyup",PlayerMove);

    setFoodLocation();
    updateScore();

    SnakeHead = {
        X: BlockSize * 2,
        Y: BlockSize * 2,
        XV: 1,
        YV: 0
    }


    setInterval(updateGameSpace,1000/10);
}

function setFoodLocation() {
    Food = {
        X: Math.floor(Math.random() * WindowWidth/BlockSize) * BlockSize,
        Y: Math.floor(Math.random() * WindowHeight/BlockSize) * BlockSize
    }
}

function updateScore() {
    SCOREBOARD.innerHTML = "Score: " + Score;
}

function PlayerMove(e) {
    if (e.code == "ArrowUp") {
        SnakeHead.XV = 0;
        SnakeHead.YV = -1;
    }
    if (e.code == "ArrowDown") {
        SnakeHead.XV = 0;
        SnakeHead.YV = 1;
    }
    if (e.code == "ArrowLeft") {
        SnakeHead.XV = -1;
        SnakeHead.YV = 0;
    }
    if (e.code == "ArrowRight") {
        SnakeHead.XV = 1;
        SnakeHead.YV = 0;
    }
}

function AutoSnakeMove() {
    if (Food.Y < SnakeHead.Y) {
        SnakeHead.XV = 0;
        SnakeHead.YV = -1;
    }
    if (Food.Y > SnakeHead.Y) {
        SnakeHead.XV = 0;
        SnakeHead.YV = 1;
    }
    if (Food.X < SnakeHead.X) {
        SnakeHead.XV = -1;
        SnakeHead.YV = 0;
    }
    if (Food.X > SnakeHead.X) {
        SnakeHead.XV = 1;
        SnakeHead.YV = 0;
    }
}


function updateGameSpace(){

    CONTEXT.fillStyle = "black";
    CONTEXT.fillRect(0,0,WindowWidth,WindowHeight);

    for (var i = 0; i < WindowWidth; i+=BlockSize) {
        for (var j = 0; j < WindowHeight; j+=BlockSize) {
            CONTEXT.fillStyle = "darkslategrey";
            CONTEXT.fillRect(i+BlockBorder,j+BlockBorder,BlockSize-BlockBorder,BlockSize-BlockBorder);
        }
    }

    for (var i = SnakeBody.length - 1; i > 0; i--) {
        SnakeBody[i].X = SnakeBody[i-1].X;
        SnakeBody[i].Y = SnakeBody[i-1].Y;
    }
    if(SnakeBody.length) {
        SnakeBody[0].X = SnakeHead.X;
        SnakeBody[0].Y = SnakeHead.Y;
    }
    AutoSnakeMove();
    SnakeHead.X += SnakeHead.XV * BlockSize;
    SnakeHead.Y += SnakeHead.YV * BlockSize;

    if(SnakeHead.X == Food.X && SnakeHead.Y == Food.Y) {
        Score += 1;
        updateScore();
        setFoodLocation();
        SnakeBody.push({X: SnakeHead.X, Y: SnakeHead.Y});
    }

    CONTEXT.fillStyle = "greenyellow";
    CONTEXT.fillRect(SnakeHead.X+BlockBorder,SnakeHead.Y+BlockBorder,BlockSize-BlockBorder,BlockSize-BlockBorder);

    for (var i = 0; i < SnakeBody.length; i++) {
        CONTEXT.fillStyle = "greenyellow";
        CONTEXT.fillRect(SnakeBody[i].X+BlockBorder,SnakeBody[i].Y+BlockBorder,BlockSize-BlockBorder,BlockSize-BlockBorder);
    }

    CONTEXT.fillStyle = "red";
    CONTEXT.fillRect(Food.X+BlockBorder,Food.Y+BlockBorder,BlockSize-BlockBorder,BlockSize-BlockBorder);

}