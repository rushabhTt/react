import { useState } from "react";

import FormInput from "../FormInput/FormInput";
import ListPresentation from "../ListPresentation/ListPresentation";

const Form = () => {
  const [expense, setExpense] = useState("");
  const [price, setPrice] = useState(0);
  const [list, setList] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();
    setList([...list, { expense, price: Number(price) }]);
    setExpense("");
    setPrice(0);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <FormInput
          type="text"
          value={expense}
          id="Expense"
          onChange={(event) => setExpense(event.target.value)}
        />
        <FormInput
          type="number"
          value={price}
          id="Price"
          onChange={(event) => setPrice(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ListPresentation new={list} />
    </div>
  );
};

export default Form;
