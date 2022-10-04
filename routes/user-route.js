const express = require('express');
const bcrypt = require('bcrypt');
const { Mongoose } = require('mongoose');
const User = require('../schemas/user_schema');

const router = express.Router();

// Get all Users
router.get('/', async (req, res) => {
  try {
    let user = await User.find().sort({ dateCreated: -1 });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a Single User
router.get('/:id', async (req, res) => {
  const userID = req.params.id;
  try {
    let user = await User.findById(userID);
    if (!user) {
      return res.status(400).json({ message: 'Cannot find specified User ' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Post for a User
router.post('/', async (req, res) => {
  try {
    const user = User(req.body);

    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login a User
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(300).json({ message: 'Email does not exist' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a User
router.patch('/:id', async (req, res) => {
  const userId = req.params.id;
  const updates = Object.keys(req.body);

  const allowedUpdates = [];

  // Get all the Keys from the Schema
  for (let property in User.schema.obj) {
    allowedUpdates.push(property);
  }
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).send('Invalid field to update');
  }

  try {
    // manual update function to work well with the middle ware
    const user = await User.findById(userId);
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();

    if (!user) {
      return res.status(400).json({ message: 'Invalid User' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a User
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndRemove(userId);
    if (!user) {
      return res
        .status(300)
        .json({ message: 'User does not exist to be deleted' });
    }
    res.status(200).json({ message: 'User was successfully deleted' });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
