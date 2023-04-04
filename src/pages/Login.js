import { ThemeContext } from '../context/theme.context';
import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { post } from "../services/authService"
import { Link } from 'react-router-dom';
import textLogo from "../images/text.png"

function HomePage() {

  const { user } = useContext(AuthContext);

  const { authenticateUser } = useContext(AuthContext)

  const [ thisUser, setThisUser ] = useState(
      {
          email: "",
          password: ""
      }
  )

  const navigate = useNavigate()

  const handleChange = (e) => {
      setThisUser((recent)=>({...recent, [e.target.name]: e.target.value}))
      console.log("Changing user", thisUser)
  }

  const handleSubmit = (e) => {
      e.preventDefault()

      post('/auth/login', thisUser)
          .then((results) => {
              console.log("Created User", results.data)
              navigate('/home')
              localStorage.setItem('authToken', results.data.token )
              
          })
          .catch((err) => {
              console.log(err)
          })
          .finally(() => {
              authenticateUser()
          })
  } 

  const { mode } = useContext(ThemeContext)

  function loginRecruiter() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "recruiter@test.com", password: "123" })
    };
  
    post('/auth/login', { email: "recruiter@test.com", password: "123" })
      .then((results) => {
        console.log("Logged in as recruiter", results.data);
        localStorage.setItem('authToken', results.data.token );
        navigate('/home')
        window.location.reload(); // reload the page after successful login
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);
  
  
  return (
    <div className={"Login " + mode}>
      <img className="textLogo" src={textLogo} alt="Logo" />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={thisUser.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={thisUser.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      {/* <button onClick={loginRecruiter}><b>Recruiters</b> <u>click here for instant access</u></button> */}
    </div>
  );
}

export default HomePage;