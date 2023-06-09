import React, { useEffect, useState } from 'react';
import axios from 'axios';
import control from '../API/control';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await control.get('/books'); // Gửi yêu cầu GET đến API /books trên server Spring Boot
      setBooks(response.data); // Cập nhật danh sách sách từ response vào state
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {books.reverse().map((book) => (
          <Link to={`bookdetail/${book.id}/${book.title}`}>
          
          <div className="bg-white rounded-lg shadow-md p-4 h-80 truncate" key={book.id}>
            <img
              className="mx-auto h-60 object-contain"
              src={`data:image/png;base64,${book.image}`}
              alt="Book Cover"
            />
            <h3 className="text-lg font-bold ">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookList;
