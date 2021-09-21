import "./gameVars.js"

// Create map and implement values

map.style.width = mapDimensions + "px"
map.style.height = mapDimensions + "px"

createGrid()

function createGrid() {

    // Dimensions / number of tiles will give size, size should be 10px

    let gridSize = mapDimensions / gridPartDimensions

    // Loop through each position

    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {

            let gridPart = new GridPart({ x: x, y: y })

            let el = gridPart.el
            let id = gridPart.id

            el.id = id

            el.classList.add(gridPart.type)

            el.style.width = gridPartDimensions + "px"
            el.style.height = gridPartDimensions + "px"

            map.appendChild(el)

            positions[id] = gridPart
        }
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

document.onwheel = function zoom(event) {

    event.preventDefault();

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

                upPos += 150

            } else {

                upPos -= 150
            }
        } else {

            if (move.qualifier == "positive") {

                leftPos += 150

            } else {

                leftPos -= 150
            }
        }

        map.style.top = upPos + "px"
        map.style.left = leftPos + "px"
    }
}

// Place game objects

let commandCenter = new Structure({
    structureType: "commandCenter"
})

function placeStructure(structure) {

    let el = document.createElement("div")

    el.classList.add(this.structureType)

    el.style.width = structureTypes[this.structureType].width * gridPartDimensions + "px"
    el.style.height = structureTypes[this.structureType].height * gridPartDimensions + "px"

    structures[id] = this
}

/* function placeObject(opts) {

    let id = newId()

    let element = document.createElement("div")

    element.classList.add(opts.type)
    element.id = id

    objects[id] = opts

    element.style.position = "absolute"

    element.style.top = gridPartDimensions * opts.y + "px"
    element.style.left = gridPartDimensions * opts.x + "px"

    map.appendChild(element)

    opts.id = id

    return opts
}

placeCommandCenter()

function placeCommandCenter() {

    let type = "player"
    let pos = { x: 0, y: 0 }

    placeObject({
        type: type,
        x: pos.x,
        y: pos.y,
    })
} */

// When placing structure show graphic

window.addEventListener("load", createPlacePreview)

function createPlacePreview() {

    let el = document.createElement("div")

    el.classList.add("placePreview")

    el.style.width = 3 * gridPartDimensions + "px"
    el.style.height = 3 * gridPartDimensions + "px"

    mapEl.appendChild(el)

    globalThis.placePreviewEl = el
}

function followCursor(e) {

    let el = placePreviewEl

    let top = Math.floor((e.pageY / scale - mapEl.getBoundingClientRect().top - el.scrollHeight / scale * 0.5) / 20) * 20
    let left = Math.floor((e.pageX / scale - mapEl.getBoundingClientRect().left - el.scrollWidth / scale * 0.5) / 20) * 20

    el.style.top = top + "px"
    el.style.left = left + "px"
}

window.addEventListener("mousemove", followCursor)
window.addEventListener("onscroll", followCursor)