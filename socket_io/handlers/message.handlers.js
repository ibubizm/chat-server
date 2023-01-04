import Room from '../../models/room.model.js'
import { Message } from '../../models/message.model.js'

const messages = [] //Obj

export default function messageHandlers(io, socket) {
  const { roomId } = socket

  const updateMessageList = (room) => {
    io.to(roomId).emit('message_list:update', messages[room])
  }

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

  socket.on('message:add', async (message) => {
    Message.create(message)
    message.createdAt = Date.now()
    messages[message.roomId].push(message)
    updateMessageList(message.roomId)

    await Room.findOneAndUpdate(
      { roomId: message.roomId },
      { lastMessage: message.text }
    )
  })

  // socket.on('message:remove', (message) => {
  //   const { messageId } = message
  //   console.log(message)

  //   messages[roomId] = messages[roomId].filter((m) => m.messageId !== messageId)
  //   Message.deleteOne({ messageId })

  //   updateMessageList()
  // })
}
