'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/profile.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = () => {
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [isNewPasswordFocused, setNewPasswordFocused] = useState(false);
    const [isEmailFocused, setEmailFocused] = useState(false);
    const router = useRouter();

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (files) => {
            setAcceptedFiles(files);
        },
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');


            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                    setUser(response.data);
                } catch (error) {
                    console.log('Error fetching user:', error);
                    router.push('/login');
                }
            } else {
                router.push('/login');
            }
        };
        fetchUserData();
    }, []);
    console.log(user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('user_id');
        const formData = new FormData();
        formData.append('newPassword', newPassword);
        const file = acceptedFiles[0];

        if (file) {
            const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

            if (acceptedImageTypes.includes(file.type)) {
                formData.append('avatar', file);
            } else {
                console.log('Vui lòng chỉ tải lên các tệp ảnh (jpg, png, gif)');
                return;
            }
        }

        try {
            const response = await axios.put(`http://localhost:3001/api/updateProfile/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(formData);

            if (response.status === 200) {
                toast.success(`Profile Updated Successfully!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log(response.data);

            } else if (response.status === 201) {
                console.log(response.data.error);
            }
            else {
                toast.error(`Updated Failed!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (user) {
        return (
            <div>
                <Header />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <ToastContainer />
                <div className='profile-form-container'>
                    <div className='breadcrumb-wrapper'>
                        <div className='container'>
                            <nav aria-label='breadcrumb'>
                                <ol className='breadcrumb d-flex align-items-center mt-4'>
                                    <li><a href='/'>Home</a></li>
                                    <li><span className='dash'>/</span><span className='signup'>Profile</span><span className='dash'></span></li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className='banner'>
                        <div className='container'>
                            <div className='row align-items-center'>
                                <div className='col-lg-12'>
                                    <h2>Profile</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='profile-form'>
                        <div className='container'>
                            <div className='profile-form-section'>
                                <form className='row no-gutters' onSubmit={handleSubmit} encType='multipart/form-data'>
                                    <img className='profile-avatar' src={user.avatar} alt='avatar' />
                                    <label htmlFor="username">Hi, {user.username}</label>
                                    <div className={`form-group col-12 ${isNewPasswordFocused || newPassword ? 'focused' : ''}`}>
                                        <label htmlFor="password">New Password</label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            onFocus={() => setNewPasswordFocused(true)}
                                            onBlur={() => setNewPasswordFocused(false)}
                                        />
                                    </div>
                                    <div className={`form-group col-12 ${isEmailFocused || user.email ? 'focused' : ''}`}>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            value={user.email}
                                            contentEditable={false}
                                            onFocus={() => setEmailFocused(true)}
                                            onBlur={() => setEmailFocused(false)}
                                            disabled
                                        />
                                    </div>
                                    <div {...getRootProps()} className="dropzone">
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop an avatar image here, or click to select a file</p>
                                        {acceptedFiles.map((file) => (
                                            <div key={file.name}>
                                                <p>{file.name}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='col-12'>
                                        <button className='btn btn-primary' type="submit">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    } else {
        return <div>Loading user information...</div>;
    }


}

export default Profile;
