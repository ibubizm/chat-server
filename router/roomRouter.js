import Router from 'express'
import RoomController from '../controllers/roomController.js'

export const roomsRouter = Router()

roomsRouter.post('/getRooms', RoomController.getRooms)
roomsRouter.get('/findRooms', RoomController.findRoom)
roomsRouter.post('/updateRooms', RoomController.updateRoom)
roomsRouter.post('/subscribe', RoomController.subscribe)
roomsRouter.post('/unsubscribe', RoomController.unSubscribe)
roomsRouter.post('/getSubscribers', RoomController.getSubscribers)
roomsRouter.post('/createRoom', RoomController.createRoom)
