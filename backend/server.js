require('dotenv').config();
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const pool = require("./config/db");
const corsOptions = require('./config/corsOptions');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3500;

// app.use('api/v1/auth', require('./routes/authRoutes'));
// app.use('api/v1/users', require('./routes/userRoutes'));
// app.use('api/v1/notes', require('./routes/noteRoutes'));

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