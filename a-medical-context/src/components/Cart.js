const Cart = ({
  cart,
  handleRemoveItem,
  handleAddItem,
  handleEmptyCart,
  calculateTotalPrice,
}) => {
  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <button onClick={handleEmptyCart}>Empty whole Cart🗑️</button>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            Key: {item.key} - Description: {item.description} - Price:{" "}
            {item.price} - Quantity: {item.quantity}
            <button onClick={() => handleRemoveItem(item)}>-1</button>
            <button onClick={() => handleAddItem(item)}>+1</button>
          </li>
        ))}
      </ul>
      <p>Total price: {calculateTotalPrice()}</p>
    </div>
  );
};

export default Cart;
