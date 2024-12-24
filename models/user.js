const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    default: 'New User',
    trim: true
  },
  email: {
    type: String, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String, 
    minlength: 6
  }, 
  role: {
    type: String,
    enum: ['Host', 'Guest'],
    default: 'Guest'
  },
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  dob: {
    type: Date,
    //required: true 
  },
  profilePicture: {
    type: String,
    default: '1'
  }, 
  bio: {
    type: String,
    default: 'Hi, I’m new here!',
    maxlength: 500
  },  
  createdAt: {
    type: Date,
    default: Date.now
  }, 
}); 

module.exports = mongoose.model('User', userSchema);
