// need to add UI representation for the following functions:
// newGame
// undoTurn
// storeRecord
// saveGame
// loadGame
// time (game.time parameter)


// let gameSize = 3, tempArr = [], lastRecord = gameSize * gameSize, gameTime = 0,
let tempArr = [],
    timerUI = document.getElementById("timer"),
    gameRecordUI = document.getElementById("gameRecord")

function createMenu() {
    const menuUI = document.getElementById("menu")
    let children = menuUI.children;
    children[0].addEventListener('click', newGame)
    children[1].addEventListener('click', undoTurn)
    children[2].addEventListener('click', saveGame)
    children[3].addEventListener('click', loadGame)
    children[4].addEventListener('click', changeGameSize)
    if (localStorage.gameRecord) {
        gameRecordUI.innerHTML = 'Game record: ' + JSON.parse(localStorage.gameRecord)
    }
}
function changeGameSize() {
    let tempNum = 0
    while (tempNum % 2 == 0) {
        tempNum = Number(prompt('Write the new size. Size must be an even number'))
    }
    game.gameSize = tempNum
    newGame()
}
function saveGame() {
    localStorage.game = JSON.stringify(game)
}
function loadGame() {
    newGame()
    game = JSON.parse(localStorage.game)
    for (i of game.turns) {
        addPicToCell(getElementFromID(i.location), i.location, i.player)
    }
}
function deleteAll() {
    game = {
        gameSize: 3,
        turns: [],
        boardArr: [],
        player: "x",
        gameFinished: false,
        time: 0
    }
}
function getElementFromID(ID) {
    return document.getElementById(String(ID.row) + String(ID.column))
}
function undoTurn() {
    if (game.turns.length > 0 && !game.gameFinished) {
        game.player = game.player == "x" ? "o" : "x";
        let lastLocation = game.turns[game.turns.length - 1].location
        let deleteLocation = getElementFromID(lastLocation)
        deleteLocation.classList.remove("classX", "classO")
        game.boardArr[lastLocation.row][lastLocation.column] = "";
        game.turns.pop()
    }
}
function pushTurn(player, location) {
    game.turns.push({
        player,
        location
    })
}
function timer(bool) {
    if (bool) {
        timeClock = setInterval((() => timerUI.innerHTML = 'Timer: ' + game.time++ + ' seconds'), 1000)
    } else {
        clearInterval(timeClock)
    }
}
function newGame() {

    deleteAll()
    for (i = 0; i < game.gameSize; i++) {
        tempArr = []
        for (j = 0; j < game.gameSize; j++) {
            tempArr.push("")
        }
        game.boardArr.push(tempArr)
    }
    createBoardUI()
    // timer(true)
}
function createBoardUI() {
    const board = document.getElementById("board");
    board.style.gridTemplateColumns = `repeat(${game.gameSize}, 1fr)`
    board.innerHTML = ""
    for (i in game.boardArr) {
        for (j in game.boardArr[i]) {
            board.append(creatBoard(String(i) + String(j)));
        }
    }
}
function creatBoard(index) {
    let elem = document.createElement(`div`);
    elem.setAttribute("id", `${index}`);
    elem.classList.add(`cellClass`);
    elem.addEventListener("click", clicked);
    return elem;
}
function storeRecord() {
    if (localStorage.gameRecord) {
        lastRecord = JSON.parse(localStorage.gameRecord)
        lastRecord > game.turns.length ? localStorage.gameRecord = JSON.stringify(game.turns.length) : ""
        console.log(`last record: ${lastRecord}.
        New record ${game.turns.length}`);
    } else {
        localStorage.gameRecord = JSON.stringify(game.turns.length)
        console.log(`No old record. new record:  ${game.turns.length}`);
    }
    gameRecordUI.innerHTML = 'Game record: ' + JSON.parse(localStorage.gameRecord)
}
function clicked(e) {
    if (!game.gameFinished) {
        if (game.turns.length == 0) {
            timer(true)
        }
        let location = getIDFromElemnt(e.target);
        if (cellEmpty(location)) {
            addPicToCell(e.target, location, game.player);
            pushTurn(game.player, location)
            game.player = game.player == "x" ? "o" : "x";
            checkRows();
            checkColummns();
            checkSlant1();
            checkSlant2();
        }
    }
}
function winning(who) {

    timer(false)
    game.gameFinished = true
    console.log(`The winner is: ${who}
Total steps are: ${game.turns.length}
Time of game is: ${game.time}`);
    storeRecord()
}
function getIDFromElemnt(cell) {
    return {
        row: cell.id[0],
        column: cell.id[1]
    };
}
function cellEmpty(location) {
    return game.boardArr[location.row][location.column] == "";
}
function addPicToCell(cell, location, player) {
    if (player == "x") {
        cell.classList.add("classX");
        game.boardArr[location.row][location.column] = "x";
    } else {
        cell.classList.add("classO");
        game.boardArr[location.row][location.column] = "o";
    }
}
function checkRows() {
    for (i in game.boardArr) {
        let check = game.boardArr[i][0];
        for (j = 1; j < game.boardArr.length; j++) {
            if (check == "") {
                win = false;
                break;
            } else if (game.boardArr[i][j] != check) {
                win = false;
                break;
            } else {
                win = true;
                winner = check;
            }
            check = game.boardArr[i][j];
        }
        if (win) {
            winning(winner);
            break;
        }
    }
}
function checkColummns() {
    for (i = 0; i < game.boardArr.length; i++) {
        let check = game.boardArr[0][i];
        for (j = 1; j < game.boardArr.length; j++) {
            if (check == "") {
                win = false;
                break;
            } else if (game.boardArr[j][i] != check) {
                win = false;
                break;
            } else {
                win = true;
                winner = check;
            }
            check = game.boardArr[j][i];
        }
        if (win) {
            winning(winner);
            break;
        }
    }
}
function checkSlant1() {
    let check = game.boardArr[0][0];
    for (i = 1; i < game.boardArr.length; i++) {
        if (check == "") {
            win = false;
            break;
        } else if (game.boardArr[i][i] != check) {
            win = false;
            break;
        } else {
            win = true;
            winner = check;
        }
        check = game.boardArr[i][i];
    }
    if (win) {
        winning(winner);

    }
}
function checkSlant2() {
    let check = game.boardArr[0][game.boardArr.length - 1],
        i = 1, j = game.boardArr.length - 2;

    while (i < game.boardArr.length) {
        if (check == "") {
            win = false;
            break;
        } else if (game.boardArr[i][j] != check) {
            win = false;
            break;
        } else {
            win = true;
            winner = check;
        }
        check = game.boardArr[i][j];
        i++;
        j--;
    }
    if (win) {
        winning(winner);
    }
}
newGame()
createMenu()
