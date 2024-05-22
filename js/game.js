const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3
const LASER = '⤊'
const WALL = ''
const SKY = 'SKY'
const EARTH = 'EARTH'
// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard
var gSize
var gInGame
var gGame = {
    isOn: false,
    alienCount: 0
}
// Called when game loads
gBoard = createBoard();
function onInit() {
    createHero(gBoard);
    createAliens(gBoard);
    renderBoard(gBoard);
}

// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens

function createBoard() {
    var board = [];
    for (var i = 0; i < BOARD_SIZE; i++) {
        board.push([]);
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = createCell();
            // if (j === 0 || j === (BOARD_SIZE - 1)) {
            //     board[i][j].type = WALL
            // }
            if (i === BOARD_SIZE - 1) {
                board[i][j].type = EARTH
            }
        }
    }
    console.table(board);
    return board;
}


// Render the board as a <table> to the page
function renderBoard(board) {

    var strHTML = '';

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            console.log(currCell);
            var cellClass = `cell_${i}_${j}`
            console.log(cellClass);
            var element = currCell.gameObject ? currCell.gameObject : ''
            cellClass += (currCell.type === EARTH) ? ' earth' : ' sky';


            strHTML += `<td class="cell  ${cellClass}">${element}</td>`
        }
        strHTML += '</td>';
    }

    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML;
}
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}
// position such as: {i: 2, j: 7}
function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}

