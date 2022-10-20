import { Schema, model } from 'mongoose'

const messageSchema = new Schema(
  {
    avatar: {
      type: String,
    },
    messageId: {
      type: String,
      required: true,
      unique: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    // room: roomSchema,
    // user: userSchema,
  },
  {
    timestamps: true,
  }
)

export const Message = model('Message', messageSchema)
