import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/homepage.css';
import { useAuthContext } from '../context/AuthContext';
import Body from './Body';
export default function Homepage() {
 const {setAuthUser} = useAuthContext()
  const navigate = useNavigate();
  async function logout(){
    const callAPI = await fetch("http://127.0.0.1:4010/logout",{
      method:"POST",
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    const response = await callAPI.json();
    if(response.error){
      return toast.error(response.error)
    }
    localStorage.removeItem('currentUser');
    setAuthUser(null)
    navigate('/')
  }
  return (
    <div className='homepage-container'>
        <header>
          <h1>Food Fusion</h1>
          <button className='logout-button' onClick={logout}>Logout</button>
        </header>
        <Body/>
    </div>
  )
}
