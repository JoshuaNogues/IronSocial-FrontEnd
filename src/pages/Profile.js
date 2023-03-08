import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/theme.context";
import { Link } from "react-router-dom";
import { LoadingContext } from "../context/loading.context";
import { AuthContext } from "../context/auth.context";
import { get } from "../services/authService";

const Profile = () => {
  const { user } = useContext(LoadingContext);
  const { mode } = useContext(ThemeContext);
  const { authenticateUser } = useContext(AuthContext);

  const handleDelete = (postId) => {
    const userId = user._id;
    get(`/post/delete-post/${postId}/${userId}`)
      .then((res) => {
        console.log("Post deleted:", res.data);
      })
      .catch((err) => console.log(err));
  };

  console.log("this is the user", user);

  //   useEffect(() => {
  //     if (!user) {
  //       authenticateUser();
  //       console.log(user)
  //     }
  //   }, []);

  return (
    <div className={"Profile " + mode}>
      <h1>Profile</h1>
      {user && (
        <div>
          <img className="profile-page-pic" src={user.profile_image} alt="Profile" />
          <h4>Hi, {user.firstName}</h4>
          <p>📍{user.location}</p>
          <p>💻{user.occupation}</p>
          <Link className="Link-button" to={`/edit-profile/${user._id}`}>Edit Profile</Link>
        </div>
      )}

      <h3>My Posts</h3>
      {user?.posts.length ? (
        <>
          {user.posts.map((post) => {
            return (
              <div className="post-container">
                <div className="post-user-info">
                  <div className="profile-pic-div">
                    <img
                      className="profile-pic"
                      src={user.profile_image}
                      alt="Profile"
                    />
                  </div>
                  <div className="post-details">
                    <h4>{user.username}</h4>
                    <p className="occupation">{user.occupation}</p>
                  </div>
                </div>
                    <div className="post-content">
                        <p>{post.post}</p>
                    </div>
                <div className="post-actions">
                  <Link to={`/edit-post/${post._id}`}>Edit</Link>
                  <button
                    className="delete"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
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
