import { useEffect, useState } from "react";
import control from "../API/control";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const getCart = async () => {
    try {
      const response = await control.get("get/carts", {
        params: {
          userid: JSON.parse(localStorage.getItem("info")).id,
        },
      });
      console.log(response.data);
      setCart(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    
    getCart();
  }, []);

  const handleDeleteCart = async (cartid)=>{
    try{
        const response = await control.delete("delete/cart", {
            params: {
                id: cartid
            }
        });
        alert("Delete Cart Success")
        getCart();
    }catch(err){
        console.error(err)
    }
  }
  return (
    <div className="w-full flex justify-center">
      <table className="table-auto w-full border-collapse border text-sm border-gray-400">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3">
              <div className="flex items-center justify-center">
                <h1>STT</h1>
              </div>
            </th>
            <th className="p-3">
              <div className="flex items-center justify-center">
                <h1>Title Book</h1>
              </div>
            </th>
            <th className="p-3">
              <div className="flex items-center justify-center">
                <h1>Author</h1>
              </div>
            </th>

            <th className="p-3">
              <div className="flex items-center justify-center">
                <h1>Quantity</h1>
              </div>
            </th>

            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody id="laptop-rows">
          {cart.map((c, index) => {
            return (
              <tr key={index}>
                <td className="p-3 border border-gray-400 text-blue-600 font-medium">
                  {index}
                </td>
                <td className="p-3 border border-gray-400">{c.book.title}</td>
                <td className="p-3 border border-gray-400">{c.book.author}</td>
                <td className="p-3 border border-gray-400">{c.quantity}</td>

                <td className="p-3 border border-gray-400 flex justify-around">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        handleDeleteCart(c.id)
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
