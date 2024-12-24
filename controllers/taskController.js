//const User = require('../models/user');
const UserTasks = require('../models/userTasks');
const Tasks = require('../models/tasks');

exports.get_user_tasks = async (req, res) => {
    try {
        const userId = req.user.id;
        //console.log(userId)

        const UserTasks_array = await UserTasks.findById(userId);
        //console.log(UserTasks_array.myTasks);

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
        //console.log(userId);
        const { title, description, dueDate } = req.body;

        // find user userTask coleciton id's
        const userTasksCollection = await UserTasks.findById(userId);
        if (!userTasksCollection) {
            return res.status(404).json({ error: 'User not found in UserTasks' });
        }

        const newTask_to_be_created = new Tasks({ title, description, dueDate });

        userTasksCollection.myTasks.push(newTask_to_be_created._id);

        await userTasksCollection.save();
        await newTask_to_be_created.save();
        //console.log(newTask_to_be_created._id);

        res.status(201).json({ message: 'Task is created  successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.delete_a_Task = async (req, res) => {
    const userId = req.user.id;
    const { taskId } = req.params;

    console.log(taskId)

    try {

        const User_Tasks_Array = await UserTasks.findById(userId);
        if (!User_Tasks_Array) {
            return res.status(404).json({ message: 'No Task found' });
        }

        const updated_User_task_array = await UserTasks.findByIdAndUpdate(
            userId,
            { $pull: { myTasks: taskId } },
            { new: true }
        );

        if (!updated_User_task_array) {
            return res.status(404).json({ message: 'Failed to update user task array' });
        }
        //console.log(userId)

        const delete_task = await Tasks.findByIdAndDelete(taskId);
        if (!delete_task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        res.status(200).json({
            message: 'Listing deleted successfully.',
        });
    }
    catch (error) {
        console.error('Error deleting listing:', error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};