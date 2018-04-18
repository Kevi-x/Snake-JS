function Food(ctx) {

    this.color = config.colors.food;
    this.xIndexOfGrid = Math.round(Math.random() * config.gridWidth);
    this.yIndexOfGrid = Math.round(Math.random() * config.gridHeight);
    this.position = new Position(this.xIndexOfGrid, this.yIndexOfGrid);
    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, config.gridSize, config.gridSize);
        ctx.stroke();
    };
}