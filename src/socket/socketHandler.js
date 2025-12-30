const { getAllUserGroup } = require("../repositories/usersRepository")

const socketHandler = (io) => {
    io.on("connection", async (socket) =>  {
        const userId = socket.handshake.auth.userId

        if(!userId || userId === "undefined"){
            return
        }

        try {
            const groupsUser = await getAllUserGroup(userId)
            if(groupsUser?.roomMember){
                groupsUser.roomMember.forEach(member => {
                    socket.join(member.roomId)
                })
            }
        } catch (error) {
            console.log("Gagal ambil user member")
        }


        socket.on("join_room", (roomId) => {
            socket.join(roomId)
        })

        socket.on("typing", (data) => {
            socket.to(data.roomId).broadcast.emit("status_typing", {
                sender : data.id,
                typing : true
            })
        })

        socket.on("leave_room", roomId => {
            socket.leave(roomId)
        })

        socket.on("disconnect", () => {
            console.log(`User ${socket.id} disconnect`)
        })
    })
}

module.exports = socketHandler