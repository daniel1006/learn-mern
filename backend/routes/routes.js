const express = require('express');
const router = express.Router();
const { retieveTodo, postToDo, changeToDo, removeToDo } = require('../controllers/controllers');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, retieveTodo);
router.post('/', protect, postToDo);
router.put('/:id', protect, changeToDo);
router.delete('/:id', protect, removeToDo);

module.exports = router;