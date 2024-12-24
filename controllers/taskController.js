//const User = require('../models/user');
const UserTasks = require('../models/userTasks');
const Tasks = require('../models/tasks');

exports.get_user_tasks = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId)

        const UserTasks_array = await UserTasks.findById(userId);
        console.log(UserTasks_array.myTasks);

        if (!UserTasks_array || UserTasks_array.myTasks.length === 0) {
            return res.status(404).json({ error: 'No Tasks.' });
        }

        const User_own_Tasks = await Promise.all(
            UserTasks_array.myTasks.map((taskId) => Tasks.findById(taskId))
        );


        res.status(200).json({ User_own_Tasks });
    }
    catch (error) {
        console.error('Error fetching favorite listings:', error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};


exports.create_a_Task = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const { title, description, dueDate } = req.body;


        // find user userTask coleciton id's
        const userTasksCollection = await UserTasks.findById(userId);
        if (!userTasksCollection) {
            return res.status(404).json({ error: 'User not found in UserTasks' });
        }

        const newTask_to_be_created = new Tasks({ title, description, dueDate });

        userTasksCollection.myTasks.push(newTask_to_be_created);

        await userTasksCollection.save();
        await newTask_to_be_created.save();

        //console.log(newUser._id);

        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}; 
