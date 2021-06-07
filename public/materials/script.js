notMusicPlaying = true

document.onclick = function() {

    if (notMusicPlaying) {

        let music = new Audio("materials/song1.mp4")
        music.loop = true
        music.play()

        notMusicPlaying = false
    }
}

startingCreditOptions = {
    low: 2000,
    medium: 5000,
    large: 12000,
    massive: 100000,
    aTon: 1000000,
    infinite: 1000000000000000000
}

let startingCredits = startingCreditOptions.aTon

let mapSizes = {
    small: 900,
    medium: 3600,
    large: 4900,
    massive: 10000
}

let mapSize = mapSizes.small

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

            gridParent.addEventListener('mousedown', tryPlacingStructure)

            gridParent.id = z

            //gridParent.innerText = x + ", " + y

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

let scale = 1

map.onwheel = function zoom(event) {

    event.preventDefault();

    scale += event.deltaY * -0.0005;

    scale = Math.min(Math.max(0.75, scale), 2);

    map.style.transform = `scale(${scale})`
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
            amount: 9000 + (startingCredits),
            income: 10,
        },
        "oil": {

        },
        "stone": {

        },
        "steel": {

        }
    },
    structures: {
        "commandCenter": {
            amount: 0,
            amountMax: 8,
            cost: 9000,
            range: 6,
            openedStructure: {
                tier2: {
                    displayName: "Tier 2",
                    class: "tier2Tag",
                    cost: 14000,
                },
                workerDroid: {
                    displayName: "Worker Droid",
                    class: "workerDroidTag",
                    cost: 450,
                }
            },
            dimensions: 4,
            onClickEvent: "placeCommandCenter",
            tag: "commandCenterTag"
        },
        "barrack": {
            amount: 0,
            amountMax: 100,
            cost: 900,
            openedStructure: {
                tier2: {
                    displayName: "Tier 2",
                    class: "tier2Tag",
                    cost: 2400,
                },
                workerDroid: {
                    displayName: "Worker Droid",
                    class: "workerDroidTag",
                    cost: 200,
                },
                combatDroid: {
                    displayName: "Combat Droid",
                    class: "combatDroidTag",
                    cost: 450,
                }
            },
            dimensions: 3,
            onClickEvent: "placeBarrack",
            tag: "barrackTag"
        },
        "pumpjack": {
            amount: 1,
            amountMax: 100,
            cost: 400,
            openedStructure: {
                tier3: {
                    displayName: "Tier 3",
                    class: "tier3Tag",
                    cost: 6500,
                },
                tier2: {
                    displayName: "Tier 2",
                    class: "tier2Tag",
                    cost: 2200,
                }
            },
            dimensions: 2,
            onClickEvent: "placePumpjack",
            tag: "pumpjackTag"
        },
        "plasmaTurret": {
            amount: 0,
            amountMax: 100,
            cost: 1600,
            range: 5,
            openedStructure: {
                rapid: {
                    displayName: "Rapid Fire",
                    class: "rapidFireTag",
                    cost: 1800,
                },
                antiAir: {
                    displayName: "Anti Air",
                    class: "antiAirTag",
                    cost: 1100,
                },
                railgun: {
                    displayName: "Railgun",
                    class: "railgunTag",
                    cost: 1500,
                }
            },
            dimensions: 2,
            onClickEvent: "placePlasmaTurret",
            tag: "plasmaTurretTag"
        },
        "generator": {
            amount: 0,
            amountMax: 100,
            cost: 1600,
            range: 5,
            openedStructure: {
                tier2: {
                    displayName: "Tier 2",
                    class: "tier2Tag",
                    cost: 2400,
                },
                overdrive: {
                    displayName: "Overdrive",
                    class: "overdrive",
                    cost: 1500,
                }
            },
            dimensions: 2,
            onClickEvent: "placeGenerator",
            tag: "generatorTag"
        }
    },
    terrain: {
        "mountains": {
            mountainsAmount: mapSize / 1000,
            mountainsSize: mapSize / 1000
        },
        "water": {


        },
        resources: {
            "oiWells": {


            },
            "rocks": {


            },
            "metalRocks": {


            }
        },
    },
}

generateTerrain()

function generateTerrain() {


}

setTimeout(function generateStartingBases() {

    while (gameObjects.structures["commandCenter"].amount < 1) {

        let x = (Math.random() * Math.sqrt(mapSize)).toFixed(0)
        let y = (Math.random() * Math.sqrt(mapSize)).toFixed(0)

        let element = document.getElementById(x + y)

        placeStructure(element, "commandCenter")
    }
}, 750)

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

        if (placingStructure[structure] == true && gameObjects.resources.credits.amount >= gameObjects.structures[structure].cost && gameObjects.structures[structure].amount < gameObjects.structures[structure].amountMax) {

            placeStructure(e, structure)

            break
        }
    }
}

function placeStructure(e, structure) {

    if (e && !e.target) {

        e.target = e
    }

    if (e && e.target.id && e.target.id > 0) {

        for (let gridParent of gridParents) {

            if (e.target.id == gridParent.id) {

                if (gridParent.value == "plains") {

                    let z = 0

                    let x = 0

                    if (gridParent.x + gameObjects.structures[structure].dimensions > Math.sqrt(mapSize) || gridParent.y + gameObjects.structures[structure].dimensions > Math.sqrt(mapSize)) {

                        return
                    }

                    for (let y = gridParent.y; y < gridParent.y + gameObjects.structures[structure].dimensions; y++) {
                        for (x = gridParent.x; x < gridParent.x + gameObjects.structures[structure].dimensions; x++) {

                            if (z == gameObjects.structures[structure].dimensions * gameObjects.structures[structure].dimensions) {

                                return
                            }

                            z += 1

                            for (let gridParentAlt of gridParents) {

                                if (x == gridParentAlt.x && y == gridParentAlt.y) {

                                    if (gridParentAlt.value != "plains") {

                                        return
                                    }
                                }
                            }
                        }
                    }

                    if (z == gameObjects.structures[structure].dimensions * gameObjects.structures[structure].dimensions) {

                        let x = 0

                        let structureData = document.createElement("div")

                        structureData.className = "structureDataParent"

                        structureData.id = gridParent.id

                        document.body.appendChild(structureData)

                        for (let item of Object.keys(gameObjects.structures[structure].openedStructure)) {

                            let itemDisplayParent = document.createElement("div")

                            itemDisplayParent.className = "structureDataItem"

                            itemDisplayParent.classList.add(gameObjects.structures[structure].openedStructure[item].class)

                            structureData.appendChild(itemDisplayParent)

                            let itemDisplayImage = document.createElement("img")

                            itemDisplayImage.className = "structureDataImage"

                            itemDisplayParent.appendChild(itemDisplayImage)


                            let itemDisplayText = document.createElement("h3")

                            itemDisplayText.innerText = gameObjects.structures[structure].openedStructure[item].displayName

                            itemDisplayText.className = "structureDataText"

                            itemDisplayParent.appendChild(itemDisplayText)
                        }


                        if (structure == "commandCenter" || structure == "plasmaTurret") {

                            let gridChildShadow = document.createElement("div")

                            gridChildShadow.className = "gridChildShadow"

                            e.target.childNodes[0].appendChild(gridChildShadow)

                            gridChildShadow.style.boxShadow = "rgb(29, 92, 228, 0.075) 0 0 0 " + gameObjects.structures[structure].range * 20 + "px"
                        }

                        e.target.value = structure

                        e.target.addEventListener('mousedown', openStructure)

                        e.target.childNodes[0].classList.add(structure)

                        e.target.childNodes[0].id = e.target.id

                        gameObjects.resources.credits.amount -= gameObjects.structures[structure].cost

                        gameObjects.structures[structure].amount += 1

                        for (let y = gridParent.y; y < gridParent.y + gameObjects.structures[structure].dimensions; y++) {
                            for (x = gridParent.x; x < gridParent.x + gameObjects.structures[structure].dimensions; x++) {

                                for (let gridParentAlt of gridParents) {

                                    if (x == gridParentAlt.x && y == gridParentAlt.y) {

                                        gridParentAlt.value = structure
                                    }
                                }
                            }
                        }

                        break
                    }
                }
            }
        }
    }
}

document.getElementById("closeInfoParent").onclick = stopPlacing

function stopPlacing() {

    for (let structure of Object.keys(gameObjects.structures)) {

        placingStructure[structure] = false

        document.getElementById(gameObjects.structures[structure].tag).classList.remove("sideBarItemActive")
    }

    closeInfoParent.classList.remove("closeInfoParentShow")
}

let openedStructure

function openStructure(e) {

    if (!openedStructure || !openedStructure.opened) {

        let elements = document.getElementsByClassName("structureDataParent")

        for (let element of elements) {

            if (e.target.id == element.id) {

                stopPlacing()

                e.target.style.outline = "2px solid white"

                element.classList.add("structureDataParentShow")

                document.getElementsByClassName("sideBar")[0].classList.add("sideBarHide")

                e.target.removeEventListener('mousedown', openStructure)

                setTimeout(function() {
                    document.addEventListener('mousedown', closeStructure)
                }, 100)

                openedStructure = {
                    opened: true,
                    target: e.target
                }

                break
            }
        }
    }
}

function closeStructure(e) {

    let elements = document.getElementsByClassName("structureDataParentShow")
    let elementChildren = document.getElementsByClassName("structureDataItem")

    for (let element of elements) {

        if (e.target != element && Array.from(elementChildren).indexOf(e.target) == -1) {

            openedStructure.target.style.outline = "none"

            element.classList.remove("structureDataParentShow")

            document.getElementsByClassName("sideBar")[0].classList.remove("sideBarHide")

            setTimeout(function() {
                document.removeEventListener('mousedown', closeStructure)
            }, 100)

            openedStructure = {
                opened: false,
                target: undefined
            }
        }
    }
}



setInterval(generateCredits, 250)

function generateCredits() {

    gameObjects.resources.credits.income = (gameObjects.structures.pumpjack.amount * 1) + (gameObjects.structures.commandCenter.amount * 15)

    gameObjects.resources.credits.amount += gameObjects.resources.credits.income

    document.getElementById("creditAmount").innerText = gameObjects.resources.credits.amount
}


addText()

function addText() {


}