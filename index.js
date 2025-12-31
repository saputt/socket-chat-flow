const express = require("express")
const cookieParser = require("cookie-parser")
const {createServer} = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const router = require("./src/routes")
const socketMiddleware = require("./src/middlewares/socketMiddleware")
const socketHandler = require("./src/socket/socketHandler")

const app = express()

const server = createServer(app)
const io = new Server(server, {
    cors : {
        origin : "http://localhost:5173",
        methods : ["POST", "GET", "PUT", "PATCH", "DELETE"]
    }
})


app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
    methods : ["POST", "GET", "PUT", "PATCH", "DELETE"],
}))

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use(socketMiddleware(io))
socketHandler(io)

app.use(router)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`)
})