function Snake(ctx) {

    this.xIndexOfHead = 25;
    this.yIndexOfHead = 2;
    this.headPosition;
    this.head;
    this.snake = [];
    this.tailSize = 0;
    this.points = 0;
    this.color = config.colors.snake;
    this.prevDirection = config.controls.RIGHT;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.alive = true;

    this.init = function (numberOfTail) {

        for (var i = 0; i < numberOfTail; i++) {
            this.snake.push(new Position(this.xIndexOfHead - i, this.yIndexOfHead));
        }
        this.head = this.snake[0];
    };

    this.draw = function () {

        for (var i = 0; i < this.snake.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.snake[i].x, this.snake[i].y, config.gridSize, config.gridSize);
            ctx.stroke();
        }
    };

    this.changeDirection = function (e) {
        var code = e.keyCode;
        if (code === config.controls.LEFT && this.prevDirection !== config.controls.RIGHT) {
            this.prevDirection = config.controls.LEFT;
            this.changeSpeed(-1, 0);
        } else if (code === config.controls.RIGHT && this.prevDirection !== config.controls.LEFT) {
            this.prevDirection = config.controls.RIGHT;
            this.changeSpeed(1, 0);
        } else if (code === config.controls.UP && this.prevDirection !== config.controls.DOWN) {
            this.prevDirection = config.controls.UP;
            this.changeSpeed(0, -1);
        } else if (code === config.controls.DOWN && this.prevDirection !== config.controls.UP) {
            this.prevDirection = config.controls.DOWN;
            this.changeSpeed(0, 1);
        }
    };

    this.changeSpeed = function (xSpeed, ySpeed) {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    };

    this.update = function () {

        var position;

        this.xIndexOfHead += this.xSpeed;
        this.yIndexOfHead += this.ySpeed;

        position = new Position(this.xIndexOfHead, this.yIndexOfHead);
        this.head = this.snake[this.snake.length - 1];
        this.head.x = position.x;
        this.head.y = position.y;
        this.snake.unshift(this.snake.pop());
        this.alive = this.head.validate(this.xIndexOfHead, this.yIndexOfHead);
    };
    
    this.collisionWithFood = function (food) {

        if (this.head.x === food.position.x && this.head.y === food.position.y) {
            this.head = food.position;
            this.snake.unshift(this.head);
            this.points++;
            return true;
        } else {
            return false;
        }
    };
    
    this.collisionWithTail = function () {

        for (var i = 1; i < this.snake.length; i++) {
            if (this.head.x === this.snake[i].x && this.head.y === this.snake[i].y) {
                this.alive = false;
                break;
            }
        }
    };
}