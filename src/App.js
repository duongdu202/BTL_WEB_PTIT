import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home";
import Register from "./Components/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";
import BookForm from "./Components/NewBook";
import BookList from "./Components/BookList";
import BookDetail from "./Components/BookDetail";
import ListBookAdmin from "./Components/ListBookAdmin";
import Cart from "./Components/Cart";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {JSON.parse(localStorage.getItem("info")).role === 1 ? (
            <Route path="/new/book" element={<BookForm />} />
          ) : null}{" "}
          <Route path="/list/books" element={<BookList />} />
          {JSON.parse(localStorage.getItem("info")).role !== 0 ? (
            <Route path="/cart" element={<Cart />} />
          ) : null}{" "}
          
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<BookList />} />
          <Route path="/bookdetail/:id/:title" element={<BookDetail />} />
          {JSON.parse(localStorage.getItem("info")).role === 1 ? (
            <Route path="/admin/listbook" element={<ListBookAdmin />} />
          ) : null}{" "}
          <Route path="/view/book/:id" element={<BookForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
