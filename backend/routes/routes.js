const express = require('express');
const router = express.Router();
const { retieveTodo, postToDo, changeToDo, removeToDo } = require('../controllers/controllers');

router.get('/', retieveTodo);

router.post('/', postToDo);

router.put('/:id', changeToDo);

router.delete('/:id', removeToDo);

module.exports = router;