import { useState } from "react";
import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";

import "./Expenses.css";

const Expenses = (props) => {
  // const [expenses, setExpenses] = useState(props.items);
  const [filteredYear, setFilteredYear] = useState("2020");

  // const deleteExpenseHandler = (id) => {
  //   setExpenses((prevExpenses) =>
  //     prevExpenses.filter((expense) => expense.id !== id)
  //   );
  // };

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  // ! map converts one to other basically we are converting array to react
  const expenseItems = props.items.map((expense) => {
    console.log(expense);
    return (
      <ExpenseItem
        // * The key prop is a unique identifier for an element in a list, but it is not passed down to the child component.
        key={expense.id}
        id={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
        location={expense.location}
        onDelete={props.onDelete}
      />
    );
  });

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      {expenseItems}
    </Card>
  );
};

export default Expenses;
