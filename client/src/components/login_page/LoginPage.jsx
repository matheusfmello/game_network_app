import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';


const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUsernameVerified, setIsUsernameVerified] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);

    const navigate = useNavigate();

    const handleContinueButton = async () => {

        try {
            const response = await axios.get(`http://localhost:3333/user/${username}`);
            const user = response.data
            if (user.length > 0) {
                setUsernameExists(true);
            }
            setIsUsernameVerified(true);
        } catch (error) {
            console.log(error);
        }
        
    };

    const handleLoginButton = async () => {
        try {
          const response = await axios.post('http://localhost:3333/login', {
            username: username,
            password: password
            }, {withCredentials: true}
          )
          if (response.status === 200) {
            // Login successful, redirect back to original URL
            navigate('/account', {replace:true});
          } else {
            // Login failed, display error message
            alert('Invalid username or password');
          }
        } catch (error) {
          console.error(error);
        }
      };


    const handleRegisterButton = () => {
        if (password == confirmPassword) {
            // create new user from username and password logic
        } else {
            alert("Passwords don't match");
        }
    }

    return (
        <div className='login-page'>
            {!isUsernameVerified ? (
                <div className='input-username'>
                <p>Login to continue</p>
                <input
                    type='text'
                    placeholder='Insert your username'
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)}}
                />
                <button onClick={handleContinueButton}>
                    Continue
                </button>
                </div>
            ) : usernameExists? (
                <div className='input-password'>
                    <p>Enter your password</p>
                    <input
                        type='text'
                        placeholder='Insert your password'
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <button onClick={handleLoginButton}>
                        Login
                    </button>
                </div>
            ) : (
                <div className='input-register'>
                    <p>{`Username ${username} not found, please set a new password and register`}</p>
                    <input
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <input
                        type='password'
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                    />
                    <button onClick={handleRegister}>
                        Register
                    </button>
                </div>
            )}
            
        </div>
    );
};

export default LoginPage;
