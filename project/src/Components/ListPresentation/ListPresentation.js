const ListPresentation = ({ new: list }) => {
  const total = list.reduce((total, element) => total + element.price, 0);
  return (
    <div>
      <ul>
        {list.map((element) => {
          const key = new Date().getTime().toString();
          return (
            <li key={key}>
              Expense: {element.expense} Price:{element.price}
            </li>
          );
        })}
      </ul>
      <p>Total: {total}</p>
    </div>
  );
};

export default ListPresentation;
