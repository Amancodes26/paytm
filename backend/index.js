const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rootRouter = require('./routes/index');
const { MONGO_URI } = require('./config'); // Import the MongoDB URI

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Use the root router
app.use('/api/v1', rootRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


//body parser   = usually helps in extract information from HTTP