import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../components/Editor';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const [redirect, setRedirect] = useState(false);
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleSummaryChange = (e) => {
        setSummary(e.target.value);
    }

    const handleContentChange = (newValue) => {
        setContent(newValue);
    }

    const handleFileChange = (e) => {
        setFile(e.target.files);
    }

    const createNewPost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('content', content);
        data.set('summary', summary);
        data.set('file', file[0]);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
                method: 'POST',
                body: data,
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            alert('Post created successfully!');
            setSuccess('Post created successfully!');
            setRedirect(true);
        } catch (err) {
            setError(err.message);
        }
    }

    if (redirect) {
        return <Navigate to="/" />
    }


    return (
        <form onSubmit={createNewPost}>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <input type='text' placeholder='Title' value={title} onChange={handleTitleChange} />
            <input type='text' placeholder='Summary' value={summary} onChange={handleSummaryChange} />
            <input type='file' onChange={handleFileChange} />
            <Editor value={content} onChange={handleContentChange} modules={modules} formats={formats} />
            <button style={{ marginTop: '5px' }}> Create Post </button>
        </form>
    )
}

export default CreatePost;