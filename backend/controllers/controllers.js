const ToDoModel = require('../models/ToDoModel');

// Retrieves ToDo items.
// path is, get /api/ToDo
// access is, private
const retieveTodo = async (req, res) => {  

const getToDo = await ToDoModel.find(); // toDoModel is from the ToDoModel folder

try {
    res.status(200).json(getToDo);
 }
catch {
    res.status(400).json("could not find user input");
 }
}

// post ToDo items.
// path is, get /api/ToDo
// access is, private
const postToDo = async (req, res) => {  

const toDoItem = await ToDoModel.create ({
    text: req.body.text
})

try {
    res.status(200).json(toDoItem);
}
catch {
    if (!req.body.text) {
        res.status(400)
        throw new Error('invalid user input')
    }
 }
}

// put ToDo items.
// path is, get /api/ToDo
// access is, private
const changeToDo = async (req, res) => {  // Id can be retrieved via req.params.id, where params is the value that corresponds to the ID.

const getToDo = await ToDoModel.findById(req.params.id) // first finding item before you can change it

    if (!getToDo) {
        res.status(400)
        throw new Error('invalid user input')
    }

    const updateToDo = await ToDoModel.findByIdAndUpdate(req.params.id,  // first parameter is retrieving the ID, next is to update it.
        req.body, {
        new: true, // will create a new ID if one is not found
    })   

    res.status(200).json(updateToDo);
}

// delete ToDo items.
// path is, get /api/ToDo
// access is, private
const removeToDo = async (req, res) => {  

const getToDo = await ToDoModel.findById(req.params.id) // first finding item before you can change it

    if (!getToDo) {
        res.status(400)
        throw new Error('invalid user input')
    }

    await ToDoModel.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id });
}

module.exports = {
    retieveTodo, postToDo, changeToDo, removeToDo
}