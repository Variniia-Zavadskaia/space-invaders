const HERO = '<img src="img/sh.png" />'
const LASER_SPEED = 80
var gHero;
// creates the hero and place it on board
function createHero(board) {
    gHero = {
        pos: { i: 12, j: 5 },
        isShoot: false
    }
    board[gHero.pos.i][gHero.pos.j] = createCell(HERO);
}

// Handle game keys
function onKeyDown(event) {

    switch (event.code) {
        case 'ArrowLeft':
            moveHero(-1)
            break
        case 'ArrowRight':
            moveHero(1)
            break
        default: return null
    }
}

function moveHero(dir) {
    if (dir === 1 && (gHero.pos.j !== BOARD_SIZE - 1)) {
        updateCell(gHero.pos, null);
        gHero.pos.j++;
        updateCell(gHero.pos, HERO);
    }
    if (dir === -1 && (gHero.pos.j !== 0)) {
        updateCell(gHero.pos, null);
        gHero.pos.j--;
        updateCell(gHero.pos, HERO);
    }
}




// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {

}

// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {

}

// function getPacmanHTML() {
//     return `<span class="pacman ${gDirClass}" >${PACMAN_IMG}</span>`
// }