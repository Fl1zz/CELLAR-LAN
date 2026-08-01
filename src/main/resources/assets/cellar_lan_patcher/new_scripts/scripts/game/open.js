const hotbar = ["HEALTH", "FOOD", "EXPERIENCE", "HOTBAR", "DEBUG", "CROSSHAIRS"]
const huds = [
    "death_front",
    "blackOut_death_back",
    "arms_infected",
    "cam_use_corpse",
    "death_back",
    "blackOut_lastDoor",
    "blackOut_damage",
    "loading",
    "blackInOut",
    "itCumming",
    "blackOut_death_front",
    "blackOut_getup",
    "shift_tutorial",
    "credits",
    "deathScreen",
    "tutorial",
    "portal",
    "skipCut",
    "tab"
]
var objVoice = {
    "where_am_i":true,
    "what_are_you":true,
    "whats_happening":true
}

const obj = {
    "item":"cam",
    "flashlight_ammo":1,
    "animations":false,
    "animTime":0
}

function main(c) {
    var ui = mappet.createUI().closable(false)
    var entities = c.server.getEntities("@e[mpid=bonnie]")
    if (entities.length != 0) {
        for each (var bonnie in entities) {
            bonnie.remove()
        }
    }
    for each (var i in hotbar) {
        c.player.getMinecraftHUD(i).setRender(false)
    }
    for each (var e in huds) {
        c.player.closeHUD(e)
    }
    
    c.server.states.setNumber("open", 1)
    c.server.states.setString("voice", JSON.stringify(objVoice))
    c.player.openUI(ui)
    c.player.setGameMode(3)
    c.player.setPosition(-7.7, 100, 14.8)
    c.player.setRotations(90,  -100, -90)
    c.player.setupHUD("loading")
    c.scheduleScript(400, function () {
        c.player.closeUI()
        c.player.closeHUD("loading")
        c.player.executeScript("game/cutscenes/getup.js")
        c.player.states.setString("hand", JSON.stringify(obj))
        c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.voice.getup", 1.5, 1.0)
        c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.ost.forgotten_place", 1.0, 1.0)
    })
}