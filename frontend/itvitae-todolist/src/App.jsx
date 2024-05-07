import './App.css';

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className='toolbar'>
        <div className='nav-bar-item' onClick={() => navigate("/lists")}>
          <h1>ITvitae ToDoList</h1>
        </div>
        <div className='nav-bar-item' onClick={() => navigate("/login")}>
          <h1>Login</h1>
        </div>
        <div className='nav-bar-item' onClick={() => navigate("/register")}>
          <h1>Register</h1>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/lists" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lists" element={<p>Lists</p>} />
        <Route path="/lists/:id" element={<p>List</p>} />
      </Routes>
    </>
  )
}

export default App
