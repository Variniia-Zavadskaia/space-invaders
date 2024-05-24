const BOARD_SIZE = 14
const SKY = 'SKY'
const EARTH = 'EAR'
const EMPTY_OBJ = null

var gBoard
var gGame = {
    isOn: false,
    alienCount: 0
}
// Called when game loads

function onInit() {
    var elModalStart = document.querySelector('.start');
    elModalStart.style.display = 'block';
    onCloseModal();
}

function startGame(){

    var elModalStart = document.querySelector('.start');
    elModalStart.style.display = 'none';

    if (gGame.isOn) return
    gGame.isOn = true
    gBoard = createBoard();
    printBoard(''); ////////////
    createHero(gBoard);
    createAliens(gBoard);
    renderBoard(gBoard);
    onCloseModal();
    gGame.score = 0;
    document.querySelector('.score span').innerText = gGame.score;
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
    console.log("dfddfwf");
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

function addCandy(){
    // var 
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('.score span').innerText = gGame.score
}

function updateCell(pos, gameObject = EMPTY_OBJ) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}

function gameOver(isWin){
    gGame.isOn = false;
    onOpenModal(isWin);
    clearInterval(gIntervalAliens); 
}

function onOpenModal(isWin) {
    var elModalRest = document.querySelector('.restart');
    elModalRest.style.display = 'block';
    var elModalRestH2 = document.querySelector('.restart h2')
    elModalRestH2.innerText = isWin ? 'you Won' : 'Game Over'
}

function onCloseModal() {
    var elModalRest = document.querySelector('.restart');
    elModalRest.style.display = 'none';
}

function printBoard(prestr) {
    var str = prestr === '' ? '' : (prestr + '\n')

    for (var i = 0; i < gBoard.length; i++) {
        str += '| '
        for (var j = 0; j < gBoard[i].length; j++) {
            var obj = gBoard[i][j].gameObject

            if (obj === null) obj = 'n'
            else if (obj === HERO) obj = 'H'
            else if (obj === ALIEN) obj = 'Al'

            if (obj !== 'Al') obj += ' '

            str += gBoard[i][j].type + ',' + obj + ' | '
        }
        str += '\n'
    }   
    console.log(str);
}
