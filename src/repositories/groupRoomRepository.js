const prisma = require("../config/db");

const getAllGroupMessage = async roomId => await prisma.groupRooms.findUnique({
    where : {
        roomId
    },
    include : {
        message : {
            include : {
                sender : true,
                grupRoom : true
            }
        },
    },
})

const getAllGroup = async () => await prisma.groupRooms.findMany()

const createGroupRoom = async roomData => await prisma.groupRooms.create({
    data : {
        name : roomData.name,
        adminId : roomData.adminId,
        type : roomData.type
    }
})

const findGroupRoomById = async roomId => await prisma.groupRooms.findUnique({
    where : {
        roomId
    }
})

const deleteGroupRoomById = async roomId => await prisma.groupRooms.delete({
    where : {
        roomId : roomId
    }
})

const findRoomByNameId = async (name, id) => await prisma.groupRooms.findFirst({
    where : {
        name,
        adminId : id
    }
})

const updateGroupRoomName = async (groupName, roomId) => await prisma.groupRooms.update({
    where : {roomId},
    data : {
        name : groupName
    }
})

module.exports = {
    getAllGroupMessage,
    createGroupRoom,
    deleteGroupRoomById,
    getAllGroup,
    findRoomByNameId,
    updateGroupRoomName,
    findGroupRoomById
}