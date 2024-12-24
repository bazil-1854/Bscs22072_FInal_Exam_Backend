const mongoose = require('mongoose');

const userTaskSchema = new mongoose.Schema({ 
  tasks: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model('UserTasks', userTaskSchema);
