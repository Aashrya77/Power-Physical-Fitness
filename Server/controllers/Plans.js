const Plan = require('../schema/Plan')
const User = require('../schema/User')
const moment = require('moment')
const getAllPlan = async (req, res) => {
    const plan = await Plan.find({})
  return  res.status(200).json({plan})
}
const getPlan = async (req, res) => {
    const plan = await Plan.findOne({name: req.params.planName})
    if(!plan){
        return res.status(404).json({ message: 'Plan not found' });
    }
   return  res.status(200).json({plan})
}

const createPlan = async (req, res) => {
    const plan = await Plan.create(req.body)
   return res.status(201).json({plan})
}

const createSubscription  = async (req, res) => {
    const {userId} = req.user
    const {months, planName} = req.body
    
    const plan = await Plan.findOne({name: planName});
    if (!plan) {
        return res.status(400).json({ message: 'Plan not found' });
      }
      const priceKey = `price${months}Month${months > 1 ? 's' : ''}`;
      const price = plan.prices[priceKey];
      if (!price) {
        return res.status(400).json({ message: 'Invalid pricing data for selected months' });
      }
      const currentDate = Date.now();
      const monthsToAdd = months;

      const subscriptionEnd = new Date(currentDate)
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + monthsToAdd);
      console.log(subscriptionEnd)
      const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    user.planId = plan._id;
    user.subscriptionStatus = 'active';
    user.subscriptionStart = currentDate
    user.subscriptionEnd = subscriptionEnd

    await user.save();
    console.log(user, currentDate)
    res.status(201).json({ message: 'Subscription created successfully', price });
}   

module.exports = {
    createPlan,
    getAllPlan,
    getPlan, 
    createSubscription
}