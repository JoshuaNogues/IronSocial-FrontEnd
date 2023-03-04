import { LoadingContext } from "../context/loading.context"
import { useContext } from "react"
import { ThemeContext } from "../context/theme.context"
import { Link } from "react-router-dom"

const Profile = () => {

    const {user} = useContext(LoadingContext)
    const { mode } = useContext(ThemeContext)

    return (
        <div className={"Home " + mode}>
            <h1>Profile</h1>
            {user && 
              <div>
                <img src={user._doc.profile_image} alt="Profile" />
                <p>Hi, {user._doc.firstName}</p>
                <Link to="/edit-profile/userId">Edit Profile</Link>
              </div>
            }
        </div>
    )
}

export default Profile
