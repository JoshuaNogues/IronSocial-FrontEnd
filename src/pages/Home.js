import { ThemeContext } from "../context/theme.context";
import { useContext, useEffect, useState } from "react";
import { post, get } from "../services/authService";
import { LoadingContext } from "../context/loading.context";
import { Link } from "react-router-dom";

const Home = () => {
  const [postList, setPostList] = useState("");
  const { user, setUser } = useContext(LoadingContext);
  const { mode } = useContext(ThemeContext);
  const [postText, setPostText] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await get("/post");
      setPostList(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = (e) => {
    console.log("Posting:", postText);
    setPostText(e.target.value);
  };
  console.log(user);

  const isUserPost = (post) => {
    return post.contributor._id === user._id;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/post/create-post/${user._id}`, { postText }).then((result) => {
      setUser(result.data)
      fetchPosts();
      console.log(result.data);
    });
  };
  console.log(postList)

  return (
    <div className={"Home " + mode}>
      <h1>Timeline</h1>
      <div className="post">
        <img
          className="profile-pic"
          src="https://via.placeholder.com/50"
          alt="Profile"
        />
        <textarea
          className="post-text"
          placeholder="What's on your mind?"
          name="postText"
          value={postText}
          onChange={handlePost}
        />
        <button className="post-button" onClick={handleSubmit}>
          Post
        </button>
      </div>
      {postList.length ? (
        postList.map((post) => (
          <div key={post._id} className="post-container">
            <img
              className="profile-pic"
              src="https://via.placeholder.com/50"
              alt="Profile"
            />
            <div className="post-details">
              <h4>{post.contributor.username}</h4>
              <div className="post-content">
                <p>{post.post}</p>
                {isUserPost(post) && (
  <Link to={`/edit-post/${post._id}`}>Edit</Link>
)}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>...Loading </p>
      )}
    </div>
  );
};

export default Home;
