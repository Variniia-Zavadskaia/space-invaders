const BOARD_SIZE = 14
const SKY = 'SKY'
const EARTH = 'EARTH'
const EMPTY_OBJ = null

var gBoard
var gGame = {
    isOn: false,
    alienCount: 0
}
// Called when game loads

function onInit() {
    gBoard = createBoard();
    createHero(gBoard);
    createAliens(gBoard);
    renderBoard(gBoard);
    onCloseModal();
    gGame.score = 0;
    document.querySelector('h2 span').innerText = gGame.score;
    gIntervalAliens = setInterval(moveAliens, ALIEN_SPEED);
}

function createBoard() {
    var board = [];
    for (var i = 0; i < BOARD_SIZE; i++) {
        board.push([]);
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = createCell();
            if (i === BOARD_SIZE - 1) {
                board[i][j].type = EARTH
            }
        }
    }
    console.table(board);
    return board;
}

function renderBoard(board) {

    var strHTML = '';

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cellClass = `cell_${i}_${j}`
            var element = currCell.gameObject ? currCell.gameObject : ''
            cellClass += (currCell.type === EARTH) ? ' earth' : ' sky';


            strHTML += `<td class="cell  ${cellClass}">${element}</td>`
        }
        strHTML += '</td>';
    }

    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML;
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function updateCell(pos, gameObject = EMPTY_OBJ) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}

function gameOver(isWin){
    console.log('hghghg');
    gGame.isOn = false;
    onOpenModal(isWin);
    clearInterval(gIntervalAliens);   
}

function onOpenModal(isWin) {
    var elModal = document.querySelector('.restart');
    elModal.style.display = 'block';
    var elModalH2 = document.querySelector('.restart h2')
    elModalH2.innerText = isWin ? 'you Won' : 'Game Over'
}

function onCloseModal() {
    var elModal = document.querySelector('.restart');
    elModal.style.display = 'none';
}
