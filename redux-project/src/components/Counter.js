import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  //* “counter/” in the action type “counter/incrementBy5” is derived from the name property you set when creating the slice with createSlice
  const incrementHandler = () => {
    dispatch({ type: "counter/incrementBy5" });
  };

  const decrementHandler = () => {
    dispatch({ type: "counter/decrementBy5" });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increament</button>
        <button onClick={decrementHandler}>Decreament</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
