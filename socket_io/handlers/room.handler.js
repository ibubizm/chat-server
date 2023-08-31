import Room from '../../models/room.model.js'

export default function roomHandler(io, socket, roomUpdate, rooms) {
  const { roomId } = socket

  socket.on('room:update', async (mes) => {
    rooms['mass'].forEach((element) => {
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
      rooms['mass'].push(newRoom)
      roomUpdate()
    } catch (e) {
      console.log(e)
    }
  })

  socket.on('room:get', async () => {
    const _rooms = await Room.find()
    rooms['mass'] = _rooms
    socket.emit('rooms:all', _rooms)
  })
}
