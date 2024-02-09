import { useEffect, useState } from "react";
import "./App.css";
import userData from "./ApiData.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userList = await userData.getApiData();
        setUsers(userList);
        setFilteredUsers(userList); // Initialize filteredUsers with all users
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    filterUsers(e.target.value);
  };

  const filterUsers = (searchText) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="container">
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search By Name"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="users">
        {filteredUsers.map((user, id) => (
          <div className="userList" key={id}>
            <h5>Name: {user.name}</h5>
            <h5>Username: {user.username}</h5>
            <h5>Email: {user.email}</h5>
            <h5>City: {user.address.city}</h5>
            <h5>CompanyName: {user.company.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
