const List = ({ list, handleSelectItem }) => {
  return (
    <div className="list-container">
      <h2>List</h2>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            Key: {item.key} - Description: {item.description} - Price:{" "}
            {item.price} - Quantity: 1
            <button onClick={() => handleSelectItem(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
