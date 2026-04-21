const express = require('express');
const app = express();
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('API is running');
});
app.use('/api/auth',authRoutes);
app.use('/api/tasks', taskRoutes);
const errorHandler = require("./middlewares/errorMiddleware");

app.use(errorHandler);
module.exports = app;