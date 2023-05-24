"use client"
import '../styles/form.css'
import { useDropzone } from 'react-dropzone';

const Register = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    return (
        <form action="/send-data-here" method="post">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" />
            <label htmlFor="avatar">Avatar:</label>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} name="avatar" />
                <p>Drag 'n' drop an avatar image here, or click to select a file</p>
                {acceptedFiles.map(file => (
                    <div key={file.name}>
                        <p>{file.name}</p>
                    </div>
                ))}
            </div>
            <button type="submit">Register</button>
        </form>
    )
}

export default Register