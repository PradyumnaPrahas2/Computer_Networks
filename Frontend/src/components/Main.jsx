import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Main = () => {
    const navigate=useNavigate();
    const logout=()=>{
      localStorage.removeItem('access_token');
      navigate('/');
    }
    const handleEliteJoin = () => {
        const code = prompt("Enter the elite access code:");
        if (code === "2225") {
        navigate("/elite");
        } else {
        alert("Incorrect code. Access denied.");
        }
    };
    const anona=(e)=>{
      e.preventDefault();
      toast.info(
        <div className='toast-container2'>
          <img src=''></img>
          <br/><br/><br/>
          <h1><p className="toast-message">{localStorage.NAME}</p></h1>
          <br/>
          <p className="toast-message">BRANCH: {localStorage.BRANCH}</p>
          <p className="toast-message">ADMISSION NO: {localStorage.ADMNO}</p>
          <p className="toast-message">KMIT-ID: {localStorage.KMITID}</p>
          <p className="toast-message">SEX: {localStorage.SEX}</p>
          <p className="toast-message">PARENTS PHNO: {localStorage.PARENTSPHNO}</p>
          <p className="toast-message">ROLL NO: {localStorage.ROLLNO}</p>
          <p className="toast-message">YEAR: {localStorage.YEAR}</p>
          <p className="toast-message">FATHERSNAME: {localStorage.FATHERSNAME}</p>
        </div>,
        {
          position: 'top-center',
          autoClose:false,
        }
      );
    };
  return (
    <>
    <div className='navbar'>
        
        <button className='logout' onClick={logout}>LOGOUT</button>
        <ToastContainer className="toast-container" />
        <button onClick={anona} className='logo'>Check your details</button>

        <div className="container mt-4 text-center">
        <button className="btn btn-dark" onClick={handleEliteJoin}>
          Join Elite Discussions
        </button>
      </div>
    </div>
    </>
  )
}

export default Main