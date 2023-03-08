import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./../context/theme.context";
import { LoadingContext } from "../context/loading.context";
import { AuthContext } from "../context/auth.context";
import logo from "../images/logo.png"; // import your image file

function Navbar() {
  const { mode, toggle, setToggle, setMode } = useContext(ThemeContext);
  const { user } = useContext(LoadingContext);
  const { logout } = useContext(AuthContext);

  const toggleTheme = async () => {
    setToggle(!toggle)
    setMode(toggle ? "☽" : "☀")    
  }

  const getToken = () => {
    return localStorage.getItem("authToken")
  }

  return (
    <nav className={"Navbar " + mode}>
      <div className="Navbar-left">
        <Link to={'/home'}><img src={logo} alt="Home" /></Link>
      </div>
      <div className="Navbar-right">
        {getToken() ? 
          <>
            {user && <Link to={`/profile/${user._id}`}>Profile</Link>}
            <button onClick={logout}>Logout</button>
          </>
          : 
          <>
          </>
        }
        <button className="theme-btn" onClick={toggleTheme}>
          {mode}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
