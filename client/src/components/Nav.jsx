import { Routes, Route, Link } from 'react-router-dom'

export default function Nav() {
    return (
        <div>
            <h1>Nav</h1>
            <nav>
             <Link to="/">Home</Link>
             <Link to="/form">Form</Link>
             <Link to="/posts">Posts</Link>
            </nav>
        </div>
    )
}