function wait(miliseconds) {
    return new Promise(resolve => {
        setTimeout(() => { resolve() }, miliseconds)
    })
}

function getPositionsInsideRect(rect) {

    let positions = []

    for (let x = rect.x1; x < rect.x2; x++) {
        for (let y = rect.y1; y < rect.y2; y++) {

            positions.push({ x: x, y: y })
        }
    }
    return positions
}