function ost(c) {
    const randOst = [
        "cellar:ost_memory",
        "cellar:ost_youlldie"
    ]
    var rand = Math.floor(mappet.random(0, randOst.length))
    var player = c.server.getAllPlayers()[0]
    var entities = c.server.getEntities("@e[mpid=bonnie]")
    
    if (entities.length != 0) {
        var bonnie = entities[0]
        if (c.server.states.getNumber("game") == 1 && c.server.states.getNumber("doors") > 0 && bonnie.getTarget() == null) {
            player.playStaticSound(randOst[rand], 0.3, mappet.random(0.8, 1.2))
        }
    }
}

function breath(c) {
    var player = c.server.getAllPlayers()[0]
    var entities = c.server.getEntities("@e[mpid=bonnie]")
    
    if (entities.length != 0) {
        var bonnie = entities[0]
        if (c.server.states.getNumber("game") == 1 && c.server.states.getNumber("doors") > 0 && bonnie.getTarget() == null) {
            player.playStaticSound("mp.sounds:cellar_sounds.chapter1.voice.breath"+Math.floor(mappet.random(1, 3))+"", 2.0, 1.0)
        }
    }
}