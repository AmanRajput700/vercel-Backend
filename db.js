require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      let url = process.env.ATLASDB_URL
      const conn = await mongoose.connect(`${url}`);
      console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  module.exports = connectDB;