const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const Book = require('../models/book');
=======
const Book = require('../models/books');
>>>>>>> dc1facd (changes)

router.get('/books', async (req, res) => {
  try {
    const { title, author, genre, sortOrder, startDate, endDate, page, pageSize } = req.query;
<<<<<<< HEAD

    const query = {};
    if (title) query.title = new RegExp(title, 'i'); // Case-insensitive partial match
=======
    const query = {};
    if (title) query.title = new RegExp(title, 'i'); 
>>>>>>> dc1facd (changes)
    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = new RegExp(genre, 'i');
    if (startDate && endDate) {
      query.published_date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

<<<<<<< HEAD
=======
  
>>>>>>> dc1facd (changes)
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

<<<<<<< HEAD

router.post('/books', async (req, res) => {
  try {
    // Extract book details from request body
    const { title, author, published_date, genre, description, ISBN, availability } = req.body;

    // Create a new book object
=======
router.post('/books', async (req, res) => {
  try {
    const { title, author, published_date, genre, description, ISBN, availability } = req.body;

>>>>>>> dc1facd (changes)
    const newBook = new Book({
      title,
      author,
      published_date,
      genre,
      description,
      ISBN,
      availability
    });

<<<<<<< HEAD
   
=======
>>>>>>> dc1facd (changes)
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(400).json({ error: 'Bad request' });
  }
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> dc1facd (changes)
