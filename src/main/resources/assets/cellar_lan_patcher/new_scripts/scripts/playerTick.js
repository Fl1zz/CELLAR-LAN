function main(c) {
    if (c.server.states.getNumber("game") == 1) {
        for each (var player in c.server.getAllPlayers()) {
            player.executeScript("player/movement.js")
            player.executeScript("player/raycast.js")
        }
    }
}