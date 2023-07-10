'use client'
import Sidebar from "@/app/components/Sidebar";
import AdminHeader from "../components/Admin-header";
import '../styles/dashboard.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEye, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CountryInfo from "../components/Country";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [views, setViews] = useState([]);
    const [posts, setPosts] = useState([]);
    const [topPosts, setTopPosts] = useState([]);
    const totalViews = posts.reduce((total, post) => total + post.viewCount, 0);



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getUsers');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchViews = async () => {
            try {
                const response = await axios.get('http://localhost:3001/views');
                setViews(response.data);
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        };

        fetchViews();
    }, []);

    console.log(views)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/post');
                const fetchedPosts = response.data;
                setPosts(fetchedPosts.reverse());
                const fetchedTopPosts = response.data;
                const publishedTopPosts = fetchedTopPosts.filter((post) => post.status === 'published');
                const sortedPosts = publishedTopPosts.sort((a, b) => b.viewCount - a.viewCount);
                const topFivePosts = sortedPosts.slice(0, 5);
                setTopPosts(topFivePosts);
            } catch (error) {
                console.log('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);



    return (
        <div>
            <AdminHeader />
            <div className="d-flex">
                <Sidebar />
                <div className="page-body">
                    <div className="container">
                        <h4>Dashboard</h4>
                        <div className="dashboard">
                            <div className="row">
                                <div className="col-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="float-end">
                                                <div className="icon-container">
                                                    <FontAwesomeIcon className="icon" icon={faUser} />
                                                </div>
                                            </div>
                                            <h5 className="text-muted fw-normal mt-0">Users</h5>
                                            <h3 className="mt-3 mb-3">{users.length}</h3>
                                            <a href="/admin/account" class="btn btn-primary"><FontAwesomeIcon className="icon" icon={faArrowRight} /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="float-end">
                                                <div className="icon-container">
                                                    <FontAwesomeIcon className="icon" icon={faPen} />
                                                </div>
                                            </div>
                                            <h5 className="text-muted fw-normal mt-0">Posts</h5>
                                            <h3 className="mt-3 mb-3">{posts.length}</h3>
                                            <a href="/admin/post" class="btn btn-primary"><FontAwesomeIcon className="icon" icon={faArrowRight} /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="float-end">
                                                <div className="icon-container">
                                                    <FontAwesomeIcon className="icon" icon={faEye} />
                                                </div>
                                            </div>
                                            <h5 className="text-muted fw-normal mt-0">Views</h5>
                                            <h3 className="mt-3 mb-3">{totalViews}</h3>
                                            <a href="#" class="btn btn-primary"><FontAwesomeIcon className="icon" icon={faArrowRight} /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chart-container">
                            <h4>Top 5 most viewed posts</h4>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={topPosts}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="title" hide />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="viewCount" fill="rgba(75, 192, 192, 0.5)" stroke="rgba(75, 192, 192, 1)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {/* <div className="country-container">
                            {views.map((views) => (
                                <CountryInfo key={views._id} ip={views.viewerIp} />
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;
