//Imports and Libraries
const express = require('express');
const cors = require('cors');
require('./mongodb');

app = express();

const userRoute = require('./routes/user-route');

//middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use('/users', userRoute);

// PORTS
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
