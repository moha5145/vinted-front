import "./styles/filter-by-price.scss";
const FilterByPrice = ({ sort, setSort }) => {
  return (
    <div className="par-price">
      <span>Trier par prix : </span>

      {sort === "price-desc" ? (
        <i
          className="fa-solid fa-toggle-off switch"
          onClick={() => {
            setSort("price-asc");
          }}
        ></i>
      ) : (
        <i
          className="fa-solid fa-toggle-on switch"
          onClick={() => {
            setSort("price-desc");
          }}
        ></i>
      )}
    </div>
  );
};
export default FilterByPrice;
