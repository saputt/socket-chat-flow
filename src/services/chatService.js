const { createMessage, deleteMessage } = require("../repositories/chatRepository")
const { findRoomById, getAllChatByRoom, getAllGroup, deleteRoomChatById, createGroupRoom, findRoomByNameId, createPrivRoom, updateGroupRoomName } = require("../repositories/roomChatRepository")
const AppError = require("../utils/errorHandler")
const { isSendToExist, isUserExistById, isRoomExist } = require("../utils/serviceHelper")
const generateRoomId = require("../utils/generateRoomId")
const { addRoomMember, findMember } = require("../repositories/roomMemberRepository")

const sendMessageService = async (data, senderId, roomId) => {
    const roomExist = await isRoomExist(roomId)
    
    if(roomExist.type === "PRIVATE" && data.sendTo) await isSendToExist(data.sendTo)
    
    if(data.content === "" || !data.content) throw new AppError("Message cannot be empty", 400)

    const messageData = {
        content : data.content,
        senderId : senderId,
        ...(data.sendTo && {sendTo : data.sendTo}),
        chatRoomId : roomId,
    }

    return createMessage(messageData)
}

const getAllMessageByRoomIdService = roomId => {
    return getAllChatByRoom(roomId)
}

const addRoomPrivChatService = async (senderId, sendTo) => {
    await isSendToExist(sendTo)
    
    const idRoom = generateRoomId(sendTo, senderId)

    const roomExist = await findRoomById(idRoom)

    if(roomExist) throw new AppError("Room is already defined")

    return createPrivRoom(idRoom)
}

const addRoomGroupChatService = async (data, adminId) => {
    const groupIsDup = await findRoomByNameId(data.name, adminId)

    if(groupIsDup) throw new AppError("You are already have this group")

    const groupData = {
        type : "GROUP",
        name : data.name,
        adminId : adminId
    }

    return createGroupRoom(groupData)
}

const deleteRoomChatService = async (roomId, userId) => {
    const roomExist = await isRoomExist(roomId)

    if(roomExist.type === "PRIVATE") throw new AppError("Youre cannot delete private chat")

    if(roomExist.adminId !== userId) throw new AppError("Your are not authorized to delete this group")

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

    const roomExist = await findRoomById(roomId)

    if(!roomExist) return createPrivRoom(roomId)
    
    return roomExist
}

const joinGroupRoomService = async (roomId, userId) => {
    await isRoomExist(roomId)

    await isUserExistById(userId)

    const memberRoomExist = await findMember(roomId, userId)

    if(!memberRoomExist) addRoomMember(userId, roomId)

    return roomId
}

const getAllGroupService = async () => {
    return getAllGroup()
}

const updateGroupRoomService = async (roomId, userId, data) => {
    const groupExist = await isRoomExist(roomId)

    if(groupExist.adminId !== userId) throw new AppError("Youre not authorized to edit this group")

    return updateGroupRoomName(data.name, roomId)
}

const getGroupService = async (roomId) => {
    const groupExist = await isRoomExist(roomId)

    return groupExist
}

module.exports = {
    sendMessageService,
    getAllMessageByRoomIdService,
    deleteRoomChatService,
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