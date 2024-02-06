// SignupForm.js
import  { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaMobileAlt, FaAddressCard, FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './signUpForm.css';
import axios from 'axios'

const SignupForm = () => {
  const [firstname, setFName] = useState('');
  const [lastname, setLName] = useState('');
  const [Number, setNumber] = useState('');
  const [email, setemail] = useState('');
  const [Adhar, setAdhar] = useState('');
  const [LAddress, setLAddress] = useState('');
  const [LCode, setLCode] = useState('');
  const [FAddress, setFAddress] = useState('');
  const [FCode, setFCode] = useState('');
  const [FArea, setFArea] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const navigate = useNavigate()

  const handleFirstNameChange = (e) => {
    setFName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLName(e.target.value);
  }

  const handleMobileChange = (e) => {
    setNumber(e.target.value);
  }

  const handleEmailChange = (e) => {
    setemail(e.target.value);
  }

  const handleAdharChange = (e) => {
    setAdhar(e.target.value);
  }

  const handleLAddressChange = (e) => {
    setLAddress(e.target.value);
  }

  const handleLCodeChange = (e) => {
    setLCode(e.target.value);
  }

  const handleFAddressChange = (e) => {
    setFAddress(e.target.value);
  }
  const handleFCodeChange = (e) => {
    setFCode(e.target.value);
  }
  const handleFAreaChange = (e) => {
    setFArea(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setLName(e.target.value);
  }
  const handleCPasswordChange = (e) => {
    setLName(e.target.value);
  }



  // Add similar functions for other input fields

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', {firstname, lastname , Number, email, Adhar , LAddress, LCode , FAddress , FCode , FArea, password , cpassword})
    .then(result => {console.log(result)
          navigate('/login')   
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>

        <div className='Input-Box'>
          <input type='text' placeholder='First Name' value={firstname} onChange={handleFirstNameChange} required />
          <input type='text' placeholder='Last Name' value={lastname} onChange={handleLastNameChange} required />
        </div>

        <div className='Input-Box'>
          <input type='Mobile Number' placeholder='Mobile Number '   value={Number} onChange={handleMobileChange}  required />
          <FaMobileAlt  className='icon' />
        </div>

        <div className='Input-Box'>
          <input type='email' placeholder='Email'  value={email} onChange={handleEmailChange}  />
          <FaEnvelope className='icon' />
        </div>

        
        <div className='Input-Box'>
          <input type='Adharcard' placeholder='Adharcard Number '  value={Adhar} onChange={handleAdharChange} required />
          <FaRegUserCircle  className='icon' />
        </div>


        <div className='Input-Box'>
          <input type='Local Address' placeholder='Residents Address'  value={LAddress} onChange={handleLAddressChange} required />
          <FaAddressCard className='icon' />
        </div>

        <div className='Input-Box'>
          <input type='Local Address pincode' placeholder='Residents Address Pincode'  value={LCode} onChange={handleLCodeChange} required />
          <MdOutlineLocationOn className='icon' />
        </div>

        <div className='Input-Box'>
          <input type='Farm Address' placeholder='Farm  Address'  value={FAddress} onChange={handleFAddressChange} required />
          <FaAddressCard className='icon' />
        </div>

        <div className='Input-Box'>
          <input type='Farm Address pincode' placeholder='Farm Address Pincode' value={FCode} onChange={handleFCodeChange} required />
          <MdOutlineLocationOn className='icon' />
        </div>

        <div className='Input-Box'>
          <input type='Area of farm ' placeholder='Area of Farm ' value={FArea} onChange={handleFAreaChange} required />
        </div>


        <div className='Input-Box'>
          <input type='password' placeholder='Password' value={password} onChange={(e) => setpassword(e.target.value)} required />
          <FaLock className='icon' />
          <input type='password' placeholder='Confirm-Password' value={cpassword} onChange={(e) => setCpassword(e.target.value)} required />
        </div>

        <button type='submit' className='b1'>Signup</button>

        <div className='registration-link'>
          <p>Already have an account? <Link to="/login">Login Here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
