let gridParent = document.getElementById("gridParent")

let vpWidth = gridParent.offsetWidth
let vpHeight = gridParent.offsetHeight

console.log(vpWidth)

let rows = vpWidth / 25
let cols = vpHeight / 25

console.log(rows)

let grids = []

generateMap(rows, cols, gridParent, grids)

function generateMap(rows, cols, gridParent, grids) {

    gridParent.style.setProperty('--grid-rows', rows)
    gridParent.style.setProperty('--grid-cols', cols)

    for (let x = 0; x < cols; x++) {
        for (y = 0; y < rows; y++) {

            let gridChild = document.createElement("div")

            console.log(y + ", " + x + " : " + x + y)

            gridChild.id = (x * y)

            grids.push({ x: x, y: y })

            gridParent.appendChild(gridChild).className = "gridChild"
            gridParent.appendChild(gridChild).className = "gridChild"

            //gridChild.style.marginTop = (50 * y) + "px"
        }
    }
}