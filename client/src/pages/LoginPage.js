import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { setUserInfo } = useContext(UserContext);

    const handleUserChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePassChange = (e) => {
        setPassword(e.target.value);
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Wrong Credentials');
            }

            const userInfo = await response.json();
            setUserInfo(userInfo);
            setSuccess('Logged in successfully!');
            alert('Logged in successfully!');
            setRedirect(true);
        } catch (err) {
            setError(err.message);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form className='login' onSubmit={login}>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <h1> Login </h1>
            <input type='text'
                placeholder='username'
                onChange={handleUserChange}
                value={username}
            />
            <input type='password'
                placeholder='password'
                onChange={handlePassChange}
                value={password}
            />
            <button type='submit'> Login </button>
        </form>
    )
}

export default LoginPage;