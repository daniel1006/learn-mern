const mongoose = require('mongoose');

const ToDoSchema = mongoose.Schema (
    {
    user: {
        type: mongoose.Schema.Types.ObjectId, // this will create a new object in the database. Meaning that part of a users data will involve the below info.
        required: true,
        ref: 'User' // This refers to the ObjectID, meaning the new ID will be associated with our user and todo model 
    },

      text: 
    {
        type: String,
        date: Date,
        required: true, // This just means that the above points must have a data entry
    }

    },
    {
        timestamps: true, // This means that the date/time will be logged when an onject is created/updated 
    }
)

module.exports = mongoose.model('ToDoModel', ToDoSchema);


