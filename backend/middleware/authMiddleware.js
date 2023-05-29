const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const asyncHandler = require('express-async-handler');// this package helps to easilly handler errors with less code. as in not using try/catch

// decrypt
const protect = asyncHandler (async (req, res, next) => {
    let token 
    
// Call the loginUser function and access the user.secret property


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // checks that both the data has been verified and that 
                                                                                      // header includes a bearer token, indicating that the user
        try {                                                                       // has already logged in under those credentials before.
        token = req.headers.authorization.split(' ')[1] // this seperates the token from the header string

        const decoded = jwt.verify(token, process.env.JWT_SECRET ) // verify is a function that will decode the encypted token based on the secret
                                                                 // if the signature is valid and the token not expired 'decoded' will return
                                                                // the token with all its data without any encryption
        req.user = await User.findById(decoded.id).select('-password') // based on the decoded token we can retrieve the id of a user from
              
                                                       // the databse and return their info in this context without the password
        next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }                                                                             
    }
        if (!token) {
            res.status(401)
            throw new Error('Not authorized, no token')
        }
})

module.exports = { protect }