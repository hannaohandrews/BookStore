import express from "express";

const router = express.Router();

// POST: Route for Save a new book
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

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log("Error saving book", error.message);
    response.status(500).send(error.message);
  }
});

// GET: Route for getting all books
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log("Error getting books", error.message);
  }
});

// GET: Route for getting one book from database by id
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).json(book);
  } catch (error) {
    console.log("Error getting books", error.message);
    response.status(500).send(error.message);
  }
});

// UPDATE: Route for update a book
app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "need all required fields",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }

    return response.status(200).send({ book: result, message: "Book updated" });
  } catch (error) {
    console.log("Error updating book", error.message);
    response.status(500).send({ message: error.message });
  }
});

// DELETE: Route for delete a book
app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ book: result, message: "Book deleted" });
  } catch (error) {
    console.log("Error deleting book", error.message);
    response.status(500).send({ message: error.message });
  }
});
