import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../config'

export default function PostDisplayPage() {
const [post, setPost] = useState([]);
const [postReady, setPostReady] = useState(false);
let { id } = useParams();

useEffect(() => {
    handleGetPost();
}, [id]);

async function handleGetPost() {
    const response = await fetch(`${API_URL}posts/${id}`);
    const data = await response.json();
    setPost(data);
    console.log("post response", post)
}

useEffect(()=> {
    if (post.length > 0) {
        setPostReady(true)
        console.log(postReady)
        console.log(post)
    } else {
        setPostReady(false)
    }
}, [post]);

    return (
        <>           
            {postReady ? (
            <div>    
            <div className="postDisplay">

                <img className="postImage" src={post[0].image} alt={post[0].brew_name} />

                    <div className="postInfo">
                        <h3>Brew: {post[0].brew_name}</h3>
                        <h3>Roaster: {post[0].roaster_name}</h3>
                        <h3>Single Origin? {post[0].single_origin ? "Yes" : "No" }</h3>
                        <h3>Origin of beans: {post[0].origin_country}</h3>
                        <h3>Process: {post[0].process}</h3>
                        <h3>Brew Method: {post[0].method}</h3>
                    </div>
            </div>
            <div className="postReview">
                <h3>{post[0].username} says:</h3>
                <p>{post[0].review}</p>
            </div>
            </div>
            ) : (
                <p>Loading...</p>
            )}
        </>                     
    );
}