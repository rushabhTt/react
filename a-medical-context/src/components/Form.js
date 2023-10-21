const Form = ({ handleAddItem }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const item = {
          key: event.target.key.value,
          description: event.target.description.value,
          price: event.target.price.value,
        };
        handleAddItem(item);
        event.target.reset();
      }}
    >
      <input type="text" name="key" placeholder="Key..." required />
      <input
        type="text"
        name="description"
        placeholder="Description..."
        required
      />
      <input type="number" name="price" placeholder="Price..." required />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
