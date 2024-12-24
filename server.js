const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./mongoDb/db');  
const path = require('path');
 
dotenv.config();
connectDB();

const app = express();
 
app.use(cors());
app.use(express.json());


app.use('/task-manager/auth', require("./routes/authRoute")); 
app.use('/task-manager/profile', require("./routes/profileRoutes")); 

 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));