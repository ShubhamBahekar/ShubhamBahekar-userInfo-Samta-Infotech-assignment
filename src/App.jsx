import { useEffect, useState } from "react";
import "./App.css";
import userData from "./ApiData.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTextHistory, setSearchTextHistory] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userList = await userData.getApiData();
        setUsers(userList);
        setFilteredUsers(userList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    filterUsers(e.target.value); // Filter users as user types
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    const text = searchText;
    storedHistory(text); // Store search text in history
  };

  const storedHistory = (text) => {
    setSearchTextHistory((prevHistory) => {
      if (prevHistory.length >= 4) {
        prevHistory.pop();
      }
      // Add the new search text to the beginning of the history
      return [text, ...prevHistory];
    });
  };

  const filterUsers = (searchText) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleHistoryItemClick = (item) => {
    setSearchText(item);
    filterUsers(item); // Filter users when history item is clicked
  };

  return (
    <div className="container">
      <div className="searchBox">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search By Name"
            value={searchText}
            onChange={handleSearchChange}
          />
        </form>
        {searchTextHistory.length > 0 && (
          <div className="search-history">
            <ul className="search-list">
              {searchTextHistory.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleHistoryItemClick(item)}
                  id="list"
                >
                  <h5>{item}</h5>
                </li>
              ))}
            </ul>
          </div>
        )}
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
