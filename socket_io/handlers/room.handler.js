import Room from '../../models/room.model'

var rooms = []

export default function roomHandler(io, socket) {
  const { roomId } = socket

  socket.on('create', function (roomname) {
    rooms[room] = room
    socket.room = roomname
    socket.join(roomname)
    subscribe.subscribe(socket.room)
  })

  // const updateRoomsList = () => {
  //   io.to(roomId).emit('room:update', rooms[roomId])
  // }

  // socket.on('room:create', async (room) => {
  //   const candidate = await Room.find({ roomId })
  //   console.log(room, '---------')
  //   if (!candidate) {
  //     console.log('no')
  //   } else {
  //     console.log('yes')
  //   }
  //   try {
  //     rooms[roomId] = room
  //     // const rm = await Room.create()
  //     updateRoomsList()
  //   } catch {
  //     console.log('create error')
  //   }
  // })
  // socket.on()
}
