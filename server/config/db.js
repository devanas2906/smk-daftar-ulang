const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info('Connect to MongoDB.');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

const closeConnectionDatabase = async () => {
  try {
    await mongoose.connection.close();
    console.info('Close the MongoDB connection.');
  } catch (error) {
    console.error('Failed to close MongoDB connection:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDatabase, closeConnectionDatabase };
