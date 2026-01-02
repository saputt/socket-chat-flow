const prisma = require("../config/db");

const createGroupMessage = async data => await prisma.messages.create({
    data
})

const createPrivMessage = async data => await prisma.messages.create({data})

const deleteMessage = async id => await prisma.messages.delete({
    where : {id}
})

module.exports = {
    createPrivMessage,
    createGroupMessage,
    deleteMessage
}