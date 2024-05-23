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