import React from 'react'
import { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom';
import './Login.css'
const Login = () => {
    const navigate=useNavigate({})
    const myIp="localhost"
    const [action,setAction]=useState("LOGIN");
    const[form, setForm]=useState({});
    const [showWarning, setShowWarning] = useState(false);
    const wrapLetters = (text) => {
        return text.split('').map((char, index) => (
            <span key={index}>{char}</span>
        ));
    }
    const handleform=(e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        if (/[a-z]/.test(form.username) || /[a-z]/.test(form.password)) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
    }
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        // console.log(form);
    
        try {
            const response = await fetch(`http://10.11.22.102:6969/student-details`, {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                alert('Cannot find the user in our database');
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
    
            if (true) {
                // console.log(data.data);
                localStorage.setItem('access_token', form.username);
                localStorage.setItem('SNO',data.data.SNO);
                localStorage.setItem('ROLLNO',data.data.RNO);
                localStorage.setItem('KMITID',data.data.KMITID);
                localStorage.setItem('YEAR',data.data.YEAR);
                localStorage.setItem('ADMNO',data.data.ADMNO);
                localStorage.setItem('NAME',data.data.NAME);
                localStorage.setItem('FATHERSNAME',data.data.FATHERSNAME);
                localStorage.setItem('BRANCH',data.data.BRANCH);
                localStorage.setItem('PARENTSPHNO',data.data.PARENTSPHNO);
                localStorage.setItem('SEX',data.data.SEX);
                alert("Hello " + localStorage.getItem('access_token') + ", you have been successfully logged in");
                navigate('/Main');
            } else {
                alert('INVALID CREDENTIALS');
            }
        } catch (err) {
            if (err.message === 'Failed to fetch') {
                alert("Internal server error");
            } else {
                console.error(err);
            }
        }
    };
  return (
    <>
    <div className='everything'>
    <center>-
    {/* <div className='heading'><center><b>{wrapLetters("WELCOME to DrivinCric.com")}</b></center></div> */}
    <div className='INPUTS'>
                        <center>
                        <form onSubmit={handleSubmit2} align="center">
                        <div className='Title12'>
                           <center><h1>{action}</h1></center></div>
                            <div className='para1'>
                        {/* <label for="Username"><b>USERNAME:</b></label> */}
                        <div className='input-box'>
                        {showWarning && (
                <p style={{ color: 'red' }}>Username and password must not contain lowercase letters!</p>
            )}
                        <input onChange={handleform} type="text" name="username" id="Username" placeholder="Enter username" required/></div>
                        <br/>
                        <br/>
                        {/* <label for="password"><b>PASSWORD:</b></label> */}
                        <div className='input-box'>
                        <input onChange={handleform} type="password" name="password" id="Password" placeholder="Enter your password" required/></div>
                        <br/>
                        {/* <button onClick={forgot}>Fpass?</button> */}
                        <br/><br/>
                        <button type='submit' className='button10' >LOGIN</button> 
                        {/* <button className='button2' onClick={shootreset}>RESET</button> */}
                        </div>
                        </form>
                        </center>
                        </div>
                        </center>
                        </div>
                        </>
  )
}

export default Login;