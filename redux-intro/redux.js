const redux = require("redux");

// Counter state ko manage karne ke liye ek reducer function define karna
const counterReducer = (state = { counter: 0 }, action) => {
  //* when use like this the counter is no longer incremented at intialization
  switch (action.type) {
    case "increment":
      return { counter: state.counter + 1 };
    case "decrement":
      return { counter: state.counter - 1 };
    default:
      return state;
  }
};

// Redux store create karna aur usme reducer function ko pass karna
const store = redux.createStore(counterReducer);

// Latest state ko change hone par log karne ke liye ek subscriber function define karna
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

// Redux store ko subscriber function se subscribe karna
store.subscribe(counterSubscriber);

// Action dispatch karke state change trigger karna .dispatch counterReducer ko fir se run karayega
for (let i = 0; i < 5; i++) {
  store.dispatch({
    type: "increment",
  });
}

store.dispatch({ type: "decrement" });