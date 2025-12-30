const { Router } = require("express")
const { deleteMessageController, getAllMessageByRoomIdController, deleteRoomChatController, getAllGroupController, joinPrivRoomController, addRoomPrivChatController, addRoomGroupChatController, joinGroupRoomController, updateGroupRoomController, sendMessageController } = require("../controllers/chatsController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = Router()

router.use(authMiddleware)

//to send a message
router.post("/api/message/:roomId", sendMessageController)

//to delete a message from chat
router.delete("/api/message/:messageId", deleteMessageController)

//to get all messages from room
router.get("/api/messages/:roomId", getAllMessageByRoomIdController)

//to delete roomchat
router.delete("/api/room/:roomId", deleteRoomChatController)

//to get all group room chat
router.get("/api/groups", getAllGroupController)

//to get room id and join priv room
router.post("/api/join-priv-room/:sendToId", joinPrivRoomController)

//to get room id and join group room
router.post("/api/join-group-room/:roomId", joinGroupRoomController)

//to add private room
router.post("/api/priv-room", addRoomPrivChatController)

//to add group room
router.post("/api/group-room", addRoomGroupChatController)

//to edit group chat name
router.patch("/api/group-room/:roomId", updateGroupRoomController)

module.exports = router