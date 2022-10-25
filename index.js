//Imports and Libraries
const express = require('express');
const cors = require('cors');
require('./mongodb');

app = express();

const userRoute = require('./routes/user-route');

//middleware
// app.use((req, res, next) => {
//   if (req.method == 'GET') {
//     res.status(400).send('GET METHODS ARE CURRENTLY UNAVAILABLE.');
//   } else {
//     next();
//   }
// });

// Shut down server for any request
// app.use((req, res, next) => {
//   res.status(503).send('Site is temporarily unavailable. ');
// });

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use('/users', userRoute);

// PORTS
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
