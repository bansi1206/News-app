'use client'
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/signup.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isUsernameFocused, setUsernameFocused] = useState(false);
    const [isPasswordFocused, setPasswordFocused] = useState(false);
    const [isEmailFocused, setEmailFocused] = useState(false);
    const [acceptedFiles, setAcceptedFiles] = useState([]);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };



    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (files) => {
            setAcceptedFiles(files);
        },
    });
    const router = useRouter();

    const handleRegisterIfInvalid = async (e) => {
        e.preventDefault();
        console.log('Có gì đó sai sai')
    }



    const handleRegisterIfValid = async (e) => {
        e.preventDefault();
        const newUser = new FormData();
        newUser.append('username', username);
        newUser.append('password', password);
        newUser.append('email', email);
        newUser.append('role', 'user');

        const file = acceptedFiles[0];

        if (file) {
            const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

            if (acceptedImageTypes.includes(file.type)) {
                newUser.append('avatar', file);
            } else {
                console.log('Vui lòng chỉ tải lên các tệp ảnh (jpg, png, gif)');
                return;
            }
        }

        try {
            const response = await axios.post('http://localhost:3001/register', newUser, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(newUser);

            if (response.status === 200) {
                // Xử lý khi đăng ký thành công
                console.log('Đăng ký thành công!');
                console.log(response.data);

                router.push('/login');
            } else if (response.status === 201) {
                console.log(response.data.error);
            }
            else {
                console.log('Đăng ký thất bại')
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            console.log('Email không hợp lệ')
            handleRegisterIfInvalid(e)
        } else {
            handleRegisterIfValid(e)
        }
    };

    return (
        <div>
            <Header />
            <div className='signup-form-section'>
                <div className='breadcrumb-wrapper'>
                    <div className='container'>
                        <nav aria-label='breadcrumb'>
                            <ol className='breadcrumb d-flex align-items-center mt-4'>
                                <li><a href='/'>Home</a></li>
                                <li><span className='dash'>/</span><span className='signup'>Sign Up</span><span className='dash'></span></li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className='banner'>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col-lg-12'>
                                <h2>Sign Up</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='signup-form-section'>
                    <div className='container'>
                        <form className='signup-form row no-gutters justify-content-center' onSubmit={handleRegister} encType='multipart/form-data'>
                            <div className={`form-group col-12 ${isUsernameFocused || username ? 'focused' : ''}`}>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    onFocus={() => setUsernameFocused(true)}
                                    onBlur={() => setUsernameFocused(false)}
                                />
                            </div>
                            <div className={`form-group col-12 ${isPasswordFocused || password ? 'focused' : ''}`}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                />
                            </div>
                            <div className={`form-group col-12 ${isEmailFocused || email ? 'focused' : ''}`}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
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
                            <div className='submit-section col-12 d-flex flex-column align-items-center'>
                                <button className='btn btn-primary' type="submit">Sign Up</button>
                                <div className='extra-function'>
                                    <p>Already has an account? <a className='login' href='/login'>Login</a></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Register;

