const prisma = require("../config/db");

const getAllChatByRoom = async roomId => await prisma.chatRooms.findUnique({
    where : {
        roomId
    },
    include : {
        message : true
    }
})

const getAllGroup = async () => await prisma.chatRooms.findMany({
    where : {
        name : {
            not : null,
            not : ""
        }
    }
})

const createPrivRoom = async idRoom => await prisma.chatRooms.create({
    data : {
        roomId : idRoom
    }
})

const createGroupRoom = async roomData => await prisma.chatRooms.create({
    data : {
        name : roomData.name,
        adminId : roomData.adminId,
        type : roomData.type
    }
})

const findRoomById = async roomId => await prisma.chatRooms.findUnique({
    where : {
        roomId
    }
})

const deleteRoomChatById = async roomId => await prisma.chatRooms.delete({
    where : {
        roomId : roomId
    }
})

const findRoomByNameId = async (name, id) => await prisma.chatRooms.findFirst({
    where : {
        name,
        adminId : id
    }
})

const updateGroupRoomName = async (groupName, roomId) => await prisma.chatRooms.update({
    where : {roomId},
    data : {
        name : groupName
    }
})

module.exports = {
    getAllChatByRoom,
    createPrivRoom,
    createGroupRoom,
    findRoomById,
    deleteRoomChatById,
    getAllGroup,
    findRoomByNameId,
    updateGroupRoomName
}