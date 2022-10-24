const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
    },
    additionalName: {
      type: String,
      trim: true,
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate(value) {
      // email is passed to the value parameter
      if (!validator.isEmail(value))
        throw new Error('Invalid Email. Please correct the email passed.');
    },
  },
  passwordHash: {
    type: String,
    required: true,
    minLength: 6,
  },
  // profilePhoto: {
  //   type: String,
  //   default: ' ',
  // },

  // backgroundProfilephoto: {
  //   type: String,
  //   default: ' ',
  // },
  birthday: {
    type: String,
    trim: true,
    required: true,
  },
  headline: {
    type: String,
    required: true,
    trim: true,
  },
  industry: {
    type: String,
    required: true,
    trim: true,
  },
  education: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
  },

  phone: {
    phoneNumber: {
      type: Number,
      // trim: true,
      default: ' ',
    },
    phoneType: {
      type: String,
      trim: true,
      default: 'Work',
    },
  },

  address: {
    type: String,
    trim: true,
    default: ' ',
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Middleware to hash a password before it is sent to database
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('passwordHash')) {
    user.passwordHash = await bcrypt.hash(user.passwordHash, 8);
    next();
  }
});

//function to SignUp user
userSchema.statics.createCredentials = async function (email, password) {
  user = await this.create(
    [
      {
        email: email,
        passwordHash: password,
      },
    ],
    {
      validateBeforeSave: false,
    }
  );

  return user;
};

// function to SignIn a user
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (!user) {
    return Error('Unable to add user');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return Error('Unable to add User');
  }

  // console.log(user);
  return user;
};

userSchema.methods.generateAuthToken = async function (id) {
  userid = id;

  const secret = process.env.TOKEN_SECRET;
  const token = jwt.sign({ _id: userid }, secret);

  this.tokens = this.tokens.concat({ token: token });

  await this.save();
  return token;
};

module.exports = mongoose.model('User', userSchema);
