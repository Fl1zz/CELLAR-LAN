function main(c) {
    var ui = mappet.createUI(c, "handler")
    
    ui.current.keybind(30, "a", "a")
    ui.current.keybind(32, "d", "d")
    
    c.server.states.setNumber("tutorialPanel", 1)
    c.player.setupHUD("tutorial")
    c.player.getShader().setShaders(0, 0, 0, 0.2, 5, 0.0, 1.3, 2.0, true)
    c.player.openUI(ui)
    c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.misc.ui_open", 1.0, 1.0)
}

function handler(c) {
    var cntxt = c.player.UIContext
    
    switch (cntxt.getHotkey()) {
        case "a":
            c.server.states.add("tutorialPanel", -1)
            c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.misc.ui_use", 0.8, 0.8)
        break
        case "d":
            c.server.states.add("tutorialPanel", 1)
            c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.misc.ui_use", 0.8, 1.2)
        break
    }
    c.server.states.getNumber("tutorialPanel") == 0 ? c.server.states.setNumber("tutorialPanel", 1) : c.server.states.getNumber("tutorialPanel") == 4 ? c.server.states.setNumber("tutorialPanel", 3) : null
    c.player.changeHUDMorph("tutorial", 0, mappet.createMorph("{Texture:\"c.s:cellar_assets/chapter1/sprites/tutorialPanel_"+c.server.states.getNumber("tutorialPanel")+".png\",Shaded:0b,Name:\"blockbuster.image\"}"))
    c.player.changeHUDMorph("tutorial", 1, mappet.createMorph("{Texture:\"c.s:cellar_assets/chapter1/sprites/tutorialText_"+c.server.states.getNumber("tutorialPanel")+".png\",Shaded:0b,Name:\"blockbuster.image\"}"))
    c.player.changeHUDMorph("tutorial", 2, mappet.createMorph("{Texture:\"c.s:cellar_assets/chapter1/sprites/tutorialScreen_"+c.server.states.getNumber("tutorialPanel")+".png\",Shaded:0b,Name:\"blockbuster.image\"}"))
    
    if (cntxt.isClosed()) {
        c.server.states.reset("tutorialPanel")
        c.player.closeHUD("tutorial")
        c.player.getShader().setShaders(0, 0, 0, 0.2, 10, 0.0, 2.0, 2.0, false)
        c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.misc.ui_close", 1.0, 1.0)
    }
}