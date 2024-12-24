const User = require('../models/user');
const UserTasks = require('../models/userTasks');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists', message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      fullName, 
    });

    console.log(newUser._id);
    await newUser.save();

    const userTasks = new UserTasks({
      _id: newUser._id
    });
    await userTasks.save(); 

    res.status(201).json({ message: 'User registered successfully' });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '6h' }
    );

    res.json({ token });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

