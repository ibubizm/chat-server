import userHandlers from './handlers/user.handler.js'
import messageHandlers from './handlers/message.handlers.js'
import roomHandler from './handlers/room.handler.js'

let roomList = [
  {
    roomId: 'mainRoom',
    roomAvatar: 'https://avatars.githubusercontent.com/u/66380357?v=4',
  },
  {
    roomId: 'second',
    roomAvatar:
      'https://thatshelf.com/wp-content/uploads/2014/07/Futurama-Fry.jpg',
  },
  {
    roomId: 'ibubizm',
    roomAvatar:
      'https://culturedvultures.com/wp-content/uploads/2021/11/F-Is-For-Family-S5.jpg',
  },
]

export default function onConnection(io, socket) {
  const { roomId, userName } = socket.handshake.query
  socket.roomList = roomList
  socket.roomId = roomId
  socket.userName = userName

  socket.join(roomId)
  userHandlers(io, socket)

  messageHandlers(io, socket)
  roomHandler(io, socket)
}
