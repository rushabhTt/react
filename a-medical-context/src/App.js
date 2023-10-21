import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Cart from "./components/Cart";
import Form from "./components/Form";

const App = () => {
  const [list, setList] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [list, cart]);

  useEffect(() => {
    const storedList = localStorage.getItem("list");
    const storedCart = localStorage.getItem("cart");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleAddItem = (item) => {
    setList([...list, item]);
  };

  const handleSelectItem = (item) => {
    const newCart = [...cart];
    // findIndex index or if not present -1 dega
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
        // jaha index hain vaha se 1 element nikalega
        newCart.splice(cartItemIndex, 1);
      }
    }
    setCart(newCart);
  };

  const handleEmptyCart = () => {
    setCart([]);
  };

  const handleToggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div className="app">
      <h1>Medical Stock App</h1>
      <header>
        <button
          className="material-icons cart-icon"
          onClick={handleToggleCartVisibility}
        >
          Shopping_Cart 🛒
        </button>
      </header>
      <Form handleAddItem={handleAddItem} />
      <List list={list} handleSelectItem={handleSelectItem} />
      {isCartVisible && (
        <Cart
          cart={cart}
          handleRemoveItem={handleRemoveItem}
          handleAddItem={handleSelectItem}
          handleEmptyCart={handleEmptyCart}
          calculateTotalPrice={calculateTotalPrice}
        />
      )}
    </div>
  );
};

export default App;
