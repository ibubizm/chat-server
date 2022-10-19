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
  rooms: {
    type: [{ roomId: String, roomAvatar: String }],
  },
  is_active: { type: Boolean, default: false },
})

export default model('User', userSchema)
