// Assign variables

let properties = {
    mapDimensions: 1000,
    gridPartDimensions: 20,
    nextId: 0,
    mapEl: document.getElementById("map"),
    cursorEl: document.getElementById("cursor"),
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
    positions: {


    },
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
                    displayName: "Teir 2",
                    image: "materials/images/commandCenterTier2.png",
                    cost: {
                        credits: 1000,
                    },
                    income: {

                    },
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
        grass: {
            traversable: {
                land: true,
                water: false,
                air: true,
            },

        },
        forest: {
            traversable: {
                land: false,
                water: false,
                air: true,
            },
        },
        sand: {
            traversable: {
                land: true,
                water: false,
                air: true,
            },
        },
        mountain: {
            traversable: {
                land: false,
                water: false,
                air: true,
            },
        },
        water: {
            traversable: {
                land: false,
                water: true,
                air: true,
            },
        },
        stone: {
            traversable: {
                land: true,
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
        }
    },
    /*     CommandCenter: class {
            constructor(opts) {

                this.owner = opts.owner

                this.type = "commandCenter"
                this.x = opts.x
                this.y = opts.y

                this.id = newId()
                this.el = document.createElement("div")

                for (let propertyName in structureTypes[this.type]) {

                    let property = structureTypes[this.type][propertyName]

                    this[propertyName] = property
                }
            }
        }, */
    Player: class {
        constructor(opts) {

            // Add options to player

            this.name = opts.name

            //

            this.selectedStructure = false
            this.buildMode = false

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
}


// Assign variables to globalThis

for (let propertyName in properties) {

    let property = properties[propertyName]

    globalThis[propertyName] = property
}