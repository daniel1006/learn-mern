const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, getUserSecret} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe) // inports the protect route funtion whenever this URL is called

module.exports = router