const express = require('express')
const createAdmin = require('../controllers/Admins')
const authentication = require('../middleware/auth')
const router = express.Router()

router.route('/create-admin').post(authentication,createAdmin)

module.exports = router