import { ThemeContext } from "../context/theme.context"
import { useContext, useEffect, useState } from "react"
import { post, get } from "../services/authService"
import { LoadingContext } from "../context/loading.context"

const Home = () => {

    const [ postList, setPostList ] = useState('')
    const { user } = useContext(LoadingContext)
    const { mode } = useContext(ThemeContext)
    const [postText, setPostText] = useState('');


       const fetchPosts = async () => {
        try {
            const response = await get('/post')
            setPostList(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
       }

       useEffect(()=> {
        fetchPosts()
       }, [])

  const handlePost = (e) => {
    
    console.log('Posting:', postText);
    setPostText(e.target.value);
  };
    console.log(user)

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/post/create-post/${user._doc._id}`, {postText})
    .then((result)=> {
        fetchPosts()
        console.log(result.data)
    })
  }

  return (
    <div className={"Home " + mode}><h1>Timeline</h1>
      <div className="post">
      <img className="profile-pic" src="https://via.placeholder.com/50" alt="Profile" />
      <textarea
        className="post-text"
        placeholder="What's on your mind?"
        name="postText"
        value={postText}
        onChange={handlePost}
      />
      <button className="post-button" onClick={handleSubmit}>Post</button>
    </div>

    {postList.length ? postList.map((posts) => {
        return (
            <h1>{posts.post}</h1>
        )
    }) : <p>...Loading </p>}
    </div>

  )
}

export default Home