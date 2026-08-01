const states = ["respawnTime", "hand", "voice", "box", "doors", "game", "safezone", "hp", "voice", "deathPanel", "tutorialPanel"]

function main(c) {
    for each (var i in states) {
        c.server.states.reset(i)
    }
    var entities = c.server.getEntities("@e[mpid=bonnie]")
    if (entities.length != 0) {
        var bonnie = entities[0]
        bonnie.remove()
    }
}