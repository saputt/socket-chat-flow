const prisma = require("../config/db");

const findMember = async (roomId, userId) => await prisma.roomMembers.findFirst({
    where : {
        roomId,
        userId
    }
})

const addRoomMember = async (userId, roomId) => await prisma.roomMembers.create({
    data : {
        userId,
        roomId
    }
})

const deleteRoomMember = async (userId, roomId) => await prisma.roomMembers.delete({
    where : {
        roomId,
        userId
    }
})

module.exports = {
    findMember,
    addRoomMember,
    deleteRoomMember
}