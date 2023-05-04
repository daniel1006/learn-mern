const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startWith('Bearer')) { // checks is user is authorized
                                                                                     // bearer indicated that a token followed by that string is
        try {                                                                        // being used to authorize a user
        } catch (error) {

        }                                                                             
        
    }
}

module.exports = { protect }