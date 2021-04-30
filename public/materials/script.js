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

let mountainAnchors = 0
let maxMountainAnchors = gridSize * 4

let mountains = 0
let maxMountains = maxMountainAnchors

console.log(maxMountains)

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
            console.log(coordinates.size)
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

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom right
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
        } else if (coordinates.value == "mountainAnchors" && coordinates.size == 2) {

            //top
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //left
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top left
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
        } else if (coordinates.value == "mountainAnchors" && coordinates.size == 3) {

            //top
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }

            //bottom
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //left
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top left
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }

            //top right
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom left
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom right
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    console.log(altCoordinates.id)
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

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }

            //bottom
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //left
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top left
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }

            //top right
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom left
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom right
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right right
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x - 2 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right right top
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x - 2 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right right bottom
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x - 2 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
        } else if (coordinates.value == "mountainAnchors" && coordinates.size == 5) {

            //top
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }

            //bottom
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //right
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //left
            for (let altCoordinates of grids) {

                if (altCoordinates.y == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top left
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }

            //top right
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom left
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //bottom right
            for (let altCoordinates of grids) {

                if (altCoordinates.y - 1 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top top
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 2 == coordinates.y && altCoordinates.x == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top top left
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 2 == coordinates.y && altCoordinates.x - 1 == coordinates.x) {

                    console.log(altCoordinates.id)
                    document.getElementById(altCoordinates.id).classList.add("mountains")
                    altCoordinates.value = "mountains"
                    mountains++
                }
            }
            //top top right
            for (let altCoordinates of grids) {

                if (altCoordinates.y + 2 == coordinates.y && altCoordinates.x + 1 == coordinates.x) {

                    console.log(altCoordinates.id)
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

                        document.getElementById(coordinates.id).style.borderTopLeftRadius = "20px"
                    }
                }
            }
            //top right
            if (coordinates.x + 1 == secondaryCoordinates.x && coordinates.y == secondaryCoordinates.y && !secondaryCoordinates.value) {

                for (let tertiaryCoordinates of grids) {
                    if (coordinates.x == tertiaryCoordinates.x && coordinates.y - 1 == tertiaryCoordinates.y && !tertiaryCoordinates.value) {

                        document.getElementById(coordinates.id).style.borderTopRightRadius = "20px"
                    }
                }
            }
            //bottom left
            if (coordinates.x - 1 == secondaryCoordinates.x && coordinates.y == secondaryCoordinates.y && !secondaryCoordinates.value) {

                for (let tertiaryCoordinates of grids) {
                    if (coordinates.x == tertiaryCoordinates.x && coordinates.y + 1 == tertiaryCoordinates.y && !tertiaryCoordinates.value) {

                        document.getElementById(coordinates.id).style.borderBottomLeftRadius = "20px"
                    }
                }
            }
            //bottom right
            if (coordinates.x + 1 == secondaryCoordinates.x && coordinates.y == secondaryCoordinates.y && !secondaryCoordinates.value) {

                for (let tertiaryCoordinates of grids) {
                    if (coordinates.x == tertiaryCoordinates.x && coordinates.y + 1 == tertiaryCoordinates.y && !tertiaryCoordinates.value) {

                        document.getElementById(coordinates.id).style.borderBottomRightRadius = "20px"
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