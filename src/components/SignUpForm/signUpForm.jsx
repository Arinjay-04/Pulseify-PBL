import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaUser, FaLock, FaEnvelope, FaMobileAlt, FaAddressCard } from 'react-icons/fa';
import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './signUpForm.css';
import axios from 'axios';




const SignupForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [firstname, setFName] = useState('');
  const [lastname, setLName] = useState('');
  const [Number, setNumber] = useState('');
  const [email, setemail] = useState('');
  const [dob, setdob] = useState(new Date());
  const [Address, setAddress] = useState('');
  const [Code, setCode] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [messageColor, setMessageColor] = useState('');
const [messageText, setMessageText] = useState('');

  const navigate = useNavigate();

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

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  }

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  }


  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setpassword(enteredPassword);

    if (enteredPassword === cpassword) {
      setMessageColor('green');
      setMessageText('Passwords match!');
    } else {
      setMessageColor('');
      setMessageText('');
    }
  }

  const handleCPasswordChange = (e) => {
    const enteredCPassword = e.target.value;
    setCpassword(enteredCPassword);

    if (password === enteredCPassword) {
      setMessageColor('green');
      setMessageText('Passwords match!');
    } else {
      setMessageColor('red');
      setMessageText("Password Didn't match");
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      setShowModal(true); 
      return;
    }

    axios.post('http://localhost:3001/register', { firstname, lastname, email, dob, Address, Code, password, cpassword, Number })
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => console.log(err));
  }
  const currentDate = new Date();
  const minDate = new Date(currentDate.getFullYear() - 70, currentDate.getMonth());

  
  const closeModal = () => {
    setShowModal(false);
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
          <input type='tel' placeholder='Mobile Number ' value={Number} onChange={handleMobileChange} required />
          <FaMobileAlt className='icon' />
        </div>

        <div className='Input-Box'>
          <input type='email' placeholder='Email' value={email} onChange={handleEmailChange} required />
          <FaEnvelope className='icon' />
        </div>

        <div className='Input-Box'>
          <DatePicker
            selected={dob}
            onChange={date => setdob(date)}
            placeholderText='Date of Birth'
            dateFormat='dd/MM/yyyy'
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={70}
            popperPlacement="bottom"
            minDate={minDate}
          />
          <FaUser className='icon' />
        </div>

        <div className='Input-Box'>
          <input type='text' placeholder='Residents Address' value={Address} onChange={handleAddressChange} required />
          <FaAddressCard className='icon' />
        </div>

        <div className='Input-Box'>
          <input type='text' placeholder='Residents Address Pincode' value={Code} onChange={handleCodeChange} required />
          <MdOutlineLocationOn className='icon' />
        </div>

        <div className='Input-Box'>
          <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange} required />
          <FaLock className='icon' />
          <input type='password' placeholder='Confirm-Password' value={cpassword} onChange={handleCPasswordChange} required />
        </div>
        {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p className="error-message">Passwords do not match</p>
          </div>
        </div>
      )}

      <p id="Message" style={{ color: messageColor }}>{messageText}</p>

        <button type='submit' className='b1'>Signup</button>

        <div className='registration-link'>
          <p>Already have an account? <Link to="/login">Login Here</Link></p>
        </div>
      </form>
      
    </div>
  );
};

export default SignupForm;
