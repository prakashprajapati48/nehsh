import React, { useEffect, useState } from 'react'

const Alert = ({ msg }) => {

    let [visible, setVisible] = useState(true)

    useEffect(() => {
        let timer = setTimeout(() => {
            setVisible(false);
        }, 6000);

        return () => clearTimeout(timer)

    }, [])
    if (!visible) return null

    return (
        <div className="alert_message" id="alert_message" >
            <p style={{ backgroundColor: "grey" }}>{msg}</p>
            <p className="time_line"></p>
        </div>
    )
}

export default Alert
