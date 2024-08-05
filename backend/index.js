import express from "express";
import { PORT, monogDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware function takes 3 arguemnts, request object, response object and acall back function
// in the application's request-response cycle

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).json({ message: "Hello, world!" });
});

//Middleware for parsing request body
// Express serves as a routing and Middleware framework for handling the different routing of the webpage and it works between the request and response cycle
// Middleware gets exectued after server receives the request and before it sends the response
// Middleware is a function that has access to the request and response object
// Middleware in ExpressJS : request hanlder that allows you to intercept and mianpulate request and responses
// beofere they reach route handlers. They are the functions that are involked by the Express.js routing layer
app.use(express.json());

mongoose
  .connect(monogDBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
