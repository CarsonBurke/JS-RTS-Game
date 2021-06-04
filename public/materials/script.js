document.addEventListener('click', playMusic)
document.addEventListener('keydown', playMusic)

function playMusic() {

    let music = new Audio("materials/song1.mp3")
    music.loop = true
    music.play()

    document.removeEventListener("click", playMusic)
    document.removeEventListener('keydown', playMusic)
}

let mapSizes = {
    small: 400,
    medium: 3600,
    large: 4900,
    massive: 10000
}

let mapSize = mapSizes.massive

gridSize = 20

let gridParents = []
let gridChilds = []

let map = document.getElementById("map")

generateMap()

function generateMap() {

    let dimensions = Math.sqrt(mapSize);

    map.style.width = dimensions * gridSize + "px"
    map.style.height = dimensions * gridSize + "px"

    let z = 0

    for (let y = 0; y < dimensions; y++) {
        for (x = 0; x < dimensions; x++) {

            z++

            let gridParent = document.createElement("div")

            gridParent.addEventListener('click', tryPlacingStructure)

            gridParent.id = z

            gridParents.push({ id: z, value: "plains", x: x, y: y })

            map.appendChild(gridParent).className = "gridParent"

            gridParent.style.width = gridSize + "px"
            gridParent.style.height = gridSize + "px"

            let gridChild = document.createElement("div")

            gridParent.appendChild(gridChild).className = "gridChild"

            gridChilds.push({ id: z, x: x, y: y })
        }
    }
}

let upPos = 0
let leftPos = 0

window.onkeydown = function(e) {

    if (e.key == "w") {

        startMove("up")
    } else if (e.key == "s") {

        startMove("down")
    } else if (e.key == "a") {

        startMove("left")
    } else if (e.key == "d") {

        startMove("right")
    }
    if (e.key == "x") {

        stopPlacing()
    }
}

window.onkeyup = function(e) {

    if (e.key == "w") {

        endMove("up")
    } else if (e.key == "s") {

        endMove("down")
    } else if (e.key == "a") {

        endMove("left")
    } else if (e.key == "d") {

        endMove("right")
    }
}

var move = false

function startMove(direction) {

    if (direction == "up") {

        move = {
            direction: "up",
            qualifier: "positive"
        }

    } else if (direction == "down") {

        move = {
            direction: "up",
            qualifier: "negative"
        }

    }
    if (direction == "left") {

        move = {
            direction: "left",
            qualifier: "positive"
        }

    } else if (direction == "right") {

        move = {
            direction: "left",
            qualifier: "negative"
        }
    }
}

function endMove() {

    move = false
}

setInterval(changeDirection, 100)

function changeDirection() {

    if (move && move.direction) {
        if (move.direction == "up") {

            if (move.qualifier == "positive") {

                upPos += 75

            } else {

                upPos -= 75
            }
        } else {

            if (move.qualifier == "positive") {

                leftPos += 75

            } else {

                leftPos -= 75
            }
        }

        map.style.top = upPos + "px"
        map.style.left = leftPos + "px"
    }
}

let credits = 0

let gameObjects = {
    resources: {
        "credits": {
            amount: 0,
            income: 10,
        }
    },
    structures: {
        "commandCenter": {
            amount: 0,
            amountMax: 8,
            cost: 9000,
            range: 9,
            dimensions: 4,
            amountId: "commandCenterAmount",
            onClickEvent: "placeCommandCenter",
            tag: "commandCenterTag"
        },
        "barrack": {
            amount: 0,
            amountMax: 100,
            cost: 900,
            dimensions: 3,
            amountId: "barrackAmount",
            onClickEvent: "placeBarrack",
            tag: "barrackTag"
        },
        "pumpjack": {
            amount: 1,
            amountMax: 100,
            cost: 400,
            dimensions: 2,
            amountId: "pumpjackAmount",
            onClickEvent: "placePumpjack",
            tag: "pumpjackTag"
        },
        "plasmaTurret": {
            amount: 0,
            amountMax: 100,
            cost: 1600,
            range: 8,
            dimensions: 2,
            amountId: "plasmaTurretAmount",
            onClickEvent: "placePlasmaTurret",
            tag: "plasmaTurretTag"
        },
    },
    terrain: {
        mountains: {
            mountainsAmount: mapSize / 1000,
            mountainsSize: mapSize / 1000
        },
    },
}

generateTerrain()

function generateTerrain() {


}

generateStartingBases()

function generateStartingBases() {


}

let placingStructure = {}

function buildMode(structureName) {

    for (let property of Object.keys(placingStructure)) {

        if (placingStructure[property] == true) {

            return
        }
    }

    for (let structure of Object.keys(gameObjects.structures)) {

        if (structure == structureName) {

            if (gameObjects.structures[structure].amount < gameObjects.structures[structure].amountMax) {

                document.getElementById(gameObjects.structures[structure].tag).classList.add("sideBarItemActive")

                closeInfoParent.classList.add("closeInfoParentShow")

                placingStructure[structure] = true
            }

            break
        }
    }
}

function tryPlacingStructure(e) {

    for (let structure of Object.keys(gameObjects.structures)) {

        if (placingStructure[structure] == true && gameObjects.structures[structure].amount < gameObjects.structures[structure].amountMax) {

            placeStructure(e, structure)

            break
        } else if (gameObjects.structures[structure].amount >= gameObjects.structures[structure].amountMax) {

            placingStructure[structure] = false

            document.getElementById(gameObjects.structures[structure].tag).classList.remove("sideBarItemActive")

            closeInfoParent.classList.remove("closeInfoParentShow")
        }
    }
}

function placeStructure(e, structure) {

    if (e.target.id && e.target.id > 0) {

        for (let gridParent of gridParents) {

            if (e.target.id == gridParent.id) {

                if (gridParent.value == "plains") {

                    let z = 0

                    let x = 0

                    for (let y = gridParent.y; y < gridParent.y + gameObjects.structures[structure].dimensions; y++) {
                        for (x = gridParent.x; x < gridParent.x + gameObjects.structures[structure].dimensions; x++) {

                            z += 1

                            for (let gridParentAlt of gridParents) {

                                if (x == gridParentAlt.x && y == gridParentAlt.y) {
                                    console.log(gridParentAlt.value)
                                    if (gridParentAlt.value != "plains") {

                                        return
                                    }
                                }
                            }
                        }
                    }

                    if (z == gameObjects.structures[structure].dimensions * gameObjects.structures[structure].dimensions) {

                        let x = 0

                        e.target.value = structure

                        e.target.childNodes[0].classList.add(structure)

                        if (structure == "commandCenter" || structure == "plasmaTurret") {

                            e.target.childNodes[0].style.boxShadow = "rgb(29, 92, 228, 0.1) 0 0 0 " + gameObjects.structures[structure].range * 20 + "px"
                        }

                        gameObjects.structures[structure].amount += 1

                        document.getElementById(gameObjects.structures[structure].amountId).innerText = gameObjects.structures[structure].amount + " / " + gameObjects.structures[structure].amountMax

                        for (let y = gridParent.y; y < gridParent.y + gameObjects.structures[structure].dimensions; y++) {
                            for (x = gridParent.x; x < gridParent.x + gameObjects.structures[structure].dimensions; x++) {

                                for (let gridParentAlt of gridParents) {

                                    if (x == gridParentAlt.x && y == gridParentAlt.y) {

                                        gridParentAlt.value = structure
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function stopPlacing() {

    for (let structure of Object.keys(gameObjects.structures)) {

        placingStructure[structure] = false

        document.getElementById(gameObjects.structures[structure].tag).classList.remove("sideBarItemActive")
    }

    closeInfoParent.classList.remove("closeInfoParentShow")
}

setInterval(generateCredits, 250)

function generateCredits() {

    gameObjects.resources.credits.income = (gameObjects.structures.pumpjack.amount * 1) + (gameObjects.structures.commandCenter.amount * 15)

    gameObjects.resources.credits.amount += gameObjects.resources.credits.income

    document.getElementById("creditAmount").innerText = gameObjects.resources.credits.amount
}


addText()

function addText() {

    for (let structure of Object.keys(gameObjects.structures)) {

        document.getElementById(gameObjects.structures[structure].amountId).innerText = gameObjects.structures[structure].amount + " / " + gameObjects.structures[structure].amountMax
    }
}