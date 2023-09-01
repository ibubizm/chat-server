import Room from '../../models/room.model.js'
import { Message } from '../../models/message.model.js'
import { Types } from 'mongoose'
import { User } from '../../models/users.model.js'

const messages = [] //Obj

export default function messageHandlers(io, socket, roomUpdate) {
  const { roomId } = socket

  const updateMessageList = (room) => {
    console.log(messages)
    io.to(roomId).emit('message_list:update', messages[room])
  }

  socket.on('message:get', async (id) => {
    try {
      const _messages = await Message.find({
        roomId: Types.ObjectId(id),
      }).populate('author')

      messages[id] = _messages
      updateMessageList(id)
    } catch {
      console.log('errror update messsage')
    }
  })

  socket.on('message:add', async (message) => {
    const mes = await Message.create(message)
    message.createdAt = Date.now()
    const res = await Message.findById(mes._id).populate('author')
    messages[message.roomId].push(res)
    updateMessageList(message.roomId)
    await Room.findByIdAndUpdate(Types.ObjectId(message.roomId), {
      lastMessage: message.text,
    })
    roomUpdate()
  })

  socket.on('message:remove', async (message) => {
    messages[roomId] = messages[roomId].filter((m) => m._id != message._id)
    updateMessageList(message.roomId)
    await Message.deleteOne({ _id: message._id })
  })

  socket.on('message:edit', async (message) => {
    const { messageId, text } = message
    messages[roomId].find((m) => {
      if (m.messageId == messageId) {
        m.text = text
        m.updated = true
      }
    })

    updateMessageList(message.roomId)
    await Message.findByIdAndUpdate(message._id, {
      text: message.text,
      updated: true,
    })
  })
}
