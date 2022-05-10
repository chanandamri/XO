let boardArr = [["", "", ""], ["", "", ""], ["", "", ""]]
const board = document.getElementById("board")
console.log(board);
function creatBoard(index) {
    let elem = document.createElement(`div`)
    elem.setAttribute("id", `${index}`)
    elem.classList.add(`cellClass`)
    return elem

}
for (i in boardArr) {
    for (j in boardArr[i]) {
        board.append(creatBoard(String(i) + String(j)))
    }

}
