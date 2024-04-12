import mongoose from 'mongoose';
import config from './config/config.js';
import app from './server/express.js';

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.error(`Unable to connect to database: ${config.mongoUri}`);
    console.error(error);
    process.exit(1);
  });

mongoose.connection.on('error', (error) => {
  console.error(`MongoDB connection error: ${error}`);
  process.exit(1);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Wedev application." });
});

const server = app.listen(config.port, (err) => { 
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info('Server started on port %s.', config.port);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
  server.close(() => {
    process.exit(1);
  });
});
