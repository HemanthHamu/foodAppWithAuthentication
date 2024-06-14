import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom'
import '../styles/forgotpassword.css'
export default function Forgotpassword() {
  const navigate = useNavigate()
  const [userInput,setUserInput] = useState({email:"",newPassword:""})
  function handleChange(e){
    setUserInput({...userInput,[e.target.name] : e.target.value})
  }
  console.log(userInput.email)
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(userInput.email==="" || userInput.newPassword===""){
        return toast.error("Every input field must have a value...")
      }
      try {
        const response = await fetch('http://127.0.0.1:4010/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInput),
        });
        if(response.message === "Email not found"){
          return toast.error('Email not found')
        }
        if (!response.ok) {
          return toast.error('Failed to send password reset email.');
        }
        toast.success('Password changed successfully.');
        navigate('/login')
      } catch (error) {
        toast.error(error.message);
        console.error('Error:', error);
      }
    };
  return (
    <div className="body">
    <div className='forgot-password-container'>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name='email' value={userInput.email} onChange={handleChange}  />
          <label htmlFor="newPassword">New Password:</label>
          <input  type="password" id="newPassword" name='newPassword' value={userInput.password} 
            onChange={handleChange} />
          <Link to='/login'>back to login</Link>
        <button type="submit">Reset Password</button>
      </form>
    </div>
    </div>
  )
}
