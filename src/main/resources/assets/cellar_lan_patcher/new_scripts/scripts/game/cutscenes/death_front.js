const sounds = [
    "mp.sounds:cellar_sounds.chapter1.cutscenes.death_front",
    "mp.sounds:cellar_sounds.chapter1.ost.rightnow_stop",
    "mp.sounds:cellar_sounds.chapter1.voice.death_front"
]

function main(c) {
    var ui = mappet.createUI().closable(false)
    
    c.server.states.setNumber("deathPanel", Math.floor(mappet.random(1, 3)))
    var all_pl = c.getServer().getAllPlayers()
    for (var a in all_pl){
        var all = all_pl[a]
        all.states.reset("hand")
        all.stopAllSounds()
        all.openUI(ui)
        all.setGameMode(3)
        all.playCutScene("death_front")
        all.stopLoopSound("mp.sounds:cellar_sounds.chapter1.ost.rightnow_loop")
        all.stopLoopSound("mp.sounds:cellar_sounds.chapter1.voice.scary_breath")
    }
    c.server.states.reset("game")
    for each (var i in sounds) {
        for (var p in all_pl){
            all_pl[p].playStaticSound(i, 0.8, 1.0)
        }
    }
    c.scheduleScript(180, function () {
        var players = c.getServer().getAllPlayers()
        for(var p in players) {
            var all_players = players[p]
            all_players.closeHUD("blackOut_death_front")
            c.subject.executeScript("player/ui/death_screen.js")
        }
    })
}