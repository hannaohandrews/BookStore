import express, { request } from "express";
import { PORT, monogDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).json({ message: "Hello, world!" });
});

//Middleware for parsing request body
//
app.use(express.json());

// Route for Save a new book
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send("Missing required fields: title, author, publishYear");
    }

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log("Error saving book", error.message);
    response.status(500).send(error.message);
  }
});

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
