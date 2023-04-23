import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';

const EditPost = () => {

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content)
                setSummary(postInfo.summary)
            })
        });
    }, []);

    console.log(content, "summary content")



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

    const updatePost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('content', content);
        data.set('summary', summary);
        data.set('id', id);
        if (file?.[0]) {
            data.set('file', file?.[0]);
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
                method: 'PUT',
                body: data,
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to update post');
            }

            setSuccess('Post updated successfully!');
            alert('Post updated successfully!');
            setRedirect(true);
        } catch (err) {
            setError(err.message);
        }
    }


    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }


    return (
        <form onSubmit={updatePost}>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            < input type='title' placeholder='Title' value={title} onChange={handleTitleChange} />
            <input type='summary' placeholder='Summary' value={summary} onChange={handleSummaryChange} />
            <input type='file' onChange={handleFileChange} />

            <Editor onChange={setContent} value={content} />

            <button style={{ marginTop: '5px' }}> Update Post </button>

        </form>
    )
}

export default EditPost;