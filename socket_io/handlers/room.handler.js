import Room from '../../models/room.model.js'
import { Types } from 'mongoose'

export default function roomHandler(io, socket, roomUpdate, rooms) {
  const { roomId, userName, userId } = socket

  // const roomsStream = Room.watch()

  // roomsStream.on('change', async (change) => {
  //   const rooms = await Room.find()
  //   io.emit('dataChange', rooms)
  // })

  socket.on('room:update', async (mes) => {
    rooms[userName].forEach((element) => {
      if (element._id == mes.roomId) {
        element.lastMessage = mes.text
        element.updatedAt = Date()
      }
    })
    roomUpdate()
  })

  socket.on('rooms:create', async (room) => {
    try {
      const candidate = await Room.findOne({ roomId: room.roomId })
      if (candidate) {
        return console.log('room already exist')
      }
      const newRoom = await Room.create(room)
      rooms[userName].push(newRoom)
      roomUpdate()
    } catch (e) {
      console.log(e)
    }
  })

  // socket.on('room:get', async (userId) => {
  //   if (userId) {
  //     console.log('get')
  //     const _rooms = await Room.find({ subscribers: Types.ObjectId(userId) })
  //     console.log(_rooms)
  //     rooms[userName] = _rooms
  //     socket.emit('rooms:all', _rooms)
  //   }
  // })
}
