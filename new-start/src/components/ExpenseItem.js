import ExpenseDate from "./ExpenseDate";
import ExpenseDetails from "./ExpenseDetails";

import "./ExpenseItem.css";

function ExpenseItem(props) {
  return (
    <div className="expense-item">
      {/* In react: when component doesn’t have any children or text content, 
      it can be written using a self-closing tag. */}
      <ExpenseDate date={props.date} />
      <ExpenseDetails
        title={props.title}
        location={props.location}
        amount={props.amount}
      />
    </div>
  );
}

export default ExpenseItem;
