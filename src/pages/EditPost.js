import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get, post } from "../services/authService";

const EditPost = () => {
  const { postId, userId } = useParams();
  const [posts, setPosts] = useState('');

  useEffect(() => {
    get(`/post/${postId}`)
      .then((res) => {
        setPosts(res.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId]);

  const handlePostChange = (e) => {
    setPosts(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/post/edit-post/${postId}/${userId}`, { post: posts })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={posts} onChange={handlePostChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditPost;
