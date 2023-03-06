import { LoadingContext } from "../context/loading.context";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/theme.context";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Profile = () => {
  const { user, setUser } = useContext(LoadingContext);
  const { mode } = useContext(ThemeContext);
  const { userId } = useParams();
  const { authenticateUser } = useContext(AuthContext);

  console.log("this is the user", user);

  useEffect(() => {
    if (!user) {
      authenticateUser();
    }
  }, []);

  return (
    <div className={"Home " + mode}>
      <h1>Profile</h1>
      {user && (
        <div>
          <img src={user.profile_image} alt="Profile" />
          <p>Hi, {user.firstName}</p>
          <p>{user.location}</p>
          <p>{user.occupation}</p>
          <Link to={`/edit-profile/${user._id}`}>Edit Profile</Link>
        </div>
      )}

      <h3>My Posts</h3>
      {user.posts.length ? (
        <>
          {user.posts.map((post) => {
            return (
              <div className="post-container">
                <p>{post.post}</p>
              </div>
            );
          })}
        </>
      ) : (
        <h5>No posts yet... </h5>
      )}
    </div>
  );
};

export default Profile;
