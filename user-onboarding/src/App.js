import React, { useState } from 'react';
import Form from "./Form";
import Users from "./Users";
import './App.css';


function App() {

  const [users, setUsers] = useState([
    {
    id: 1,
    name: "Kim Boyd",
    }
  ])

const addUser = newUser => {
    setUsers([...users, newUser]);
}


  return (
    <div className="App">
      <Form addUser={addUser} />
      <Users users={users} />
    </div>
  );
}

export default App;
