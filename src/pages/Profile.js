import { LoadingContext } from "../context/loading.context"
import { useContext } from "react"
import { ThemeContext } from "../context/theme.context"

const Profile = () => {

    const {user} = useContext(LoadingContext)
    const { mode } = useContext(ThemeContext)

    return (
        <div className={"Home " + mode}>
            <h1>Profile</h1>
            {user && <p>Hi, {user._doc.firstName}</p>}


        </div>
    )
}

export default Profile