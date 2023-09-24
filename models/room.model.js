import { Schema, model } from 'mongoose'

const roomSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    subscribers: [
      {
        unique: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
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
