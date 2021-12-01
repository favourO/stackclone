const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/error')

// Load Dotenv
dotenv.config({ path: './config/.env'})

// Connect to MongoDB 
connectDB();

// Load Route files
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');

// Load Express
const app = express();

// Load cors
app.use(cors());

// Body Parser
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Middleware logging during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// Mount Route files
app.use('/api/auth', authRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/answer', answerRoutes);

// Use error handler
app.use(errorHandler)


// Load PORT
const PORT = 5000 || process.env.PORT;

// Connect Server
const server = app.listen(PORT, () => {
    console.log(`Server Listening in PORT ${PORT} on ${process.env.NODE_ENV} Environment`.cyan.bold);
});

// this is used to handle unhandled rejections like database connection processes
// process.on('unhandledRejection', (err, promise) => {
//     console.log(`Error - ${err.message}`.red.bold);
//     // Close the server and exit process
//     server.close(() => process.exit(1));
// })

module.exports = server;