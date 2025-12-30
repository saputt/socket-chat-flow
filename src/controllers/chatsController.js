const { getAllMessageByRoomIdService, deleteRoomChatService, deleteMessageService, getAllGroupService, addRoomPrivChatService, addRoomGroupChatService, joinPrivRoomService, joinGroupRoomService, updateGroupRoomService, sendMessagePrivService, sendMessageGroupService } = require("../services/chatService")
const sendResponse = require("../utils/responseHelper")

const sendMessageController = async (req, res, next) => {
    try {
        const message = await sendMessagePrivService(req.body, req.user.id, req.params.roomId)

        req.io?.to(message.chatRoomId).emit("send_message", message)
        
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

const getAllMessageByRoomIdController = async (req, res, next) => {
    try {
        const messages = await getAllMessageByRoomIdService(req.params.roomId)

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

const updateGroupRoomController = async (req, res, next) => {
    try {
        const group = await updateGroupRoomService(req.params.roomId, req.user.id, req.body)

        req.io?.emit("update_group", group)

        return sendResponse(res, 200, "Update room name successfull", {group})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    sendMessageController,
    deleteMessageController,
    getAllMessageByRoomIdController,
    addRoomPrivChatController,
    addRoomGroupChatController,
    deleteRoomChatController,
    joinPrivRoomController,
    joinGroupRoomController,
    getAllGroupController,
    updateGroupRoomController
}