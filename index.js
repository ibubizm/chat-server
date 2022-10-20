import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import { DB_URL, ALLOWED_ORIGIN } from './config.js'
import { createServer } from 'http'
import onConnection from './socket_io/onConnection.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: ALLOWED_ORIGIN }))
app.use(express.json())

const server = createServer(app)

const io = new Server(server, {
  cors: ALLOWED_ORIGIN,
  serveClient: false,
})

io.on('connection', (socket) => {
  onConnection(io, socket)
})

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db connected')
  })

server.listen(PORT, () => {
  try {
    console.log(`Server started on port ${PORT}`)
  } catch (e) {
    console.log(e)
  }
})
