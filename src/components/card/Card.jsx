import "./Card.css";
import PropTypes from "prop-types";
function Card(props) {
  return (
    <div className="users">
      {props.filteredUsers.map((user, id) => (
        <div className="userList" key={id}>
          <h5>Name: {user.name}</h5>
          <h5>Username: {user.username}</h5>
          <h5>Email: {user.email}</h5>
          <h5>City: {user.address.city}</h5>
          <h5>CompanyName: {user.company.name}</h5>
        </div>
      ))}
    </div>
  );
}
Card.propTypes = {
  filteredUsers: PropTypes.array.isRequired,
};
export default Card;
