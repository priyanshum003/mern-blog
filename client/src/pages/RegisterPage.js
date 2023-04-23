import React, { useState } from 'react'

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const register = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/register`,
                {
                    method: "POST",
                    body: JSON.stringify({ username, password }),
                    headers: { 'Content-Type': 'application/json' }
                })

            if (response.status !== 200) {
                throw new Error('Registration failed');
            }
            alert('Registration successful!');
            setSuccess('Registration successful!');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form className='register' onSubmit={register} >
            <h1> Register </h1>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <input
                type='text'
                placeholder='username'
                value={username}
                onChange={handleUsernameChange} />

            <input
                type='password'
                placeholder='password'
                value={password}
                onChange={handlePasswordChange}
            />

            <button> Register </button>

        </form>
    )
}

export default RegisterPage