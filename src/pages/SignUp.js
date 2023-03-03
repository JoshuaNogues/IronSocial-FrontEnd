import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { post } from "../services/authService"
import { AuthContext } from '../context/auth.context'

const SignUp = () => {

    // const { authenticateUser } = useContext(AuthContext)

    const [ newUser, setNewUser ] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: ""
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
                navigate(`/profile/${results.data._id}`)
                localStorage.setItem('authToken', results.data.token )
                
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                // authenticateUser()
            })
    } 

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>

                <label>First Name</label>
                <input type='text' name="name" value={newUser.firstName} onChange={handleChange}></input>

                <label>Last Name</label>
                <input type='text' name="name" value={newUser.lastName} onChange={handleChange}></input>

                <label>Email</label>
                <input type='email' name="email" value={newUser.email} onChange={handleChange}></input>

                <label>Username</label>
                <input type='text' name="name" value={newUser.username} onChange={handleChange}></input>

                <label>Password</label>
                <input type='password' name="password" value={newUser.password} onChange={handleChange}></input>

                <button type="submit">Sign Up</button>

            </form>

        </div>
    )
}

export default SignUp