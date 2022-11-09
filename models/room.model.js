import { Schema, model } from 'mongoose'

const roomSchema = new Schema(
  {
    roomId: {
      type: String,
      unique: true,
    },
    roomAvatar: {
      type: String,
    },
    lastMessage: {
      type: String,
    },
    created_at: Date,
  },
  {
    timestamps: true,
  }
)

export default model('Room', roomSchema)
