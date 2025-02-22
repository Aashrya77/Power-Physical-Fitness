const express = require('express')
const { getAllPlan, createPlan, getPlan, createSubscription} = require('../controllers/Plans')
const router = express.Router()
const auth = require('../middleware/auth')
router.route('/plans').get(getAllPlan)
router.route('/subscribe').post(auth , createSubscription)
router.route('/plans/:planName').get(getPlan)

module.exports = router