import React, { useState, useEffect } from "react";
import Toggle from "./components/toggle/Toggle";
import Users from "./components/users/Users";

export default function App() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        "https://randomuser.me/api/?seed=rush&nat=br&results=10"
      );
      const json = await res.json();
      setUsers(json.results);
    };
    fetchUsers();
  }, []);

  const handleShowUsers = (isChecked) => {
    setShowUsers(isChecked);
  };

  return (
    <div>
      <h3>React Life Cycle</h3>
      <Toggle
        description="Mostrar usuários"
        enabled={showUsers}
        onToggle={handleShowUsers}
      />

      <hr />
      {/* se isso for true, mostre entao a div, senao... */}
      {/* {showUsers ? <div>Users</div> : <div>Nao posso mostrar nada</div>} */}
      {showUsers && <Users users={users} />}
    </div>
  );
}
