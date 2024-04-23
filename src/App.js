import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const App = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    title: '',
    author: '',
    genre: '',
    sortOrder: 'title', // default sort order
    page: 1,
    pageSize: 10
  });

  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    // Fetch books when component mounts or searchCriteria changes
    fetchBooks();
  }, [searchCriteria]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books`, { params: searchCriteria });
      setBooks(response.data.books);
      setTotalBooks(response.data.total);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearchInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    // Reset page number to 1 when submitting new search
    setSearchCriteria({ ...searchCriteria, page: 1 });
  };

  const handlePageChange = (page) => {
    setSearchCriteria({ ...searchCriteria, page });
  };

  return (
    <div>
      <h1>Book Search</h1>
      <form onSubmit={handleSearchFormSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleSearchInputChange} />
        <input type="text" name="author" placeholder="Author" onChange={handleSearchInputChange} />
        <input type="text" name="genre" placeholder="Genre" onChange={handleSearchInputChange} />
        <button type="submit">Search</button>
      </form>
      <div>
        {books.map((book) => (
          <div key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.published_date}</p>
            <p>{book.genre}</p>
          </div>
        ))}
      </div>
      <div>
        {totalBooks > 0 && (
          <div>
            <span>Page: </span>
            {Array.from({ length: Math.ceil(totalBooks / searchCriteria.pageSize) }, (_, index) => (
              <button key={index + 1} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
