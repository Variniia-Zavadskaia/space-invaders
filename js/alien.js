const ALIEN = '<img src="img/ali.png" />'
const ALIEN_ROW_LENGTH = 8;
// const ALIEN_ROW_LENGTH = 4;
const ALIEN_ROW_COUNT = 3;
const ALIEN_SPEED = 300;

var gIntervalAliens;
// var gIntervalAliensRight;
// var gIntervalAliensLeft;
// var gIntervalAliensDown;

// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx; //from
var gAliensBottomRowIdx;  //to
var gMoveDir = 'right';

var gIsAlienFreeze = false;


function createAliens(board) {

    for (var i = 0; i < ALIEN_ROW_COUNT; i++) {
        for (var j = 0; j < ALIEN_ROW_LENGTH; j++) {
            gGame.alienCount++;
            board[i][j] = { type: SKY, gameObject: ALIEN };
        }
    }
    gMoveDir = 'right';
    gAliensTopRowIdx = 0;
    gAliensBottomRowIdx = ALIEN_ROW_COUNT - 1;
}

function handleAlienHit(pos) {
    console.log(pos.i,pos.j);
    updateScore(ALIEN_POINTS);
    updateCell(pos, EMPTY_OBJ);
    gGame.alienCount--;
    console.log(gGame.alienCount);

    if (gGame.alienCount === 0) gameOver(true);
}

function shiftBoardRight(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = board[i].length - 1; j > 0; j--) {
            if (board[i][j - 1].gameObject !== LASER) {
                // board[i][j].gameObject = board[i][j - 1].gameObject;
                updateCell({i,j}, board[i][j - 1].gameObject)
            }
        }
        // board[i][0].gameObject = EMPTY_OBJ
        updateCell({i: i, j: 0}, EMPTY_OBJ)
    }
}

function shiftBoardLeft(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = 0; j < board[i].length - 1; j++) {
            if (board[i][j + 1].gameObject !== LASER) {
                // board[i][j].gameObject = board[i][j + 1].gameObject;
                updateCell({i,j}, board[i][j + 1].gameObject)

            }
        }
        // board[i][board[i].length - 1].gameObject = EMPTY_OBJ;
        updateCell({i: i, j: (board[i].length - 1)}, EMPTY_OBJ)
    }
}

function shiftBoardDown(board, fromI, toI) {
    // console.log(board)
    for (var i = toI; i >= fromI; i--) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].gameObject !== LASER) {
                // board[i + 1][j].gameObject = board[i][j].gameObject;
                updateCell({i: (i + 1), j: j}, board[i][j].gameObject)
            }
        }
    }
    for (var j = 0; j < board[fromI].length; j++) {
        // board[fromI][j].gameObject = EMPTY_OBJ
        updateCell({i: fromI, j: j}, EMPTY_OBJ)
    }
}
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops

function moveAliens() {
    if (gIsAlienFreeze) return;
    var shiftDown = false;

    if (gMoveDir === 'right') {
        for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
            if (gBoard[i][gBoard[i].length - 1].gameObject === ALIEN) {
                shiftDown = true;
                gMoveDir = 'left';
                break;
            }
        }

        if (!shiftDown) shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx);
    } else if (gMoveDir === 'left') {
        for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
            if (gBoard[i][0].gameObject === ALIEN) {
                shiftDown = true;
                gMoveDir = 'right';
                break;
            }
        }

        if (!shiftDown) shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx);
    }

    if (shiftDown) {
        var bottomRowAlientCount = 0;
        shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx);
        gAliensTopRowIdx++;
        gAliensBottomRowIdx++;
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[gAliensBottomRowIdx][j].gameObject === ALIEN) bottomRowAlientCount++;
        }
        if(bottomRowAlientCount === 0) gAliensBottomRowIdx--;
    }
    // renderBoard(gBoard);
    if (gAliensBottomRowIdx === (gBoard.length - 2)) gameOver(false);

    // gIsAlienFreeze = true
}