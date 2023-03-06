import { useState, useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import { ThemeContext } from "../context/theme.context";
import { post } from "../services/authService";

const EditProfile = () => {
  const { user, setUser } = useContext(LoadingContext);
  const { mode } = useContext(ThemeContext);
  const [profileImage, setProfileImage] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

console.log(username)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {username, location, occupation}
    setIsLoading(true);
    try {
      const res = await post(`/users/edit-profile/${user._doc._id}`, requestBody);
      console.log(res)
    //   setUser(res.data);
      setError("");
      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={"Home " + mode}>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label>Profile Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div> */}
        <div>
          <label>Username:</label>
          <input type="text" name="username" onChange={handleUsernameChange} />
        </div>
        {/* <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handlePasswordChange} />
        </div> */}
        <div>
          <label>Location:</label>
          <input type="text" name="location" onChange={handleLocationChange} />
        </div>
        <div>
          <label>Occupation:</label>
          <input type="text" name="occupation" onChange={handleOccupationChange} />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
