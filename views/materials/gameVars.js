// Assign variables

let properties = {
    mapDimensions: 1000,
    gridPartDimensions: 20,
    nextId: 0,
    mapEl: document.getElementById("map"),
    cursorEl: document.getElementById("cursor"),
    resourceTypes: {
        credits: {

        },
    },
    positions: {


    },
    structures: {

    },
    structureTypes: {
        commandCenter: {
            owner: undefined,
            width: 5,
            height: 5,
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
            units: {
                harvester: {

                },
                scout: {

                }
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

        stopPlacing: "x",
    },
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

            this.x = opts.x
            this.y = opts.y

            this.type = opts.type
            this.id = newId()
            this.el = document.createElement("div")
        }
    },
    CommandCenter: class {
        constructor(opts) {

            for (let propertyName in opts) {

                let property = opts[propertyName]

                this[propertyName] = property
            }
        }
    }
    Player: class {
        constructor() {

            this.resources
        }
    },
}


// Assign variables to globalThis

for (let propertyName in properties) {

    let property = properties[propertyName]

    globalThis[propertyName] = property
}