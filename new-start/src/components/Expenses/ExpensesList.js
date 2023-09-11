import ExpenseItem from "./ExpenseItem";

import "./ExpensesList.css";

const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">No expenses found. 😞</h2>;
  }

  return (
    // ! map converts one to other basically we are converting array to react
    <ul className="expenses-list">
      {props.items.map((expense) => (
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
      ))}
    </ul>
  );
};

export default ExpensesList;
