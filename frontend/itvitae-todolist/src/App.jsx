import './App.css'
import ToDoList from './components/todolist/ToDoList';
import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";

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
        <Route path="/login" element={<p>Login</p>} />
        <Route path="/register" element={<p>Register</p>} />
        <Route path="/lists" element={<p>Lists</p>} />
        <Route path="/lists/:id" element={<div className='todo-container'><ToDoList /></div>} />
      </Routes>
    </>
  )
}
