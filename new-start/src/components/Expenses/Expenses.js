import { useState } from "react";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";

import "./Expenses.css";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  // * filteredExpenses is a new array that includes only the expenses that match the selected year.
  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  // ! map converts one to other basically we are converting array to react
  // const expenseItems = filteredExpenses.map((expense) => {
  //   console.log(expense);
  //   return (
  //     <ExpenseItem
  // * The key prop is a unique identifier for an element in a list, but it is not passed down to the child component.
  //       key={expense.id}
  //       id={expense.id}
  //       title={expense.title}
  //       amount={expense.amount}
  //       date={expense.date}
  //       location={expense.location}
  //       onDelete={props.onDelete}
  //     />
  //   );
  // });
  // const expensesContent =
  //   expenseItems.length === 0 ? <p>No expenses found 😞</p> : expenseItems;

  return (
    <li>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesList items={filteredExpenses} onDelete={props.onDelete} />
      </Card>
    </li>
  );
};

export default Expenses;
