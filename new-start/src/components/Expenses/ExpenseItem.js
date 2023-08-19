import React, { useState } from "react";

import ExpenseDate from "./ExpenseDate";
import ExpenseDetails from "./ExpenseDetails";
import Card from "../UI/Card";

import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  // ! use useState inside the function
  // console.log({props});
  const [amount, setAmount] = useState(props.amount);
  console.log({ amount, setAmount });

  const clickHandler = () => {
    console.log("clicked 😎");
  };

  const deleteHandler = () => {
    document.querySelector(".expense-item").remove();
  };

  const expenseTo100Handler = () => {
    console.log("😉");
    console.log(amount);
    setAmount(100);
  };

  return (
    <Card className="expense-item">
      {/* In react: when component doesn’t have any children or text content, 
      it can be written using a self-closing tag. */}
      <ExpenseDate date={props.date} />
      <ExpenseDetails
        title={props.title}
        location={props.location}
        amount={amount}
      />
      {/* you just points to the function don't put () nahi toh pahle hi run ho jaayega*/}
      <button onClick={clickHandler}>Click</button>
      <button onClick={deleteHandler}>Delete 🗑️</button>
      <button onClick={expenseTo100Handler}>expense: 💯</button>
    </Card>
  );
};

export default ExpenseItem;
