const prisma = require("../config/db");

const createMessage = async data => await prisma.messages.create({data})

const deleteMessage = async id => await prisma.messages.delete({
    where : {id}
})

module.exports = {
    createMessage,
    deleteMessage
}