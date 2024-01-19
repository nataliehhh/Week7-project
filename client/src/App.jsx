import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FormPage from './pages/FormPage'
import PostListPage from './pages/PostListPage'
import PostDisplayPage from './pages/PostDisplayPage'
import Header from './components/Header'
import Nav from './components/Nav'

export default function App() {
    return (
        <div>
            <Header />
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/form" element={<FormPage />} />
                <Route path="/posts" element={<PostListPage />} />
                <Route path="/posts/:id" element={<PostDisplayPage />} />
                <Route path="*" element={<h2>404 Page Not Found</h2>} />
            </Routes>
        </div>
    )
}
