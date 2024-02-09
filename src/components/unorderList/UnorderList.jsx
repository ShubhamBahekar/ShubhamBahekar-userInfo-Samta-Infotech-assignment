import "./UnorderList.css";
import PropTypes from "prop-types";
function UnorderList(props) {
  return (
    <ul className="search-list">
      {props.searchTextHistory.map((item, index) => (
        <li
          key={index}
          onClick={() => props.handleHistoryItemClick(item)}
          id="list"
        >
          <h5>{item}</h5>
        </li>
      ))}
    </ul>
  );
}

UnorderList.propTypes = {
  handleHistoryItemClick: PropTypes.func.isRequired,
  searchTextHistory: PropTypes.array.isRequired,
};
export default UnorderList;
