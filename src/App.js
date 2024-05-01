import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // KODUNUZ BURAYA GELECEK

  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=10");
      setUsers(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (searchValue) => {
    setSearchInput(searchValue);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
    return fullName.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div>
      <div className="flex flex-col items-center gap-4 m-8">
        <h1>User Search</h1>
        <input
          className="border-solid border-2 border-gray-500 rounded"
          icon="search"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <ul className="flex flex-col items-center gap-4 m-8">
        {filteredUsers.length > 0 &&
          filteredUsers.map((user) => (
            <li key={user.login.uuid}>
              {user.name.title} {user.name.first} {user.name.last}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
