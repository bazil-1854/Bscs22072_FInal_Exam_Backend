const mongoose = require('mongoose'); 

const taskSchema = new mongoose.Schema({
  Name: {
    type: String, 
    //required: true
  },
  description: {
    type: String,
    default: 'Tell us more about yourself!',
    maxlength: 1000 
  },   
  createdAt: {
    type: Date,
    default: Date.now
  }, 
  dueDate: {
    type: Date,
    required: true
  },
}); 

module.exports = mongoose.model('Task', taskSchema);