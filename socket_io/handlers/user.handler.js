import { User } from '../../models/users.model.js'
import { writeFile } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import fileDirName from '../../utils/fileDirName.js'
import path from 'path'

const { __dirname } = fileDirName(import.meta)
const users = []

export default function userHandlers(io, socket) {
  const { roomId } = socket

  if (!users[roomId]) {
    users[roomId] = []
  }

  const updateUserList = () => {
    io.to(roomId).emit('user_list:update', users[roomId])
  }

  // socket.on('user:create', async ({ userName, avatar }) => {
  //   try {
  //     const fileName = uuidv4() + '.jpg'

  //     // avatar.mv(path.resolve(__dirname, '..', 'avatars', fileName))
  //     // writeFile(`${fileName}`, avatar, (err) => {
  //     //   console.log(err)
  //     // })
  //     // await User.create({ userName: userName, avatar: fileName })

  //     // socket.emit('user:created', user)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // })

  socket.on('user:add', async (user) => {
    user.socketId = socket.id
    users[roomId].push(user)

    updateUserList()
  })

  socket.on('disconnect', () => {
    if (!users[roomId]) {
      console.log('🔥: A user disconnected')
    }

    users[roomId] = users[roomId].filter((u) => u.socketId !== socket.id)
    updateUserList()
  })
}
