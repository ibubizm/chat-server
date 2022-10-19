import { Schema, model } from 'mongoose'
import User from './users.model'
import Message from './message.model'

const roomSchema = new Schema(
  {
    roomId: {
      type: Array,
      unique: true,
    },
    avatarRoom: {
      type: String,
    },
    users: [User],
    messages: [Message],
    created_at: Date,
  },
  {
    timestamps: true,
  }
)

export default model('Room', roomSchema)
