import { User } from '../models/users.model.js'
import path from 'path'
import fileDirName from '../utils/fileDirName.js'
import { v4 as uuidv4 } from 'uuid'

const { __dirname } = fileDirName(import.meta)

class AuthorithationController {
  async registration(req, res) {
    try {
      const { userName } = req.body
      let fileName = ''
      const candidate = await User.findOne({ userName })
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${userName} already exist ` })
      }

      if (req.files) {
        const { avatar } = req.files
        fileName = uuidv4() + '.jpg'
        avatar.mv(path.resolve(__dirname, '..', 'avatars', fileName))
      }
      const user = new User({
        userName: userName,
        avatar: fileName,
      })
      await user.save()
      return res.status(201).json({ message: 'user was created', user })
    } catch (e) {
      console.log(e)
    }
  }

  async updateUser(req, res) {
    const { userId, userName } = req.body
    let fileName = ''

    if (req.files) {
      const { avatar } = req.files
      fileName = uuidv4() + '.jpg'
      avatar.mv(path.resolve(__dirname, '..', 'avatars', fileName))
    }

    const user = await User.findByIdAndUpdate(userId, {
      userName,
      avatar: fileName,
    })
    return res.status(201).json({ message: 'user was updated', user })
  }

  async login(req, res) {
    const { userName } = req.body
    const candidate = await User.findOne({ userName })

    if (!candidate) {
      return res
        .status(400)
        .json({ message: `User with username ${userName} not found` })
    }

    return res.status(200).json({
      message: 'loggedIn',
      user: candidate,
    })
  }

  async auth(req, res) {
    try {
      const { userId } = req.body

      const user = await User.findById(userId).populate('subscriptions')
      return res.json({ user })
    } catch (e) {
      console.log(e)
    }
  }
}

export default new AuthorithationController()
