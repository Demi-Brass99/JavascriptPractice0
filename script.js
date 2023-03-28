
var CANVAS;
var CONTEXT;
var SCOREBOARD;
var Score = 0;

var BlockSize = 40;
var BlockBorder = 2;

var WindowWidth = 400 + BlockBorder;
var WindowHeight = 400 + BlockBorder;

var Food;
var SnakeHead;
var SnakeBody;



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


function updateGameSpace(){

    CONTEXT.fillStyle = "black";
    CONTEXT.fillRect(0,0,WindowWidth,WindowHeight);

    for (var i = 0; i < WindowWidth; i+=BlockSize) {
        for (var j = 0; j < WindowHeight; j+=BlockSize) {
            CONTEXT.fillStyle = "beige";
            CONTEXT.fillRect(i+BlockBorder,j+BlockBorder,BlockSize-BlockBorder,BlockSize-BlockBorder);
        }
    }

    CONTEXT.fillStyle = "maroon";
    CONTEXT.fillRect(Food.X+BlockBorder*6,Food.Y+BlockBorder*6,BlockSize/2-BlockBorder,BlockSize/2-BlockBorder);

    SnakeHead.X += SnakeHead.XV * BlockSize;
    SnakeHead.Y += SnakeHead.YV * BlockSize;

    if(SnakeHead.X == Food.X && SnakeHead.Y == Food.Y) {
        Score += 1;
        updateScore();
        setFoodLocation();
    }

    CONTEXT.fillStyle = "green";
    CONTEXT.fillRect(SnakeHead.X+BlockBorder,SnakeHead.Y+BlockBorder,BlockSize-BlockBorder,BlockSize-BlockBorder);

}