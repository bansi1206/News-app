'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import Link from "next/link";

const SearchPosts = () => {
    const [posts, setPosts] = useState([]);
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3001/post");
                const fetchedPosts = response.data;
                setPosts(fetchedPosts);
            } catch (error) {
                console.log("Error fetching posts:", error);
            }
        };

        const fetchMenus = async () => {
            try {
                const response = await axios.get("http://localhost:3001/menu");
                const fetchedMenus = response.data;
                setMenus(fetchedMenus);
            } catch (error) {
                console.log("Error fetching menus:", error);
            }
        };

        fetchPosts();
        fetchMenus();
    }, []);

    const handleSearch = async (searchValue, selectedMenus) => {
        try {
            const response = await axios.get("http://localhost:3001/searchPosts", {
                params: {
                    searchValue,
                    selectedMenus,
                },
            });
            const fetchedPosts = response.data;
            const filteredPosts = fetchedPosts.filter((post) => post.status === 'published');
            setPosts(filteredPosts);
        } catch (error) {
            console.log("Error searching posts:", error);
        }
    };



    return (
        <div>
            <h1>Posts</h1>
            <Search onSearch={handleSearch} menus={menus} />
            {posts.map((post) => (
                <div className="post" key={post._id}>
                    <Link href={`/postDetail/${post._id}`}>
                        <h2 className="post__title">{post.title}</h2>
                    </Link>
                    <p className="post__metadata">
                        <span className="post__category">{post.menu}</span>
                        <span className="post__timestamp">Time</span>
                    </p>
                    <p className="post__author">By Author</p>
                    <div className="post__content">{post.content}</div>
                </div>
            ))}
        </div>
    );
};

export default SearchPosts;
