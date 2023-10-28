import Room from '../models/room.model.js'
import { User } from '../models/users.model.js'

class RoomController {
  async getRooms(req, res) {
    try {
      const { userId } = req.body
      const rooms = await Room.find({ subscribers: userId })

      return res.json({ rooms })
    } catch (e) {
      console.log(e)
    }
  }

  async findRoom(req, res) {
    try {
      const { roomId } = req.query
      const rooms = await Room.find({ roomId: { $regex: roomId } })
      return res.json({ rooms })
    } catch (e) {
      console.log(e)
    }
  }

  async updateRoom(req, res) {
    try {
      const { roomId, lastMessage } = req.body
      const updatedRoom = await Room.findByIdAndUpdate(
        roomId,
        {
          lastMessage: lastMessage,
        },
        { new: true }
      )
      return res.json({ rooms: updatedRoom })
    } catch (e) {
      console.log(e)
    }
  }

  async subscribe(req, res) {
    try {
      const { userId, roomId } = req.body
      const user = await User.findById(userId)
      user.subscriptions.addToSet(roomId)

      const room = await Room.findById(roomId)
      room.subscribers.addToSet(userId)

      // const user = await User.findOneAndUpdate(
      //   { _id: userId },
      //   { $addToSet: { subscriptions: [roomId] } },
      //   { new: true }
      // )
      // const room = await Room.findOneAndUpdate(
      //   { _id: roomId },
      //   { $addToSet: { subscribers: [userId] } },
      //   { new: true }
      // )
      await user.save()
      await room.save()
      console.log(user, room, 'user sub')
      return res.json({ room, user })
    } catch (e) {
      console.log(e)
    }
  }

  async unSubscribe(req, res) {
    try {
      const { userId, roomId } = req.body
      const user = await User.findById(userId)
      const room = await Room.findById(roomId)
      user.subscriptions.pull(roomId)
      room.subscribers.pull(userId)

      // const user = await User.findOneAndUpdate(
      //   { _id: userId },
      //   { $pullAll: { subscriptions: [roomId] } },
      //   { new: true }
      // )
      // const room = await Room.findOneAndUpdate(
      //   { _id: roomId },
      //   { $pullAll: { subscribers: [userId] } },
      //   { new: true }
      // )

      await room.save()
      await user.save()

      console.log(user, room, 'user unsub')
      return res.json({ room, user })
    } catch (e) {
      console.log(e)
    }
  }

  async getSubscribers(req, res) {
    try {
      const { roomId } = req.body
      const sub = await Room.findById(roomId).populate('subscribers')
      // console.log(sub, '------users subs')
      return res.json({ subscribers: sub.subscribers })
    } catch (e) {
      console.log(e)
    }
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
