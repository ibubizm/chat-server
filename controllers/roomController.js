import Room from '../models/room.model.js'
import { User } from '../models/users.model.js'

class RoomController {
  async getRooms(req, res) {
    const { userId } = req.body
    const rooms = await Room.find({ subscribers: userId })
    // const roomsChangeStream = Room.watch()

    // roomsChangeStream.on('change', (change) => {
    //   console.log('Изменение в коллекции "rooms":', change)
    // })

    // console.log(rooms, 'rrrr')
    return res.json({ rooms })
  }

  async findRoom(req, res) {
    const { roomId } = req.query
    const rooms = await Room.find({ roomId: { $regex: roomId } })
    return res.json({ rooms })
  }

  async updateRoom(req, res) {
    const { roomId, lastMessage } = req.body
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        lastMessage: lastMessage,
      },
      { new: true }
    )
    return res.json({ rooms: updatedRoom })
  }

  async subscribe(req, res) {
    const { userId, roomId } = req.body
    const user = await User.findById(userId)
    user.subscriptions.push(roomId)

    const room = await Room.findById(roomId)

    room.subscribers.push(userId)
    await user.save()
    await room.save()

    return res.json({ room, user })
  }

  async unSubscribe(req, res) {
    const { userId, roomId } = req.body
    const user = await User.findById(userId)
    const room = await Room.findById(roomId)
    user.subscriptions.pull(roomId)
    room.subscribers.pull(userId)

    await room.save()

    return res.json({ room, user })
  }

  async getSubscribers(req, res) {
    const { roomId } = req.body
    const sub = await Room.findById(roomId).populate('subscribers')

    return res.json({ subscribers: sub.subscribers })
  }

  async createRoom(req, res) {
    try {
      const room = req.body
      const candidate = await Room.findOne({ roomId: room.roomId })
      if (candidate) {
        return res.json({ mes: 'room already exist' })
      }
      const newRoom = await Room.create(room)
      newRoom.subscribers.push(room.admin)

      const admin = await User.findById(room.admin)
      admin.subscriptions.push(newRoom._id)

      await admin.save()
      await newRoom.save()
      return res.json({ room: newRoom })
    } catch (e) {
      console.log(e)
    }
  }
}

export default new RoomController()
