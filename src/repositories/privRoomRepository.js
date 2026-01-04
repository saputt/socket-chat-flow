const prisma = require("../config/db")

const getAllPrivMessage = async roomId => await prisma.privRooms.findUnique({
    where : {
        roomId
    },
    include : {
        message : true,
        firstUser : {
            select : {
                id : true,
                name : true
            }
        },
        secondUser : {
            select : {
                id : true,
                name : true
            }
        },
    }
})

const createPrivRoom = async data => await prisma.privRooms.create({
    data : {
        roomId : data.roomId,
        user1 : data.user1,
        user2 : data.user2
    },
})

const findPrivRoomById = async roomId => await prisma.privRooms.findFirst({
    where : {
        roomId
    },
    include : {
        firstUser : true,
        secondUser : true
    }
})

const deletePrivRoomById = async roomId => await prisma.privRooms.delete({
    where : {
        roomId : roomId
    }
})

module.exports = {
    getAllPrivMessage,
    createPrivRoom,
    deletePrivRoomById,
    findPrivRoomById
}