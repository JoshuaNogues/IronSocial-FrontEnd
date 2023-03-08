import { ThemeContext } from "../context/theme.context";
import { useContext, useEffect, useState } from "react";
import { post, get } from "../services/authService";
import { LoadingContext } from "../context/loading.context";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Home = () => {
  const { user, setUser, posts, setPosts, getPosts } = useContext(LoadingContext);
  // const [postList, setPostList] = useState([]);
  const { mode } = useContext(ThemeContext);
  const [postText, setPostText] = useState("");
  const { authenticateUser } = useContext(AuthContext);
  const [specificPost, setSpecificPost] = useState("");
  const [comment, setComment] = useState("");

  // const fetchPosts = async () => {
  //   try {
  //     const response = await get("/post");
  //     setPostList(response.data);
  //     console.log(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  console.log(comment);

  // const commentOnClick = (postId) => {
  //   console.log("clicking comment button", postId)
  //   const newArr = posts.map((post) => {
  //     console.log("this is the post id", post)
  //     if (post._id === postId) {
  //       console.log("matching", post)
  //       // setSpecificPost({ ...post, bool: true });
  //       return { ...post, bool: true };
  //     } else {
  //       return { ...post, bool: false };
  //     }
  //   });
  //   setPosts(newArr);
  // };

  const commentOnClick = (postId) => {
    console.log("clicking comment button", postId)



    let thisIndex = posts.findIndex((post) => post._id === postId) 

    if (posts[thisIndex].bool) {
        const thisArr = posts.map((post) => {
            console.log("this is the post id", post)

              return { ...post, bool: false };        
            })
        setPosts(thisArr)
        } else {
            
                const newArr = posts.map((post) => {
                console.log("this is the post id", post)
                if (post._id === postId) {
                    console.log("matching", post)
                    return { ...post, bool: true };
                } else {
                    return { ...post, bool: false };
                }
                });
                setPosts(newArr);

        }
  };

  const handlePost = (e) => {
    console.log("Posting:", postText);
    setPostText(e.target.value);
  };

  const isUserPost = (post) => {
    return post.contributor._id === user._id;
  };

  const handleDelete = (postId) => {
    const userId = user._id;
    get(`/post/delete-post/${postId}/${userId}`)
      .then((res) => {
        console.log("Post deleted:", res.data);
        getPosts();
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/post/create-post/${user._id}`, { postText }).then((result) => {
      getPosts();
      console.log(result.data);
    });
  };


  // const commentSubmit = (postId) => {
  //   console.log("submitting comment")
  //   post(`/post/comment/${postId}`, {comment} )
  //       .then((result) => {
  //           setSpecificPost(result.data)
  //           console.log("this is line 78",result.data);
  //            })
  //       .catch((err) => {
  //           console.log("There has been an error", err)
  //       })
  //   ;
  // };

  const commentSubmit = (postId) => {
    console.log("submitting comment")
    post(`/post/comment/${postId}`, {comment} )
        .then((result) => {
            let newArr = [...posts]
            let thisIndex = newArr.findIndex((post) => post._id === postId) 
            newArr[thisIndex] = {...result.data, bool: true}
            setPosts(newArr)
            console.log("this is line 97",result.data);
             })
        .catch((err) => {
            console.log("There has been an error", err)
        })
    ;
  };

  useEffect(() => {
    if(!posts){
      getPosts()
    }
  }, []);

  return (
    <div className={"Home " + mode}>
      <div className="profile-container">
        {user && (
          <div className="profile-preview">
            <img
              className="profile-pic"
              src={user.profile_image}
              alt="Profile"
            />
            <div className="profile-details">
              <h3>{user.username}</h3>
              <p className="occupation">📍{user.location}</p>
              <p className="occupation">💻{user.occupation}</p>
            </div>
          </div>
        )}
      </div>
      <div className="timeline-container">
        <div className="post">
          <img
            className="profile-pic"
            src={user && user.profile_image}
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
        {posts ? (
          posts.map((post) => (
            <div key={post._id} className="post-container">
              <div className="post-user-info">
                <div className="profile-pic-div">
                <img
                  className="profile-pic"
                  src={post.contributor.profile_image}
                  alt="Profile"/>
                </div> 
                <div className="post-details">
                  <h4>{post.contributor.username}</h4>
                  <p className="occupation">{post.contributor.occupation}</p>
                  </div>
                </div>
                <div className="post-content">
                  <p>{post.post}</p>
                  <hr></hr>
                  </div>
                  <div className="post-actions">
                  {
    user && 
    <>

        {isUserPost(post) ? (
        <div>
            <Link to={`/edit-post/${post._id}`}>Edit</Link>
            <button
            className="delete"
            onClick={() => commentOnClick(post._id)}
            >
            Comment
            </button>
            <button
            className="delete"
            onClick={() => handleDelete(post._id)}
            >
            Delete
            </button>
        </div>
        ) : (
        <div>
            <button
            className="delete"
            onClick={() => commentOnClick(post._id)}
            >
            Comment
            </button>
        </div>
        )}
    </>
}
</div>
                  {post.bool && (
                    <>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          commentSubmit(post._id);
                        }}
                      >
                        <textarea
                          name="comment"
                          onChange={handleComment}
                        ></textarea>
                        <button>send</button>
                      </form>
                    </>
                  )}
                  {post.bool && 
    

    <>
        {

        post.comments.map((post) => {
        return <p>{post.comment}</p>;
        })}
    </>


}
                
              
            </div>
          ))
        ) : (
          <p>...Loading </p>
        )}
      </div>
      <div className="profile-preview">
        <h3>Friends List</h3>
      </div>
    </div>
  );
};

export default Home;
