const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  /*username: {
    type: String, 
    default: 'New User',
    trim: true
  },*/
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String, 
    unique: true,
    lowercase: true,
    trim: true
  },
  about: {
    type: String,
    default: 'Tell us more about yourself!',
    maxlength: 1000 
  },   
  password: {
    type: String, 
    minlength: 6
  },    
  createdAt: {
    type: Date,
    default: Date.now
  }, 
}); 

module.exports = mongoose.model('User', userSchema);
