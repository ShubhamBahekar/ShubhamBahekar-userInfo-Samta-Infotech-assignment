import { useEffect, useState } from "react";
import "./App.jsx";
import userData from "./ApiData.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userList = await userData.getApiData();
      setUsers(userList);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="searchBox">
        <h1>Hello</h1>
        <input
          type="text"
          placeholder="Search By Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="users">
        <div className="userList"></div>
      </div>
    </div>
  );
}

export default App;
