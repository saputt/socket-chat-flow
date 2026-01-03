const { deleteMessage, createPrivMessage, createGroupMessage } = require("../repositories/chatRepository")
const AppError = require("../utils/errorHandler")
const { isSendToExist, isUserExistById, isGroupExist, isPrivExist } = require("../utils/serviceHelper")
const generateRoomId = require("../utils/generateRoomId")
const { addRoomMember, findMember } = require("../repositories/roomMemberRepository")
const { findPrivRoomById, getAllPrivMessage, createPrivRoom } = require("../repositories/privRoomRepository")
const { findGroupRoomById, getAllGroupMessage, findRoomByNameId, createGroupRoom, getAllGroup } = require("../repositories/groupRoomRepository")

const sendMessagePrivService = async (data, senderId, roomId) => {
    await isPrivExist(roomId)

    const messageData = {
        content : data.content,
        senderId : senderId,
        sendTo : data.sendTo,
        privRoomId : roomId,
    }

    return createPrivMessage(messageData)
}

const sendMessageGroupService = async (data, senderId, roomId) => {
    await isGroupExist(roomId)

    const messageData = {
        content : data.content,
        senderId : senderId,
        groupRoomId : roomId,
    }

    return createGroupMessage(messageData)
}

const getAllPrivMessageService = roomId => {
    return getAllPrivMessage(roomId)
}

const getAllGroupMessageService = roomId => {
    return getAllGroupMessage(roomId)
}

const addRoomPrivChatService = async (senderId, sendTo) => {
    await isSendToExist(sendTo)
    
    const idRoom = generateRoomId(sendTo, senderId)

    const roomExist = await findPrivRoomById(idRoom)

    if(roomExist) throw new AppError("Room is already defined")

    return createPrivRoom(idRoom)
}

const addRoomGroupChatService = async (data, adminId) => {
    const groupIsDup = await findRoomByNameId(data.name, adminId)

    if(groupIsDup) throw new AppError("You are already have this group", 404)

    const groupData = {
        name : data.name,
        adminId : adminId
    }

    return createGroupRoom(groupData)
}

const deleteGroupChatService = async (roomId, userId) => {
    await isGroupExist(roomId)

    if(groupExist.adminId !== userId) throw new AppError("Your are not authorized to delete this group")

    return deleteRoomChatById(roomId)
}

const deleteMessageService = async (messageId, senderId, data) => {
    const {roomId} = data

    const roomExist = await isRoomExist(roomId)

    if(roomExist.type === "PRIVATE") await deleteMessage(roomId)

    if(roomExist.adminId !== senderId) throw new AppError("Your not authorized to delete this message", 400)

    return deleteMessage(messageId)
}

const joinPrivRoomService = async (userId, sendToId) => {
    await isSendToExist(sendToId)

    const roomId = generateRoomId(userId, sendToId)

    const roomExist = await findPrivRoomById(roomId)

    if(!roomExist) return await createPrivRoom(roomId)
    
    return roomExist
}

const joinGroupRoomService = async (roomId, userId) => {
    await isGroupExist(roomId)

    await isUserExistById(userId)

    const memberRoomExist = await findMember(roomId, userId)

    if(!memberRoomExist) addRoomMember(userId, roomId)

    return roomId
}

const getAllGroupService = async () => {
    return getAllGroup()
}

const updateGroupRoomService = async (roomId, userId, data) => {
    await isGroupExist(roomId)

    if(groupExist.adminId !== userId) throw new AppError("Youre not authorized to edit this group")

    return updateGroupRoomName(data.name, roomId)
}

const getGroupService = async roomId => {
    const groupExist = await findGroupRoomById(roomId)

    if(!groupExist) throw AppError("Group doesnt find", 404)

    return groupExist
}

module.exports = {
    sendMessagePrivService,
    sendMessageGroupService,
    getAllGroupMessageService,
    getAllPrivMessageService,
    deleteGroupChatService,
    deleteMessageService,
    joinPrivRoomService,
    addRoomGroupChatService,
    addRoomPrivChatService,
    getAllGroupService,
    joinPrivRoomService,
    joinGroupRoomService,
    updateGroupRoomService,
    getGroupService
}