const mongoose = require('mongoose');

const userTaskSchema = new mongoose.Schema({ 
  myTasks: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model('UserTasks', userTaskSchema);
