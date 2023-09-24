import userHandlers from './handlers/user.handler.js'
import messageHandlers from './handlers/message.handlers.js'
import roomHandler from './handlers/room.handler.js'
import Room from '../models/room.model.js'

// const roomList = Room.find()
// const roomsChangeStream = Room.watch()
// roomsChangeStream.on('change', (data) =>{
//   if(data.operationType == 'replace'){
//     console.log('Update', data.fullDocument)
//   }
// })

// roomsChangeStream.on('change', async (change) => {
//   try {
//     console.log()
//     //     // if (userId) {
//     //     //   const _rooms = await Room.find({ subscribers: Types.ObjectId(userId) })
//     //     //   rooms[userName] = _rooms
//     //     // }
//     //     // const upd = change.updateDescription.updatedFields
//     //     // rooms[userName].find((i) => {
//     //     //   if (i._id.toString() == change.documentKey._id.toString()) {
//     //     //     i.lastMessage = upd.lastMessage
//     //     //     i.updatedAt = upd.updatedAt
//     //     //   }
//     //     // })
//     //     // console.log(rooms[userName])
//     //     // roomUpdate()
//   } catch (e) {
//     console.log(e)
//   }
// })

const rooms = []

export default async function onConnection(io, socket) {
  const { roomId, userName, userId } = socket.handshake.query
  // socket.roomList = roomList

  socket.roomId = roomId
  socket.userName = userName
  socket.userId = userId

  socket.join(roomId)

  const roomUpdate = () => {
    io.to(roomId).emit('room_list:update', rooms[userName])
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
