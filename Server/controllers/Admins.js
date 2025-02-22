require('dotenv').config()

const Users = require('../schema/User')

const createAdmin = async (req, res) => {
    const authorizedEmail = process.env.AUTHORIZED_PERSON
    try {
            if(req.user.email != authorizedEmail){
        return res.status(400).json({msg: 'Unauthorized to create admin'})
    }
    const {username, password, email} = req.body;
    const admin = await Users.create({username, password, email, role: 'admin', subscriptionStatus: 'active'})
    return res.status(201).json({msg: 'Admin created successfully', admin: {name: admin.username}})
    } catch (error) {
        console.error("Error creating admin:", error.message);
        res.status(500).json({ msg: 'Internal server error' });
    } 

}

module.exports = createAdmin 