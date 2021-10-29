Structure.prototype.place = function() {

    const structure = this

    function isStructurePlacable(object1, object2) {

        // Check if object1 is inside object2

        if (object1.x >= object2.x && object1.x <= object2.x + object2.width && object1.y >= object2.y && object1.y <= object2.y + object2.height) {

            return true
        }
    }

    // Make sure no other structures are in the way

    for (let structureID in structures) {
        
        const existingStructure = structures[structureID]

        // Stop if structure is blocked

        if (!isStructurePlacable(structure, existingStructure)) return
    }

    // Try to charge cost of structure, stop if fails

    if (!players[structure.owner].chargeResources(structure.cost)) return

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

    structure.el.onclick = function() { structure.select() }

    // Add element to map

    mapEl.appendChild(el)

    // Add structure to structure list

    structures[structure.id] = structure
}
Structure.prototype.select = function() {

    const structure = this

    // Make sure player isn't in buildMode

    if (buildMode) return

    // Check if structure is already selected

    if (structure.selected) {

        structure.deSelect()
        return
    }

    // If there is a structure selected already


    if (selectedStructure) {

        selectedStructure.deSelect()
    }

    //

    structure.el.classList.add("structureOutline")

    // Hide structureDisplay

    let structureDisplayParent = document.getElementsByClassName("structureDisplayParent")[0]

    advancedHideEl(structureDisplayParent)

    // show selectionEl

    advancedShowEl(structure.selectionEl)

    // Record that the structure is selected

    structure.selected = true

    // Record this structure as selected

    selectedStructure = structure
}

Structure.prototype.deSelect = function() {

    const structure = this

    // Remove outline

    structure.el.classList.remove("structureOutline")

    // Hide selectionEl

    advancedHideEl(structure.selectionEl)

    // Show structureDisplay

    let structureDisplayParent = document.getElementsByClassName("structureDisplayParent")[0]

    advancedShowEl(structureDisplayParent)

    // Record that the structure is no longer selected

    structure.selected = false

    // Record that no structures are selected

    selectedStructure = undefined
}

Structure.prototype.upgrade = function(upgrade) {

    const structure = this

    // Stop if upgrade is already purchased for the structure

    if (upgrade.purchased) return

    // Confirm structure has the requirements

    for (let upgradeName of upgrade.requirements) {

        // Iterate if upgrade is purchased

        if (structure.upgrades[upgradeName].purchased) continue

        return
    }

    // try to purchase upgrade, if fails stop

    if (!players[structure.owner].chargeResources(upgrade.cost)) return

    // Assign new income from upgrade

    for (let type in upgrade.income) {

        structure.income[type] = upgrade.income[type]
    }

    // Hide upgrade el

    advancedHideEl(upgrade.el)

    // Style structure el based on upgrade

    const el = structure.el

    el.style.backgroundImage = "url(" + upgrade.image + ")"

    //

    upgrade.purchased = true
}

Structure.prototype.destroy = function() {

    const structure = this

    // Delete element

    structure.el.remove()

    // Delete selectionEl

    structure.selectionEl.remove()

    // Show structureDisplay

    const structureDisplayParent = document.getElementsByClassName("structureDisplayParent")[0]

    advancedShowEl(structureDisplayParent)

    // Delete object

    delete structures[structure.id]
}