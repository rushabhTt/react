import { useSelector, useDispatch } from "react-redux";

import classes from "./Counter.module.css";
import { increase, decrease, toggle } from "../store/index";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const showCounter = useSelector((state) => state.showCounter);

  //* “counter/” in the action type “counter/incrementBy5” is derived from the name property you set when creating the slice with createSlice
  const incrementHandler = () => {
    dispatch({ type: "counter/incremented" });
  };

  const decrementHandler = () => {
    dispatch({ type: "counter/decremented" });
  };

  const increaseHandler = () => {
    // * dispatch k payload reducer me access kr sakte
    dispatch(increase(5));
  };

  const decreaseHandler = () => {
    dispatch(decrease(5));
  };

  const toggleCounterHandler = () => {
    dispatch(toggle());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increament</button>
        <button onClick={decrementHandler}>Decreament</button>
        <button onClick={increaseHandler}>Increament by 5</button>
        <button onClick={decreaseHandler}>Decreament by 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
