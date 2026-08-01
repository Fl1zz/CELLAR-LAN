function main(c) {
    if (c.player.isSprinting()) {
        c.player.removePotion(mappet.getPotion("slowness"))
    } else {
        c.player.applyPotion(mappet.getPotion("slowness"), 2, 0, false)
    }
}