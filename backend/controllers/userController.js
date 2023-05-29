const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs') // used to encrypt the jstoken
const crypto = require('crypto');
const User = require('../models/userModels') // we're calling it 

const userSecret = crypto.randomBytes(32).toString('hex'); // encrpyts / randomizes the secrect of a size of 32 bytes.

// creates a new user
// uses POST request to /api/users
// is a Public request
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body // This is used to detructure the data we receive whene the user enters stuff in into bits of info
                                                    // the code will recognize

    if (!name || !email || !password) {  // Verifiest that all the fields have been entered by the user.
        throw new Error('Please enter all fields')
    }

const userExist = await User.findOne({ email }) // This checks the database to check if a user based of its ID already exist. It is found by the findOne function
if (userExist) {
    res.status(400)
    throw new Error('this user already exist')
}

//generateSecret;
const salt = await bcrypt.genSalt(10) // # of digits to add to password
const hashedPassword = await bcrypt.hash(password, salt) // encryting password with random salt digits.

const user = await User.create ({ // the create function is what saves data to mongoDB
    name,
    email,
    password: hashedPassword, // assigning the encryted passwords as the users password to the database.
    secret: userSecret
})


if(user) {
    res.status(201).json({
        _id: user.id, // verifies that our fields of id,user,password have been saved under those same variables in mongoDB
        name: user.name,
        email: user.email,
        token: generateToken(user._id, userSecret)
    })
} else {
    res.status(400)
    throw new Error('Invalid user data')
}
})



// Authenticates/login a user
// uses POST request to /api/users/login
// is a Public request
const loginUser = async (req, res) => {
    const { email, password } = await req.body // retrieves data from the enters user info

    const user = await User.findOne({email}) // looks for the email in the data that matches the one entered by the user.

try {
    // if user and password match those from the database
    if (user && (await bcrypt.compare(password, user.password))) { //compare is a bcrypt function that will literally compare 'password' as
                                                                   // entered by the user with the encrypted one from user.password
          res.status(201).json({                                     
          _id: user.id, // returns user data on a success
          name: user.name,
          email: user.email,
          token: generateToken(user._id, user.secret)
    });
    process.env.JWT_SECRET = user.secret;  // Stores the specific users secret in the env file whose JWT_SECRET varible holds an empty string.                    
}  else {
    res.status(400)
    throw new Error('Invalid credentials')
}
}

catch(error) {
    res.status(400).json({ error: error.message });
}
}



// retrieves user data
// uses a GET request to /api/users/me       :me stands for the current logged in user
// is a Private request
const getMe = async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json ({
        id: _id,
        name,
        email
    })
}

// Generaate JWT token
const generateToken = (id, secret) => {
    return jwt.sign({ id },  secret, {  // sign holds a string of data use to build the token which is comprised of the ID, and secret
        expiresIn: '30d', // token created here will expire in set amount of time
        
    })
}

module.exports = {
    registerUser, loginUser, getMe, 
}
