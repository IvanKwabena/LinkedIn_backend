const jwt = require('jsonwebtoken');
const User = require('../schemas/user_schema');
require('dotenv').config();

const auth = async (req, res, next) => {
  const secret = process.env.TOKEN_SECRET;

  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw Error('No User found with authentication');
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).send('Please Authenticate');
  }
};

module.exports = auth;
