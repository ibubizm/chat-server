import userHandlers from './handlers/user.handler.js'
import messageHandlers from './handlers/message.handlers.js'
import roomHandler from './handlers/room.handler.js'
import Room from '../models/room.model.js'

const roomList = Room.find()
const users = []

const rooms = []

// const rooms = {}

export default async function onConnection(io, socket) {
  const { roomId, userName } = socket.handshake.query
  socket.roomList = roomList
  socket.roomId = roomId
  socket.userName = userName

  socket.join(roomId)

  const roomUpdate = () => {
    io.to(roomId).emit('room_list:update', rooms['mass'])
  }

  // if (!users.includes(userName)) {
  //   users.push(userName)
  // }

  // socket.on('disconnect', () => {
  //   users.filter((u) => u !== userName)
  // })

  // io.sockets.in(roomId).emit('conect', users)

  userHandlers(io, socket)

  messageHandlers(io, socket, roomUpdate)
  roomHandler(io, socket, roomUpdate, rooms)
}
