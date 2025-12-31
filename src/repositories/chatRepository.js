const prisma = require("../config/db");

const createMessage = async data => await prisma.messages.create({
    data,
    include : {
        sender : {
            select : {
                name : true,
                email : true
            }
        }
    }
})

const deleteMessage = async id => await prisma.messages.delete({
    where : {id}
})

module.exports = {
    createMessage,
    deleteMessage
}