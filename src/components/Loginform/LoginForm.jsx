import { useState } from "react";
import { FaMobileAlt, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = () => {
  const [Number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleMobileChange = (e) => {
    setNumber(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { Number, password })
      .then(result => {
        console.log(result.data)
        if (result.data === "successfull") { // Adjust this condition based on actual response
          navigate('/register'); // Redirect to the home page
        } else {
          // Handle unsuccessful login, perhaps show an error message
          console.log("Login unsuccessful");
        }
      })
      .catch(err => {
        console.error(err);
        // Handle error, perhaps show an error message
      });
  }

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className='Input-Box'>
          <input type='Number' placeholder='Mobile Number' value={Number} onChange={handleMobileChange} required />
          <FaMobileAlt className='icon' />
        </div>

        <div className='Input-Box'>
          <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange} required />
          <FaLock className='icon' />
        </div>

        <div className="remember-forget">
          <label><input type='checkbox' /> Remember Me</label>
          <a href='#'>Forget Password</a>
        </div>

        <button type='submit' className='b1'>Login</button>

        <div className='registration-link'>
          <p>New Registration? <Link to="/register">Register Here</Link></p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;
