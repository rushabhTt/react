import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const handleAddItem = (item) => {
    const newCart = [...cart];
    const cartItemIndex = newCart.findIndex(
      (cartItem) => cartItem.key === item.key
    );
    if (cartItemIndex !== -1) {
      newCart[cartItemIndex].quantity += 1;
    } else {
      newCart.push({ ...item, quantity: 1 });
    }
    setCart(newCart);
  };

  const handleRemoveItem = (item) => {
    const newCart = [...cart];
    const cartItemIndex = newCart.findIndex(
      (cartItem) => cartItem.key === item.key
    );

    if (cartItemIndex !== -1) {
      if (newCart[cartItemIndex].quantity > 1) {
        newCart[cartItemIndex].quantity--;
      } else {
        newCart.splice(cartItemIndex, 1);
      }
    }
    setCart(newCart);
  };

  const handleEmptyCart = () => {
    setCart([]);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleSelectItem = (item) => {
    const newCart = [...cart];
    const cartItemIndex = newCart.findIndex(
      (cartItem) => cartItem.key === item.key
    );
    if (cartItemIndex !== -1) {
      newCart[cartItemIndex].quantity += 1;
    } else {
      newCart.push({ ...item, quantity: 1 });
    }
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddItem,
        handleRemoveItem,
        handleEmptyCart,
        calculateTotalPrice,
        handleSelectItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
