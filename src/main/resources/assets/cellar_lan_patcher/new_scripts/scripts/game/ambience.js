function main(c) {
    var player = c.server.getAllPlayers()[0]
    if (c.server.states.getNumber("game") == 1) {
        player.playStaticSound("mp.sounds:cellar_sounds.chapter1.ambience.amb"+Math.floor(mappet.random(1, 12))+"", 0.6, 1.0)
    }
}