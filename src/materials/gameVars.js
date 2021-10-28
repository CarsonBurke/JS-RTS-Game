// Assign variables

let properties = {
    mapDimensions: 5000,
    gridPartDimensions: 20,
    nextId: 0,
    mapEl: document.getElementById("map"),
    cursorEl: document.getElementById("cursor"),
    buildMode: undefined,
    selectedStructure: undefined,
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
            width: 8,
            height: 8,
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
                    displayName: "Tier 2",
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
                    requirements: [],
                },
                tier3: {
                    purchased: false,
                    displayName: "Tier 3",
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
                    requirements: ['tier2'],
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
    scrollKeys: [
        "ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown", " ", "End", "PageUp", "PageDown", "Home"
    ],
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

            const structure = this

            this.owner = opts.owner

            this.type = opts.type
            this.x = opts.x
            this.y = opts.y

            this.id = newId()

            this.el = document.createElement("div")

            for (let propertyName in structureTypes[this.type]) {

                this[propertyName] = structureTypes[this.type][propertyName]
            }

            // Add things the user can do when selecting the structure

            this.selectionEl = document.createElement("div")

            this.selectionEl.classList.add("selectionDisplayParent")
            this.selectionEl.style.display = 'none'

            let selectionEl = this.selectionEl

            let interactionDisplayParent = document.getElementsByClassName("interactionDisplayParent")[0]

            interactionDisplayParent.appendChild(selectionEl)

            //

            for (let upgradeName in this.upgrades) {

                const upgrade = this.upgrades[upgradeName]

                //

                let structureDisplayChild = document.createElement("div")
                structureDisplayChild.classList.add("structureDisplayChild")

                structureDisplayChild.onclick = function() {
                    structure.upgrade(upgrade)
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

            // structureDestroy el config

            let structureDestroy = document.createElement('div')

            structureDestroy.classList.add('structureDestroy')

            structureDestroy.innerText = 'Destroy'

            structureDestroy.onclick = function() { structure.destroy() }

            selectionEl.appendChild(structureDestroy)
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