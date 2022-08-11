const mongoose = require('mongoose');
const validator = require('validator');

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
    // userName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   lenght: { min: 2, max: 32 },
    // },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
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
      type: String,
      trim: true,
      default: ' ',
    },
    phoneTypye: {
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
});

module.exports = mongoose.model('User', userSchema);
