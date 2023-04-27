const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('../models/user')
const User = mongoose.model('User')

/**
 * Generates random string of characters i.e. salt
 * @function
 * @returns salt (hexadecimal)
 */
function generateSalt() {

    //Generate a random sequence of bytes
    const randomBytes = crypto.randomBytes(16)
    // Return the result in hexadecimal format
    return randomBytes.toString('hex')
}

/**
 * Hash a password with sha512
 * @function
 * @param password
 * @param salt
 * @return digest (hexadecimal)
 */
function hash(password, salt) {

    // Prepend the salt to the given password and hash it using the sha512 hash function
    const digest = crypto.pbkdf2Sync(
        password,
        salt,
        10000,
        512,
        'sha512')
    // Return the result in hexadecimal format
    return digest.toString('hex')
}

/**
 * Generates a JSON Web Token
 * @function
 * @param id
 * @param email
 * @returns jwt
 */
function generateJWT(id, email) {
    return jwt.sign(
        { id, email },
        process.env.JW_SECRET,
        { expiresIn: process.env.JW_EXPIRATION + 's' }
    )
}

/**
 * Register a new User
 * @function
 * @param req
 * @param res
 * @json req.body: {email: string, pass: string}
 * @returns 201, 400, 409 or 500
 */
async function registerUser(req, res) {
    try {
        // Collect all User data from the body JSON
        const email = req.body.email
        const pass = req.body.pass

        if (!email || !pass) {
            return res.status(400).json({type: 'error', msg: 'Invalid parameters.'})
        }

        let count
        // Find if exists a User with that email
        count = await User.countDocuments({"email": email})
        if (count > 0) {
            // User with that email already exists
            return res.status(409).json({type: 'error', msg: 'User with that email already exists.'})
        }

        // Generate the salt and calculate the digest
        const salt = generateSalt()
        const digest = hash(pass, salt)

        // Create a new User
        const user = new User({
            email: email,
            digest: digest,
            salt: salt
        })

        // Save it in the database
        await user.save()

        // Registered successfully
        return res.json({type: 'success', msg: 'User registered successfully.'})

    } catch (err) {
        // Database error
        console.error(err)
        return res.status(500).json({ type: 'warning', msg: 'Internal error. Please try again later...'})
    }
}


/**
 * Login a User
 * @function
 * @param req
 * @param res
 * @json req.body: {email:string, pass: string}
 * @returns 200, 400, 401 or 500
 */
async function loginUser(req, res) {
    try {
        let email = req.body.email
        let pass = req.body.pass

        if (!email || !pass) {
            return res.status(400).json({type: 'error', msg: 'Invalid parameters.'})
        }

        // Find the User
        const user = await User.findOne({"email": email})
        if (!user) {
            // User not found
            return res.status(401).json({type: 'error', msg: 'Wrong credentials.'})
        }

        // Collect its digest and salt from database
        const digest = user.digest
        const salt = user.salt

        // Make a hash with the provided password and compare
        if (!pass || digest !== hash(pass, salt)) {
            // Incorrect password
            return res.status(401).json({type: 'error', msg: 'Wrong credentials.'})
        }

        // Generate jwt
        const token = generateJWT(user._id, user.email)

        // Success login
        return res.json({token})

    } catch (err) {
        // Database error
        console.error(err)
        return res.status(500).json({ type: 'warning', msg: 'Internal error. Please try again later...'})
    }
}

module.exports = {
    registerUser,
    loginUser
}
