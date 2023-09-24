import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: false,
    default: '',
  },
  admin: {
    type: Boolean,
    default: false,
  },
  // roomId: {
  //   type: [{ roomId: String, roomAvatar: String }],
  // },
  subscriptions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      unique: true,
    },
  ],
})

export const User = model('User', userSchema)
