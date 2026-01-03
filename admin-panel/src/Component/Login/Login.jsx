import React, { useState } from 'react'
import show_icon from '../../images/show_icon.png'
import hide_icon from '../../images/hide_pass_icon.png'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { KeyIcon, User, Eye, EyeOff } from 'lucide-react'

const Login = ({ onSignupClick, onClose }) => {
    const [loginuser, setLoginuser] = useState("")
    const [loginpass, setLoginpass] = useState("")
    const [show_pass_handler, setShowpass_handler] = useState(false)
    let navigate = useNavigate()

    const show_hide_password = () => {
        setShowpass_handler(prev => !prev)
    }

    const loginform = async (e) => {
        e.preventDefault();
        try {

            let response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ loginuser, loginpass })
            })

            let data = await response.json();

            if (!response.ok) {
                console.error(`Error login`)
                navigate(`/?${data.message}`)
                onClose()
                return;
            }

            console.log(`User login token: ${data.token}`);
            localStorage.setItem("logintoken", data.token);
            window.location.href = `/?${data.message}`;
            onClose()

        }
        catch (err) {
            console.error(`Error: ${err}`)
        }
    }

    return (
        <>
            <div className="login size-full">
                <div className="login_data">
                    <div className="login_header">
                        <img src="" alt="logo" className="admin_page_logo" />
                        <h1>ADMIN PANEL</h1>
                        <p>Control Panel Login</p>
                    </div>
                    <form method="post" className="login_form" onSubmit={loginform} >
                        <div className="user_data">
                            <span className="login_user_icon"><User stroke="#5F83E6" /> </span>
                            <input type="text" className="login_username" name="loginusername" placeholder="Enter Username" onChange={(e) => setLoginuser(e.target.value)} value={loginuser} />
                        </div>
                        <div className="loginpass">
                            <span className="login_pass_icon"><KeyIcon stroke="#5F83E6" /> </span>
                            <input type={show_pass_handler ? "text" : "password"} className="login_pass" name="loginpass" placeholder="Enter password" onChange={(e) => setLoginpass(e.target.value)} value={loginpass} />
                            {/* <img src={show_pass_handler ? hide_icon : show_icon} alt="" className="pass_show_hide" onClick={show_hide_password} /> */}
                            {show_pass_handler ? <EyeOff className="pass_show_hide" onClick={show_hide_password} /> : <Eye className="pass_show_hide" onClick={show_hide_password} />}
                        </div>
                        <input type="submit" value="Login" className="login_btn" />
                    </form>
                    {/* <p>Create Account <Link onClick={onSignupClick}>Signup</Link> </p> */}
                </div>
            </div>
        </>
    )
}

export default Login
