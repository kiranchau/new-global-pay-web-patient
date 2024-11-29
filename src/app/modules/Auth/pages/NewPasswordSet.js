import React, { useRef, useState } from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { newPasswordSet } from '../_redux/authCrud';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const images = [
  { url: "/media/misc/login-1.png" },
  { url: "/media/misc/login-6.jpg" },
  { url: "/media/misc/login-4.png" },
];

export const NewPasswordSet = () => {
  const currentURL = window.location.href
  const code = currentURL.split("/?code=")
  const subCode = code[1].split("&provision=")
  const history = useHistory();
  const toastId = useRef(null);
  const [error, setError] = useState("")
  const [newPasswordType, setNewPasswordType] = useState("password")
  const [confirmNewPasswordType, setConfirmNewPasswordType] = useState("password")
  const minute_Ms = 1000;
  const [passwait, setPasswait] = useState(false);

  const initialValues = {
    newPassword: "",
    repeatPassword: "",
  }

  //Form validations.
  const resetPasswordValidations = Yup.object().shape({
    newPassword: Yup.string().trim()
      .min(10, "Minimum 10 characters required.")
      .required("New password is required.")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/,
        "Must contain 10 characters, one uppercase, one lowercase, one number and one special case character."),
    repeatPassword: Yup.string().trim()
      .required("Confirm new password is required.")
      .when("newPassword", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("newPassword")],
          "New password and confirm new password didn't match."
        ),
      }),
  })

  //form get the value and push the api calling.
  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordValidations,
    onSubmit: (values) => {
      const password = {
        code: subCode[0],
        newPassword: values.newPassword,
        repeatPassword: values.repeatPassword,
      }
      newPasswordSet(password)
        .then((res) => {
          if (res.data.status === 0) {
            if (!toast.isActive(toastId.current)) {
              toastId.current = toast.success("Password created successfully.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
            }
            setInterval(() => {
              history.push("/auth/login")
            }, minute_Ms);
            return () => clearInterval();
          } else if (res.data.status === 2) {
            setError("Your password changed session is expired, Please contact the site if any questions.");
          }
        }).catch((err) => { })
    },
  });

  const newPasswordHideShow = (type) => {
    if (type === "text") {
      setNewPasswordType("text")
    }
    if (type === "password") {
      setNewPasswordType("password")
    }
  }

  //password icon hide show
  const confirmNewPasswordHideShow = (type) => {
    if (type === "text") {
      setConfirmNewPasswordType("text")
    }
    if (type === "password") {
      setConfirmNewPasswordType("password")
    }
  }

  return (
    <div>
      <main className="login-wrapper password-reset-wrap">
        <div className="container">
          <div className="inner-login-wrapper">
            <div className="login-form">
              <div className="left-section">
                <h4>Setup New Password</h4>
                <div className="alert-text font-weight-bold"></div>
                <form onSubmit={formik.handleSubmit} onReset={formik.resetForm}>
                  <div className="form-group">
                    <label htmlFor="email">New password</label>
                    <div className='show-password'>
                      <input
                        type={newPasswordType}
                        className="form-control"
                        placeholder="Enter new password"
                        name="newPassword"
                        onKeyDown={(e) => e.key === " " ? e.preventDefault() : ""}
                        {...formik.getFieldProps("newPassword")}
                      />
                      {
                        newPasswordType === "password"
                          ? <img className='eye-icon' src="/media/images/eye-show.svg" onClick={() => newPasswordHideShow("text")} alt="Unable to load" width="100%" />
                          : <img className='eye-icon' src="/media/images/eye-hide.svg" onClick={() => newPasswordHideShow("password")} alt="Unable to load" width="100%" />

                      }
                    </div>
                    {formik.touched.newPassword && formik.errors.newPassword ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.newPassword}</div>
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Confirm new password</label>
                    <div className='show-password'>
                      <input
                        type={confirmNewPasswordType}
                        className="form-control"
                        placeholder="Enter confirm new password"
                        name="repeatPassword"
                        onKeyDown={(e) => e.key === " " ? e.preventDefault() : ""}
                        {...formik.getFieldProps("repeatPassword")}
                      />
                      {confirmNewPasswordType === "password"
                        ? <img className='eye-icon' src="/media/images/eye-show.svg" onClick={() => confirmNewPasswordHideShow("text")} alt="Unable to load" width="100%" />
                        : <img className='eye-icon' src="/media/images/eye-hide.svg" onClick={() => confirmNewPasswordHideShow("password")} alt="Unable to load" width="100%" />
                      }
                    </div>
                    {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.repeatPassword}</div>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div className="alert-text color-red">{error}</div>
                  </div>
                  <div className='save-btn-wrap'>
                    <button type="submit" disabled={passwait === true ? true : false} className='btn-primary'>Save</button>
                  </div>
                </form>
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
              <p>Copyright © 2021 - 2025 | GlobalPAY Participant Portal | All right reserved |  <a href="https://realtime-ctms.com/privacy-policy/" rel="noopener noreferrer" target="_blank">
                Privacy policy</a> |<a href="https://realtime-ctms.com/cookies-policy/" rel="noopener noreferrer" target="_blank"> Cookies policy</a></p>
            </footer>
          </div>
        </div>
      </main>
      <ToastContainer
      />
    </div>
  )
}
