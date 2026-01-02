const { deleteMessageService, getAllGroupService, addRoomPrivChatService, addRoomGroupChatService, joinPrivRoomService, joinGroupRoomService, updateGroupRoomService, sendMessagePrivService, sendMessageGroupService, sendMessageService, getGroupService, getAllPrivMessageService, getAllGroupMessageService } = require("../services/chatService")
const generateRoomId = require("../utils/generateRoomId")
const sendResponse = require("../utils/responseHelper")

const sendPrivMessageController = async (req, res, next) => {
    try {
        req.io?.to(req.params.roomId).emit("send_message", {
            id : Date.now(),
            senderId : req.user.id,
            nameSender : req.user.name, 
            content : req.body.content
        })
        
        await sendMessagePrivService(req.body, req.user.id, req.params.roomId, req.user.name)

        return sendResponse(res, 200, "Message send successfull")
    } catch (error) {
        next(error)
    }
}

const sendGroupMessageController = async (req, res, next) => {
    try {
        req.io?.to(req.params.roomId).emit("send_message", {
            id : Date.now(),
            senderId : req.user.id,
            content : req.body.content,
            sender : {
                name : req.user.name
            }
        })
        
        await sendMessageGroupService(req.body, req.user.id, req.params.roomId)

        return sendResponse(res, 200, "Message send successfull")
    } catch (error) {
        next(error)
    }
}

const deleteMessageController = async (req, res, next) => {
    try {
        const message = await deleteMessageService(req.params.messageId, req.user.id, req.body)

        req.io?.emit("delete_message", message.id)

        return sendResponse(res, 200, "Delete message successfull")
    } catch (error) {
        next(error)
    }
}

const getAllPrivMessageController = async (req, res, next) => {
    try {
        const messages = await getAllPrivMessageService(req.params.roomId)

        return sendResponse(res, 200, "Get all message successfull", messages)
    } catch (error) {
        next(error)
    }
}

const getAllGroupMessageController = async (req, res, next) => {
    try {
        const messages = await getAllGroupMessageService(req.params.roomId)

        return sendResponse(res, 200, "Get all message successfull", messages)
    } catch (error) {
        next(error)
    }
}

const addRoomPrivChatController = async (req, res, next) => {
    try {
        const room = await addRoomPrivChatService(req.user.id, req.body.sendTo)

        return sendResponse(res, 200, "Generate a room id", {roomId : room.roomId})
    } catch (error) {
        next(error)
    }
}

const addRoomGroupChatController = async (req, res, next) => {
    try {
        const roomId = await addRoomGroupChatService(req.body, req.user.id)

        req.io?.emit("new_group", roomId)

        return sendResponse(res, 200, "Generate a room id", roomId)
    } catch (error) {
        next(error)
    }
}

const deleteRoomChatController = async (req, res, next) => {
    try {
        const room = await deleteRoomChatService(req.params.roomId, req.user.id)

        req.io?.emit("delete_room", room.roomId)

        return sendResponse(res, 200, "Delele roomchat success", room.roomId)
    } catch (error) {
        next(error)
    }
}

const joinPrivRoomController = async (req, res, next) => {
    try {
        const room = await joinPrivRoomService(req.user.id, req.params.sendToId)

        return sendResponse(res, 200, "Join room success", {roomId : room.roomId})
    } catch (error) {
        next(error)
    }
}

const joinGroupRoomController = async (req, res, next) => {
    try {
        const room = await joinGroupRoomService(req.params.roomId, req.user.id)

        return sendResponse(res, 200, "Join room success", {roomId : room.roomId})
    } catch (error) {
        next(error)
    }
}

const getAllGroupController = async (req, res, next) => {
    try {
        const groups = await getAllGroupService()

        return sendResponse(res, 200, "Get all group success", groups)
    } catch (error) {
        next(error)
    }
}

const getGroupController = async (req, res, next) => {
    try {
        const group = await getGroupService(req.params.roomId)

        return sendResponse(res, 200, "Get detail group success", group)
    } catch (error) {
        next(error)
    }
}

const updateGroupRoomController = async (req, res, next) => {
    try {
        const group = await updateGroupRoomService(req.params.roomId, req.user.id, req.body)

        req.io?.emit("update_group", group)

        return sendResponse(res, 200, "Update room name successfull", {group})
    } catch (error) {
        next(error)
    }
}

const getPrivRoomIdController = async (req, res, next) => {
    try {
        const privRoomId = generateRoomId(req.params.sendToId, req.user.id)

        sendResponse(res, 200, null, privRoomId)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    sendGroupMessageController,
    getPrivRoomIdController,
    sendPrivMessageController,
    deleteMessageController,
    getAllPrivMessageController,
    getAllGroupMessageController,
    addRoomPrivChatController,
    addRoomGroupChatController,
    deleteRoomChatController,
    joinPrivRoomController,
    joinGroupRoomController,
    getAllGroupController,
    updateGroupRoomController,
    getGroupController
}