const express = require('express');

const router = express.Router();

const taskControllers = require('../controllers/taskControllers');
const {createTaskController, getAllTasksController, getSingleTaskController} = taskControllers
const User = require('../models/User');

router.post('/', createTaskController);

router.get('/', getAllTasksController);


router.post('/users', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (err, existingUser) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server Error!' });
    }

    if (existingUser) {
      return res.status(400).json({ error: 'Duplicate Username Found!' });
    }

    });
  });


router.get('/:id', getSingleTaskController);


module.exports = router;