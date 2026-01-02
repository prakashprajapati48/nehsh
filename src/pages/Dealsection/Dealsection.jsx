import React, { useEffect, useState } from 'react'
import './Dealsection.css';
import { Tag, Timer } from 'lucide-react';

const Dealsection = () => {
    const [timeLeft, setTimeleft] = useState({
        hour: 1,
        minutes: 0,
        seconds: 59
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeleft((prev) => {
                let { hour, minutes, seconds } = prev;
                if (seconds > 0) {
                    seconds--
                }
                else if (minutes > 0) {
                    minutes--;
                    seconds = 59
                }
                else if (hour > 0) {
                    hour--
                    minutes = 59
                    seconds = 59
                }

                return { hour, minutes, seconds }
            })
        }, 1000);

        return () => clearInterval(timer)
    }, [])

    return (
        <>
            <div className="dealsection">
                <div className="timeoutsection">
                    <div className="dealDetails">
                        <span className="timeicon"><Timer />Today's Flash Deals</span>
                        <h1 className="offerHeader">Limited Time Offers - Don't Miss Out!</h1>
                        <p>Grab these incredible deals before they're gone. New deals every 24 hours!</p>
                        <button className="dealbtn"><Tag /> Shop All Deals</button>
                    </div>

                    <div className="offer_timer">
                        <p>Offer Ends In:</p>
                        <div className="show_time">
                            <div className="hour">
                                <div>{timeLeft.hour}</div>
                                <div className="hourtext">hours</div>
                            </div>
                            <div className="minutes">
                                <div>{timeLeft.minutes}</div>
                                <div className="minutestext">Minutes</div>
                            </div>
                            <div className="seconds">
                                <div>{timeLeft.seconds}</div>
                                <div className="secondtext">seconds</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dealsection
