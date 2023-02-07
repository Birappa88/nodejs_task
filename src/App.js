import './App.css';
import Login from "./components/LoginUser/Login"
import Register from "./components/CreateUser/AddUser"
import AddOrder from "./components/OrderPage/AddOrder"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({})
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/order" element={<AddOrder setUser={setUser} user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
