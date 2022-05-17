let boardArr = [["", "", ""], ["", "", ""], ["", "", ""]], player = 'x'

const board = document.getElementById("board")
console.log(board);
function creatBoard(index) {
    let elem = document.createElement(`div`)
    elem.setAttribute("id", `${index}`)
    elem.classList.add(`cellClass`)
    elem.addEventListener('click', clicked)
    return elem

}
function clicked(e) {
    let location = getIDFromElemnt(e.target)
    if (cellEmpty(location)) {
        addPicToCell(e.target, location)
        player = player == 'x' ? 'o' : 'x'
        console.log(boardArr);
        checkWin(boardArr, player)
    }
}
for (i in boardArr) {
    for (j in boardArr[i]) {
        board.append(creatBoard(String(i) + String(j)))
    }

}
function getIDFromElemnt(cell) {
    return [cell.id[0], cell.id[1]]
}
function cellEmpty(location) {
    return boardArr[location[0]][location[1]] == ""
}
function addPicToCell(cell, location) {
    if (player == 'x') {
        cell.classList.add("classX")
        boardArr[location[0]][location[1]] = 'x'
    } else {
        cell.classList.add("classO")
        boardArr[location[0]][location[1]] = 'o'
    }
}

function checkWin(boardArr, player) {
    // debugger
    if (boardArr[0].every((p) => { p == (player = player == 'x' ? 'o' : 'x') })) {
        alert("youWin");
    }
}
