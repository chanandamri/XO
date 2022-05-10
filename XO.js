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
    console.log(e.target);
}
for (i in boardArr) {
    for (j in boardArr[i]) {
        board.append(creatBoard(String(i) + String(j)))
    }

}
