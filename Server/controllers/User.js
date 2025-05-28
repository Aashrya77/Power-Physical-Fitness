const Users = require('../schema/User')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    const user = await Users.create({...req.body})
    const token = user.createJWT()
    res.status(201).json({msg: 'User Created', user: {name: user.username}, token})
} 

const login = async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).send("Please provide email & password")
    }
    const user = await Users.findOne({email})
    if(!user){
        return res.status(404).send("User not found");  
    }
    try{
        const isCorrect = await user.comparePassword(password)
    if(!isCorrect){
       return res.status(401).send('Please enter correct password')
    }
    const token = user.createJWT()
    res.status(200).json({user: {name: user.username}, token})
    }
    catch(error){
        console.error("Error comparing passwords:", error.message);
        res.status(500).send("Internal server error");
    }
}

const getUser = async (req, res) => {
    const {userId} = req.user;
    const user = await Users.findOne({_id: userId}).populate('planId')
    return res.status(200).json({user})
}

const getAllUser = async (req, res) => {
    try {
      // Ensure role is checked properly
      if (req.user && req.user.role === 'admin') {
        const users = await Users.find({}); // Ensure your model is named correctly
        return res.status(200).json({ users });
      }
      // Respond with forbidden status if the user is not an admin
      return res.status(403).json({ message: "Access restricted to admins only." });
    } catch (error) {
      // Handle any unexpected errors
      console.error(error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
  
const profileUpdate = async (req, res) => {
    const {userId} = req.user;
    const {profilePicture} = req.body;
    const updatedUser = await Users.findOneAndUpdate({_id: userId}, {profilePicture}, {new: true})
  return  res.status(200).json({user: updatedUser})
}

const verifyAuth = async (req, res) => {
  try {
    // We already have the user from the auth middleware
    const { userId } = req.user;
    
    // Find the user by ID
    const user = await Users.findById(userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error in verifyAuth:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};


module.exports = {
    register,
    login,
    getUser,
    profileUpdate,
    getAllUser,
    verifyAuth
}