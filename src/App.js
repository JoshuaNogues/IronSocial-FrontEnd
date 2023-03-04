import "./App.css";
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { LoadingContext } from "./context/loading.context";
import { useContext } from "react"; 
import EditProfile from "./pages/EditProfile";

function App() {

  const { user } = useContext(LoadingContext)

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
      {user && <Navbar />}
      <Routes>
        <Route element={<NotLoggedIn />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<LoggedIn />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/edit-profile/:userId" element={<EditProfile />} />
        </Route>
      </Routes>
    </div>
  );
}
 
export default App;
