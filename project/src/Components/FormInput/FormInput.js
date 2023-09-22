const FormInput = ({ type, value, id, onChange }) => {
  return (
    <div>
      <label>
        {id}
        <input type={type} value={value} id={id} onChange={onChange} required />
      </label>
    </div>
  );
};
export default FormInput;
