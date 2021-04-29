generateMap()

function generateMap(rows, cols) {

    let map = document.getElementById("gridParent")

    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        //cell.innerText = (c + 1);
        cell.id = (c + 1)
        container.appendChild(cell).className = "grid-item";
    };
    for (let i = 1; i <= 900; i++) {

        let target = document.getElementById(i)
        let block = document.createElement("div")
        block.id = ("a" + i)
        target.appendChild(block).className = "blockChild"
    }
};