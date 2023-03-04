import { useState, useContext } from "react";
import axios from "axios";
import { LoadingContext } from "../context/loading.context";
import { ThemeContext } from "../context/theme.context";

const EditProfile = () => {
  const { user, setUser } = useContext(LoadingContext);
  const { mode } = useContext(ThemeContext);
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profile_image", profileImage);
      formData.append("password", password);
      formData.append("location", location);
      formData.append("occupation", occupation);
      formData.append("username", username);
      const res = await axios.patch(`/users/${user._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data);
      setError("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className={"Home " + mode}>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profile Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" onChange={handlePasswordChange} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" onChange={handleLocationChange} />
        </div>
        <div>
          <label>Occupation:</label>
          <input type="text" onChange={handleOccupationChange} />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" onChange={handleUsernameChange} />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
