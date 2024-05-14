import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import ToDoList from './components/todolist/ToDoList';
import Lists from './pages/Lists';
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserService from "./services/UserService";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className='toolbar'>
        <div className='nav-bar-item' onClick={() => navigate("/lists")}>
          <h1>ITvitae ToDoList</h1>
        </div>
        {getAuthToolbarElement()}
      </div>
      {getRoutes()}
    </>
  )

  function getAuthToolbarElement() {
    return UserService.isLoggedIn()
      ?
      <div className='nav-bar-item' onClick={onLogout}>
        <h1>Logout</h1>
      </div>
      : <>
        <div className='nav-bar-item' onClick={() => navigate("/login")}>
          <h1>Login</h1>
        </div>
        <div className='nav-bar-item' onClick={() => navigate("/register")}>
          <h1>Register</h1>
        </div>
      </>;
  }

  function getRoutes() {
    return <Routes>
      {
        UserService.isLoggedIn()
          ? <>
            <Route path="/" element={<Navigate to="/lists" />} />
            <Route path="/lists" element={<div className="todo-container"><Lists /></div>} />
            <Route path="/lists/:id" element={<div className='todo-container'><ToDoList /></div>} />
          </>
          : <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
      }
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  }

  function onLogout() {
    UserService.logout();
    navigate('/login');
  }
}

export default App;
