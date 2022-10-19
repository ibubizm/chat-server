import { Schema, model } from 'mongoose'

// var userSchema = new Schema({
//   userName: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   avatar: {
//     type: String,
//     required: false,
//   },
//   rooms: {
//     type: [{ roomId: String, roomAvatar: String }],
//   },
//   is_active: { type: Boolean, default: false },
// })

// var roomSchema = new Schema(
//   {
//     roomId: {
//       type: Array,
//       unique: true,
//     },
//     avatarRoom: {
//       type: String,
//     },
//     users: [userSchema],
//     messages: [messageSchema],
//     created_at: Date,
//   },
//   {
//     timestamps: true,
//   }
// )

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
// export const User = model('User', userSchema)
// export const Room = model('Room', roomSchema)
