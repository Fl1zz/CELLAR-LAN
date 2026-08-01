const pos = [
    [3, 16, 41, 5],
    [0, 18, 42, 1],
    [1, 21, 41, 3],
    [1, 9, 41, 23],
    [3, 5, 41, 31],
    [3, 4, 42, 29],
    [2, -16, 41, 9],
    [3, -17, 42, 6],
    [0, -14, 41, 1],
    [2, -25, 41, 34],
    [2, -31, 42, 35],
    [3, -32, 41, 32]
]

function main(c) {
    const rand = Math.floor(mappet.random(0, pos.length))
    let bl = false;
    for(let i in pos){
        if(c.server.getWorld(0).getBlock(pos[i][1], pos[i][2], pos[i][3]).getBlockId() == "cellar:fuse"){
            bl = true;

        }
   }
   if(bl){ return; }
   c.server.getWorld(0).setBlock(mappet.createBlockState("cellar:fuse", pos[rand][0]), pos[rand][1], pos[rand][2], pos[rand][3]);

}
function reset(c) {
    for(let i in pos){
        c.server.getWorld(0).setBlock(mappet.createBlockState("minecraft:air", pos[i][0]), pos[i][1], pos[i][02], pos[i][3]);
    }
}