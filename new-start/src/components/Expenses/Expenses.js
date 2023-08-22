import { useState } from "react";
import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";

import "./Expenses.css";

const Expenses = (props) => {
  const [expenses, setExpenses] = useState(props.items);

  const deleteExpenseHandler = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  const expenseItems = expenses.map((expense) => {
    console.log(expense.id);
    return (
      <ExpenseItem
        // * The key prop is a unique identifier for an element in a list, but it is not passed down to the child component.
        key={expense.id}
        id={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
        location={expense.location}
        onDelete={deleteExpenseHandler}
      />
    );
  });

  return <Card className="expenses">{expenseItems}</Card>;
};

export default Expenses;
