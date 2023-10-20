import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Cart from "./components/Cart";
import Form from "./components/Form";

const App = () => {
  const [list, setList] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  // Store the list and cart in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [list, cart]);

  // Load the list and cart from localStorage when the component mounts
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
    const newCart = [...cart]; // create a new copy of cart
    const cartItemIndex = newCart.findIndex(
      (cartItem) => cartItem.key === item.key
    ); // find index of item
    if (cartItemIndex !== -1) {
      newCart[cartItemIndex].quantity += 1; // ensure key is a number before adding
    } else {
      newCart.push({ ...item, quantity: 1 }); // ensure key is a number before setting as quantity
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
          shopping_cart 🛒
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
      <div className="overlay" onClick={handleToggleCartVisibility}></div>
    </div>
  );
};

export default App;
