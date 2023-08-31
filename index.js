import cors from 'cors'
import express from 'express'
import fileupload from 'express-fileupload'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import { DB_URL, ALLOWED_ORIGIN } from './config.js'
import { createServer } from 'http'
import onConnection from './socket_io/onConnection.js'
import path from 'path'
import fileDirName from './utils/fileDirName.js'
import { router } from './router/authRouter.js'

const { __dirname } = fileDirName(import.meta)

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors({ origin: ALLOWED_ORIGIN }))
app.use(fileupload())

app.use('/auth', router)

app.use('/avatars', express.static(path.join(__dirname, 'avatars')))
app.use(express.urlencoded({ extended: true }))

const server = createServer(app)

const io = new Server(server, {
  cors: ALLOWED_ORIGIN,
  serveClient: false,
})

io.on('connection', (socket) => {
  onConnection(io, socket)
})

// mongoose
//   .connect(DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('db connected')
//   })

server.listen(PORT, async () => {
  try {
    await mongoose
      .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('db connected')
      })
    console.log(`Server started on port ${PORT}`)
  } catch (e) {
    console.log(e)
  }
})
