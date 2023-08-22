import React, { useState } from "react";

import ExpenseDate from "./ExpenseDate";
import ExpenseDetails from "./ExpenseDetails";
import Card from "../UI/Card";

import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  console.log(props.id);
  // * use useState inside the function
  const [amount, setAmount] = useState(props.amount);

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  const expenseTo100Handler = () => {
    setAmount(100);
  };

  return (
    <Card className="expense-item">
      {/* In react: when component doesn’t have any children or text content, it can be written using a self-closing tag. */}
      <ExpenseDate date={props.date} />
      <ExpenseDetails
        title={props.title}
        location={props.location}
        // * amount state variable: since it will change its value
        amount={amount}
      />
      {/* you just points to the function don't put () nahi toh pahle hi run ho jaayega*/}
      <button onClick={deleteHandler}>Delete 🗑️</button>
      <button onClick={expenseTo100Handler}>expense: 💯</button>
    </Card>
  );
};

export default ExpenseItem;
