import "./styles/pagination.scss";
const Pagination = ({ setSwitchPage, switchPage, limit, data }) => {
  return (
    <div className="switch-page">
      {switchPage > 1 && (
        <button
          onClick={() => {
            setSwitchPage(switchPage - 1);
          }}
        >
          <i className="fa-solid fa-arrow-left "></i>
        </button>
      )}
      <span>
        {switchPage} / {Math.ceil(data.count / limit)}
      </span>
      {data.count / limit > switchPage && (
        <button
          onClick={() => {
            console.log(data.count);
            setSwitchPage(switchPage + 1);
          }}
        >
          <i className="fa-solid fa-arrow-right "></i>
        </button>
      )}
    </div>
  );
};
export default Pagination;
