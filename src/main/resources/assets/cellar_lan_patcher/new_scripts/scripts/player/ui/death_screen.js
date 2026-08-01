function main(c) {
    var ui = mappet.createUI(c, "handler").closable(false)
    
    ui.current.keybind(30, "a", "a")
    ui.current.keybind(32, "d", "d")
    ui.current.keybind(57, "space", "space")
    
    c.player.setupHUD("deathScreen")
    c.player.changeHUDMorph("deathScreen", 1, mappet.createMorph("{Texture:\"c.s:cellar_assets/chapter1/sprites/deathscreenScreen_"+c.server.states.getNumber("deathPanel")+".png\",Shaded:0b,Name:\"blockbuster.image\"}"))
    c.player.changeHUDMorph("deathScreen", 2, mappet.createMorph("{Texture:\"c.s:cellar_assets/chapter1/sprites/deathscreenText_"+c.server.states.getNumber("deathPanel")+".png\",Shaded:0b,Name:\"blockbuster.image\"}"))
    c.player.openUI(ui)
    c.scheduleScript(10, function () {
        c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.misc.ui_open", 1.0, 0.8)
    })
}

function handler(c) {
    var cntxt = c.player.UIContext
    
    if (cntxt.isClosed()) return
    switch (cntxt.getHotkey()) {
        case "a":
            c.server.states.add("deathPanel", -1)
            c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.misc.ui_use", 0.8, 0.8)
        break
        case "d":
            c.server.states.add("deathPanel", 1)
            c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.misc.ui_use", 0.8, 1.2)
        break
        case "space":
            var plrs = c.getServer().getAllPlayers()
            for (var i in plrs){
                var all = plrs[i]
                all.closeHUD("deathScreen")
                all.playStaticSound("mp.sounds:cellar_sounds.chapter1.misc.ui_close", 1.0, 1.3)
                c.subject.executeScript("game/cutscenes/getup.js")
            }
            c.server.states.reset("deathPanel")
        break
    }
    c.server.states.getNumber("deathPanel") == 0 ? c.server.states.setNumber("deathPanel", 5) : c.server.states.getNumber("deathPanel") == 6 ? c.server.states.setNumber("deathPanel", 1) : null
    c.player.changeHUDMorph("deathScreen", 1, mappet.createMorph("{Texture:\"c.s:cellar_assets/chapter1/sprites/deathscreenScreen_"+c.server.states.getNumber("deathPanel")+".png\",Shaded:0b,Name:\"blockbuster.image\"}"))
    c.player.changeHUDMorph("deathScreen", 2, mappet.createMorph("{Texture:\"c.s:cellar_assets/chapter1/sprites/deathscreenText_"+c.server.states.getNumber("deathPanel")+".png\",Shaded:0b,Name:\"blockbuster.image\"}"))
}