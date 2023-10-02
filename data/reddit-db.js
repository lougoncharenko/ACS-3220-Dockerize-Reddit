/* Mongoose Connection */
const mongoose = require('mongoose');
assert = require('assert');

const url = process.env.MONGODB_URI;
mongoose.connect(
    url,
    {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true, useUnifiedTopology: true, authSource: "admin"
    },
    (err) => {
      assert.equal(null, err);
      console.log("Connected successfully to database");

      //db.close(); turn on for testing
    }
  );
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;
