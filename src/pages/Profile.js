import { LoadingContext } from "../context/loading.context"
import { useContext } from "react"
import { ThemeContext } from "../context/theme.context"
import { Link } from "react-router-dom"

const Profile = () => {

    const {user} = useContext(LoadingContext)
    const { mode } = useContext(ThemeContext)

    console.log(user)

    return (
        <div className={"Home " + mode}>
            <h1>Profile</h1>
            {user && 
              <div>
                <img src={user._doc.profile_image} alt="Profile" />
                <p>Hi, {user._doc.firstName}</p>
                <p>{user._doc.location}</p>
                <p>{user._doc.occupation}</p>
                <Link to={`/edit-profile/${user._doc._id}`}>Edit Profile</Link>
              </div>
            }

            <h3>My Posts</h3>
            <p>No posts yet</p>
        </div>
    )
}

export default Profile
