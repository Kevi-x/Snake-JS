function Position(xGridIndex, yGridIndex) {

    this.x = xGridIndex * config.gridSize;
    this.y = yGridIndex * config.gridSize;

    this.validate = function (x, y) {
        var alive = true;

        if (x >= config.gridWidth || x <= 0 || y >= config.gridHeight || y <= 0) {
            alive = false;
        }
        return alive;
    };
}