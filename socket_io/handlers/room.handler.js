import Room from '../../models/room.model'

const rooms = {}

export default function roomHandler(io, socket) {
  const { roomId } = socket

  const updateRoomsList = () => {
    io.to(roomId).emit('message_list:update', messages[roomId])
  }

  socket.on('room:create', async (room) => {
    const candidate = await Room.find({ roomId })
    console.log(room, '---------')
    if (!candidate) {
      console.log('no')
    } else {
      console.log('yes')
    }
    try {
      rooms[roomId] = room
      // const rm = await Room.create()
      updateRoomsList()
    } catch {
      console.log('create error')
    }
  })
}
