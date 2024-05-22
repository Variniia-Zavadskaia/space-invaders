
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
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