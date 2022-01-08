const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
require('dotenv').config();

const app = express(); 
const PORT = 8000; 

// Middlewares 
app.use(cors());

// Routes 
app.get('/', (req, res) => {
    res.send('We are home'); 
});

// Connect to DB
mongoose.connect(`${process.env.DB_CONNECTION}`, () => console.log('connected to DB!')); 

app.listen(PORT, () => console.log(`server running on PORT ${PORT}...`));