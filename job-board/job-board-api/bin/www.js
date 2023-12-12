require('dotenv').config()
const mongoose = require('mongoose');
const http = require('http');
const app = require('../index');

// mongoose.set('debug', true); // Enable Mongoose debugging

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const onListening = () => console.log(`Server running at port ${PORT}`);
const onError = (error) => console.error(`Server error: ${error.message}`);

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const db = mongoose.connection;

    mongoose.Promise = global.Promise;

    db.on('connected', () => console.log('Connected to MongoDB'));
    db.on('error', (err) => console.error(`MongoDB error: ${err}`));
    db.on('disconnected', () => console.log('Database disconnected!'));

    // Handle both SIGINT and SIGTERM
    ['SIGINT', 'SIGTERM'].forEach((signal) => {
      process.on(signal, () => {
        db.close().then(() => {
          console.log(`Connection closed on ${signal}!`);
          process.exit(0);
        });
      });
    });

    server.listen(PORT);
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

server.on('listening', onListening);
server.on('error', onError);

start();
