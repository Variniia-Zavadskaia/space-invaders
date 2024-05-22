const HERO = '<img src="img/sh.png" />'
const LASER = '〽️'
const LASER_SPEED = 80
var gHero;
var gLaser;
var gBlinkInterval;
// creates the hero and place it on board
function createHero(board) {
    gHero = {
        pos: { i: 12, j: 5 },
        isShoot: false
    }

    gLaser = {
        element: LASER
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
        case 'Space':
            if (gHero.isShoot) return
            shoot()
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
    // if (!gGame.isOn) return;
    if (gHero.isShoot) return;

    gHero.isShoot = true;
    var laserPos = gHero.pos;

    var gBlinkInterval = setInterval(() => {
        if (laserPos.i === 0) return;
        blinkLaser(laserPos);
        laserPos.i--;

        if (gBoard[laserPos.i][laserPos.j].gameObject === ALIEN) {
            // updateScore(10);
        }

        if (gBoard[laserPos.i][laserPos.j].gameObject === ALIEN || laserPos.i === 0) {
            clearInterval(gBlinkInterval)
            updateCell(laserPos, '')
            gHero.isShoot = false
        }
    }, LASER_SPEED)

}

// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {

    var laser = gLaser.element;

    updateCell(pos, laser);
    setTimeout(() => { updateCell(pos, null); }, LASER_SPEED);
}

