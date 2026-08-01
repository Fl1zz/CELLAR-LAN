function main(c) {
    var ui = mappet.createUI(c, "handler").closable(true)
    
    ui.current.keybind(57, "space", "space")
    
    c.player.playStaticSound("cellar:ost_killyousoon", 1.0, 1.0)
    c.player.setupHUD("credits")
    c.player.openUI(ui)
    c.scheduleScript(960, function () {
        c.player.closeHUD("credits")
        c.player.openMainMenu()
    })
}

function handler(c) {
    var cntxt = c.player.UIContext
    
    if (cntxt.isClosed()) return
    switch (cntxt.getHotkey()) {
        case "space":
            c.player.closeHUD("credits")
            c.player.openMainMenu()
        break
    }
}