import { Schema, model, ObjectId } from 'mongoose'

const messageSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    messageId: {
      type: String,
      required: true,
      unique: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      // required: true,
    },
    text: {
      type: String,
    },
    replyId: {
      type: String,
      default: undefined,
    },
    updated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export const Message = model('Message', messageSchema)
