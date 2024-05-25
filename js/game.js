const BOARD_SIZE = 14;
const SKY = 'SKY';
const EARTH = 'EAR';
const EMPTY_OBJ = null;
const CANDY = '<img src="img/candy.png" />';
var gCandyIntarval;

var gBoard;
var gGame = {
    isOn: false,
    alienCount: 0
}

function onInit() {
    var elModalStart = document.querySelector('.start');
    elModalStart.style.display = 'block';
    onCloseModal();
}

function startGame() {

    var elModalStart = document.querySelector('.start');
    elModalStart.style.display = 'none';

    if (gGame.isOn) return;
    gGame.isOn = true;
    gBoard = createBoard();
    printBoard(''); ////////////
    createHero(gBoard);
    createAliens(gBoard);
    renderBoard(gBoard);
    onCloseModal();
    gGame.score = 0;
    document.querySelector('.score span').innerText = gGame.score;
    gIntervalAliens = setInterval(moveAliens, gAliensSpeed);
    gCandyIntarval = setInterval(addCandy, 10000);
}

function createBoard() {
    var board = [];
    for (var i = 0; i < BOARD_SIZE; i++) {
        board.push([]);
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = createCell();
            if (i === BOARD_SIZE - 1) {
                board[i][j].type = EARTH;
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

function addCandy() {
    console.log('cabdy');
    var emptyPos = getEmptyCell(gBoard, 0);
    if (!emptyPos) return;
    console.log('a', emptyPos.i, emptyPos.j);
    updateCell(emptyPos, CANDY);
    setTimeout(() => {
        console.log('d', emptyPos.i, emptyPos.j);
        if (gBoard[emptyPos.i][emptyPos.j].gameObject === CANDY) updateCell(emptyPos, EMPTY_OBJ);
    }, 5000);
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('.score span').innerText = gGame.score
}

function updateCell(pos, gameObject = EMPTY_OBJ) {
    gBoard[pos.i][pos.j].gameObject = gameObject;
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject || ''
}

function onUpLevel(level) {
    console.log('lvl');

    if (level === 1) {
        gAliensSpeed = ALIEN_SPEED;
        gAliensRowLength = ALIEN_ROW_LENGTH;
    } else if (level === 2) {
        gAliensSpeed = ALIEN_SPEED;
        gAliensRowLength = ALIEN_ROW_LENGTH + 2;
    } else if (level === 3) {
        gAliensSpeed = ALIEN_SPEED * 0.6;
        gAliensRowLength = ALIEN_ROW_LENGTH + 2;
    }
    gameOver(true, false)
}

function gameOver(isWin, openModal = true) {
    gGame.isOn = false;
    clearInterval(gIntervalAliens);
    clearInterval(gCandyIntarval);
    if (openModal) {
        onOpenModal(isWin);
    }
    else {
        startGame();
    }
}

function onOpenModal(isWin) {
    var elModalRest = document.querySelector('.restart');
    elModalRest.style.display = 'block';
    var elModalRestH2 = document.querySelector('.restart h2')
    elModalRestH2.innerText = isWin ? 'You Won' : 'Game Over';
}

function onCloseModal() {
    var elModalRest = document.querySelector('.restart');
    elModalRest.style.display = 'none';
}

function printBoard(prestr) {
    var str = prestr === '' ? '' : (prestr + '\n')

    for (var i = 0; i < gBoard.length; i++) {
        str += i + (i < 10 ? ' ' : '') + ' | ';
        for (var j = 0; j < gBoard[i].length; j++) {
            var obj = gBoard[i][j].gameObject;

            if (obj === null) obj = 'n';
            else if (obj === HERO) obj = 'H';
            else if (obj === ALIEN) obj = 'Al';

            if (obj !== 'Al') obj += ' ';

            str += gBoard[i][j].type + ',' + obj + ' | ';
        }
        str += '\n';
    }
    console.log(str);
}
