import React, { useState } from 'react';
import Form from "./Form";
import Users from "./Users";
import './App.css';


function App() {

  const [users, setUsers] = useState([
    {
    id: 1,
    name: "Kim Boyd",
    email: "kimberlyboyd2@gmail.com"
    }
  ]);

const addUser = newUser => {
    setUsers([...users, newUser]);
}


  return (
    <div className="App">
      <Form addUser={addUser} />
      <h1>Team Members</h1>
      <Users users={users} />
    </div>
  );
}

export default App;
