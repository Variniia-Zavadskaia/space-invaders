const HERO = '<img src="img/sh.png" />'
const LASER = '〽️'
const LASER_SUPER = '💗'
const LASER_SPEED = 100;
const ALIEN_POINTS = 10
var gHero;
var gLaser;
var gBlinkInterval;

function createHero(board) {
    gHero = {
        pos: { i: 12, j: 5 },
        isShoot: false,
        isShootNebs: false,
        isSuperAttack: false,
        countSupAtt: 3
    }

    gLaser = {
        element: LASER,
        pos: null,
        speed: LASER_SPEED
    }

    board[gHero.pos.i][gHero.pos.j] = createCell(HERO);
    displaySuperAttacks(gHero.countSupAtt)
}

function onKeyDown(event) {

    switch (event.code) {
        case 'ArrowLeft':
            moveHero(-1)
            break
        case 'ArrowRight':
            moveHero(1);
            break;
        case 'Space':
            if (gHero.isShoot) return;
            shoot()
            break;
        case 'KeyN':
            if (!gHero.isShoot) return;
            nebsAlienAround(gLaser.pos);
            break;
        case 'KeyF':
            gIsAlienFreeze = true
            break;
        case 'KeyU':
            gIsAlienFreeze = false
            break;
        case 'KeyX':
            console.log(gHero.countSupAtt);
            if (gHero.isShoot) return
            if (gHero.countSupAtt-- > 0) {
                gHero.isSuperAttack = true
                gLaser.speed /= 2;
                gLaser.element = LASER_SUPER
                shoot();
                displaySuperAttacks(gHero.countSupAtt);
            }
            break;
        default: return null;
    }
}

function moveHero(dir) {
    if (dir === 1 && (gHero.pos.j !== BOARD_SIZE - 1)) {
        updateCell(gHero.pos, EMPTY_OBJ);
        gHero.pos.j++;
        updateCell(gHero.pos, HERO);
    }
    if (dir === -1 && (gHero.pos.j !== 0)) {
        updateCell(gHero.pos, EMPTY_OBJ);
        gHero.pos.j--;
        updateCell(gHero.pos, HERO);
    }
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
    if (!gGame.isOn) return;
    if (gHero.isShoot) return;

    gHero.isShoot = true;
    gLaser.pos = { ...gHero.pos };

    var gBlinkInterval = setInterval(() => {
        gLaser.pos.i--;
        if (gBoard[gLaser.pos.i][gLaser.pos.j].gameObject === ALIEN || gLaser.pos.i === 0) {

            if (gBoard[gLaser.pos.i][gLaser.pos.j].gameObject === ALIEN) {
                handleAlienHit(gLaser.pos);
            } else if (gLaser.pos.i === 0) {
                blinkLaser(gLaser.pos);
            }

            gHero.isShoot = false;
            gHero.isSuperAttack = false;
            gLaser.speed = LASER_SPEED;
            gLaser.element = LASER
            clearInterval(gBlinkInterval);
            return
        }
        blinkLaser(gLaser.pos);
    }, gLaser.speed)
}

function blinkLaser(pos) {

    var laser = gLaser.element;

    updateCell(pos, laser);
    setTimeout(() => { updateCell(pos, EMPTY_OBJ); }, gLaser.speed * 0.8);
}

function nebsAlienAround(pos) {
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;

        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (i === pos.i && j === pos.j) continue;
            if (gBoard[i][j].gameObject === ALIEN) handleAlienHit({ i, j });
        }
    }
}

function displaySuperAttacks(num) {
    document.querySelector('.super-attacks span').innerText = num;
}

