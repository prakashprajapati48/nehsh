import React, { useState } from 'react'
import show_icon from '../../images/show_icon.png'
import hide_icon from '../../images/hide_pass_icon.png'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../Alert/Alert'
import { Eye, EyeOff, X } from 'lucide-react'

const Login = ({ onSignupClick, onLoginShow, onClose }) => {
    const [loginuser, setLoginuser] = useState("")
    const [loginpass, setLoginpass] = useState("")
    // const [alertmsg, setAlertmsg] = useState("")
    const [show_pass_handler, setShowpass_handler] = useState(false)
    let navigate = useNavigate()

    const show_hide_password = () => {
        setShowpass_handler(prev => !prev)
    }

    const loginform = async (e) => {
        e.preventDefault();
        try {

            let response = await fetch(`${import.meta.env.VITE_BACKEND_API}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ loginuser, loginpass })
            })

            let data = await response.json();

            if (loginuser.toLowerCase() === "admin") {
                if (!response.ok) {
                    console.error(`Error login`)
                    navigate(`/admin-home?admin ${data.message}`)
                    onClose()
                    return;
                }

                console.log(`User login token: ${data.token}`);
                localStorage.setItem("logintoken", data.token);
                window.location.href = `/admin-home?admin ${data.message}`;
                onClose()
            }

            else {
                if (!response.ok) {
                    console.error(`Error login`)
                    navigate(`/?${data.message}`)
                    onClose()
                    return;
                }

                onClose()
                console.log(`User login token: ${data.token}`);
                localStorage.setItem("logintoken", data.token);
                window.location.href = `/?${data.message}`;
            }
        }
        catch (err) {
            console.error(`Error: ${err}`)
        }
    }

    return (
        <>
            <div className={`login ${onLoginShow ? "login_show" : "login_hide"}`}>
                <X className="closeLoginmodal" onClick={onClose} />
                <form method="post" className="login_form" onSubmit={loginform} >
                    <h2 className="login_header">Login</h2>
                    <div className="user_data">
                        <input type="text" className="login_username" name="loginusername" placeholder="Username" onChange={(e) => setLoginuser(e.target.value)} value={loginuser} required />
                    </div>
                    <div className="loginpass">
                        <input type={show_pass_handler ? "text" : "password"} className="login_pass" name="loginpass" placeholder="Password" onChange={(e) => setLoginpass(e.target.value)} value={loginpass} required />
                        {/* <img src={show_pass_handler ? hide_icon : show_icon} alt="" className="pass_show_hide" onClick={show_hide_password} /> */}
                        {show_pass_handler ? <EyeOff className="pass_show_hide" onClick={show_hide_password} /> : <Eye className="pass_show_hide" onClick={show_hide_password} />}
                    </div>
                    <input type="submit" value="Login" className="login_btn" />
                </form>
                <p className="srtSignupBtn">Don't have an account? <Link onClick={onSignupClick}>Sign Up</Link> </p>
            </div>
        </>
    )
}

export default Login
