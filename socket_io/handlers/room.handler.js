import Room from '../../models/room.model.js'

const rooms = []

export default function roomHandler(io, socket) {
  const { roomId } = socket

  // socket.on('create', function (roomname) {
  //   rooms[room] = room
  //   socket.room = roomname
  //   socket.join(roomname)
  //   subscribe.subscribe(socket.room)
  // })

  socket.on('rooms:create', async (room) => {
    try {
      const candidate = await Room.findOne({ roomId: room.roomId })
      // console.log(room, '------------crate room')
      if (candidate) {
        return console.log('room already exist')
      }
      Room.create(room)
    } catch (e) {
      console.log(e)
    }
  })

  socket.on('roo:get', async () => {
    const _rooms = await Room.find()
    // rooms[] =
    // socket.roomList = rooms
    console.log(_rooms, '--------------roooms')
    // rooms = _rooms

    socket.emit('rooms:all', _rooms)
  })
}
