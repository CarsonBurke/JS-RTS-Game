import "./gameVars.js"
import "./perlin.js"

// Assign variables

let properties = {
    mapDimensions: 1000,
    gridPartDimensions: 2,
    nextId: 0,
    mapEl: document.getElementById("map"),
    cursorEl: document.getElementById("cursor"),
    colors: {
        red: "#ff0000",
        blue: "#0066ff",
        green: "#00ff00",
        yellow: "#ffff00",
        grey: "#9D9D9D",
    },
    wait: function(miliseconds) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, miliseconds)
        })
    },
    resourceTypes: {
        credits: {
            amount: 10000 + 1000,
            description: "",
            el: document.getElementById("creditsAmount"),
        },
        oil: {
            amount: 0,
            description: "",
            el: document.getElementById("oilAmount"),
        },
        steel: {
            amount: 0,
            description: "",
            el: document.getElementById("steelAmount"),
        },
        concrete: {
            amount: 0,
            description: "",
            el: document.getElementById("concreteAmount"),
        },
    },
    positions: [],
    structures: {

    },
    structureTypes: {
        commandCenter: {

            width: 5,
            height: 5,
            displayName: "Command Center",
            image: "materials/images/commandCenter.png",
            cost: {
                credits: 1000,
            },
            income: {
                credits: 3.5,
                concrete: 1.5,
                oil: 0.5,
                steel: 0.25,
            },
            upgrades: {
                tier2: {
                    purchased: false,
                    displayName: "Teir 2",
                    image: "materials/images/commandCenterTier2.png",
                    cost: {
                        credits: 1000,
                    },
                    income: {
                        credits: 5,
                        concrete: 2,
                        oil: 0.75,
                        steel: 0.4,
                    },
                },
                tier3: {
                    purchased: false,
                    displayName: "Teir 3",
                    image: "materials/images/commandCenterTier3.png",
                    cost: {
                        credits: 1000,
                    },
                    income: {
                        credits: 8,
                        concrete: 3,
                        oil: 1.1,
                        steel: 0.7,
                    },
                },
            },
            units: {
                harvester: {

                },
                scout: {

                }
            },
        },
        plasmaTurret: {

            width: 2,
            height: 2,
            displayName: "Plasma Turret",
            image: "materials/images/plasmaTurret.png",
            cost: {
                credits: 1000,
            },
            income: {
                credits: 15,
                oil: 0.5,
                steel: 0.25,
            },
            upgrades: {
                tier2: {

                },
                tier3: {

                },
            },
        },
        barrack: {

            width: 3,
            height: 3,
            displayName: "Barracks",
            image: "materials/images/barrack.png",
            cost: {
                credits: 1000,
            },
            income: {
                credits: 15,
                oil: 0.5,
                steel: 0.25,
            },
            upgrades: {
                tier2: {

                },
                tier3: {

                },
            },
        },
        pumpjack: {

            width: 2,
            height: 2,
            displayName: "Pumpjack",
            image: "materials/images/pumpjack.png",
            cost: {
                credits: 1000,
            },
            income: {
                credits: 15,
                oil: 0.5,
                steel: 0.25,
            },
            upgrades: {
                tier2: {

                },
                tier3: {

                },
            },
        },
        mineshaft: {

            width: 3,
            height: 4,
            displayName: "Mineshaft",
            image: "materials/images/mineshaft.png",
            cost: {
                credits: 1000,
            },
            income: {
                credits: 15,
                oil: 0.5,
                steel: 0.25,
            },
            upgrades: {
                tier2: {

                },
                tier3: {

                },
            },
        },
        generator: {

            width: 2,
            height: 1,
            displayName: "Generator",
            image: "materials/images/generator.png",
            cost: {
                credits: 1000,
            },
            income: {
                credits: 15,
                oil: 0.5,
                steel: 0.25,
            },
            upgrades: {
                tier2: {

                },
                tier3: {

                },
            },
        },
        steelRefinery: {

            width: 4,
            height: 3,
            displayName: "Steel Refinery",
            image: "materials/images/steelRefinery.png",
            cost: {
                credits: 1000,
            },
            income: {
                credits: 15,
                oil: 0.5,
                steel: 0.25,
            },
            upgrades: {
                tier2: {

                },
                tier3: {

                },
            },
        },
    },
    terrainTypes: {
        deepWater: {
            value: 10,
            traversable: {
                land: false,
                water: true,
                air: true,
            },
        },
        water: {
            value: 40,
            traversable: {
                land: false,
                water: true,
                air: true,
            },
        },
        sand: {
            value: 50,
            traversable: {
                land: true,
                water: false,
                air: true,
            },
        },
        lightGrass: {
            value: 120,
            traversable: {
                land: false,
                water: false,
                air: true,
            },
        },
        darkGrass: {
            value: 200,
            traversable: {
                land: true,
                water: false,
                air: true,
            },
        },
        stone: {
            value: 225,
            traversable: {
                land: true,
                water: false,
                air: true,
            },
        },
        mountain: {
            value: 255,
            traversable: {
                land: false,
                water: false,
                air: true,
            },
        },
    },
    hotkeys: {
        moveUp: "ArrowUp",
        moveLeft: "ArrowLeft",
        moveDown: "ArrowDown",
        moveRight: "ArrowRight",

        panUp: "w",
        panDown: "s",
        panLeft: "a",
        panRight: "d",

        exitStructureSelect: "x",
        exitBuildMode: "x",
    },
    buildNotificationEl: document.getElementById("buildNotificationParent"),
    players: {

    },
    nextId: 0,
    findWithId(id) {

        return objects[id]
    },
    newId() {

        nextId++
        return nextId - 1
    },
    GridPart: class {
        constructor(pos) {

            this.x = pos.x
            this.y = pos.y

            this.type = "gridPart"
            this.id = newId()
            this.el = document.createElement("div")
        }
    },
    Structure: class {
        constructor(opts) {

            this.owner = opts.owner

            this.type = opts.type
            this.x = opts.x
            this.y = opts.y

            this.id = newId()

            this.el = document.createElement("div")

            for (let propertyName in structureTypes[this.type]) {

                let property = structureTypes[this.type][propertyName]

                this[propertyName] = property
            }

            // Add things the user can do when selecting the structure

            this.selectionEl = document.createElement("div")

            this.selectionEl.classList.add("selectionDisplayParent")

            let selectionEl = this.selectionEl

            let interactionDisplayParent = document.getElementsByClassName("interactionDisplayParent")[0]

            interactionDisplayParent.appendChild(selectionEl)

            for (let upgradeName in this.upgrades) {

                let upgrade = this.upgrades[upgradeName]

                let structureDisplayChild = document.createElement("div")
                structureDisplayChild.classList.add("structureDisplayChild")

                structureDisplayChild.onclick = function() {
                    purchaseUpgrade(this, upgrade)
                }

                selectionEl.appendChild(structureDisplayChild)

                let structureDisplayImage = document.createElement("img")
                structureDisplayImage.classList.add("structureDisplayImage")

                structureDisplayImage.src = upgrade.image

                structureDisplayChild.appendChild(structureDisplayImage)

                let structureDisplayHeader = document.createElement("h3")
                structureDisplayHeader.classList.add("structureDisplayHeader")

                structureDisplayHeader.innerHTML = upgrade.displayName

                structureDisplayChild.appendChild(structureDisplayHeader)
            }
        }
    },
    Player: class {
        constructor(opts) {

            // Add options to player

            this.name = opts.name

            //

            this.id = newId()

            // Add resources to player

            this.resources = {}

            for (let resourceName in resourceTypes) {

                let resource = resourceTypes[resourceName]

                this.resources[resourceName] = resource
            }
        }
    },
    Upgrade: class {
        constructor() {


        }
    }
}


// Assign variables to globalThis

for (let propertyName in properties) {

    let property = properties[propertyName]

    globalThis[propertyName] = property
}

// Create map and implement values

// Dimensions / number of tiles will give size, size should be 10px

let gridSize = mapDimensions / gridPartDimensions

map.style.width = mapDimensions + "px"
map.style.height = mapDimensions + "px"

createGrid()

function createGrid() {

    function findTerrainWithValue(value) {

        for (let terrainName in terrainTypes) {

            let terrainType = terrainTypes[terrainName]

            if (terrainType.value >= value) return terrainName
        }
    }

    //

    noise.seed(Math.random())

    // Loop through each position

    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {

            // Create ew grid part

            let gridPart = new GridPart({ x: x, y: y })

            // Find terrain type

            let terrainValue = Math.floor(Math.abs(noise.simplex2(x / 100, y / 100)) * 256)

            gridPart.type = findTerrainWithValue(terrainValue)

            // Add gridPart element

            let el = gridPart.el
            let id = gridPart.id

            el.id = id

            el.classList.add("gridPart")
            el.classList.add(gridPart.type)

            el.style.background = ""

            el.style.width = gridPartDimensions + "px"
            el.style.height = gridPartDimensions + "px"

            map.appendChild(el)

            // Add girdPart to positions

            positions[x * 50 + y] = gridPart
        }
    }
}

/* blendTerrain() */

function blendTerrain() {

    function findNearbyTerrain(gridPart) {

        // Check all sorrounding positions

        let corners = {
            topLeft: {
                degree: "135deg",
                cornerPos: { x: -1, y: -1 },
                sides: [
                    { x: -1, y: 0 },
                    { x: 0, y: -1 },
                ],
            },
            topRight: {
                degree: "45deg",
                cornerPos: { x: +1, y: +1 },
                sides: [
                    { x: 0, y: -1 },
                    { x: +1, y: 0 },
                ]
            },
            bottomLeft: {
                degree: "-135deg",
                cornerPos: { x: -1, y: +1 },
                sides: [
                    { x: 0, y: +1 },
                    { x: -1, y: 0 },
                ]
            },
            bottomRight: {
                degree: "-45deg",
                cornerPos: { x: +1, y: -1 },
                sides: [
                    { x: +1, y: 0 },
                    { x: 0, y: +1 },
                ]
            },
        }

        // Loop through each corner

        for (let cornerName in corners) {

            let corner = corners[cornerName]

            let likeTerrain = 0

            for (let pos of corner.sides) {

                let searchedGridPart = positions[(gridPart.x + pos.x) * 50 + gridPart.y + pos.y]

                if (!searchedGridPart) {

                    likeTerrain += 1
                    continue
                }

                if (searchedGridPart.type == gridPart.type) likeTerrain += 1
            }

            if (likeTerrain == 0) {

                let pos = corner.cornerPos

                let searchedGridPart = positions[(gridPart.x + pos.x) * 50 + gridPart.y + pos.y]

                if (!searchedGridPart) continue

                if (searchedGridPart.type != gridPart.type) {

                    let degree = corner.degree

                    // Adjust styling to blend

                    let color1 = window.getComputedStyle(searchedGridPart.el, null).getPropertyValue('background-color')

                    let color2 = window.getComputedStyle(gridPart.el, null).getPropertyValue('background-color')

                    gridPart.el.style.backgroundImage = "linear-gradient(" + degree + ", " + color1 + " 49.9%, " + color2 + " 50.01%)"

                    // Change the searched type to gridPart's type

                    // Inform us that this tile has been blended already

                    gridPart.blended = true
                }
            }
        }
    }

    for (let gridPart of positions) {

        if (gridPart.blended) continue

        findNearbyTerrain(gridPart)
    }
}

//

let el = buildNotificationEl
el.innerText = "Press " + hotkeys.exitBuildMode + " to exit build mode"

// Add structure display

addStructureDisplay()

function addStructureDisplay() {

    let structureDisplayParent = document.getElementsByClassName("structureDisplayParent")[0]

    structureDisplayParent.classList.add("structureDisplayParentShow")

    for (let structureTypeName in structureTypes) {

        let structureType = structureTypes[structureTypeName]

        let structureDisplayChild = document.createElement("div")
        structureDisplayChild.classList.add("structureDisplayChild")

        structureDisplayChild.id = structureTypeName + "DisplayChild"

        structureDisplayChild.onclick = function() { enterBuildMode(structureTypeName) }

        structureDisplayParent.appendChild(structureDisplayChild)

        let structureDisplayImage = document.createElement("img")
        structureDisplayImage.classList.add("structureDisplayImage")

        structureDisplayImage.src = structureType.image

        structureDisplayChild.appendChild(structureDisplayImage)

        let structureDisplayHeader = document.createElement("h3")
        structureDisplayHeader.classList.add("structureDisplayHeader")

        structureDisplayHeader.innerHTML = structureType.displayName

        structureDisplayChild.appendChild(structureDisplayHeader)
    }
}

// Create players

let playerNames = ["Carson", "Hive"]

createPlayers()

function createPlayers() {

    for (let playerName of playerNames) {

        players[playerName] = new Player({
            name: "Carson"
        })
    }
}

// Music

let musicPlaying = false

document.addEventListener("mousedown", playMusic)
document.addEventListener("keydown", playMusic)

function playMusic() {

    if (musicPlaying) return

    let music = new Audio("materials/sounds/song1.mp4")
    music.loop = true
    music.play()

    musicPlaying = true
}

// Allows user to scroll to zoom

let scale = 1

mapEl.onwheel = function zoom(event) {

    scale += event.deltaY * -0.001;

    scale = Math.min(Math.max(0.75, scale), 2);

    map.style.transform = "scale(" + scale + ")"
}

// Define events for when user presses a key

let upPos = 0
let leftPos = 0

window.onkeydown = function(event) {

    let key = event.key

    if (key == hotkeys.panUp) {

        startMove("up")

    } else if (key == hotkeys.panDown) {

        startMove("down")
    }
    if (key == hotkeys.panLeft) {

        startMove("left")

    } else if (key == hotkeys.panRight) {

        startMove("right")
    }

    if (key == hotkeys.stopPlacing) {

        stopPlacing()
    }

    if (key == hotkeys.moveUp) {

        movePlayer("up")
    }
    if (key == hotkeys.moveLeft) {

        movePlayer("left")
    }
    if (key == hotkeys.moveDown) {

        movePlayer("down")
    }
    if (key == hotkeys.moveRight) {

        movePlayer("right")
    }

    if (key == hotkeys.exitBuildMode) exitBuildMode()
}

window.onkeyup = function(event) {

    let key = event.key

    if (key == hotkeys.panUp) {

        endMove("up")
    } else if (key == hotkeys.panDown) {

        endMove("down")
    } else if (key == hotkeys.panLeft) {

        endMove("left")
    } else if (key == hotkeys.panRight) {

        endMove("right")
    }
}

let move = false

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

setInterval(changeDirection, 40)

function changeDirection() {

    if (!move) return

    if (move.direction == "up") {

        if (move.qualifier == "positive") {

            upPos += 40

        } else {

            upPos -= 40
        }
    } else {

        if (move.qualifier == "positive") {

            leftPos += 40

        } else {

            leftPos -= 40
        }
    }

    map.style.top = upPos + "px"
    map.style.left = leftPos + "px"

}

// When placing something show graphic

window.addEventListener("load", createPlacePreview)

function createPlacePreview() {

    let el = document.createElement("div")

    el.classList.add("placePreview")

    mapEl.appendChild(el)

    globalThis.placePreviewEl = el
}

function enablePlacePreview() {

    placePreviewEl.style.opacity = 1

    // Make place preview shadow follow the cursor

    window.addEventListener("mousemove", followCursor)
    window.addEventListener("wheel", followCursor)
    window.addEventListener("keydown", followCursor)
}

function disablePlacePreview() {

    // Disable place preview

    window.removeEventListener("mousemove", followCursor)
    window.removeEventListener("wheel", followCursor)
    window.removeEventListener("keydown", followCursor)

    placePreviewEl.style.opacity = 0
}

let placePreviewWidth = 0
let placePreviewHeight = 0

function followCursor(e) {

    //

    let el = placePreviewEl

    // adjust placePreview size to match structure

    el.style.width = placePreviewWidth * gridPartDimensions + "px"
    el.style.height = placePreviewHeight * gridPartDimensions + "px"

    // Get cursor distance from top and divide by map distance from top to get cursor distance from top of map

    let top = Math.floor((((e.pageY - mapEl.getBoundingClientRect().top) / scale) - (el.offsetHeight * 0.5)) / gridPartDimensions) * gridPartDimensions
    let left = Math.floor((((e.pageX - mapEl.getBoundingClientRect().left) / scale) - (el.offsetHeight * 0.5)) / gridPartDimensions) * gridPartDimensions

    // Make sure top stays inside the map

    top = Math.min(top, gridPartDimensions * gridSize - gridPartDimensions * placePreviewHeight)
    top = Math.max(top, 0)

    // Make sure left stays inside the map

    left = Math.min(left, gridPartDimensions * gridSize - gridPartDimensions * placePreviewWidth)
    left = Math.max(left, 0)

    el.style.top = top + "px"
    el.style.left = left + "px"
}

// Place game objects

placeStartingStructures()

function placeStartingStructures() {

    // Create starting command center

    let structure = new Structure({
        type: "commandCenter",
        owner: "Carson",
        x: 5,
        y: 10,
    })

    placeStructure(structure)
}

function chargeToBuildStructure(structure) {

    let cost = []

    for (let resourceType in structure.cost) {

        let resourceAmount = structure.cost[resourceType]

        if (resourceAmount >= players[structure.owner].resources[resourceType].amount) {

            return
        }

        cost[resourceType] = resourceAmount
    }

    for (let resourceType in cost) {

        let resourceAmount = cost[resourceType]

        players[structure.owner].resources[resourceType].amount -= resourceAmount
    }

    return true
}

function isPlaceablePosition(structure) {


}

function placeStructure(structure) {

    if (!chargeToBuildStructure(structure)) return

    isPlaceablePosition()

    let el = structure.el

    // Give class

    el.classList.add(structure.type)

    // Apply stylings

    el.style.cursor = "pointer"

    el.style.backgroundImage = "url(" + structure.image + ")"

    el.style.position = "absolute"

    el.style.backgroundPosition = "center"
    el.style.backgroundSize = "cover"

    el.style.width = structure.width * gridPartDimensions + "px"
    el.style.height = structure.height * gridPartDimensions + "px"

    el.style.top = structure.y * gridPartDimensions + "px"
    el.style.left = structure.x * gridPartDimensions + "px"

    // Add ability to select structure

    structure.el.onclick = function() { selectStructure(structure) }

    // Add element to map

    mapEl.appendChild(el)

    // Add structure to structure list

    structures[structure.id] = structure
}

// Build mode

let placingStructureTypeName

function newStructure(event) {

    let structureType = structureTypes[placingStructureTypeName]

    //

    let el = placePreviewEl

    // adjust placePreview size to match structure

    el.style.width = placePreviewWidth * gridPartDimensions + "px"
    el.style.height = placePreviewHeight * gridPartDimensions + "px"

    // Get cursor distance from y and divide by map distance from top to get cursor distance from top of map

    let y = Math.floor((((event.pageY - mapEl.getBoundingClientRect().top) / scale) - (el.offsetHeight * 0.5)) / gridPartDimensions)
    let x = Math.floor((((event.pageX - mapEl.getBoundingClientRect().left) / scale) - (el.offsetHeight * 0.5)) / gridPartDimensions)

    // Make sure y stays inside the map

    y = Math.min(y, gridSize - structureType.height)
    y = Math.max(y, 0)

    // Make sure x stays inside the map

    x = Math.min(x, gridSize - structureType.width)
    x = Math.max(x, 0)

    let structure = new Structure({
        type: placingStructureTypeName,
        owner: "Carson",
        x: x,
        y: y,
    })

    placeStructure(structure)
}

let buildMode

async function enterBuildMode(structureTypeName) {

    if (buildMode) return

    await wait(100)

    let structureType = structureTypes[structureTypeName]

    // place preview logic

    placePreviewEl.style.backgroundImage = "url(" + structureType.image + ")"

    placePreviewWidth = structureType.width
    placePreviewHeight = structureType.height

    let displayEl = document.getElementById(structureTypeName + "DisplayChild")
    displayEl.classList.add("structureDisplayChildSelected")

    buildNotificationEl.classList.add("buildNofiticationParentShow")

    enablePlacePreview()

    // Enable ability to place structures

    placingStructureTypeName = structureTypeName

    document.addEventListener("click", newStructure)

    // Make it known that buildMode is on

    buildMode = true
}

function exitBuildMode() {

    if (!buildMode) return

    // Remove interaction effect for displayEl

    for (let structureTypeName in structureTypes) {

        let displayEl = document.getElementById(structureTypeName + "DisplayChild")
        displayEl.classList.remove("structureDisplayChildSelected")
    }

    // Stop ability to place structures

    document.removeEventListener("click", newStructure)

    disablePlacePreview()

    // Show cursor again

    mapEl.style.cursor = "default"

    // Remove buildNotification

    buildNotificationEl.classList.remove("buildNofiticationParentShow")

    // Make it clear that buildMode is off

    buildMode = false
}

async function advancedShowEl(el) {

    await wait(300)

    el.style.display = "block"

    await wait(300)

    console.log(el)

    el.classList.add(el.classList[0] + "Show")
}

async function advancedHideEl(el) {

    el.classList.remove(el.classList[0] + "Show")

    await wait(300)

    el.style.display = "none"
}

// Selecting structures

function deSelectStructure(structure) {

    structure.el.classList.remove("structureOutline")

    // Hide selectionEl

    advancedHideEl(structure.selectionEl)

    // Show structureDisplay

    let structureDisplayParent = document.getElementsByClassName("structureDisplayParent")[0]

    advancedShowEl(structureDisplayParent)

    // Record that the structure is no longer selected

    structure.selected = false
}

function selectStructure(structure) {

    // Make sure player isn't in buildMode

    if (buildMode) return

    // Check if strucutre is already selected

    if (structure.selected) {

        deSelectStructure(structure)
        return
    }

    structure.el.classList.add("structureOutline")

    // Hide structureDisplay

    let structureDisplayParent = document.getElementsByClassName("structureDisplayParent")[0]

    advancedHideEl(structureDisplayParent)

    // show selectionEl

    advancedShowEl(structure.selectionEl)

    // Record that the structure is selected

    structure.selected = true
}

// Destroying structures

function destroyStructure(structure) {


}

// Purchasing upgrades

function chargeToPurchaseUpgrade(structure, upgrade) {

    console.log(structure.owner)

    let cost = []

    for (let resourceType in upgrade.cost) {

        let resourceAmount = upgrade.cost[resourceType]

        if (resourceAmount >= players[structure.owner].resources[resourceType].amount) {

            return
        }

        cost[resourceType] = resourceAmount
    }

    for (let resourceType in cost) {

        let resourceAmount = cost[resourceType]

        players[structure.owner].resources[resourceType].amount -= resourceAmount
    }

    return true
}

function purchaseUpgrade(structure, upgrade) {

    if (upgrade.purchased) return

    if (!chargeToPurchaseUpgrade(structure, upgrade)) return

    console.log("Trying to purchase " + upgrade.displayName)
}

// Generate resources

setInterval(generateResources, 250)

function generateResources() {

    for (let structureId in structures) {

        let structure = structures[structureId]

        let owner = structure.owner

        for (let resourceType in structure.income) {

            let structureIncome = structure.income[resourceType]
            let playerResources = players[owner].resources[resourceType]

            playerResources.amount += structureIncome
            playerResources.el.innerHTML = (playerResources.amount).toFixed(0)
        }
    }
}