import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useHistory } from 'react-router-dom'
import SimpleImageSlider from "react-simple-image-slider";
import { forgotPasswordData } from '../_redux/authCrud';

const images = [
    { url: "/media/misc/login-1.png" },
    { url: "/media/misc/login-6.jpg" },
    { url: "/media/misc/login-4.png" },
];

const ForgotPassword = () => {
    const history = useHistory();
    const [message, setMessage] = useState("")
    const [errorMessage,setErrorMessage] = useState("")

    //forgot password form initialise values. 
    const initialValues = {
        email: "",
    }

    //form validations.
    const forgotSchema = Yup.object().shape({
        email: Yup.string()
            .email("Wrong email format.")
            .min(3, "Minimum 3 symbols.")
            .max(50, "Maximum 50 symbols.")
            .required("Please enter email address.")
    })

    //form get the value and push the api then email sending.
    const formik = useFormik({
        initialValues,
        validationSchema: forgotSchema,
        onSubmit: (values) => {
            const data = {
                "emailaddress": values.email,
            }
            forgotPasswordData(data)
                .then((req) => {
                    if (req.data.status === 0) {
                        setMessage("A password reset has been initiated for the entered email address. Please check your email for the reset password link.")
                    }else if(req.data.status === 2){
                        setErrorMessage("Please enter registered email address")
                    }
                }).catch((err) => {
                })
        },
    })

    return (
        <main className="login-wrapper forgot-pass">
            <div className="container">
                <div className="inner-login-wrapper">
                    <div className="login-form">
                        <div className="left-section">
                            <h4 className="title text-center mt-4 mb-4 font-weight-bold">Forgot password ?</h4>
                            <label className='alert-text help-text'>Enter the email address that is registered with your profile account below. Upon submission, please check your email box for instructions on how to reset your password.</label>
                            {
                                message === ""
                                    ?
                                    <form onSubmit={formik.handleSubmit} onReset={formik.resetForm}>
                                        <div className="form-group">
                                            <label htmlFor="email">Email address</label>
                                            <input type="email"
                                                className="form-control"
                                                placeholder="Enter email"
                                                id="email"
                                                name="email"
                                                onKeyDown={(e) => {
                                                    if (e.key === " ") {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                {...formik.getFieldProps("email")}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div className="fv-plugins-message-container">
                                                    <div className="fv-help-block">{formik.errors.email}</div>
                                                </div>
                                            ) : null}

                                        </div>
                                        <div className="alert-text color-red">{errorMessage}</div>
                                        <button type="submit" className="btn btn-primary login-btn mt-2">Submit</button>
                                    </form>
                                    :
                                    <label>{message}</label>
                            }
                            <button type="button" className="btn cancel-btn mt-3" onClick={() => history.push('/auth/login')}>Cancel</button>
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

export default ForgotPassword