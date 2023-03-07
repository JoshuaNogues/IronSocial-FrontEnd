import { ThemeContext } from "../context/theme.context";
import { useContext, useEffect, useState } from "react";
import { post, get } from "../services/authService";
import { LoadingContext } from "../context/loading.context";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Home = () => {
  const [postList, setPostList] = useState("");
  const { user, setUser } = useContext(LoadingContext);
  const { mode } = useContext(ThemeContext);
  const [postText, setPostText] = useState("");
  const { authenticateUser } = useContext(AuthContext);
  const [ commentToggle, setCommentToggle ] = useState(false)

  const fetchPosts = async () => {
    try {
      const response = await get("/post");
      setPostList(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const commentOnClick = (post) => {
  
  };

  const handlePost = (e) => {
    console.log("Posting:", postText);
    setPostText(e.target.value);
  };
  console.log(user);
  
  const isUserPost = (post) => {
    return post.contributor._id === user._id;
  };
  
  const handleDelete = (postId) => {
    const userId = user._id;
    get(`/post/delete-post/${postId}/${userId}`)
    .then((res) => {
      console.log("Post deleted:", res.data);
      fetchPosts();
    })
    .catch((err) => console.log(err));
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
  
  useEffect(() => {
    fetchPosts();
    if (!user) {
      authenticateUser();
      console.log(user)
    }
  }, []);

  return (
    <div className={"Home " + mode}>
      <div className="profile-container">
        {user && (
          <div className="profile-preview">
            <img className="profile-pic" src={user.profile_image} alt="Profile" />
            <div className="profile-details">
              <h3>{user.username}</h3>
              <p className="occupation">{user.location}</p>
              <p className="occupation">{user.occupation}</p>
            </div>
          </div>
        )}
      </div>
      <div className="timeline-container">
        <h1>Timeline</h1>
        <div className="post">
          <img className="profile-pic" src={user && user.profile_image} alt="Profile" />
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
              <img className="profile-pic" src={post.contributor.profile_image} alt="Profile" />
              <div className="post-details">
                <h4>{post.contributor.username}</h4>
                <p className="occupation">{post.contributor.occupation}</p>
                <div className="post-content">
                  <p>{post.post}</p>
                  {isUserPost(post) ? (
                    <div>
                      <Link to={`/edit-post/${post._id}`}>Edit</Link>
                      <button className="delete" onClick={commentOnClick}>
                        Comment
                      </button>
                      <button className="delete" onClick={() => handleDelete(post._id)}>
                        Delete
                      </button>
                    </div>
                  ):
                  <div>
                      <button className="delete" onClick={() => commentOnClick(post._id)}>
                        Comment
                      </button>
                    </div>}
                    {commentToggle && <textarea></textarea>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>...Loading </p>
        )}
      </div>
      <div>
        <h3>Friends List</h3>
      </div>
    </div>
  );
};

export default Home;
