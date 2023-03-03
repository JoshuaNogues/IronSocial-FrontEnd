import { useContext } from "react"; // <== ADD
import { ThemeContext } from "./../context/theme.context";

 
function HomePage() {

    const { mode } = useContext(ThemeContext)

  return (
    <div className={"HomePage " + mode}>
      <h1>Welcome to IronSocial!</h1>
    </div>
  );
}
 
export default HomePage;