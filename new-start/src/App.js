import { useState } from "react";

import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
    location: "New York",
  },
  {
    id: "e2",
    title: "New TV",
    amount: 799.49,
    date: new Date(2021, 2, 12),
    location: "Los Angeles",
  },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
    location: "Chicago",
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
    location: "Houston",
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    // ! if updating based on previous snapshot then
    // ! not correct way: setExpenses([expense, ...expenses]);
    const newExpense = {
      ...expense,
      location: expense.location || "NZ",
    };
    setExpenses((prevExpenses) => {
      return [newExpense, ...prevExpenses];
    });
    // console.log(expense);
    // setExpenses((prevExpenses) => {
    //   return [expense, ...prevExpenses];
    // });
    // console.log("bye");
  };

  const deleteExpenseHandler = (expenseId) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== expenseId);
    });
  };

  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2', {}, "Let's get started!"),
  //   React.createElement(Expenses, { items: expenses })
  // );

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} onDelete={deleteExpenseHandler} />
    </div>
  );
};

export default App;
