require('dotenv').config();
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const pool = require("./config/db");
const corsOptions = require('./config/corsOptions');
const express = require('express');
const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3500;

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/tasks', require('./routes/taskRoutes'));

app.all(/.*/, (req, res) => {
  res.status(404);

  if (req.accepts('json')) {
    res.json({ message: '404 Not Found', path: req.originalUrl });
  } else {
    res.type('txt').send(`404 Not Found: ${req.originalUrl}`);
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
})