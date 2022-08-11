const mongoose = require('mongoose');
require('dotenv').config();

// database connection
const mongo_api = process.env.MONGO_APIKEY;
mongoose
  .connect(mongo_api, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'LinkedIn',
  })
  .then(() => {
    console.log('Database is running');
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
