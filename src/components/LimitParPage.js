import "./styles/Limit-par-page.scss";
const LimitParpage = ({ setLimit }) => {
  const options = [
    { label: "05", value: 5 },
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "20", value: 20 },
    { label: "25", value: 25 },
    { label: "30", value: 30 },
  ];
  return (
    <div className="select-limit-container">
      <select
        name="limit page"
        id="limit-page"
        onChange={(event) => {
          setLimit(event.target.value);
        }}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default LimitParpage;
