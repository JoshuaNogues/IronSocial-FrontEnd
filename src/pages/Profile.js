import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/theme.context";
import { Link, useParams } from "react-router-dom";
import { LoadingContext } from "../context/loading.context";
import { AuthContext } from "../context/auth.context";
import { get } from "../services/authService";
import axios from "axios";

const Profile = () => {
  const { user } = useContext(LoadingContext);
  const { mode } = useContext(ThemeContext);
  const { authenticateUser } = useContext(AuthContext);
  const {userId} = useParams()
  const [profile, setProfile] = useState()
  const handleDelete = (postId) => {
    const userId = user._id;
    get(`/post/delete-post/${postId}/${userId}`)
      .then((res) => {
        console.log("Post deleted:", res.data);
      })
      .catch((err) => console.log(err));
  };

  console.log("this is the user", user);

useEffect(() => {
async function fetchProfile(){
  try {
    const response = await get(`/users/profile/${userId}`)
    setProfile(response.data)
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}
fetchProfile()

},[userId])

const isUserProfile = (profileId) => {
  return profileId === user._id;
};

  //   useEffect(() => {
  //     if (!user) {
  //       authenticateUser();
  //       console.log(user)
  //     }
  //   }, []);
console.log(user)
  return (
    <div className={"Profile " + mode}>
      <h1>Profile</h1>
      {profile && (
        <div className="profile-top">
          <img className="profile-page-pic" src={profile.profile_image} alt="Profile" />
          <h4>Hi, {profile.firstName}</h4>
          <p>📍{profile.location}</p>
          <p>💻{profile.occupation}</p>
          {isUserProfile(profile._id)?<Link className="Link-button" to={`/edit-profile/${profile._id}`}>Edit Profile</Link>:""}
        </div>
      )}

      <h3>My Posts</h3>
      {profile?.posts.length ? (
        <>
          {profile.posts.map((post) => {
            return (
              <div className="post-container">
                <div className="post-user-info">
                  <div className="profile-pic-div">
                    <img
                      className="profile-pic"
                      src={profile.profile_image}
                      alt="Profile"
                    />
                  </div>
                  <div className="post-details">
                    <h4>{profile.username}</h4>
                    <p className="occupation">{profile.occupation}</p>
                  </div>
                </div>
                    <div className="post-content">
                        <p>{post.post}</p>
                        {
                    post.photo && (<img src={post.photo} alt="picture"/>)
                  }
                    </div>
                <div className="post-actions">
                  <button className="delete">
                  <Link to={`/edit-post/${post._id}`}>Edit</Link>
                  </button>
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
