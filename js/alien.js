const ALIEN = '<img src="img/ali.png" />'
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3
const ALIEN_SPEED = 500
var gIntervalAliens
var gAliensCount = 0;
// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsAlienFreeze = true

function createAliens(board) { 

    for( var i = 0; i < ALIEN_ROW_COUNT; i++){
        for( var j =0; j < ALIEN_ROW_LENGTH; j++){
            // gAliensCount++
            board[i][j] = { type: SKY, gameObject: ALIEN };
        }
    }
}
function handleAlienHit(pos) { }
function shiftBoardRight(board, fromI, toI) { }
function shiftBoardLeft(board, fromI, toI) { }
function shiftBoardDown(board, fromI, toI) { }
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() { }