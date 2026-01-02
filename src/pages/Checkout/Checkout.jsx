import React, { useEffect, useState } from 'react'
import "./Checkout.css"
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Checkout = () => {
    let location = useLocation()
    const { price } = location.state;

    const [responseId, setResponseId] = useState("")
    const [responseState, setResponseState] = useState("")

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script")

            script.src = src;
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }

            document.body.appendChild(script)
        })
    }

    const createRazorpayOrder = (amount) => {
        let data = JSON.stringify({
            amount: amount * 100,
            currency: "INR"
        })

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_API}paymentrazor`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data))
                handleRazorpayScreen(response.data.amount)
            }).catch((error) => {
                console.error(`Error at: ${error}`)
            })
    }

    const handleRazorpayScreen = async (amount) => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            alert("Some error at razorpay screen loading")
            return;
        }

        const options = {
            key: "rzp_test_RwbW8w8GPFzKfm",
            amount: amount,
            currency: "INR",
            name: "NEHSH Ecomm",
            description: "payment to nehsh ecomm",
            handler: function (response) {
                setResponseId(response.razorpay_payment_id)
            },
            prefill: {
                name: "NEHSH",
                email: "nehsh@gmail.com",
            },
            theme: {
                color: "blue"
            }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    const paymentFetch = (e) => {
        e.preventDefault()

        const paymentId = e.target.paymentId.value;
        axios.get(`${import.meta.env.VITE_BACKEND_API}paymentr/${paymentId}`)
            .then((response) => {
                console.log(response.data);
                setResponseState(response.data)
            })
            .catch((error) => {
                console.error(`Error: ${error}`)
            })
    }

    useEffect(() => {
        if (responseId.length > 0) {
            window.location.href = `/?payment=success`
        }
    })

    return (
        <div className="checkOut">
            {/* {price} */}
            <button className="confirmPaymentBtn" onClick={() => createRazorpayOrder(parseInt(price))}>Payment of {price}Rs</button>

            {responseId && <p>{responseId}</p>}
            {/* <h1>This is payment verification Form</h1>
            <form onSubmit={paymentFetch}>
                <input type="text" name='paymentId' />
                <button type='submit'>Fetch Payment</button>
                {responseState.length !== 0 && (
                    <ul>
                        <li>Amount: {responseState.amount / 100} Rs.</li>
                        <li>Currency: {responseState.currency}</li>
                        <li>Status:{responseState.status}</li>
                        <li>Method: {responseState.method}</li>
                    </ul>
                )}
            </form> */}
        </div>
    )
}

export default Checkout
