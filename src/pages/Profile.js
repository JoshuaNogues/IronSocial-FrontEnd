import { LoadingContext } from "../context/loading.context"
import { useContext } from "react"

const Profile = () => {

    const {user} = useContext(LoadingContext)

    return (
        <div>
            <h1>Profile</h1>
            {user && <p>Hi, {user._doc.firstName}</p>}


        </div>
    )
}

export default Profile