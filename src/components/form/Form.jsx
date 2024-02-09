import "./Form.css";
import PropTypes from "prop-types";
function Form(props) {
  return (
    <form onSubmit={props.handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search By Name"
        value={props.searchText}
        onChange={props.handleSearchChange}
      />
    </form>
  );
}
Form.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
};
export default Form;
