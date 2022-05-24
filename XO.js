let boardArr = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ],
    player = "x";

const board = document.getElementById("board");
for (i in boardArr) {
    for (j in boardArr[i]) {
        board.append(creatBoard(String(i) + String(j)));
    }
}

function creatBoard(index) {
    let elem = document.createElement(`div`);
    elem.setAttribute("id", `${index}`);
    elem.classList.add(`cellClass`);
    elem.addEventListener("click", clicked);
    return elem;
}

function clicked(e) {
    let location = getIDFromElemnt(e.target);
    if (cellEmpty(location)) {
        addPicToCell(e.target, location);
        player = player == "x" ? "o" : "x";
        checkRows();
        checkColummns();
        checkSlant1();
        checkSlant2();
    }
}

function getIDFromElemnt(cell) {
    return [cell.id[0], cell.id[1]];
}
function cellEmpty(location) {
    return boardArr[location[0]][location[1]] == "";
}
function addPicToCell(cell, location) {
    if (player == "x") {
        cell.classList.add("classX");
        boardArr[location[0]][location[1]] = "x";
    } else {
        cell.classList.add("classO");
        boardArr[location[0]][location[1]] = "o";
    }
}

function checkRows() {
    for (i in boardArr) {
        let check = boardArr[i][0];
        for (j = 1; j < boardArr.length; j++) {
            if (check == "") {
                win = false;
                break;
            } else if (boardArr[i][j] != check) {
                win = false;
                break;
            } else {
                win = true;
                winner = check;
            }
            check = boardArr[i][j];
        }
        if (win) {
            console.log("the winner is " + winner);
            break;
        }
    }
}

function checkColummns() {
    for (i = 0; i < boardArr.length; i++) {
        let check = boardArr[0][i];
        for (j = 1; j < boardArr.length; j++) {
            if (check == "") {
                win = false;
                break;
            } else if (boardArr[j][i] != check) {
                win = false;
                break;
            } else {
                win = true;
                winner = check;
            }
            check = boardArr[j][i];
        }
        if (win) {
            console.log("the winner is " + winner);
            break;
        }
    }
}

function checkSlant1() {
    let check = boardArr[0][0];
    for (i = 1; i < boardArr.length; i++) {
        if (check == "") {
            win = false;
            break;
        } else if (boardArr[i][i] != check) {
            win = false;
            break;
        } else {
            win = true;
            winner = check;
        }
        check = boardArr[i][i];
    }
    if (win) {
        console.log("the winner is " + winner);
    }
}

function checkSlant2() {
    let check = boardArr[0][boardArr.length - 1],
    i=1, j=boardArr.length-2;

    while (i < boardArr.length) {
        if (check == "") {
            win = false;
            break;
        } else if (boardArr[i][j] != check) {
            win = false;
            break;
        } else {
            win = true;
            winner = check;
        }
        check = boardArr[i][j];
        i++;
        j--;
    }
    if (win) {
        console.log("the winner is " + winner);
    }
}

// function checkWin(boardArr, player) {
//     // debugger
//     if (boardArr[0].every((p) => { p == (player = player == 'x' ? 'o' : 'x') })) {
//         alert("youWin");
//     }
// }

//     if(boardArr[0].every(p=>{console.log(p)})){
//         alert("win")
//     }
// }

// if (boardArr[0][0]==boardArr[0][1]==boardArr[0][2])
