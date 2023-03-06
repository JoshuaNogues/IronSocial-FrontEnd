import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get, post } from "../services/authService";

const EditPost = () => {
  const { postId } = useParams();
  const [posts, setPosts] = useState(null);


  const handlePostChange = (e) => {
    setPosts((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/post/edit-post/${postId}`, posts)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    get(`/post/edit-post/${postId}`)
      .then((res) => {
        console.log("this is the post", res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId]);

  return (
    <div>
      {posts ? (
        <div className="edit-post">
              <h3>{posts.contributor.username}</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              value={posts.post}
              name="post"
              onChange={handlePostChange}
              />
            <button type="submit">Save</button>
          </form>
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};

export default EditPost;