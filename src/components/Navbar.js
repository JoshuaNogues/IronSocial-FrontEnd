import { Link } from "react-router-dom";

import { useContext } from "react"; 
import { ThemeContext } from "./../context/theme.context";

import { LoadingContext } from "../context/loading.context"
import { AuthContext } from "../context/auth.context"
 
function Navbar() {

    const { mode, toggle, setToggle, setMode } = useContext(ThemeContext);

    const toggleTheme = async () => {

        setToggle(!toggle)
        setMode(toggle ? "☽" : "☀")    

    }

    const getToken = () => {
      return localStorage.getItem("authToken")
    }

    const { user } = useContext(LoadingContext)

    const { logout } = useContext(AuthContext)

    
  return (
    <nav className={"Navbar " + mode}>


{
  getToken() ? 
  <>
        <Link to={'/home'}>Home</Link>
        {<Link to={`/profile/${user}`}>Profile</Link>}
        <Link to={'/new-post'}>New Post</Link>
        <button onClick={logout}>Logout</button>
    </>

    : 

    <>
    </>
}

      <button className="theme-btn" onClick={toggleTheme}>
        {mode}
      </button>

</nav>
  );
}


 
export default Navbar;