const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require('fs');
const https = require('https');

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION!");
    console.log(err);
    process.exit(1);
})

dotenv.config({path: "./Config.env"});

const app = require("./app");

const database = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);
mongoose.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connection established! 🖥️");
})

// SERVER
const port = process.env.PORT || 3000;
const options = {
    key: fs.readFileSync('../certs/localhost+1-key.pem'),
    cert: fs.readFileSync('../certs/localhost+1.pem'),
  };
  
  const server = https.createServer(options, app);
  server.listen(port, () => {
      console.log(`App listening on port ${port}`);
  });

process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message)
    server.close(() => {
        process.exit(1);
    })
})