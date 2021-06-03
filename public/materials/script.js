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

    console.log(e.key)

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
            amountMax: 2,
            dimensions: 4,
            amountId: "commandCenterAmount",
            onClickEvent: "placeCommandCenter",
            tag: "commandCenterTag"
        },
        "barrack": {
            amount: 0,
            amountMax: 2,
            dimensions: 3,
            amountId: "barrackAmount",
            onClickEvent: "placeBarrack",
            tag: "barrackTag"
        },
        "pumpjack": {
            amount: 1,
            amountMax: 2,
            dimensions: 2,
            amountId: "pumpjackAmount",
            onClickEvent: "placePumpjack",
            tag: "pumpjackTag"
        },
        "plasmaTurret": {
            amount: 0,
            amountMax: 2,
            dimensions: 2,
            amountId: "plasmaTurretAmount",
            onClickEvent: "placePlasmaTurret",
            tag: "plasmaTurretTag"
        },
    },
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

        if (placingStructure[structure] == true) {

            placeStructure(e, structure)

            break
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
                                        document.getElementById(gridParentAlt.id).innerText = x + ", " + y
                                    }
                                }
                            }
                        }
                    }

                    if (z == gameObjects.structures[structure].dimensions * gameObjects.structures[structure].dimensions) {

                        z = 0

                        let x = 0

                        e.target.value = structure

                        e.target.childNodes[0].classList.add(structure)
                        gameObjects.structures[structure].amount += 1

                        //document.getElementById(gameObjects.structures[structure].amountId).innerText = gameObjects.structures[structure].amount + " / " + gameObjects.structures[structure].amountMax

                        for (let y = gridParent.y; y < gridParent.y + gameObjects.structures[structure].dimensions; y++) {
                            for (x = gridParent.x; x < gridParent.x + gameObjects.structures[structure].dimensions; x++) {

                                z += 1

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

    gameObjects.resources.credits.income = 1 * gameObjects.structures.pumpjack.amount

    gameObjects.resources.credits.amount += gameObjects.resources.credits.income

    document.getElementById("creditAmount").innerText = gameObjects.resources.credits.amount
}


addText()

function addText() {

    for (let structure of Object.keys(gameObjects.structures)) {

        document.getElementById(gameObjects.structures[structure].amountId).innerText = gameObjects.structures[structure].amount + " / " + gameObjects.structures[structure].amountMax
    }
}

/*
let gridSize = 0.01

let gridParent = document.getElementById("gridParent")

let vpWidth = gridParent.offsetWidth
let vpHeight = gridParent.offsetHeight

//console.log(vpWidth)

let rows = vpWidth * gridSize
let cols = vpHeight * gridSize

//console.log(rows)

let grids = []

generateMap(rows, cols, gridParent, grids)

function generateMap(rows, cols, gridParent, grids) {

    //gridParent.style.width = (rows / 10).toFixed(0) * 100 + "px"
    //gridParent.style.height = (rows / 10).toFixed(0) * 100 + "px"

    var z = 0

    for (let y = 0; y < cols; y++) {
        for (x = 0; x < rows; x++) {

            z++

            let gridChild = document.createElement("div")

            //console.log(y + ", " + x + " : " + x + y)

            gridChild.id = (z)
                //gridChild.innerText = (x + ", " + y)
                //gridChild.innerText = gridChild.id

            grids.push({ x: x, y: y, id: gridChild.id, value: undefined, size: undefined })

            gridParent.appendChild(gridChild).className = "gridChild"
            gridParent.appendChild(gridChild).className = "gridChild"

            gridChild.style.width = gridSize + "px"
            gridChild.style.height = gridSize + "px"
        }
    }
}

let credits = 0

let commandCenters = 0
let commandCentersMax = 1

let barracks = 0
let barracksMax = 5

let pumpjacks = 0
let pumpjacksMax = 3

let plasmaTurrets = 0
let plasmaTurretsMax = 8

let mountainAnchors = 0
let maxMountainAnchors = gridSize * 1.5

let mountains = 0
let maxMountains = maxMountainAnchors

while (commandCenters < 1) {

    let value1 = Math.floor(Math.random(10) * 34)
    let value2 = Math.floor(Math.random(10) * 34)

    for (let coordinates of grids) {
        if (coordinates.x == value1 && coordinates.y == value2 && !coordinates.value) {

            document.getElementById(coordinates.id).classList.add("playerCommander")
            coordinates.value = "commandCenter"
            commandCenters++
        }
    }
}

while (barracks < 3) {

    let value1 = Math.floor(Math.random(10) * 34)
    let value2 = Math.floor(Math.random(10) * 34)

    for (let coordinates of grids) {
        if (coordinates.x == value1 && coordinates.y == value2 && !coordinates.value) {

            document.getElementById(coordinates.id).classList.add("barracks")
            coordinates.value = "barrack"
            barracks++
        }
    }
}

while (pumpjacks < 2) {

    let value1 = Math.floor(Math.random(10) * 34)
    let value2 = Math.floor(Math.random(10) * 34)

    for (let coordinates of grids) {
        if (coordinates.x == value1 && coordinates.y == value2 && !coordinates.value) {

            document.getElementById(coordinates.id).classList.add("pumpjacks")
            coordinates.value = "pumpjack"
            pumpjacks++
        }
    }
}

while (plasmaTurrets < 6) {

    let value1 = Math.floor(Math.random(10) * 34)
    let value2 = Math.floor(Math.random(10) * 34)

    for (let coordinates of grids) {
        if (coordinates.x == value1 && coordinates.y == value2 && !coordinates.value) {

            document.getElementById(coordinates.id).classList.add("plasmaTurrets")
            coordinates.value = "plasmaTurret"
            plasmaTurrets++
        }
    }
}

while (mountainAnchors < maxMountainAnchors) {

    let value1 = Math.floor(Math.random(10) * 34)
    let value2 = Math.floor(Math.random(10) * 34)
    let value3 = Math.floor(Math.random(10) * 6)

    for (let coordinates of grids) {
        if (coordinates.x == value1 && coordinates.y == value2 && !coordinates.value) {

            document.getElementById(coordinates.id).classList.add("mountains")
            document.getElementById(coordinates.id).style.color = "red"

            coordinates.value = "mountainAnchors"
            coordinates.size = value3
            mountainAnchors++
        }
    }
}
while (mountains < maxMountains) {

    let value1 = Math.floor(Math.random(10) * 34)
    let value2 = Math.floor(Math.random(10) * 34)

    for (let coordinates of grids) {

        if (coordinates.value == "mountainAnchors" && coordinates.size == 1) {

            //bottom
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom right
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
        } else if (coordinates.value == "mountainAnchors" && coordinates.size == 2) {

            //top
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //left
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top left
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
        } else if (coordinates.value == "mountainAnchors" && coordinates.size == 3) {

            //top
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }

            //bottom
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //left
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top left
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }

            //top right
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom left
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom right
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
        }
        if (coordinates.value == "mountainAnchors" && coordinates.size == 4) {

            //top
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }

            //bottom
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //left
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top left
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }

            //top right
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom left
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom right
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right right
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x - 2 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right right top
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x - 2 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right right bottom
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x - 2 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
        } else if (coordinates.value == "mountainAnchors" && coordinates.size == 5) {

            //top
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }

            //bottom
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //left
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top left
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }

            //top right
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom left
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom right
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top top
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 2 == coordinates.y && altCoordinates.x == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top top left
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 2 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top top right
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 2 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
        }
    }
}

for (let coordinates of grids) {
    if (coordinates.value == "mountains" || coordinates.value == "mountainAnchors") {
        for (let secondaryCoordinates of grids) {
            //top left
            if (coordinates.x - 1 == secondaryCoordinates.x && coordinates.y == secondaryCoordinates.y && !secondaryCoordinates.value) {

                for (let tertiaryCoordinates of grids) {
                    if (coordinates.x == tertiaryCoordinates.x && coordinates.y - 1 == tertiaryCoordinates.y && !tertiaryCoordinates.value) {

                        document.getElementById(coordinates.id).style.borderTopLeftRadius = "100px"
                    }
                }
            }
            //top right
            if (coordinates.x + 1 == secondaryCoordinates.x && coordinates.y == secondaryCoordinates.y && !secondaryCoordinates.value) {

                for (let tertiaryCoordinates of grids) {
                    if (coordinates.x == tertiaryCoordinates.x && coordinates.y - 1 == tertiaryCoordinates.y && !tertiaryCoordinates.value) {

                        document.getElementById(coordinates.id).style.borderTopRightRadius = "100px"
                    }
                }
            }
            //bottom left
            if (coordinates.x - 1 == secondaryCoordinates.x && coordinates.y == secondaryCoordinates.y && !secondaryCoordinates.value) {

                for (let tertiaryCoordinates of grids) {
                    if (coordinates.x == tertiaryCoordinates.x && coordinates.y + 1 == tertiaryCoordinates.y && !tertiaryCoordinates.value) {

                        document.getElementById(coordinates.id).style.borderBottomLeftRadius = "100px"
                    }
                }
            }
            //bottom right
            if (coordinates.x + 1 == secondaryCoordinates.x && coordinates.y == secondaryCoordinates.y && !secondaryCoordinates.value) {

                for (let tertiaryCoordinates of grids) {
                    if (coordinates.x == tertiaryCoordinates.x && coordinates.y + 1 == tertiaryCoordinates.y && !tertiaryCoordinates.value) {

                        document.getElementById(coordinates.id).style.borderBottomRightRadius = "100px"
                    }
                }
            }
        }
    }
}

let closeInfoParent = document.getElementById("closeInfoParent")

window.onkeydown = function closeInfoParent(key) {

    if (key.which == 88) {

        commandCenterTag.attributeStyleMap.clear()
        barrackTag.attributeStyleMap.clear()
        pumpjackTag.attributeStyleMap.clear()
        plasmaTurret.attributeStyleMap.clear()

        /*for (let element of bodyelements) {
            doStuff.stuff()
        }*/
/*
}
}

function commandCenter(closeInfoParent) {

    let commandCenterTag = document.getElementById("commandCenterTag")

    if (commandCenters < 1) {

        commandCenterTag.style.background = "rgb(70, 70, 70)"

        closeInfoParent.classList.add("closeInfoParentShow")
    }
}

function barrack(closeInfoParent) {

    let barrackTag = document.getElementById("barrackTag")

    if (barracks < 10) {

        barrackTag.style.background = "rgb(70, 70, 70)"

        closeInfoParent.classList.add("closeInfoParentShow")
    }
}

function pumpjack(closeInfoParent) {

    let pumpjackTag = document.getElementById("pumpjackTag")

    if (pumpjacks < 1) {

        pumpjackTag.style.background = "rgb(70, 70, 70)"

        closeInfoParent.classList.add("closeInfoParentShow")
    }
}

function plasmaTurret(closeInfoParent) {

    let plasmaTurretTag = document.getElementById("plasmaTurretTag")

    if (plasmaTurrets < plasmaTurretsMax) {

        plasmaTurretTag.style.background = "rgb(70, 70, 70)"

        closeInfoParent.classList.add("closeInfoParentShow")
    }
}

setInterval(generateCredits, 250)

function generateCredits() {

    credits += 1 * pumpjacks
}

setInterval(updateText, 100)

function updateText() {

    let commandCenterAmount = document.getElementById("commandCenterAmount")
    let barrackAmount = document.getElementById("barrackAmount")
    let pumpjackAmount = document.getElementById("pumpjackAmount")
    let plasmaTurretAmount = document.getElementById("plasmaTurretAmount")

    if (commandCenterAmount) {

        commandCenterAmount.innerText = commandCenters + " / " + commandCentersMax
    }
    if (barrackAmount) {

        barrackAmount.innerText = barracks + " / " + barracksMax
    }
    if (pumpjackAmount) {

        pumpjackAmount.innerText = pumpjacks + " / " + pumpjacksMax
    }
    if (plasmaTurretAmount) {

        plasmaTurretAmount.innerText = plasmaTurrets + " / " + plasmaTurretsMax
    }

    let creditAmount = document.getElementById("creditAmount")

    if (creditAmount) {

        creditAmount.innerText = credits
    }
}
*/