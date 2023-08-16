import "./Card.css";

const Card = (props) => {
  const classes = "card " + props.className;

  return <div className={classes}>{props.children}</div>;
};

export default Card;

// React.createElement;

// return (
//   <div className="expense-item">
//     <ExpenseDate date={props.date} />

//     <div>
//       <h1>Expense 1</h1>
//       <h1>Expense 1</h1>
//     </div>
//   </div>
// );

// return (
//   <div>
//     <ExpenseDate date={props.date} />
//     <h1>Expense 1</h1>
//     <h1>Expense 1</h1>
//   </div>
// );
