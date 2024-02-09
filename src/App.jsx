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
        setFilteredUsers(userList); // Initialize filteredUsers with all users
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Retrieve search history from localStorage on component mount
    const localStorageData = localStorage.getItem("userSearchText");
    console.log("localStorageData:", localStorageData);
    if (localStorageData) {
      console.log("Parsing localStorageData...");
      try {
        const parsedData = JSON.parse(localStorageData);
        console.log("Parsed data:", parsedData);
        setSearchTextHistory(parsedData);
      } catch (error) {
        console.error("Error parsing localStorageData:", error);
      }
    }
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
      // Maintain a maximum of 5 items in search history
      const updatedHistory = [text, ...prevHistory.slice(0, 4)];
      console.log("Updated history:", updatedHistory);
      localStorage.setItem("userSearchText", JSON.stringify(updatedHistory));
      console.log("Stored in local storage:", JSON.stringify(updatedHistory));
      return updatedHistory;
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

  const sortDataByName = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    setFilteredUsers(sortedUsers);
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
        <button onClick={sortDataByName}>Search by Name</button>
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
