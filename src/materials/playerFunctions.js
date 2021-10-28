Player.prototype.chargeResources = function(costObject) {

    const player = this

    // Convert costObject into array

    let cost = []

    for (let resourceType in costObject) {

        let resourceAmount = costObject[resourceType]

        // Stop if can't afford

        if (resourceAmount >= player.resources[resourceType].amount) {

            return
        }

        // Add resource to cost

        cost[resourceType] = resourceAmount
    }

    // Charge player the resources

    for (let resourceType in cost) {

        let resourceAmount = cost[resourceType]

        player.resources[resourceType].amount -= resourceAmount
    }

    // Inform callback that the charge worked

    return true
}