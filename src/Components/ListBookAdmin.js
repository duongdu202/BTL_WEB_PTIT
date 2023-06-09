import { useEffect, useState } from "react";
import control from "../API/control";
import { Link } from "react-router-dom";

export default function ListBookAdmin() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (ID)=>{
    try{
        const response = await control.delete("delete/book", {
            params:{
                id: ID
            }
        })
        fetchBooks();
    }catch(err){
        console.error(err);
    }
  }

  const fetchBooks = async () => {
    try {
      const response = await control.get("/books"); // Gửi yêu cầu GET đến API /books trên server Spring Boot
      setBooks(response.data); // Cập nhật danh sách sách từ response vào state
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  return (
    <div>
        <div className="my-4">
            <Link
                to={"/new/book"}
                className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded my-4"
                 >
                    ADD NEW BOOK
                    
            </Link>
        </div>
      <table className="table-auto w-full border-collapse border text-sm border-gray-400">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3">
              <div className="flex items-center justify-center">
                <h1>Title</h1>
              </div>
            </th>
            <th className="p-3">
              <div className="flex items-center justify-center">
                <h1>Author</h1>
              </div>
            </th>
            <th className="p-3">
              <div className="flex items-center justify-center">
                <h1>Category</h1>
              </div>
            </th>
            
            <th className="p-3">
              <div className="flex items-center justify-center">
                <h1>Publication Year</h1>
              </div>
            </th>

            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody id="laptop-rows">
          {books.reverse().map((book, index) => {
            return book.id !== 0 ? (
              <tr key={index}>
                {/* <td className="p-3 border border-gray-400">{book.id}</td> */}
                {/* <td className="p-3 border border-gray-400 text-left w-30 h-30">
                  <img className="object-cover w-20 h-20" src={book.image} />
                </td> */}
                <td className="p-3 border border-gray-400 text-blue-600 font-medium">
                  {book.title}
                </td>
                <td className="p-3 border border-gray-400">{book.author}</td>
                <td className="p-3 border border-gray-400">{book.category}</td>

                

                <td className="p-3 border border-gray-400 text-center">
                  {book.publicdate}
                </td>
                

                <td className="p-3 border border-gray-400 flex justify-around">
                  <Link to={`/view/book/${book.id}`}>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      
                      >
                        View
                      </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {deleteBook(book.id)}}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
    </div>
  );
}
