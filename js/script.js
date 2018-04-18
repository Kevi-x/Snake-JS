var config = {
    colors: {
        canvas: '#0a3d62',
        snake: "#60a3bc",
        food: "#b8e994"
    },

    controls: {
        UP: 87,
        DOWN: 83,
        LEFT: 65,
        RIGHT: 68
    },

    gridSize: 20,
    gridWidth: 39,
    gridHeight: 29

};

window.addEventListener("load", function () {
    var canvas = document.getElementById("gameBoard");
    var ctx = canvas.getContext("2d");
    var snake;
    var food;
    var refreshIntervalId;
    var endingScreenFlag = false;
    
    function initGame() {
        snake = new Snake(ctx);
        food = new Food(ctx);
        refreshIntervalId = setInterval(gameLoop, 100);
        snake.init(4);
    }
    
    initGame();

    window.addEventListener("keydown", function (e) {
        snake.changeDirection(e);
    });

    window.addEventListener("click", function () {
        if (endingScreenFlag) {
            initGame();
            endingScreenFlag = false;
        }
    });

    function endingScreen() {
        clearInterval(refreshIntervalId);
        ctx.font = "50px Century Goethic";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("You've died!", canvas.width / 2, canvas.height / 2);
        ctx.font = "bold 40px Century Goethic";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Points: " + snake.points, canvas.width / 2, canvas.height / 2 + 100);
        endingScreenFlag = true;
    }

    function drawPoints() {
        ctx.font = "bold 30px Century Goethic";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText('P: ' + snake.points, canvas.width - 80, 30);
    }
    
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = config.colors.canvas;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (snake.alive) {
            snake.update();
            snake.draw();
            snake.collisionWithTail();
            if (snake.collisionWithFood(food)) {
                food = new Food(ctx);
            }
            food.draw();
            drawPoints();
        } else {
            endingScreen();
        }
    }
});






