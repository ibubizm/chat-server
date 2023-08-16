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
  },
  admin: {
    type: Boolean,
    default: false,
  },
  roomId: {
    type: [{ roomId: String, roomAvatar: String }],
  },
})

export default model('User', userSchema)
