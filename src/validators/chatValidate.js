const { default: z, string } = require("zod");

const addRoomGroupChatSchema = z.object({
    name : z
        .string()
        .min(1)
})

const addRoomPrivChatSchema = z.object({
    sendTo : z
        .string()
        .min(1)
})

const sendMessageSchema = z.object({
    chatRoomId : z
        .string()
        .min(1),
    content : z
        .string()
        .min(1),
    sendTo : z
        .string()
        .optional()
})

const deleteRoomChatSchema = z.object({
    
})

const deleteMessageSchema = z.object({
    roomId : z
        .string()
        .min(1)
})
