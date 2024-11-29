import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { login, studiesList, tokenFirebase } from '../_redux/authCrud'
import { Link, useHistory } from 'react-router-dom'
import SimpleImageSlider from "react-simple-image-slider";
import { getPushToken } from '../../../../firebase';
import { browserName, browserVersion } from "react-device-detect";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux"
import { injectIntl } from "react-intl"
import * as auth from "../_redux/authRedux"
import { useTranslation } from 'react-i18next'

//slider images
const images = [
  { url: "/media/misc/login-1.png" },
  { url: "/media/misc/login-6.jpg" },
  { url: "/media/misc/login-4.png" },
];

const Login = (props) => {
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  const [error_message, seterror_message] = useState(false)
  const [error_message2, seterror_message2] = useState("")
  const [selectType, setSelectType] = useState("password")
  const { i18n } = useTranslation(["Common"]);

  //Redirect to forgot password screen.
  const forgotPassword = () => {
    history.push('/auth/forgot-password');
  }

  //loader true
  const enableLoading = () => {
    setLoading(true)
  }

  //loader false
  const disableLoading = () => {
    setLoading(false)
  }

  //form value initializations.
  const initialValues = {
    email: "",
    pWord: "",
  }

  //Login Form validations.
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format.")
      .min(3, "Minimum 3 symbols.")
      .max(50, "Maximum 50 symbols.")
      .required("Please enter email address."),
    pWord: Yup.string()
      .trim()
      .min(10, "Minimum 10 characters required.")
      .required("Password is required.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/,
        "Must contain 10 characters, one uppercase, one lowercase, one number and one special case character.")
  })

  //Login Form api calling.
  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      enableLoading();
      const data = {
        "emailaddress": values.email,
        "password": values.pWord,
        "code": "",
        "_type": "E"
      }
      setTimeout(() => {
        login(data)
          .then((res) => {
            if (res.data.status === 0) {
              disableLoading();
              localStorage.setItem('id', res.data.user.id)
              localStorage.setItem("NotificationCheck",res.data.user.push_notification)
              localStorage.setItem('i18nextLng', res.data.user.lang)
              i18n.changeLanguage(res.data.user.lang);
              localStorage.setItem('firstname', JSON.stringify(res.data.user.firstname))
              localStorage.setItem('lastname', JSON.stringify(res.data.user.lastname))
              if (res.data.file.length !== 0) {
                localStorage.setItem('ImageUpdate', `${process.env.REACT_APP_API_URL}/api/v1/profile?hash=` + res.data.file[0].hash)
              } else {
                localStorage.setItem('ImageUpdate', "")
              }

              studiesList(Number(res.data.user.id)).then((res1) => {
                localStorage.setItem('SiteId', res1.data.records[0].site_id)
                localStorage.setItem('StudiesId', res1.data.records[0].study_id)
                localStorage.setItem('ConditionsReimbursements', res1.data.records[0]._study_manage_reimbursements)
                localStorage.setItem('ConditionsStipends', res1.data.records[0]._study_visit_stipends)
                localStorage.setItem('ConditionsTaravales', res1.data.records[0]._study_subject_travel_preferences)
                localStorage.setItem('ConditionsId', res1.data.records[0].id)
                localStorage.setItem('Status', res1.data.records[0].status)
                getNotificationDetails();
                props.login(res.data.user.emailaddress);
                props.userInfo(res.data.user);
              }).catch((err1) => {
              })
            } else if (res.data.errors.password) {
              values.pWord = ''
              values.email = ''
              seterror_message(true)
              seterror_message2("The password you entered is invalid.");
            } else if (res.data.errors.emailaddress) {
              values.pWord = ''
              values.email = ''
              seterror_message(true)
              seterror_message2("Please enter the correct email address.");
            }
          }).catch((err) => {
          })
          .finally(() => {
            disableLoading();
            setSubmitting(false)
          })
      }, 1000)
    },
  });

  //token generated.
  const getNotificationDetails = async () => {
    getPushToken().then((val) => {
      localStorage.setItem('tokenId', val)
    }).catch((err) => {
    }).finally(() => {
      fireFinal()
    })
  }

  //parameter pass the browser,device,token and then login.
  const fireFinal = () => {
    const fireTokenParam = {
      "PatientID": localStorage.getItem("id"),
      "DeviceID": `${browserVersion}`,
      "TokenID": localStorage.getItem("tokenId"),
      "DeviceType": `${browserName}`,
      "Method": "SignIN"
    }
    tokenFirebase(fireTokenParam).then((res) => {
    }).catch((err) => {
    })
  }

  //password icon.
  const passwordHideShow = (type) => {
    if (type === "text") {
      setSelectType("text")
    }
    if (type === "password") {
      setSelectType("password")
    }
  }

  //space not allowed.
  const handleKeyDown = e => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <main className="login-wrapper">
      <div className="container">
        <div className="inner-login-wrapper">
          <div className="login-form">
            <div className="left-section">
              <div className='login-logo'>
                <img src="/media/images/client-logo.png" alt="Unable to load" width="100%" />
              </div>
              <h4 className="title text-center mt-4 mb-4 font-weight-bold"> Participant Portal</h4>
              <div className="alert-close" onClick={() => seterror_message(false)}>
                <form onSubmit={formik.handleSubmit} onReset={formik.resetForm}>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email"
                      className="form-control"
                      placeholder="Enter email"
                      autoComplete='off'
                      id="email"
                      name="email"
                      onKeyDown={handleKeyDown}
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
                    <div className='show-password'>
                      <input type={selectType}
                        className="form-control"
                        placeholder="Enter password"
                        autoComplete='off'
                        id="pwd"
                        name="pWord"
                        onKeyDown={handleKeyDown}
                        {...formik.getFieldProps("pWord")}
                      />
                      {
                        selectType === "password" ?
                          <img className='eye-icon' src="/media/images/eye-show.svg" onClick={() => passwordHideShow("text")} alt="Unable to load" width="100%" />
                          :
                          <img className='eye-icon' src="/media/images/eye-hide.svg" onClick={() => passwordHideShow("password")} alt="Unable to load" width="100%" />
                      }


                    </div>
                    {formik.touched.pWord && formik.errors.pWord ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.pWord}</div>
                      </div>
                    ) : null}
                  </div>
                  <div className="alert-text color-red">{error_message2}</div>
                  <button type="submit"
                    variant="primary"
                    disabled={formik.isSubmitting ? true : false}
                    className="btn btn-primary login-btn mt-2"
                  >
                    Login
                    &nbsp;&nbsp;
                    {
                      formik.isSubmitting ?
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className='color-white'
                        /> : ""
                    }
                  </button>
                  <Link type="button" className="forgot-text" onClick={forgotPassword}>I forgot my password</Link>
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
            <p>Copyright © 2021 - 2025 | GlobalPAY Participant Portal | All right reserved |  <a href="https://realtime-ctms.com/privacy-policy/" rel="noopener noreferrer" target="_blank">
              Privacy policy</a> |<a href="https://realtime-ctms.com/cookies-policy/" rel="noopener noreferrer" target="_blank"> Cookies policy</a></p>
          </footer>
        </div>
      </div>
    </main>
  )
}

export default injectIntl(connect(null, auth.actions)(Login))