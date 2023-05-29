const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ // takes same format as other models

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true, 
    },
    secret: {
        type: String,
    },
},
{
    timeStamps: true
})

module.exports = mongoose.model('User', userSchema)