import { useState, useEffect } from "react";
import { Input, Select } from "../Input/Input";
import List from "../List/List";

const Form = () => {
  const [key, setKey] = useState("");
  const [expense, setExpense] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [list, setList] = useState(() => {
    const foundList = JSON.parse(localStorage.getItem("list"));
    return foundList || [];
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const submitHandler = (event) => {
    event.preventDefault();
    const data = { key, expense, price, category };
    setList([...list, data]);
    setCategory("");
    setExpense("");
    setKey("");
    setPrice(0);
  };

  const deleteHandler = (key) => {
    setList(list.filter((element) => element.key != key));
    localStorage.removeItem(key);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Input
          id="Key"
          type="text"
          value={key}
          onChange={(event) => setKey(event.target.value)}
        />
        <Input
          id="Expense"
          type="text"
          value={expense}
          onChange={(event) => setExpense(event.target.value)}
        />
        <Input
          id="Price"
          type="text"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <Select
          id="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button onSubmit={submitHandler}>Submit</button>
      </form>
      <List list={list} onDelete={deleteHandler} />
    </div>
  );
};
export default Form;
