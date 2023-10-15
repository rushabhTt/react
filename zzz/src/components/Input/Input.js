const Input = ({ id, type, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>{id}</label>
      <input id={id} type={type} value={value} onChange={onChange} required />
    </div>
  );
};
const Select = ({ id, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>{id}</label>
      <select id={id} value={value} onChange={onChange} required>
        <option value="">Choose Category</option>
        <option value="Men">Men</option>
        <option value="WoMen">WoMen</option>
        <option value="Children">Children</option>
      </select>
    </div>
  );
};

export { Input, Select };
