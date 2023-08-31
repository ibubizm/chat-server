import Router from 'express'
import AuthorithationController from '../controllers/authController.js'

export const router = Router()

router.post('/registration', AuthorithationController.registration)
router.post('/updateuser', AuthorithationController.updateUser)
router.post('/login', AuthorithationController.login)
router.post('/auth', AuthorithationController.auth)
