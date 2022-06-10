const overlay = document.getElementById("overlay"),
    popup = document.getElementById('popup'),
    popupTitle = document.getElementById('popup-title'),
    popupBody = document.getElementById('popupBody'),
    closePopupButton = document.querySelectorAll('[data-close-button]')
closePopupButton[0].addEventListener('click', closePopUp)
overlay.addEventListener('click', closePopUp)

let tempArr = [], gamesizetemp = 3,
timerUI = document.getElementById("timer"),
gameRecordUI = document.getElementById("gameRecord")

function createMenu() {
    const menuUI = document.getElementById("menu")
    let children = menuUI.children;
    children[1].addEventListener('click', restartGame)
    children[2].addEventListener('click', undoTurn)
    children[3].addEventListener('click', saveGame)
    children[4].addEventListener('click', loadGame)
    children[5].addEventListener('click', changeGameSize)
    if (localStorage.gameRecord) {
        gameRecordUI.innerHTML = 'Game record: ' + JSON.parse(localStorage.gameRecord)
    }
}
function changeGameSize() {
    gamesizetemp = Number(prompt('Write the new size'))
    newGame()
}
function saveGame() {
    openPopUp("Saving", "Game was saved")
    localStorage.game = JSON.stringify(game)
}
function loadGame() {
    
    if (localStorage.game) {
        gamesizetemp = JSON.parse(localStorage.game).gameSize
        newGame()
        game = JSON.parse(localStorage.game)
        for (i of game.turns) {
            addPicToCell(getElementFromID(i.location), i.location, i.player)
        }
    } else {
        console.log("no game to restore");
    }
}
function deleteAll() {
    game = {
        gameSize: gamesizetemp,
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
        deleteLocation.classList.add("emptyCell")
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
        timeClock = setInterval((() => timerUI.innerHTML ='Timer: ' + game.time++ + ' seconds'), 1000)
    } else {
        clearInterval(timeClock)
    }
}
function restartGame() {
    timer(false)
    timerUI.innerHTML = 'Timer: 0 seconds'
    newGame()
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
    elem.classList.add('cellClass','emptyCell');
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
            if (!game.gameFinished && game.turns.length == game.gameSize * game.gameSize) {
                timer(false)
                openPopUp('Draw!', 'There is no winner');
                disableEmptyClass()
            }
            showCurrentTurn()
        }
    }
}
function showCurrentTurn(){
    if (popup.classList.value === 'popup')
    {
        turn= document.getElementById("turn")
        turn.innerHTML= `Current turn: ${game.player}`
    }
}

function winning(who) {
    
    timer(false)
    game.gameFinished = true
    openPopUp("Game ended!", `The winner is: ${who.toUpperCase()}
    Steps played: ${game.turns.length}
    Game duration: ${game.time} second`)
    storeRecord()
    disableEmptyClass()
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
    cell.classList.remove("emptyCell");
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
function openPopUp(title, body) {
    popupTitle.innerText = title
    popupBody.innerText = body
    overlay.classList.add('active')
    popup.classList.add('active')
}
function closePopUp() {
    overlay.classList.remove('active')
    popup.classList.remove('active')
}

function disableEmptyClass(){
    let cells= document.getElementById("board").children
    Array(...cells).forEach(v=>v.classList.remove("emptyCell"))
}

newGame()
createMenu()
