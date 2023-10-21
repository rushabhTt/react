import React, { useState, useEffect, useContext } from "react";
import List from "./components/List";
import Cart from "./components/Cart";
import Form from "./components/Form";
import { CartContext } from "./context/CartContext";

const App = () => {
  const [list, setList] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const { handleSelectItem } = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    const storedList = localStorage.getItem("list");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  const handleAddItemToList = (item) => {
    setList([...list, item]);
  };

  const handleToggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
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
      <Form handleAddItem={handleAddItemToList} />
      <List list={list} handleSelectItem={handleSelectItem} />
      {isCartVisible && <Cart />}
    </div>
  );
};

export default App;
