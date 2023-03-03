import "./App.css";
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
 
function App() {

  const getToken = () => {
    return localStorage.getItem("authToken")
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div className="App">
      {getToken() && <Navbar />}
      <Routes>
        <Route element={<NotLoggedIn />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<LoggedIn />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}
 
export default App;
