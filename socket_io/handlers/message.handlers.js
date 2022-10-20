import { Message } from '../../models/message.model.js'

const messages = {}

export default function messageHandlers(io, socket) {
  const { roomId, roomList } = socket

  const updateMessageList = () => {
    io.to(roomId).emit('message_list:update', messages[roomId])
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
    messages[roomId].push(message)

    let rm = roomList.find((i) => i.roomId == roomId)
    rm['text'] = message.text
    rm['date'] = message.createdAt
    updateMessageList()
  })

  socket.on('message:remove', (message) => {
    const { messageId } = message

    messages[roomId] = messages[roomId].filter((m) => m.messageId !== messageId)

    updateMessageList()
  })
}
