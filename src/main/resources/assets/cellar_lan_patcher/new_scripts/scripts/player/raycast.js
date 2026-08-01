function main(c) {
    var raycast = c.player.rayTrace(4)
    
    if (raycast.isBlock()) {
        var block = c.server.getWorld(0).getBlock(raycast.block.x, raycast.block.y, raycast.block.z)
        const metaList = {
            0:[raycast.block.x+0.5, raycast.block.y+0.5, raycast.block.z+1.1],
            1:[raycast.block.x-0.1, raycast.block.y+0.5, raycast.block.z+0.5],
            2:[raycast.block.x+0.5, raycast.block.y+0.5, raycast.block.z-0.1],
            3:[raycast.block.x+1.1, raycast.block.y+0.5, raycast.block.z+0.5]
        }
        
        if (block.blockId == "cellar:fuse" || block.blockId == "cellar:key") {
            c.server.getWorld(0).displayMorph(mappet.createMorph("{RemoveParentSpace:1b,Pose:{S:[0.2f,0.2f,0.2f]},Billboard:1b,Texture:\"c.s:cellar_assets/chapter1/sprites/e.png\",Shaded:0b,Name:\"blockbuster.image\"}"), 2, raycast.block.x+0.5, raycast.block.y+0.5, raycast.block.z+0.5)
        } else if (block.blockId == "cellar:fence") {
            c.server.getWorld(0).displayMorph(mappet.createMorph("{RemoveParentSpace:1b,Pose:{S:[0.2f,0.2f,0.2f]},Billboard:1b,Texture:\"c.s:cellar_assets/chapter1/sprites/e.png\",Shaded:0b,Name:\"blockbuster.image\"}"), 2, raycast.block.x+0.5, raycast.block.y+0.5, raycast.block.z+1)
        } else if (block.blockId == "cellar:door_ash_real" || block.blockId == "cellar:door_ash_mimic") {
            c.server.getWorld(0).displayMorph(mappet.createMorph("{RemoveParentSpace:1b,Pose:{S:[0.2f,0.2f,0.2f]},Billboard:1b,Texture:\"c.s:cellar_assets/chapter1/sprites/mouse.png\",Shaded:0b,Name:\"blockbuster.image\"}"), 2, metaList[block.meta][0], metaList[block.meta][1], metaList[block.meta][2])
        }
    }
}