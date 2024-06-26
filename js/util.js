function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

function getElCell(pos) {
    return document.querySelector(`.cell_${pos.i}_${pos.j}`);
}

function getEmptyCell(board, rowIdx){
    var emptyCells = [];
    for( var j = 0; j < board[rowIdx].length; j++){
        var cell = board[rowIdx][j];
        if(cell.gameObject === EMPTY_OBJ){
            var pos = {i : rowIdx, j : j};
            emptyCells.push(pos);
        }
    }
    var randIdx = getRandomInt(0, emptyCells.length);
    return emptyCells[randIdx];
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}