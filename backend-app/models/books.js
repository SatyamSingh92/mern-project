const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  published_date: {
    type: Date,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  description: String,
  ISBN: String,
  availability: {
    type: Boolean,
    default: true
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;