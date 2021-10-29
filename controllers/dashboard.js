const mongoose = require('mongoose')
require('../models/user')
const User = mongoose.model('User')

function index(req, res) {
    res.sendStatus(200)
}

async function getUsers(req, res) {
    try {
        // Find all users
        const users = await User.find({})
        res.json(users)
    } catch (err) {
        // Database error
        console.error(err)
        return res.status(500).json({ type: 'warning', msg: 'Internal error. Please try again later...'})
    }
}

module.exports = {
    index,
    getUsers
}
