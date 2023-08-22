import "./Card.css";

const Card = (props) => {
  const classes = "card " + props.className;

  return <div className={classes}>{props.children}</div>;
};

// * Card component: Reusable & consistent UI with easy maintenance.
export default Card;
