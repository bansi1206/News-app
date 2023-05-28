'use client'
import { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Import CSS của React Quill (sử dụng giao diện "snow" trong ví dụ này)




const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi dữ liệu bài viết tới backend và xử lý lưu trữ
        // ...
        // Sau khi xử lý thành công, có thể chuyển hướng đến trang danh sách bài viết hoặc hiển thị thông báo thành công
    };

    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
    };

    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'video',
    ];


    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="content">Content</label>
            <ReactQuill
                value={content}
                onChange={setContent}
                modules={quillModules}
                formats={quillFormats}
            />
            <>
                <button type="submit">Submit</button>
            </>
        </form>

    );
};

export default PostForm;
