const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/books', async (req, res) => {
  try {
    const { title, author, genre, sortOrder, startDate, endDate, page, pageSize } = req.query;

    const query = {};
    if (title) query.title = new RegExp(title, 'i'); // Case-insensitive partial match
    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = new RegExp(genre, 'i');
    if (startDate && endDate) {
      query.published_date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const books = await Book.find(query)
      .sort(sortOrder)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/books', async (req, res) => {
  try {
    // Extract book details from request body
    const { title, author, published_date, genre, description, ISBN, availability } = req.body;

    // Create a new book object
    const newBook = new Book({
      title,
      author,
      published_date,
      genre,
      description,
      ISBN,
      availability
    });

   
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(400).json({ error: 'Bad request' });
  }
});

module.exports = router;
