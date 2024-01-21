import { Routes, Route, Link } from 'react-router-dom'

export default function Nav() {
    return (
        <div>
            <nav>
             <Link to="/">Home</Link>
             <Link to="/form">Add Post</Link>
             <Link to="/posts">View Posts</Link>
            </nav>
        </div>
    )
}