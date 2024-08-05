import mongoose from "mongoose";

// Create a schema for the book model
// Schema is a blueprint for the MongoDB collection
// A schema defines the structure of documents within a collection, including field names, types, default values, and validation rules.
// From a schema , you create a model , which is a class that lets you interact with the database
const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
