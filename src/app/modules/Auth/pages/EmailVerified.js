import React, { useEffect, useState } from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import { emailVerifications } from '../_redux/authCrud';

const images = [
    { url: "/media/misc/login-1.png" },
    { url: "/media/misc/login-6.jpg" },
    { url: "/media/misc/login-4.png" },
];

const EmailVerified = () => {
    const [message, setMessage] = useState("")

    useEffect(() => {
        const currentURL = window.location.href
        const id = currentURL.split("/&code=")
        var data = { "code": id[1] }
        emailVerifications(data).then((res) => {
            if (res.data.status === 2) {
                setMessage(res.data.message)
            }
            if (res.data.status === 0) {
                setMessage(res.data.message)
            }
        }).catch(() => {
        })
    }, [])

    return (
        <main className="login-wrapper forgot-pass">
            <div className="container">
                <div className="inner-login-wrapper">
                    <div className="login-form">
                        <div className="left-section verified-text">
                            <h4 className="title text-center font-weight-bold">{message}</h4>

                            <div className="login-bottom-logo">
                                <img src="/media/misc/white-logo.png" alt="Los Angeles" width="100%" />
                            </div>
                        </div>

                        <div className="right-section">
                            <div id="demo" className="carousel slide" data-ride="carousel">
                                <SimpleImageSlider
                                    width="100%"
                                    height="100%"
                                    images={images}
                                    showBullets={true}
                                    slideDuration={0.5}
                                    autoPlay={true}
                                    loop={true}
                                />
                            </div>
                        </div>
                    </div>

                    <footer className="footer">
                        <p>Copyright © 2021 - 2025 | GlobalPAY Participant Portal | All right reserved |  <a href="https://realtime-ctms.com/privacy-policy/" rel="noopener noreferrer"  target="_blank">
                            Privacy policy</a> |<a href="https://realtime-ctms.com/cookies-policy/" rel="noopener noreferrer"  target="_blank"> Cookies policy</a></p>
                    </footer>
                </div>
            </div>
        </main>
    )
}

export default EmailVerified