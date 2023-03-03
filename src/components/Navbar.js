import { NavLink } from "react-router-dom";

import { useContext } from "react"; 
import { ThemeContext } from "./../context/theme.context";
 
function Navbar() {

    const { mode, toggle, setToggle, setMode } = useContext(ThemeContext);

    const toggleTheme = async () => {

        setToggle(!toggle)
        setMode(toggle ? "dark" : "light")    

    }

    
  return (
    <nav className={"Navbar " + mode}> 
      <div>
        <NavLink to="/"> Home </NavLink>
        <NavLink to="/signup"> Sign Up </NavLink>
        <NavLink to="/login"> Log In </NavLink>
      </div>
      <button className="theme-btn" onClick={toggleTheme}>
        {mode}
      </button>
    </nav>
  );
}
 
export default Navbar;