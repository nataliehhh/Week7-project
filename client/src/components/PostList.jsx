import {useState, useEffect} from 'react'
import { Link, Route } from 'react-router-dom'
import { API_URL } from '../../config'
import PostDisplayPage from '../pages/PostDisplayPage';

export default function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        handleGetPosts();
    }, []);
    
    async function handleGetPosts() {
        const response = await fetch(`${API_URL}posts`);
        const data = await response.json();
        console.log("fetch response:", data);
        setPosts(data);
    }

    return (
        <div className="postList">
            <ul>
                {posts.map((post) => {
                    return (
                        <li>
                            <Link to={`/posts/${post.id}`} key={post.id}>{`${post.brew_name} from ${post.roaster_name} - posted by ${post.username}`}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}