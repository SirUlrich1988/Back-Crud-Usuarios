const router = require('express').Router()
const userServices = require('./users.services')


router.get('/users', userServices.getAllUsers)
router.get('/users/:id', userServices.getUserById)
router.post('/users', userServices.registerUser)
router.patch('/users/:id', userServices.patchUser)
router.delete('/users/:id', userServices.destroyUser)


module.exports = router