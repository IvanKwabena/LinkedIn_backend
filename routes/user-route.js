const express = require('express');
const User = require('../schemas/user_schema');

const router = express.Router();

// Get all Users
router.get('/', async (req, res) => {
  let user = await User.find();
  try {
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a Single User
router.get('/:id', async (req, res) => {
  const userID = req.params.id;
  let user = await User.findById(userID);

  try {
    if (!user) {
      return res.status(400).json({ message: 'Cannot find specified User ' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Post a User
router.post('/', async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    birthday: req.body.birthday,
    headline: req.body.headline,
    industry: req.body.industry,
    education: req.body.education,
    location: req.body.location,
    phone: req.body.phone,
    address: req.body.address,
  });

  user = await user.save();

  try {
    res.send(user);
  } catch (error) {
    res.status(4000).send(error);
  }
});

// Update a User
router.patch('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.passwordHash,
        birthday: req.body.birthday,
        headline: req.body.headline,
        industry: req.body.industry,
        education: req.body.education,
        location: req.body.location,
        phone: req.body.phone,
        address: req.body.address,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User to update does not exist' });
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
