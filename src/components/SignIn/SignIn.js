import React from 'react';
import Loader from '../Common/Loader';

const SignIn = ({ onSubmit, status }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = event.target.elements;
        onSubmit({
            username: username.value,
            password: password.value
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='field_container'>
                <label htmlFor='username_field'>Username</label>
                <input id='username_field' name='username' type='text'></input>
            </div>
            <div className='field_container'>
                <label htmlFor='password_field'>Password</label>
                <input id='password_field' name='password' type='password'></input>
            </div>
            <div className='field_container'>
                <button type='submit' className='btn' >
                    {status === 'pending' ? <Loader /> : 'Submit'}
                </button>
            </div>
        </form>
    )
}

export default SignIn;