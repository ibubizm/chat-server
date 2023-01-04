import Room from '../../models/room.model.js'

const rooms = []

export default function roomHandler(io, socket) {
  const { roomId } = socket

  const roomUpdate = (r) => {
    io.to(roomId).emit('room_list:update', rooms['mass'])
  }

  socket.on('room:update', async (mes) => {
    const _rooms = await Room.find()
    rooms['mass'].forEach((element) => {
      if (element.roomId === mes.roomId) {
        element.lastMessage = mes.text
        element.updatedAt = Date()
      }
    })
    roomUpdate(_rooms)
  })

  socket.on('rooms:create', async (room) => {
    try {
      const candidate = await Room.findOne({ roomId: room.roomId })
      if (candidate) {
        return console.log('room already exist')
      }
      Room.create(room)
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
