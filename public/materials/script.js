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

let mapSize = mapSizes["medium"]

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

let structures = {
    "commandCenter": {
        amount: 0,
        amountMax: 8,
        creditCost: 9000,
        creditsAdd: 6,
        powerAdd: 10,
        range: 6,
        damage: 10,
        units: ["workerDroid"],
        image: "materials/commandCenter.png",
        openedStructure: {
            "tier3": {
                displayName: "Tier 3",
                effects: {
                    image: "materials/commandCenterTier3.png",
                    creditsAdd: 52,
                    range: 8.5,
                    damage: 16,
                    powerAdd: 19,
                },
                creditCost: 32000,
                purchased: false,
            },
            "tier2": {
                displayName: "Tier 2",
                effects: {
                    image: "materials/commandCenterTier2.png",
                    creditsAdd: 32,
                    range: 7,
                    damage: 13,
                    powerAdd: 14,
                },
                creditCost: 11000,
                purchased: false,
            },
            "workerDroid": {
                displayName: "Worker Droid",
                creditCost: 450,
                purchased: 0,
            }
        },
        dimensions: 6,
        onClickEvent: "placeCommandCenter",
        tag: "commandCenterTag"
    },
    "barrack": {
        amount: 0,
        amountMax: 100,
        creditCost: 900,
        powerCost: 2,
        units: ["workerDroid", "combatDroid"],
        image: "materials/barrack.png",
        openedStructure: {
            "tier2": {
                displayName: "Tier 2",
                creditCost: 2400,
                effects: {
                    image: "materials/barrackTier2.png",
                    units: ["workerDroid", "combatDroid"],
                },
                purchased: false,
            },
            "workerDroid": {
                displayName: "Worker Droid",
                creditCost: 200,
                purchased: 0,
            },
            "combatDroid": {
                displayName: "Combat Droid",
                creditCost: 450,
                purchased: 0,
            }
        },
        dimensions: 4,
        onClickEvent: "placeBarrack",
        tag: "barrackTag"
    },
    "pumpjack": {
        amount: 1,
        amountMax: 100,
        creditCost: 400,
        creditsAdd: 10,
        powerCost: 2.5,
        image: "materials/pumpjack.png",
        openedStructure: {
            "tier3": {
                displayName: "Tier 3",
                creditCost: 6500,
                effects: {
                    image: "materials/pumpjackTier3.png",
                    powerCost: 5,
                },
                purchased: false,
            },
            "tier2": {
                displayName: "Tier 2",
                creditCost: 2200,
                effects: {
                    image: "materials/pumpjackTier2.png",
                    powerCost: 3,
                },
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
        creditCost: 1600,
        powerCost: 3,
        range: 5,
        damage: 3,
        image: "materials/plasmaTurret.png",
        openedStructure: {
            "rapidFire": {
                displayName: "Rapid Fire",
                creditCost: 1800,
                effects: {
                    image: "materials/plasmaTurretRapidFire.png",
                    range: 6,
                    damage: 4,
                    powerCost: 4.5,
                },
                purchased: false,
            },
            "railgun": {
                displayName: "Railgun",
                creditCost: 1500,
                effects: {
                    image: "materials/plasmaTurretRailgun.png",
                    range: 9.5,
                    damage: 8,
                    powerCost: 5,
                },
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
        creditCost: 1600,
        powerAdd: 7,
        image: "materials/generator.png",
        openedStructure: {
            "tier3": {
                displayName: "Tier 2",
                creditCost: 4200,
                effects: {
                    image: "materials/generatorTier3.png",
                    powerAdd: 18,
                },
                purchased: false,
            },
            "tier2": {
                displayName: "Tier 2",
                creditCost: 2500,
                effects: {
                    image: "materials/generatorTier2.png",
                    powerAdd: 11,
                },
                purchased: false,
            }
        },
        dimensions: 2,
        onClickEvent: "placeGenerator",
        tag: "generatorTag"
    }
}

let resources = {
    "credits": {
        amount: 9000 + startingCredits,
        income: 0,
    },
    "oil": {
        amount: 350,
        income: 0,
    },
    "concrete": {
        amount: 200,
        income: 0,
    },
    "steel": {
        amount: 50,
        income: 0,
    }
}

let terrain = {
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
}

let hotkeys = {
    panUp: "w",
    panDown: "s",
    panLeft: "a",
    panRight: "d",
    stopPlacing: "x",
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

    if (e.key == hotkeys.panUp) {

        startMove("up")
    } else if (e.key == hotkeys.panDown) {

        startMove("down")
    } else if (e.key == hotkeys.panLeft) {

        startMove("left")
    } else if (e.key == hotkeys.panRight) {

        startMove("right")
    }
    if (e.key == hotkeys.stopPlacing) {

        stopPlacing()
    }
}

window.onkeyup = function(e) {

    if (e.key == hotkeys.panUp) {

        endMove("up")
    } else if (e.key == hotkeys.panDown) {

        endMove("down")
    } else if (e.key == hotkeys.panLeft) {

        endMove("left")
    } else if (e.key == hotkeys.panRight) {

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

    while (structures["commandCenter"].amount < 1) {

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

    for (let structure of Object.keys(structures)) {

        if (structure == structureName) {

            if (structures[structure].amount < structures[structure].amountMax) {

                document.getElementById(structures[structure].tag).classList.add("sideBarItemActive")

                closeInfoParent.classList.add("closeInfoParentShow")

                placingStructure[structure] = true
            }

            break
        }
    }
}

function tryPlacingStructure(e) {

    for (let structure of Object.keys(structures)) {

        if (placingStructure[structure] == true && resources.credits.amount >= structures[structure].creditCost) {

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

                    if (gridParent.x + structures[structure].dimensions > Math.sqrt(mapSize) || gridParent.y + structures[structure].dimensions > Math.sqrt(mapSize)) {

                        return
                    }

                    for (let y = gridParent.y; y < gridParent.y + structures[structure].dimensions; y++) {
                        for (x = gridParent.x; x < gridParent.x + structures[structure].dimensions; x++) {

                            if (z == structures[structure].dimensions * structures[structure].dimensions) {

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

                    if (z == structures[structure].dimensions * structures[structure].dimensions) {

                        let x = 0

                        e.target.value = structure

                        e.target.addEventListener('mousedown', openStructure)

                        e.target.childNodes[0].classList.add(structure)

                        e.target.childNodes[0].style.backgroundImage = "url(" + structures[structure].image + ")"

                        e.target.childNodes[0].id = e.target.id

                        resources.credits.amount -= structures[structure].creditCost

                        structures[structure].amount += 1

                        let structureData = document.createElement("div")

                        structureData.className = "structureDataParent"

                        structureData.id = gridParent.id

                        document.getElementById("sideBarContent").appendChild(structureData)

                        for (let item of Object.keys(structures[structure].openedStructure)) {

                            let structureDataItem = document.createElement("div")

                            structureDataItem.className = "structureDataItem"

                            structureDataItem.classList.add(item)

                            structureDataItem.onclick = purchaseFromStructure

                            structureData.appendChild(structureDataItem)

                            let structureDataImage = document.createElement("img")

                            structureDataImage.className = "structureDataImage"

                            structureDataItem.appendChild(structureDataImage)

                            let structureDataText = document.createElement("h3")

                            structureDataText.innerText = structures[structure].openedStructure[item].displayName

                            structureDataText.className = "structureDataText"

                            structureDataItem.appendChild(structureDataText)
                        }

                        if (structure == "commandCenter" || structure == "plasmaTurret") {

                            let gridChildShadow = document.createElement("div")

                            gridChildShadow.className = "gridChildShadow"

                            e.target.childNodes[0].appendChild(gridChildShadow)

                            gridChildShadow.style.boxShadow = "rgb(29, 92, 228, 0.075) 0 0 0 " + structures[structure].range * 20 + "px"
                        }

                        for (let player of Object.keys(players)) {

                            if (players[player].faction == "mechanical") {

                                updatePower(structure, player)
                            }
                            if ((players[player].faction == "mechanical" || players[player].faction == "humanoid") && structures[structure].creditsAdd) {

                                resources.credits.income += structures[structure].creditsAdd
                            }
                        }

                        for (let y = gridParent.y; y < gridParent.y + structures[structure].dimensions; y++) {
                            for (x = gridParent.x; x < gridParent.x + structures[structure].dimensions; x++) {

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

    for (let structure of Object.keys(structures)) {

        placingStructure[structure] = false

        document.getElementById(structures[structure].tag).classList.remove("sideBarItemActive")
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

function purchaseFromStructure(e) {

    let structure = document.getElementById(e.target.parentElement.id).childNodes[0]

    let structureType = structure.classList[1]

    let id = structure.id

    let purchaseItem = e.target.classList[1]

    let cost = structures[structureType].openedStructure[purchaseItem].creditCost

    if (resources.credits.amount >= cost && structures[structureType].openedStructure[purchaseItem].purchased != true) {

        resources.credits.amount -= cost
        structures[structureType].openedStructure[purchaseItem].purchased = true

        for (let effect of Object.keys(structures[structureType].openedStructure[purchaseItem].effects)) {

            if (Object.keys(structures[structureType]).indexOf(effect) > 0) {

                structures[structureType][effect] = structures[structureType].openedStructure[purchaseItem].effects[effect]

                updateStats(structureType, id)
                updatePower(structureType, "player1")
            }
        }
    }
}

function updateStats(structure, id) {

    if (structure == "commandCenter" || structure == "plasmaTurret") {

        let element = document.getElementById(id).childNodes[0]

        element.style.backgroundImage = "url(" + structures[structure].image + ")"

        element.childNodes[0].style.boxShadow = "rgb(29, 92, 228, 0.075) 0 0 0 " + structures[structure].range * 20 + "px"
    }
}

function updatePower(structure, player) {

    if (structures[structure].powerAdd) {

        players[player].factionSpecificResources.power.amount += structures[structure].powerAdd

    } else if (structures[structure].powerCost) {

        players[player].factionSpecificResources.power.amountUsed += structures[structure].powerCost

    }

    document.getElementById("factionResourcesText").innerText = players[player].factionSpecificResources.power.amount - players[player].factionSpecificResources.power.amountUsed + " Power"

    let factionResourcesParent = document.getElementById("factionResourcesParent")

    factionResourcesParent.style.backgroundSize = 200 + "%"

    factionResourcesParent.style.backgroundPositionX = aFunction()

    function aFunction() {

        let requestedPosition = (players[player].factionSpecificResources.power.amount - players[player].factionSpecificResources.power.amountUsed)

        console.log(requestedPosition + ", " + (factionResourcesParent.style.backgroundSize).replace('%', ''))

        if (requestedPosition > 100) {

            console.log("Too big")
            return 100 + "%"

        }
        if (requestedPosition < 0) {

            console.log("Too small")
            return 0 + "%"
        }

        console.log("Just right")
        return requestedPosition + "%"
    }
}

setInterval(generateResources, 250)

function generateResources() {

    // Credits

    resources.credits.amount += resources.credits.income

    document.getElementById("creditAmount").innerText = (resources.credits.amount).toFixed(0)
    document.getElementById("creditIncome").innerText = (resources.credits.income * 4).toFixed(0) + " / Sec"

    // Oil

    resources.oil.income = (structures.pumpjack.amount * 1.2) + (structures.commandCenter.amount * 2)

    resources.oil.amount += resources.oil.income

    document.getElementById("oilAmount").innerText = (resources.oil.amount).toFixed(0)
    document.getElementById("oilIncome").innerText = (resources.oil.income * 4).toFixed(0) + " / Sec"

    // Concrete

    resources.concrete.income = (structures.commandCenter.amount * 1.8)

    resources.concrete.amount += resources.concrete.income

    document.getElementById("concreteAmount").innerText = (resources.concrete.amount).toFixed(0)
    document.getElementById("concreteIncome").innerText = (resources.concrete.income * 4).toFixed(0) + " / Sec"

    // Steel

    resources.steel.income = (structures.commandCenter.amount * 0.5)

    resources.steel.amount += resources.steel.income

    document.getElementById("steelAmount").innerText = (resources.steel.amount).toFixed(0)
    document.getElementById("steelIncome").innerText = (resources.steel.income * 4).toFixed(0) + " / Sec"
}


addText()

function addText() {

    document.getElementById("economicUnitCount").innerHTML = economicUnits + " Workers"

    document.getElementById("totalUnitCount").innerHTML = units + " / " + unitsMax + " Units"
}