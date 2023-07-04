'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';
import '../../styles/admin-account.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getUsers');
                setUsers(response.data);
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3001/deleteUser/${userId}`);
            // TODO: Handle success delete
            console.log('User deleted successfully');
            setUsers(users.filter((user) => user._id !== userId));
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = [...Array(totalPages).keys()].map((pageNumber) => (
        <li key={pageNumber} className={currentPage === pageNumber + 1 ? 'page-active' : ''}>
            <button
                className={currentPage === pageNumber + 1 ? 'button-active' : 'button-inactive'}
                onClick={() => handlePageChange(pageNumber + 1)}
            >
                {pageNumber + 1}
            </button>
        </li>
    ));

    return (
        <div>
            <AdminHeader />
            <div className="d-flex">
                <Sidebar />
                <div className="user-content-container">
                    <div className="header-container d-flex">
                        <h4>Users</h4>
                        <a className="add-user" href="/admin/account/add-user">
                            Add New
                        </a>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            <a href={`/admin/account/update-user/${user._id}`}>
                                                {user.username}
                                            </a>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <a
                                                className="btn btn-primary"
                                                href={`/admin/account/update-user/${user._id}`}
                                            >
                                                Edit
                                            </a>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteUser(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination d-flex justify-content-center">
                            <ul className='d-flex'>
                                {renderPageNumbers}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTable;


