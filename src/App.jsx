import { useEffect, useState } from "react";
import "./App.css";
import userData from "./ApiData.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userList = await userData.getApiData();
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
