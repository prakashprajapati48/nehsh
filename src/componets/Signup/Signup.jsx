import React, { useEffect, useState } from 'react'
import show_icon from '../../images/show_icon.png'
import hide_icon from '../../images/hide_pass_icon.png'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import Login from '../Login/Login'
import { Eye, EyeClosed, EyeOff, X } from 'lucide-react'

const Signup = ({ onSignupShow, onLoginClick, onClose }) => {
    const [username, setUsername] = useState("")
    const [useremail, setUseremail] = useState("")
    const [userpass, setUserpass] = useState("")
    const [iconshow, setIconshow] = useState(false)
    const [showlogin, setShowlogin] = useState(false)
    const [visible, setVisible] = useState("")

    const navigate = useNavigate();

    let signupsubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, useremail, userpass })
            })

            const data = await response.json();

            if (!response.ok) {
                window.location.href = `/?${data.message}`;
                return;
            }

            let uemail = data.email;
            let timenew = new Date()

            // window.location.href = `/otp-verify`;
            navigate("/otp-verify", {
                state: {
                    email: uemail, timeRemn: timenew.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
                }
            })
            // window.location.href = `/?${data.message}`;
        }
        catch (err) {
            console.error(`Error: ${err}`)
        }
    }

    const show_hide_password = () => {
        setIconshow(prev => !prev)
    }

    useEffect(() => {
        if (onSignupShow) {
            setTimeout(() => {
                setVisible(true)
            }, 10);
        }
        else {
            setVisible(false)
        }
    }, [onSignupShow])

    return (
        <>
            <div className={`signup ${visible ? "signup_show" : "signup_hide"}`}>
                <X className="closeSignupmodal" onClick={onClose} />
                <form method="post" className="signup_form" onSubmit={signupsubmit} >
                    <h3 className="signup_header" >Signup</h3>
                    <label htmlFor="Username" className="userlabel">Username</label>
                    <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter username" className="signup_input" required />

                    <label htmlFor="useremail">Email</label>
                    <input type="text" name="useremail" onChange={(e) => setUseremail(e.target.value)} value={useremail} placeholder="Enter email" className="signup_input" required />

                    <label htmlFor="userpassword" className="labelpass">Password</label>
                    <div className="pass">
                        <input type={iconshow ? "text" : "password"} name="userpass" onChange={(e) => setUserpass(e.target.value)} value={userpass} placeholder="Enter password" className="signup_input" required />
                        <label htmlFor="showpass" className="showpass" onClick={show_hide_password}>
                            {/* <img src={iconshow ? hide_icon : show_icon} alt="" width={20} onClick={show_hide_password} /> */}
                            {iconshow ? <EyeOff /> : <Eye />}
                        </label>
                    </div>
                    <input type="submit" value="sign up" className="signup_btn" onClick={onClose} />
                    <p className="loginBtns">Already have an account? <Link to={"/"} onClick={onLoginClick} >Login</Link> </p>
                </form>
                {showlogin && <Login />}
            </div>
        </>
    )
}

export default Signup
