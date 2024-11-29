import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { login } from '../_redux/authCrud'
import { useHistory } from 'react-router-dom'
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "/media/misc/login-1.png" },
  { url: "/media/misc/login-2.png" },
  { url: "/media/misc/login-3.png" },
];


const Login = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  const [error_message, seterror_message] = useState(false)
  const [error_message2, seterror_message2] = useState("")

  const forgotPassword = () => {
    history.push('/auth/forgot-password');
  }

  const enableLoading = () => {
    setLoading(true)
  }


  const disableLoading = () => {
    setLoading(false)
  }

  const initialValues = {
    email: "",
    pWord: "",
  }


  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is required"),
    pWord: Yup.string()
      .required("Password is required"),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      enableLoading();
      const data = {
        "emailaddress": values.email,
        "password": values.pWord,
        "code": "",
        "_type": "E",
      }

      setTimeout(() => {
        login(data)
          .then((res) => {
            if (res.data.status === 0) {
              disableLoading();
              localStorage.setItem('id', JSON.stringify(res.data.user.id))
              localStorage.setItem('firstname', JSON.stringify(res.data.user.firstname))
              localStorage.setItem('lastname', JSON.stringify(res.data.user.lastname))
              history.push('/dashboard')
            } else {
              seterror_message(true)
              seterror_message2("please enter the valid Emailaddress or Password");
            }
          }).catch((err) => {
          })
          .finally(() => {
            disableLoading();
            values.email = ''
            values.password = ''
            setSubmitting(false)
          })
      }, 1000)
    },
  });

  return (
    <main className="login-wrapper">
      <div className="container">
        <div className="inner-login-wrapper">
          <div className="login-form">
            <div className="left-section">
              <div><h5>Logo</h5></div>
              <h4 className="title text-center mt-4 mb-4"> Global Pay Participant Portal</h4>
              <div className="alert-text font-weight-bold">{error_message2}</div>
              <div className="alert-close" onClick={() => seterror_message(false)}>
                <form onSubmit={formik.handleSubmit} onReset={formik.resetForm}>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email"
                      className="form-control"
                      placeholder="Enter email"
                      id="email"
                      name="email"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.email}</div>
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd">Password</label>
                    <input type="password"
                      className="form-control"
                      placeholder="Enter password"
                      id="pwd"
                      name="pWord"
                      {...formik.getFieldProps("pWord")}
                    />
                    {formik.touched.pWord && formik.errors.pWord ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.pWord}</div>
                      </div>
                    ) : null}
                  </div>

                  <button type="submit" className="btn login-btn mt-2">Login</button>
                  <a type="button" className="forgot-text" onClick={forgotPassword}>I forgot my password</a>
                </form>
              </div>
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
            <p>Copyright © 2021 - 2025 | RealTime Patient Portal v1.2.0. | All Right Reserved | <a href=""> Privacy Policy</a> |<a href=""> Cookies Policy</a></p>
          </footer>
        </div>
      </div>/
    </main>
  )
}

export default Login