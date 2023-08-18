import ExpenseDate from "./ExpenseDate";
import ExpenseDetails from "./ExpenseDetails";
import Card from "../UI/Card";

import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  const clickHandler = () => {
    console.log("clicked 😎");
  };

  const deleteHandler = () => {
    document.querySelector(".expense-item").remove();
  };

  return (
    <Card className="expense-item">
      {/* In react: when component doesn’t have any children or text content, 
      it can be written using a self-closing tag. */}
      <ExpenseDate date={props.date} />
      <ExpenseDetails
        title={props.title}
        location={props.location}
        amount={props.amount}
      />
      {/* you just points to the function don't put () nahi toh pahle hi run ho jaayega*/}
      <button onClick={clickHandler}>Click 🤑</button>
      <button onClick={deleteHandler}>Delete 🗑️</button>
    </Card>
  );
};

export default ExpenseItem;
