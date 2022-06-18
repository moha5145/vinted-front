const Input = ({ type, placeholder, value, setState }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        const targetValue = event.target.value;
        setState(targetValue);
      }}
    />
  );
};

export default Input;
