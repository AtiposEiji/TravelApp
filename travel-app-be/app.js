const express = require('express');
const morgan = require('morgan');
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AppError = require("./Utils/AppError");
const globalErrorController = require("./Controller/Error/ErrorController");
const locationRoutes = require("./Routes/Location/LocationRoutes");
const userRoutes = require("./Routes/User/UserRoutes");
const folderRoutes = require("./Routes/Folder/FolderRoutes");

const app = express();

// Implement CORS middleware
app.use(cors({
  origin: '*', // allow requests from any origin
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // allow these HTTP methods
  optionsSuccessStatus: 200, // set the status code for successful preflight requests
  preflightContinue: false // disable redirection during preflight requests
}));

// Handle preflight requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// SECURITY HTTP HEADERS
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Data Sanitization againt NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization againt XSS
app.use(xssClean());

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

// ROUTES
app.use("/api/v1/locations", locationRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/folders", folderRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})

app.use(globalErrorController)

module.exports = app;