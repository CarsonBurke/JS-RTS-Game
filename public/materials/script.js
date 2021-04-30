let gridSize = 20

let gridParent = document.getElementById("gridParent")

let vpWidth = gridParent.offsetWidth
let vpHeight = gridParent.offsetHeight

//console.log(vpWidth)

let rows = vpWidth / gridSize
let cols = vpHeight / gridSize

//console.log(rows)

let grids = []

generateMap(rows, cols, gridParent, grids)

function generateMap(rows, cols, gridParent, grids) {

    for (let x = 0; x < cols; x++) {
        for (y = 0; y < rows; y++) {

            let gridChild = document.createElement("div")

            //console.log(y + ", " + x + " : " + x + y)

            gridChild.id = (x * y)
            gridChild.innerText = (x + ", " + y)

            grids.push({ x: x, y: y, id: gridChild.id, value: undefined })

            gridParent.appendChild(gridChild).className = "gridChild"
            gridParent.appendChild(gridChild).className = "gridChild"

            gridChild.style.width = gridSize + "px"
            gridChild.style.height = gridSize + "px"
        }
    }
}
/*Begin game logic*/

let credits = 0

let commandCenters = 0
let commandCentersMax = 1

let barracks = 0
let barracksMax = 5

let pumpjacks = 0
let pumpjacksMax = 3

let plasmaTurrets = 0
let plasmaTurretsMax = 8

while (commandCenters < 1) {

    let value1 = Math.floor(Math.random(10) * 27)
    let value2 = Math.floor(Math.random(10) * 27)

    for (let coordinates of grids) {
        if (coordinates.x == value1 && coordinates.y == value2) {

            document.getElementById(coordinates.id).classList.add("playerCommander")
            coordinates.value = "commandCenter"
            commandCenters++
        }
    }
}

while (barracks < 3) {

    let value1 = Math.floor(Math.random(10) * 27)
    let value2 = Math.floor(Math.random(10) * 27)

    for (let coordinates of grids) {
        if (coordinates.x == value1 && coordinates.y == value2) {

            document.getElementById(coordinates.id).classList.add("barracks")
            coordinates.value = "barrack"
            barracks++
        }
    }
}

while (pumpjacks < 2) {

    let value1 = Math.floor(Math.random(10) * 27)
    let value2 = Math.floor(Math.random(10) * 27)

    for (let coordinates of grids) {
        if (coordinates.x == value1 && coordinates.y == value2) {

            document.getElementById(coordinates.id).classList.add("pumpjacks")
            coordinates.value = "pumpjack"
            pumpjacks++
        }
    }
}

while (plasmaTurrets < 6) {

    let value1 = Math.floor(Math.random(10) * 27)
    let value2 = Math.floor(Math.random(10) * 27)

    for (let coordinates of grids) {
        if (coordinates.x == value1 && coordinates.y == value2) {

            document.getElementById(coordinates.id).classList.add("plasmaTurrets")
            coordinates.value = "plasmaTurret"
            plasmaTurrets++
        }
    }
}

let closeInfoParent = document.getElementById("closeInfoParent")

window.onkeydown = function closeInfoParent(key) {

    if (key.which == 88) {

        commandCenterTag.attributeStyleMap.clear()

        /*for (let element of bodyelements) {
            doStuff.stuff()
        }*/
    }
}

function commandCenter(closeInfoParent) {

    let commandCenterTag = document.getElementById("commandCenterTag")

    if (commandCenters < 1) {

        commandCenterTag.style.background = "rgb(70, 70, 70)"

        closeInfoParent.classList.add("closeInfoParentShow")
    }
}

setInterval(generateCredits, 200)

function generateCredits() {

    credits += 2 * pumpjacks
}

setInterval(updateText, 100)

function updateText() {

    let commandCenterAmount = document.getElementById("commandCenterAmount")

    commandCenterAmount.innerText = commandCenters + " / " + commandCentersMax

    let creditAmount = document.getElementById("creditAmount")

    creditAmount.innerText = credits
}