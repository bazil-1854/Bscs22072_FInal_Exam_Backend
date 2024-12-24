const express = require('express');
const authenticate = require('../middleware/authMiddleware'); 
const { create_a_Task, get_user_tasks, delete_a_Task } = require('../controllers/taskController');

const router = express.Router();

router.get('/user-tasks', authenticate, get_user_tasks); 
router.post('/create-a-task', authenticate, create_a_Task); 
router.put('/update-task', authenticate, create_a_Task); 
router.delete('/delete-task/:taskId', authenticate, delete_a_Task); 

module.exports = router;
