import express from "express";
import { Book } from "../models/bookModels.js";
import mongoose from "mongoose";
const router = express.Router();

// Use cookieParser and other middleware
// Creating route for MongoDB
router.post("/create", async (req, res) => {
  try {
    // Basic validation of the data coming from the user
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.Date ||
      !req.body.content
    ) {
      return res.status(400).send({
        message: "Give all the required fields",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      Date: req.body.Date,
      content: req.body.content, // Include content in the new book
    };

    // Save the new book to the database
    const book = await Book.create(newBook);
    await book.save();
    console.log(newBook); // For demonstration purposes

    res.status(201).send(newBook); // Respond with the created book and a 201 status code
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

// Getting all the books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Getting the books by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const books = await Book.findById(id);
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//updating the book by id
router.put("/:id", async (req, res) => {
  try {
    // Basic validation of the data coming from the user
    if (!req.body.title || !req.body.author || !req.body.Date) {
      return res.status(400).send({
        message: "Give all the required fields: title, author, publishYear",
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    // Checking if the book with the given ID is available or not
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res
      .status(200)
      .json({ message: "Book updated successfully", book: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

//deleting the books
// Route for Delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//filter by  blog
router.get("/filter/:title/:author", async (req, res) => {
  const { title, author } = req.params; // Use title and author instead of title1 and author1
  console.log(title);
  console.log(author);
  try {
    const books = await Book.find({ title: title, author: author });
    console.log(books);
    return res.status(200).json(books); // Return the array of books directly
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
