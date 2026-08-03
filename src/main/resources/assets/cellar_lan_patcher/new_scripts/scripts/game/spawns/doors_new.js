const doorsList = {
    room1:[
        ["cellar:door_ash_real", 0, 6, 42, 6],
        [4, 46, 6, 10, 37, 1],
        ["cellar:body_floor", 0, 6, 41, 2],
        ["cellar:body_floor3", 1, 7, 41, 4],
        ["cellar:body_wall", 3, 5, 43, 4],
        ["cellar:body_wall_2", 0, 8, 43, 2],
        ["cellar:body_ceiling3", 0, 7, 44, 2],
        ["cellar:body_ceiling2", 3, 6, 44, 4]
    ], room2:[
        ["cellar:door_ash_real", 1, 25, 42, 8],
        [25, 46, 11, 32, 37, 6],
        ["cellar:body_floor", 1, 30, 41, 8],
        ["cellar:body_floor2", 2, 27, 41, 10],
        ["cellar:body_wall", 0, 28, 42, 7],
        ["cellar:body_wall_2", 1, 31, 43, 9],
        ["cellar:body_ceiling2", 1, 30, 44, 10],
        ["cellar:body_ceiling3", 0, 28, 44, 8]
    ], room3:[
        ["cellar:door_ash_real", 1, 25, 42, 19],
        [25, 39, 21, 30, 46, 15],
        ["cellar:body_floor2", 3, 26, 41, 18],
        ["cellar:body_floor", 0, 27, 41, 16],
        ["cellar:body_floor3", 1, 28, 41, 20],
        ["cellar:body_wall", 0, 27, 42, 16],
        ["cellar:body_wall_2", 2, 27, 43, 20],
        ["cellar:body_ceiling3", 1, 28, 44, 18]
    ], room4:[
        ["cellar:door_ash_real", 2, 18, 42, 10],
        [16, 46, 10, 21, 39, 16],
        ["cellar:body_floor2", 3, 17, 41, 11],
        ["cellar:body_floor3", 1, 19, 41, 13],
        ["cellar:body_wall_2", 1, 20, 43, 12],
        ["cellar:body_wall", 3, 17, 42, 13],
        ["cellar:body_ceiling", 0, 18, 44, 11],
        ["cellar:body_ceiling2", 2, 19, 44, 14]
    ], room5:[
        ["cellar:door_ash_real", 1, 11, 42, 20],
        [16, 39, 17, 11, 46, 22],
        ["cellar:body_floor", 2, 14, 41, 21],
        ["cellar:body_floor2", 0, 12, 41, 19],
        ["cellar:body_wall_2", 2, 14, 43, 21],
        ["cellar:body_wall", 3, 12, 43, 19],
        ["cellar:body_ceiling3", 3, 12, 44, 20],
        ["cellar:body_ceiling", 1, 14, 44, 18]
    ], room6:[
        ["cellar:door_ash_real", 0, 7, 42, 17],
        [10, 46, 17, 4, 39, 12],
        ["cellar:body_floor", 0, 7, 41, 14],
        ["cellar:body_wall_2", 1, 9, 42, 14],
        ["cellar:body_wall", 0, 6, 43, 13],
        ["cellar:body_ceiling3", 3, 6, 44, 15],
        ["cellar:body_ceiling2", 0, 7, 44, 13],
        ["cellar:body_ceiling", 3, 8, 44, 16]
    ], room7:[
        ["cellar:door_ash_real", 1, -7, 42, 14],
        [-7, 46, 11, -2, 39, 18],
        ["cellar:body_floor2", 0, -4, 41, 13],
        ["cellar:body_floor3", 2, -6, 41, 15],
        ["cellar:body_wall", 2, -4, 41, 17],
        ["cellar:body_wall_2", 1, -3, 42, 13],
        ["cellar:body_ceiling3", 3, -5, 44, 16],
        ["cellar:body_ceiling2", 0, -5, 44, 13]
    ], room8:[
        ["cellar:door_ash_real", 3, -10, 42, 14],
        [-15, 39, 11, -10, 46, 16],
        ["cellar:body_floor3", 3, -11, 41, 13],
        ["cellar:body_floor2", 2, -12, 41, 15],
        ["cellar:body_floor", 3, -14, 41, 13],
        ["cellar:body_wall", 2, -12, 43, 15],
        ["cellar:body_wall_2", 0, -13, 43, 12],
        ["cellar:body_ceiling2", 1, -13, 44, 14]
    ], room9:[
        ["cellar:door_ash_real", 2, -14, 42, 27],
        [-16, 39, 32, -11, 46, 27],
        ["cellar:body_floor2", 1, -12, 41, 29],
        ["cellar:body_floor", 2, -14, 41, 31],
        ["cellar:body_wall_2", 3, -15, 43, 29],
        ["cellar:body_ceiling3", 1, -12, 44, 29],
        ["cellar:body_wall", 2, -13, 43, 31],
        ["cellar:body_ceiling", 2, -14, 44, 30]
    ], room10:[
        ["cellar:door_ash_real", 2, -19, 42, 41],
        [-22, 39, 46, -16, 46, 41],
        ["cellar:body_floor3", 0, -18, 41, 42],
        ["cellar:body_floor", 2, -18, 41, 45],
        ["cellar:body_floor2", 3, -20, 41, 43],
        ["cellar:body_wall", 0, -20, 43, 42],
        ["cellar:body_wall_2", 2, -18, 42, 45],
        ["cellar:body_ceiling3", 1, -18, 44, 44]
    ], room11:[
        ["cellar:door_ash_real", 3, -19, 42, 19],
        [-25, 39, 16, -19, 46, 22],
        ["cellar:body_floor2", 3, -23, 41, 19],
        ["cellar:body_wall", 0, -21, 43, 17],
        ["cellar:body_wall_2", 2, -23, 43, 21],
        ["cellar:body_ceiling2", 1, -20, 44, 19],
        ["cellar:body_ceiling3", 1, -21, 44, 21],
        ["cellar:body_ceiling", 0, -23, 44, 17]
    ], room12:[
        ["cellar:door_ash_real", 1, -29, 42, 19],
        [-29, 46, 22, -25, 39, 16],
        ["cellar:body_floor3", 3, -28, 41, 18],
        ["cellar:body_floor", 1, -26, 41, 19],
        ["cellar:body_floor2", 2, -27, 41, 21],
        ["cellar:body_wall", 2, -27, 43, 21],
        ["cellar:body_wall_2", 1, -26, 42, 19],
        ["cellar:body_ceiling3", 1, -27, 44, 19]
    ], room13:[
        ["cellar:door_ash_real", 3, -32, 42, 19],
        [-32, 46, 16, -36, 39, 22],
        ["cellar:body_floor2", 2, -34, 41, 21],
        ["cellar:body_floor", 3, -35, 41, 18],
        ["cellar:body_wall", 2, -34, 43, 21],
        ["cellar:body_wall_2", 0, -34, 42, 17],
        ["cellar:body_ceiling", 2, -34, 44, 20],
        ["cellar:body_ceiling2", 2, -34, 44, 18]
    ], room14:[
        ["cellar:door_ash_real", 3, -18, 42, 3],
        [-23, 39, 0, -18, 46, 5],
        ["cellar:body_floor3", 2, -20, 41, 3],
        ["cellar:body_floor2", 3, -22, 41, 2],
        ["cellar:body_ceiling", 1, -19, 43, 1],
        ["cellar:body_wall_2", 1, -19, 43, 3],
        ["cellar:body_ceiling2", 1, -19, 44, 4],
        ["cellar:body_wall", 3, -22, 43, 3]
    ], room15:[
        ["cellar:door_ash_real", 2, -22, 42, -6],
        [-25, 39, -1, -19, 46, -6], 
        ["cellar:body_floor2", 0, -21, 41, -4],
        ["cellar:body_floor", 2, -23, 41, -2],
        ["cellar:body_wall_2", 2, -23, 43, -2],
        ["cellar:body_wall", 0, -21, 43, -5],
        ["cellar:body_ceiling", 1, -20, 44, -3],
        ["cellar:body_ceiling3", 1, -22, 44, -4]
    ], room16:[
        ["cellar:door_ash_real", 1, -14, 42, -6],
        [-10, 39, -9, -14, 46, -4],
        ["cellar:body_wall_2", 2, -12, 43, -5],
        ["cellar:body_floor2", 3, -13, 41, -5],
        ["cellar:body_floor3", 3, -13, 41, -7],
        ["cellar:body_floor", 0, -12, 41, -8],
        ["cellar:body_wall", 0, -12, 43, -8],
        ["cellar:body_ceiling3", 2, -12, 44, -6]
    ]
}

function main(c) {
    
    var doors = []
    var box = []

    for (var i in doorsList) {
        var doorPos = mappet.vector(doorsList[i][0][2], doorsList[i][0][3], doorsList[i][0][4])
        c.server.getWorld(0).setBlock(
            mappet.createBlockState("minecraft:air", 0), 
            doorPos.x, doorPos.y, doorPos.z
        )
        
        for (var e = 2; e <= 7; e++) {
            var bodyPos = mappet.vector(doorsList[i][e][2], doorsList[i][e][3], doorsList[i][e][4])
            c.server.getWorld(0).setBlock(
                mappet.createBlockState("minecraft:air", 0), 
                bodyPos.x, bodyPos.y, bodyPos.z
            )
        }
    }
    
    c.server.states.reset("box")
    c.server.states.reset("doors")
    c.server.states.setNumber("doors", 8)

    for (var i in doorsList) {
        var posDoorMimic = mappet.vector(doorsList[i][0][2], doorsList[i][0][3], doorsList[i][0][4])
        c.server.getWorld(0).setBlock(mappet.createBlockState("cellar:door_ash_mimic", doorsList[i][0][1]), posDoorMimic.x, posDoorMimic.y, posDoorMimic.z)
        doors.push([i])
    }

    for (var i = 0; i <= 7; i++) {
        var rand = Math.floor(mappet.random(0, doors.length))
        
        var posDoorReal = mappet.vector(doorsList[doors[rand]][0][2], doorsList[doors[rand]][0][3], doorsList[doors[rand]][0][4])
        c.server.getWorld(0).setBlock(mappet.createBlockState(doorsList[doors[rand]][0][0], doorsList[doors[rand]][0][1]), posDoorReal.x, posDoorReal.y, posDoorReal.z)
        
        for (var e = 2; e <= 7; e++) {
            var posBody = mappet.vector(doorsList[doors[rand]][e][2], doorsList[doors[rand]][e][3], doorsList[doors[rand]][e][4])
            c.server.getWorld(0).setBlock(mappet.createBlockState(doorsList[doors[rand]][e][0], doorsList[doors[rand]][e][1]), posBody.x, posBody.y, posBody.z)
        }
        box.push(doorsList[doors[rand]][1])
        doors.splice(rand, 1)
    }

    c.server.states.setString("box", JSON.stringify(box))
}