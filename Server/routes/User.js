const express = require('express')
const auth = require('../middleware/auth')
const { register, login, getUser, profileUpdate, getAllUser } = require('../controllers/User')
const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/profile').get(auth, getUser).post(profileUpdate)
router.route('/dashboard').get(auth, getAllUser)
// router.route('/:id').get(getUser)

module.exports = router