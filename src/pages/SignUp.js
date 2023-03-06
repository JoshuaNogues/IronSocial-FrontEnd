import { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { post } from "../services/authService"
import { AuthContext } from '../context/auth.context'
import { ThemeContext } from "../context/theme.context"

const SignUp = () => {

    const { authenticateUser } = useContext(AuthContext)

    const [ newUser, setNewUser ] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            location: "",
            occupation: ""
        }
    )

    const navigate = useNavigate()

    const handleChange = (e) => {
        setNewUser((recent)=>({...recent, [e.target.name]: e.target.value}))
        console.log("Changing user", newUser)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/auth/signup', newUser)
            .then((results) => {
                console.log("Created User", results.data)
                navigate(`/`)
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

    return (
        <div className={"SignUp " + mode}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>

                <label>First Name</label>
                <input type='text' name="firstName" value={newUser.firstName} onChange={handleChange}></input>

                <label>Last Name</label>
                <input type='text' name="lastName" value={newUser.lastName} onChange={handleChange}></input>

                <label>Email</label>
                <input type='email' name="email" value={newUser.email} onChange={handleChange}></input>

                <label>Username</label>
                <input type='text' name="username" value={newUser.username} onChange={handleChange}></input>

                <label>Password</label>
                <input type='password' name="password" value={newUser.password} onChange={handleChange}></input>

                <label>Location</label>
                <input type='text' name="location" value={newUser.location} onChange={handleChange}></input>

                <label>Occupation</label>
                <input type='text' name="occupation" value={newUser.occupation} onChange={handleChange}></input>

                <button type="submit">Sign Up</button>

            </form>

            <p>Already registered? <Link to="/">Log In Here.</Link></p>

        </div>
    )
}

export default SignUp