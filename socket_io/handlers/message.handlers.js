import { Message } from '../../models/message.model.js'

const messages = {}

export default function messageHandlers(io, socket) {
  const { roomId, roomList } = socket

  const updateMessageList = (room) => {
    io.to(roomId).emit('message_list:update', messages[room])
  }

  const updateRoomList = () => {
    io.to(roomId).emit('rooms:update', roomList)
  }

  socket.on('rooms:get', () => {
    socket.emit('rooms:update', roomList)
  })

  socket.on('message:get', async (id) => {
    try {
      const _messages = await Message.find({
        roomId: id,
      })
      messages[id] = _messages

      socket.emit('message_list:update', messages[id])
    } catch {
      console.log('errror')
    }
  })

  socket.on('message:add', (message) => {
    Message.create(message)

    message.createdAt = Date.now()
    messages[message.roomId].push(message)

    let rm = roomList.find((i) => i.roomId == message.roomId)
    rm['text'] = message.text
    rm['date'] = message.createdAt
    updateRoomList()
    updateMessageList(message.roomId)
  })

  // socket.on('message:remove', (message) => {
  //   const { messageId } = message

  //   messages[roomId] = messages[roomId].filter((m) => m.messageId !== messageId)
  //   Message.deleteOne({ messageId })

  //   updateMessageList()
  // })
}
