function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

// function getElCell(pos) {
//     return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`)
// }

function getElCell(pos) {
    return document.querySelector(`.cell_${pos.i}_${pos.j}`);
}

function createCopyBoard(board) {
    var newBoard = [];
    for (var i = 0; i < board.length; i++) {
        newBoard[i] = board[i].slice();
    }
    return newBoard
}

function getEmptyCell(board){
    var emptyCells = [];
    for(var i = 0; i < board.length; i++){
        for( var j = 0; j < board[0].length; j++){
            var cell = board[i][j];
            if(cell === EMPTY_OBJ){
                var pos = {i, j};
                emptyCells.push(pos);
            }
        }
    }
    var randIdx = getRandomInt(0, emptyCells.length);
    return emptyCells[randIdx];
}