import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Otp_verify.css'

const Otp_verify = () => {
    let location = useLocation()
    // const email = location.state?.email;
    const { email, timeRemn } = location.state;
    // const email = "aakashprajapati897@gmail.com"
    // let timeRemn = 5
    const [userOtp, setUserotp] = useState(Array(6).fill(""))
    const [remainingTime, setRemaintime] = useState({ minute: 4, second: 59 });

    const verifyotp = async () => {
        const finalOtp = userOtp.join("");
        let response = await fetch(`${import.meta.env.VITE_BACKEND_API}otp_verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                otp: finalOtp
            })
        })

        if (!response.ok) {
            window.location.href = "/?Otp wrong"
        }

        let data = await response.json();

        window.location.href = `/?${data.message}`
    }

    let otpChanges = (e, index) => {
        let value = e.target.value;

        let newOtp = [...userOtp];
        newOtp[index] = value;
        setUserotp(newOtp)

        // console.log(`New otp is: ${userOtp}`)
        if (value && index < 5) {
            e.target.nextSibling?.focus();
        }
    }

    useEffect(() => {
        let now = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })

        let timer = setInterval(() => {
            setRemaintime((prev) => {
                let { minute, second } = prev;
                if (second > 0) {
                    second--
                }

                else if (minute > 0) {
                    minute--
                    second = 59
                }
                return { minute, second }
            })
        }, 1000);

        return () => clearInterval(timer)
    }, [])

    return (
        <>
            <div className="otp-verify">
                <h2 className="otpHead">OTP Verification</h2>
                <div className="otpEmail"><p>Enter the OTP Sent to: </p><span>{email}</span></div>
                <div className="otpInput">
                    {userOtp.map((digits, idx) => (
                        <input type="number" key={idx} name="otp" min="1" max="1" value={digits} onChange={(e) => otpChanges(e, idx)} onWheel={(e) => e.target.blur()}
                        />
                    ))}
                </div>
                <button className="verifyOtpBtn" onClick={verifyotp} disabled={userOtp.join("").length !== 6}>Verify OTP</button>
                <label className="resendotplabel">Didn't receive the code?</label>
                <span className="resendBtn">Resend OTP</span>
                <p className="otpRemain">Time remaining: {remainingTime.minute}:{remainingTime.second}</p>
            </div>
        </>
    )
}

export default Otp_verify
