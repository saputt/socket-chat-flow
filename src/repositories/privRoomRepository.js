const prisma = require("../config/db");

const getAllPrivMessage = async roomId => await prisma.PrivRooms.findUnique({
    where : {
        roomId
    },
    include : {
        message : true
    }
})

const createPrivRoom = async idRoom => await prisma.PrivRooms.create({
    data : {
        roomId : idRoom
    }
})

const findPrivRoomById = async roomId => await prisma.PrivRooms.findUnique({
    where : {
        roomId
    }
})

const deletePrivRoomById = async roomId => await prisma.PrivRooms.delete({
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