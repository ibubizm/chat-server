import { Message } from '../../models/message.model.js'

const messages = {}

export default function messageHandlers(io, socket) {
  const { roomId } = socket

  const updateMessageList = () => {
    io.to(roomId).emit('message_list:update', messages[roomId])
  }

  socket.on('message:get', async () => {
    try {
      const _messages = await Message.find({
        roomId,
      })
      messages[roomId] = _messages

      updateMessageList()
    } catch {
      console.log('errror')
    }
  })

  socket.on('message:add', (message) => {
    Message.create(message)

    message.createdAt = Date.now()

    messages[roomId].push(message)

    updateMessageList()
  })

  socket.on('message:remove', (message) => {
    const { messageId } = message

    messages[roomId] = messages[roomId].filter((m) => m.messageId !== messageId)

    updateMessageList()
  })
}
