import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import control from '../API/control';

export default function Home() {
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
    <div className="text-xl text-red-500">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
  
}
