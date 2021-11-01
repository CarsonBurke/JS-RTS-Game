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

            positions[x * mapDimensions + y] = gridPart
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

/* let musicPlaying = false

document.addEventListener("mousedown", playMusic)
document.addEventListener("keydown", playMusic)

function playMusic() {

    if (musicPlaying) return

    const music = new Audio("materials/sounds/song1.mp4")
    music.loop = true
    music.play()

    musicPlaying = true
} */

// Music

playMusic()

function playMusic() {

    let songs = []
    let songPlayingIndex = 0
    let musicPlaying = false
    
    createPlaylist()
    
    function createPlaylist() {
    
        // List of song urls
    
        const path = 'materials/sounds/'
        const songURLs = [
            path + 'song1.mp4',
            path + 'song2.mp4',
            path + 'song3.mp4',
        ]
    
        for (let songURL of songURLs) {
    
            // Configure audio of url
    
            const song = new Audio(songURL)
    
            // Load the song
    
            song.load()
    
            // Inform window when song ends
    
            song.addEventListener('ended', function() { playNextSong() })
    
            // Add song to songs
            
            songs.push(song)
        }
    }
    
    function playNextSong() {

        // If last song set index to 0

        if (songPlayingIndex == songs.length) songPlayingIndex = 0

        // Play song
        
        songs[songPlayingIndex].play()

        // Increase song index

        songPlayingIndex += 1
    }

    document.addEventListener("mousedown", startMusic)
    document.addEventListener("keydown", startMusic)

    function startMusic() {

        // Stop if music is already playing

        if (musicPlaying) return

        // Play song

        songs[songPlayingIndex].play()

        // Record that a song is playing
    
        musicPlaying = true

        // Increase song index

        songPlayingIndex += 1
    }
}

// Allows user to scroll to zoom

let scale = 1

mapEl.onwheel = function zoom(event) {

    event.preventDefault()

    scale += event.deltaY * -0.001

    scale = Math.min(Math.max(0.75, scale), 2)

    map.style.transform = "scale(" + scale + ")"
}

// Define events for when user presses a key

let upPos = 0
let leftPos = 0

window.onkeydown = function(event) {

    let key = event.key

    // Disable scroll ability of scroll keys

    for (let keyName of scrollKeys) {

        if (key != keyName) continue

        event.preventDefault()
    }

    //

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
    else if (key == hotkeys.exitBuildMode) exitBuildMode()
    else if (key == hotkeys.deleteStructure && selectedStructure) selectedStructure.destroy()
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

            upPos -= 60

        } else {

            upPos += 60
        }
    } else {

        if (move.qualifier == "positive") {

            leftPos -= 60

        } else {

            leftPos += 60
        }
    }

    // Limit upPos by map edges

    upPos = Math.min(upPos, mapEl.offsetHeight)
    upPos = Math.max(upPos, 0)

    // Limit leftPos by map edges

    leftPos = Math.min(leftPos, mapEl.offsetWidth)
    leftPos = Math.max(leftPos, 0)

    // Find mapContainer el

    let mapContainer = document.getElementById("mapContainer")

    // Scroll based on positions

    mapContainer.scroll({
        top: upPos,
        left: leftPos,
        behaviour: "smooth"
    })

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

    structure.place()
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

    const structure = new Structure({
        type: placingStructureTypeName,
        owner: "Carson",
        x: x,
        y: y,
    })

    structure.place()
}

async function enterBuildMode(structureTypeName) {

    const structureType = structureTypes[structureTypeName]

    // If already in build mode and build mode structureType isn't this structureType

    if (buildMode && buildMode.structureType != structureType) {

        exitBuildMode()
    }

    await wait(100)

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

    buildMode = structureTypeName
}

function exitBuildMode() {

    // Stop if already not in build mode

    if (!buildMode) return

    // Remove interaction effect for displayEl

    let displayEl = document.getElementById(buildMode + "DisplayChild")
    displayEl.classList.remove("structureDisplayChildSelected")
    
    // Stop ability to place structures

    document.removeEventListener("click", newStructure)

    disablePlacePreview()

    // Show cursor again

    mapEl.style.cursor = "default"

    // Remove buildNotification

    buildNotificationEl.classList.remove("buildNofiticationParentShow")

    // Make it clear that buildMode is off

    buildMode = undefined
}

async function advancedShowEl(el) {

    await wait(100)

    el.style.display = "block"

    await wait(100)

    el.classList.add(el.classList[0] + "Show")
}

async function advancedHideEl(el) {

    el.classList.remove(el.classList[0] + "Show")

    await wait(100)

    el.style.display = "none"
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
            playerResources.el.innerHTML = Math.floor(playerResources.amount)
        }
    }
}