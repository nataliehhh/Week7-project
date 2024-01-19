import {useState, useEffect} from 'react'
import { API_URL } from '../../config'

export default function PostList() {

    useEffect(() => {
        handleGetPosts();
    }, []);
    
    async function handleGetPosts() {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("fetch response:", data);
    }

    
    return (
        <div>
            <h1>Post List</h1>
        </div>
    )
}