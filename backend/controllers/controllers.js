const ToDoModel = require('../models/ToDoModel');
const User = require('../models/userModels');
const asyncHandler = require('express-async-handler');

// Retrieves ToDo items.
// path is, get /api/ToDo
// access is, private
const retieveTodo = asyncHandler(async(req, res) => {  

const getToDo = await ToDoModel.find({ user: req.user.id }); // toDoModel is from the ToDoModel folder
                                                             // here user.id can be accesed because of the protect middleware function we attached
                                                            // to the route in the routes file.
    res.status(200).json(getToDo);
})

// post ToDo items.
// path is, get /api/ToDo
// access is, private
const postToDo = asyncHandler(async (req, res) => {  

    if (!req.body.text) {
        res.status(400)
        throw new Error('invalid user input')
    }

const toDoItem = await ToDoModel.create ({
    text: req.body.text,
    //user: req.user.id // to show details of a specific user
})


    res.status(200).json(toDoItem);

})

// put ToDo items.
// path is, get /api/ToDo
// access is, private
const changeToDo = asyncHandler(async (req, res) => {  // Id can be retrieved via req.params.id, where params is the value that corresponds to the ID.
const toDoItem = await ToDoModel.findById(req.params.id) // first finding item before you can change it

    if (!toDoItem) {
        res.status(400)
        throw new Error('invalid user input')
    }

    const user = await User.findById(req.user.id) // retrieve id of current user that is trying to change todo list.
    if (!user) { // checks if user checking exist in the database
        res.status(401)
        throw new Error('User not found')
    }

    if (toDoItem.user.toString() !== user.id) { // confirms if the todo item which has a parameter of user matches the user trying to alter list but first turns it into a string to do so.
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateToDo = await ToDoModel.findByIdAndUpdate(req.params.id,  // first parameter is retrieving the ID, next is to update it.
        req.body, {
        //new: true, // will create a new ID if one is not found
    })   

    res.status(200).json(updateToDo);
})

// delete ToDo items.
// path is, get /api/ToDo
// access is, private
const removeToDo = asyncHandler(async(req, res) => {  

const toDoItem = await ToDoModel.findById(req.params.id) // first finding item before you can change it

    if (!toDoItem) {
        res.status(400)
        throw new Error('invalid user input')
    }

    const user = await User.findById(req.user.id) // retrieve id of current user that is trying to change todo list.
    if (!user) { // checks if user checking exist in the database
        res.status(401)
        throw new Error('User not found')
    }

    if (toDoItem.user.toString() !== user.id) { // confirms if the todo item which has a parameter of user matches the user trying to alter list but first turns it into a string to do so.
        res.status(401)
        throw new Error('User not authorized')
    }

    await toDoItem.deleteOne({ _id: req.params.id });

    res.status(200).json({ id: req.params.id });
})

module.exports = {
    retieveTodo, postToDo, changeToDo, removeToDo
}