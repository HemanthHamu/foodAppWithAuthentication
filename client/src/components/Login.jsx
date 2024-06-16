import React from 'react';
import toast from 'react-hot-toast'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/login.css'
export default function Login() {
  const navigate = useNavigate()
  const [userInput,setUserInput] = useState({email:"",password:""})
  function handleChange(e){
    setUserInput({...userInput,[e.target.name] : e.target.value})
  }
  async function handleSubmit(e){
    e.preventDefault();
    if(userInput.email==="" || userInput.password===""){
        return toast.error("Every input field must have a value...")
      }
      const callAPI = await fetch(`${process.env.REACT_APP_API_URL}/logincheck`,{
        method:"POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify(userInput)
      })
      const response = await callAPI.json();
      if(response.error){
        return toast.error(response.error)
      }
      if(response.message === "Invalid email or password"){
        return toast.error("Invalid email or password")
      }
      localStorage.setItem('currentUser',JSON.stringify(response))
      navigate('/homepage')
  }
  return (
    <div className="body">
      <div className='login-container'>
          <form method='post' onSubmit={handleSubmit}>
            <label htmlFor="email">Email :</label>
            <input type="text" id='email' name='email' placeholder='johndoe@gmail.com' onChange={handleChange} />
            <label htmlFor="password">Password:</label>
            <input type="text" id='password' name='password' onChange={handleChange} />
            <div className="register-forgot">
              <Link to='/register'>don't have an account? register</Link>
              <Link to='/forgotpassword'>forgot password?</Link>
            </div>
            <button type='submit'>Login</button>
          </form>
      </div>
    </div>
  )
}
