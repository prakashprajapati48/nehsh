import React, { useState } from 'react'
import show_icon from '../../images/show_icon.png'
import hide_icon from '../../images/hide_pass_icon.png'
import './Signup.css'
import { Link } from 'react-router-dom'
import Login from '../Login/Login'

const Signup = ({ onLoginClick }) => {
    const [username, setUsername] = useState("")
    const [userpass, setUserpass] = useState("")
    const [iconshow, setIconshow] = useState(false)
    const [showlogin, setShowlogin] = useState(false)

    let signupsubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, userpass })
            })

            const data = await response.json();

            if (!response.ok) {
                window.location.href = `/?${data.message}`;
                return;
            }

            window.location.href = `/?${data.message}`;
        }
        catch (err) {
            console.error(`Error: ${err}`)
        }
    }

    const show_hide_password = () => {
        setIconshow(prev => !prev)
    }

    return (
        <>
            <div className="signup">
                <form method="post" className="signup_form" onSubmit={signupsubmit} >
                    <h3 className="signup_header" >Signup</h3>
                    <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter username" className="signup_input" />
                    <div className="pass">
                        <input type={iconshow ? "text" : "password"} name="userpass" onChange={(e) => setUserpass(e.target.value)} value={userpass} placeholder="Enter password" className="signup_input" />
                        <label htmlFor="showpass" className="showpass" ><img src={iconshow ? hide_icon : show_icon} alt="" width={20} onClick={show_hide_password} /></label>
                    </div>
                    <input type="submit" value="signup" className="signup_btn" />
                    <p>Already hava account <Link to={"/"} onClick={onLoginClick} >login</Link> </p>
                </form>
                {showlogin && <Login />}
            </div>
        </>
    )
}

export default Signup
