import { useEffect, useState } from "react";
import "./App.css";
import userData from "./ApiData.jsx";
import UserCard from "./components/card/Card.jsx";
import UserForm from "./components/form/Form.jsx";
import UnorderList from "./components/unorderList/UnorderList.jsx";

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
    filterUsers(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const text = searchText;
    storedHistory(text);
  };

  const storedHistory = (text) => {
    setSearchTextHistory((prevHistory) => {
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
    filterUsers(item);
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
        <UserForm
          handleSearchSubmit={handleSearchSubmit}
          handleSearchChange={handleSearchChange}
          searchText={searchText}
        />
        {searchTextHistory.length > 0 && (
          <div className="search-history">
            <UnorderList
              searchTextHistory={searchTextHistory}
              handleHistoryItemClick={handleHistoryItemClick}
            />
          </div>
        )}
        <button onClick={sortDataByName}>Search by Name</button>
      </div>
      <UserCard filteredUsers={filteredUsers} />
    </div>
  );
}

export default App;
