import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import control from "../API/control";
import QuantitySelector from "./Quantity";

export default function BookDetail() {
  const [book, setBook] = useState({});
  const params = useParams();
  useEffect(() => {
    if (params) {
      const getBook = async () => {
        try {
          const response = await control.get("/getbook", {
            params: {
              id: params.id,
            },
          });
          setBook(response.data);
        } catch (err) {
          console.error(err);
        }
      };
      getBook();
    }
  }, []);

  const handleBuy = async ()=>{
    const submit = async ()=>{
        try{
            const response = await control.post("add/cart", cart)
            alert("Buy Success");
        }catch(err){
            console.error(err);
        }
    }
    submit();
  }
  const [cart, setCart] = useState({
    userid: JSON.parse(localStorage.getItem("info")).id,
    bookid: params.id,
    quantity: 0
  });

  return (
    <div className="flex w-full">
      <div className="w-6/12 h-96">
        <img
          src={`data:image/png;base64,${book.image}`}
          alt="Book Cover"
          className="mb-4 object-contain h-96 rounded-lg shadow-lg"
        />
      </div>
      <div className="ml-8">
        <h3 className="text-2xl font-bold mb-4">{book.title}</h3>
        <p className="text-gray-600 text-lg mb-2">Author: {book.author}</p>
        <p className="text-gray-600 text-lg mb-2">
          Description: {book.description}
        </p>
        <p className="text-gray-600 text-lg mb-2">
          Public Date: {book.publicdate}
        </p>
        <p className="text-gray-600 text-lg mb-2">
          Page Number: {book.pagenumb}
        </p>
        <p className="text-gray-600 text-lg mb-2">Category: {book.category}</p>
        <QuantitySelector cart={cart} setCart={setCart
        }/>
        {!JSON.parse(localStorage.getItem("info")).info ?(<button onClick={()=>{handleBuy()}} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
          BUY NOW
        </button>):
        (<button onClick={()=>{}} className="bg-yellow-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
        BUY NOW
      </button>)}
      </div>
    </div>
  );
}
