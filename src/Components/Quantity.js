import React, { useState } from "react";

const QuantitySelector = ({ cart, setCart }) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (cart.quantity > 1) {
      setCart({ ...cart, quantity: cart.quantity - 1 });
    }
  };

  const increaseQuantity = () => {
    setCart({ ...cart, quantity: cart.quantity + 1 });
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);

    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setCart({ ...cart, quantity: newQuantity });
    }
  };

  return (
    <div className="flex items-center">
      <button
        className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-8 w-8 rounded-l outline-none focus:outline-none"
        onClick={decreaseQuantity}
      >
        -
      </button>
      <input
        type="number"
        value={cart.quantity}
        className="text-center bg-gray-100 w-16 px-2 py-1 outline-none focus:outline-none"
        onChange={handleQuantityChange}
      />
      <button
        className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-8 w-8 rounded-r outline-none focus:outline-none"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;