'use client'
import AdminHeader from "@/app/components/Admin-header";
import Sidebar from "@/app/components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/settings.css';
import { useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone';
import AdminAccessDenied from "@/app/components/Admin-access-denied";
import { useRouter } from "next/navigation";
import axios from "axios";
const Settings = () => {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const router = useRouter();
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (files) => {
            setAcceptedFiles(files);
        },
    });
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');

            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                    setUser(response.data);
                    setLoading(false);
                } catch (error) {
                    console.log('Error fetching user:', error);
                    router.push('/admin/login');
                }
            } else {
                router.push('/admin/login');
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            {!isLoading ? (<>
                <AdminHeader />
                <div className="d-flex">
                    <Sidebar />
                    {user.role === 'admin' ? (
                        <div className='settings-content-container'>
                            <div className='header-container d-flex'>
                                <h4>General Settings</h4>
                            </div>
                            <div class="table-container">
                                <table className="form-table" role="presentation">
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                <label htmlFor="blogname">Site Title</label>
                                            </th>
                                            <td>
                                                <input
                                                    name="blogname"
                                                    type="text"
                                                    id="blogname"
                                                    value="Zero News"
                                                    className="regular-text"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Logo</th>
                                            <td>
                                                <div {...getRootProps()} className="dropzone">
                                                    <input {...getInputProps()} />
                                                    <p>Drag 'n' drop a cover image here, or click to select a file</p>
                                                    {acceptedFiles.map((file) => (
                                                        <div key={file.name}>
                                                            <p>{file.name}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Membership</th>
                                            <td>
                                                <fieldset>
                                                    <legend className="screen-reader-text">
                                                        <span>Membership</span>
                                                    </legend>
                                                    <label htmlFor="users_can_register">
                                                        <input
                                                            name="users_can_register"
                                                            type="checkbox"
                                                            id="users_can_register"
                                                            value="1"
                                                        />
                                                        Anyone can register
                                                    </label>
                                                </fieldset>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <label htmlFor="default_role">New User Default Role</label>
                                            </th>
                                            <td>
                                                <select name="default_role" id="default_role">
                                                    <option selected="selected" value="author">User</option>
                                                    <option value="subscriber">
                                                        Subscriber
                                                    </option>
                                                    <option value="contributor">Contributor</option>
                                                    <option value="editor">Writer</option>
                                                    <option value="administrator">Administrator</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <label htmlFor="default_language">Language</label>
                                            </th>
                                            <td>
                                                <select name="default_language" id="default_language">
                                                    <option selected="selected" value="english">English</option>
                                                    <option value="vietnamese">
                                                        Vietnamese
                                                    </option>

                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <label htmlFor="default_time">Time Zone</label>
                                            </th>
                                            <td>
                                                <select name="default_time" id="default_time">
                                                    <option selected="selected" value="author">GMT +7</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className='btn btn-submit btn-primary'>Save Changes</button>
                            </div>
                        </div>
                    ) : (<AdminAccessDenied />)}
                </div>
            </>) : (<></>)}
        </div>
    )
}

export default Settings