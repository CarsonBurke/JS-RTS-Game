// Define settings for map

let economicUnits = 0
let units = 0
let unitsMax = 750

let factions = {
    "humanoid": {
        name: "humanoid",
        resources: {
            "food": {
                amount: 0,
                amountUsed: 0,
            }
        }
    },
    "mechanical": {
        name: "Mechanical",
        resources: {
            "power": {
                amount: 0,
                amountUsed: 0,
            }
        }
    },
    "alien": {
        name: "Alien",
        resources: {
            "hiveSpace": {
                amount: 0,
                amountUsed: 0,
                amountMax: unitsMax,
            }
        }
    },
}

let startingOptions = {
    "low": 2000,
    "medium": 5000,
    "large": 12000,
    "massive": 100000,
    "aTon": 1000000,
    "infinite": 1000000000000000000
}

let startingCredits = startingOptions["aTon"]

let mapSizes = {
    "small": 900,
    "medium": 3600,
    "large": 4900,
    "massive": 10000
}

let mapSize = mapSizes["small"]

let players = {
    player1: {
        faction: "mechanical",
        factionSpecificResources: undefined,
        resources: {
            "credits": {
                amount: 9000 + startingOptions[startingCredits],
                income: 10,
            },
            "oil": {
                amount: 200,
                income: 10,
            },
            "concrete": {
                amount: 600,
                income: 10,
            },
            "steel": {
                amount: 50,
                income: 10,
            }
        }
    }
}

for (let player of Object.keys(players)) {

    players[player].factionSpecificResources = factions[players[player].faction].resources
}

// Create variables used in the game

let gameObjects = {
    resources: {
        "credits": {
            amount: 9000 + startingCredits,
            income: 10,
        },
        "oil": {
            amount: 200,
            income: 10,
        },
        "concrete": {
            amount: 600,
            income: 10,
        },
        "steel": {
            amount: 50,
            income: 10,
        }
    },
    structures: {
        "commandCenter": {
            amount: 0,
            amountMax: 8,
            cost: 9000,
            creditsAdd: 25,
            powerAdd: 10,
            range: 6,
            openedStructure: {
                tier2: {
                    displayName: "Tier 2",
                    class: "tier2Tag",
                    cost: 14000,
                    purchased: false,
                },
                workerDroid: {
                    displayName: "Worker Droid",
                    class: "workerDroidTag",
                    cost: 450,
                    purchased: 0,
                }
            },
            dimensions: 5,
            onClickEvent: "placeCommandCenter",
            tag: "commandCenterTag"
        },
        "barrack": {
            amount: 0,
            amountMax: 100,
            cost: 900,
            powerCost: 2,
            openedStructure: {
                tier2: {
                    displayName: "Tier 2",
                    class: "tier2Tag",
                    cost: 2400,
                    purchased: false,
                },
                workerDroid: {
                    displayName: "Worker Droid",
                    class: "workerDroidTag",
                    cost: 200,
                    purchased: 0,
                },
                combatDroid: {
                    displayName: "Combat Droid",
                    class: "combatDroidTag",
                    cost: 450,
                    purchased: 0,
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
            creditsAdd: 10,
            powerCost: 2,
            openedStructure: {
                tier3: {
                    displayName: "Tier 3",
                    class: "tier3Tag",
                    cost: 6500,
                    purchased: false,
                },
                tier2: {
                    displayName: "Tier 2",
                    class: "tier2Tag",
                    cost: 2200,
                    purchased: false,
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
            powerCost: 3,
            range: 5,
            openedStructure: {
                rapid: {
                    displayName: "Rapid Fire",
                    class: "rapidFireTag",
                    cost: 1800,
                    purchased: false,
                },
                antiAir: {
                    displayName: "Anti Air",
                    class: "antiAirTag",
                    cost: 1100,
                    purchased: false,
                },
                railgun: {
                    displayName: "Railgun",
                    class: "railgunTag",
                    cost: 1500,
                    purchased: false,
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
            powerAdd: 7,
            openedStructure: {
                tier2: {
                    displayName: "Tier 2",
                    class: "tier2Tag",
                    cost: 2400,
                    purchased: false,
                },
                overdrive: {
                    displayName: "Overdrive",
                    class: "overdrive",
                    cost: 1500,
                    purchased: false,
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
            "settlements": {
                //Mechanical faction can aquire parts
                //Alien faction can plunder for resources
            },
            "oiWells": {


            },
            "rocks": {


            },
            "steelRocks": {


            }
        },
    },
    hotkeys: {
        panUp: "w",
        panDown: "s",
        panLeft: "a",
        panRight: "d",
        stopPlacing: "x",
    },
}

// Play music

notMusicPlaying = true

document.onclick = function() {

    if (notMusicPlaying) {

        let music = new Audio("materials/song1.mp4")
        music.loop = true
        music.play()

        notMusicPlaying = false
    }
}

// Create the map

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

// Allows user to scroll to zoom

let scale = 1

map.onwheel = function zoom(event) {

    event.preventDefault();

    scale += event.deltaY * -0.0005;

    scale = Math.min(Math.max(0.75, scale), 2);

    map.style.transform = `scale(${scale})`
}

// Define events for when user presses a key

let upPos = 0
let leftPos = 0

window.onkeydown = function(e) {

    if (e.key == gameObjects.hotkeys.panUp) {

        startMove("up")
    } else if (e.key == gameObjects.hotkeys.panDown) {

        startMove("down")
    } else if (e.key == gameObjects.hotkeys.panLeft) {

        startMove("left")
    } else if (e.key == gameObjects.hotkeys.panRight) {

        startMove("right")
    }
    if (e.key == gameObjects.hotkeys.stopPlacing) {

        stopPlacing()
    }
}

window.onkeyup = function(e) {

    if (e.key == gameObjects.hotkeys.panUp) {

        endMove("up")
    } else if (e.key == gameObjects.hotkeys.panDown) {

        endMove("down")
    } else if (e.key == gameObjects.hotkeys.panLeft) {

        endMove("left")
    } else if (e.key == gameObjects.hotkeys.panRight) {

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

        if (placingStructure[structure] == true && gameObjects.resources.credits.amount >= gameObjects.structures[structure].cost) {

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

                        e.target.value = structure

                        e.target.addEventListener('mousedown', openStructure)

                        e.target.childNodes[0].classList.add(structure)

                        e.target.childNodes[0].id = e.target.id

                        gameObjects.resources.credits.amount -= gameObjects.structures[structure].cost

                        gameObjects.structures[structure].amount += 1

                        let structureData = document.createElement("div")

                        structureData.className = "structureDataParent"

                        structureData.id = gridParent.id

                        document.getElementById("sideBarContent").appendChild(structureData)

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

                        for (let player of Object.keys(players)) {

                            if (players[player].faction == "mechanical") {
                                if (gameObjects.structures[structure].powerAdd) {

                                    players[player].factionSpecificResources.power.amount += gameObjects.structures[structure].powerAdd

                                    document.getElementById("factionResourceChild").style.width = players[player].factionSpecificResources.power.amount - players[player].factionSpecificResources.power.amountUsed + "%"

                                } else if (gameObjects.structures[structure].powerCost) {

                                    players[player].factionSpecificResources.power.amountUsed += gameObjects.structures[structure].powerCost

                                    document.getElementById("factionResourceChild").style.width = players[player].factionSpecificResources.power.amount - players[player].factionSpecificResources.power.amountUsed + "%"
                                }
                            }
                            if ((players[player].faction == "mechanical" || players[player].faction == "humanoid") && gameObjects.structures[structure].creditsAdd) {

                                gameObjects.resources.credits.income += gameObjects.structures[structure].creditsAdd
                            }
                        }

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

                document.getElementsByClassName("sideBarContentChild")[0].classList.add("sideBarContentChildHide")

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

            document.getElementsByClassName("sideBarContentChild")[0].classList.remove("sideBarContentChildHide")

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



setInterval(generateResources, 250)

function generateResources() {

    // Credits

    gameObjects.resources.credits.amount += gameObjects.resources.credits.income

    document.getElementById("creditAmount").innerText = gameObjects.resources.credits.amount

    // Oil

    gameObjects.resources.oil.income = (gameObjects.structures.pumpjack.amount * 1) + (gameObjects.structures.commandCenter.amount * 15)

    gameObjects.resources.oil.amount += gameObjects.resources.oil.income

    document.getElementById("oilAmount").innerText = gameObjects.resources.oil.amount

    // Concrete

    gameObjects.resources.concrete.income = (gameObjects.structures.pumpjack.amount * 1) + (gameObjects.structures.commandCenter.amount * 15)

    gameObjects.resources.concrete.amount += gameObjects.resources.concrete.income

    document.getElementById("concreteAmount").innerText = gameObjects.resources.concrete.amount

    // Steel

    gameObjects.resources.steel.income = (gameObjects.structures.pumpjack.amount * 1) + (gameObjects.structures.commandCenter.amount * 15)

    gameObjects.resources.steel.amount += gameObjects.resources.steel.income

    document.getElementById("steelAmount").innerText = gameObjects.resources.steel.amount

    // Faction Specific

}


addText()

function addText() {

    document.getElementById("economicUnitCount").innerHTML = economicUnits + " Workers"

    document.getElementById("totalUnitCount").innerHTML = units + " / " + unitsMax + " Units"
}