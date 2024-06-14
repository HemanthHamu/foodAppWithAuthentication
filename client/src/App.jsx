import {Toaster} from 'react-hot-toast';
import './App.css'
import {Routes,Route,Navigate} from 'react-router-dom'
import Register from './components/Register'
import Verification from './components/Verification';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Forgotpassword from './components/Forgotpassword';
import { useAuthContext } from './context/AuthContext';
import { useEffect, useState } from 'react';
import Fooddetails from './components/Fooddetails';
function App() {
  const {authUser} = useAuthContext();
  const [onlineStatus,setOnlineStatus] = useState(navigator.onLine);
  useEffect(() => {
    function online(){
      setOnlineStatus(true)
    }
    function offline(){
      setOnlineStatus(false)
    }
    window.addEventListener('online',online);
    window.addEventListener('offline',offline);
  },[onlineStatus])
  return (
    <>
    {
      !onlineStatus && (
        <div id='no-internet-connection'>
          No Internet Connection
        </div>
      )
    }
    <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/verification' element={<Verification/>} />
        <Route path='/login' element={authUser ? <Navigate to='/homepage' /> :<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='forgotpassword' element={<Forgotpassword/>} />
        <Route path='/homepage' element={<Homepage/>} />
        <Route path='/fooddetails/:foodId' element={<Fooddetails/>} />
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
