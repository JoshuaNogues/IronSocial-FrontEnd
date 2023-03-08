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
    const requestBody = {profileImage, username, location, occupation}
    setIsLoading(true);
    try {
      const res = await post(`/users/edit-profile/${user._id}`, requestBody);
      console.log(res)
      setUser(res.data);
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  const handleFileUpload = (e) => {

    console.log("Uploading photo...")

      const uploadData = new FormData()
      uploadData.append('profileImage', e.target.files[0])

      console.log("FILE LIST", e.target.files)
    console.log("this is upload data", uploadData)
      if (e.target.files.length){
      post('/users/new-profile-photo', uploadData)
        .then((result) => {
          setProfileImage(result.data.profileImage)
          console.log("This is photo", result.data)
        })
        .catch((err) => {
          console.log("Upload error", err)
        })}
  }

  return (
    <div className={"Profile " + mode}>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profile Image:</label>
          <input type="file" name="profileImage" onChange={(e) => handleFileUpload(e)} />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" name="username" onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" onChange={handleLocationChange} />
        </div>
        <div>
          <label>Occupation:</label>
          <input type="text" name="occupation" onChange={handleOccupationChange} />
        </div>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
