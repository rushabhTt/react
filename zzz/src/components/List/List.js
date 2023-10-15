const List = ({ list, onDelete }) => {
  const menList = list.filter((element) => element.category === "Men");
  const womenList = list.filter((element) => element.category === "WoMen");
  const childrenList = list.filter(
    (element) => element.category === "Children"
  );

  const renderList = (newList) => {
    return (
      <div>
        {newList.map((element) => (
          <ul>
            <li key={element.key}>
              {`Key: ${element.key}, Expense: ${element.expense}, Price: ${element.price}, Category: ${element.category} `}
              <button onClick={() => onDelete(element.key)}>Delete ❌</button>
            </li>
          </ul>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>Men</h2>
      {renderList(menList)}
      <h2>Women</h2>
      {renderList(womenList)}
      <h2>Children</h2>
      {renderList(childrenList)}
    </div>
  );
};
export default List;
