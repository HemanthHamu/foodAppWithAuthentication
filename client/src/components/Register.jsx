import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {useNavigate,Link} from 'react-router-dom'
import '../styles/register.css'
export default function Register() {
  const [userInput,setUserInput] = useState({username:"",email:"",password:""})
  function handleChange(e){
    setUserInput({...userInput,[e.target.name] : e.target.value})
  }
  const navigate = useNavigate()
  async function handleSubmit(event){
    event.preventDefault()
    if(userInput.username==="" || userInput.email==="" || userInput.password===""){
      return toast.error("Every input field must have a value...")
    }
    const callAPI = await fetch(`${process.env.REACT_APP_API_URL}/registrationcheck`,{
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
    navigate('/verification')
  }
  return (
    <div className="body">
      <div className='register-container'>
          <form method='post' onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id='username'name='username' placeholder='john doe' onChange={handleChange} />
            <label htmlFor="email">Email :</label>
            <input type="text" id='email' name='email' placeholder='johndoe@gmail.com' onChange={handleChange} />
            <label htmlFor="password">Password:</label>
            <input type="text" id='password' name='password' onChange={handleChange} />
            <Link to='/login'>already have an account? Login</Link>
            <button type='submit'>Register</button>
          </form>
      </div>
    </div>
  )
}
