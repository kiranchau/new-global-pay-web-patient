import { useFormik } from "formik";
import React, { useState, useContext, useEffect } from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "react-loading-bar";
import i18n from "i18next";
import { SideNav } from "../Layout/SideNav";
import { Header } from "../Layout/Header";
import { Footer } from "../Layout/Footer";
import { LoaderContext } from "../../context";
import {
  resetPasswordData,
  signOut,
  tokenFirebaseSignOut,
} from "../../modules/Auth/_redux/authCrud";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ResetPassword = () => {
  const history = useHistory();
  const { t } = useTranslation(["Common"]);
  const { loader, changeLoader } = useContext(LoaderContext);
  const [sideMenu, setSideMenu] = useState(false);
  const [travelPreferences, setTravelPreferences] = useState(false);
  const [oldPassWordType, setOldPassWordType] = useState("password");
  const [newPassWordType, setNewPassWordType] = useState("password");
  const [confirmNewPassWordType, setConfirmNewPassWordType] = useState(
    "password"
  );

  useEffect(() => {
    localStorage.getItem("ConditionsReimbursements") === "0" &&
    localStorage.getItem("ConditionsStipends") === "0"
      ? setSideMenu(false)
      : localStorage.getItem("ConditionsReimbursements") === "1"
      ? setSideMenu(true)
      : localStorage.getItem("ConditionsStipends") === "1"
      ? setSideMenu(true)
      : setSideMenu(false);

    localStorage.getItem("ConditionsTaravales") === "1"
      ? setTravelPreferences(true)
      : setTravelPreferences(false);
    changeLoader(true);
  }, []);

  useEffect(() => {
    changeLoader(false);
  }, []);

  //Password Change form fields.
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  //Password Change form validations.
  const resetPassword = Yup.object({
    oldPassword: Yup.string()
      .trim()
      .min(10, i18n.t("Minimum 10 characters required."))
      .required(i18n.t("Current password is required."))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/,
        i18n.t(
          "Must contain 10 characters, one uppercase, one lowercase, one number and one special case character."
        )
      ),
    newPassword: Yup.string()
      .trim()
      .min(10, i18n.t("Minimum 10 characters required."))
      .required(i18n.t("New password is required."))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        i18n.t(
          "Must contain 10 characters, one uppercase, one lowercase, one number and one special case character."
        )
      ),


    confirmPassword: Yup.string()
      .trim()
      .required(i18n.t("Confirm new password is required."))
      .when("newPassword", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("newPassword")],i18n.t("New password and confirm new password didn't match.")
          
        ),
      }), 
  });

  //Password Change form get the value and push the api calling.
  const formik = useFormik({
    initialValues,
    validationSchema: resetPassword,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      changeLoader(true);
      const data = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };
      resetPasswordData(data, localStorage.getItem("id"))
        .then((res) => {
          if (res.data.status === 0) {
            toast.success(t("Password updated successfully"), {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
            });
            const fireTokenParam = {
              TokenID: localStorage.getItem("tokenId"),
              Method: "SignOut",
            };
            setTimeout(() => {
            signOut(localStorage.getItem("id"))
              .then((res) => {
                
                if (res.data.status === 0) {
                 
                  localStorage.removeItem("id");
                  localStorage.removeItem("firstname");
                  localStorage.removeItem("lastname");
                  localStorage.removeItem("tokenId");
                  localStorage.removeItem("SiteId");
                  localStorage.removeItem("StudiesId");
                  localStorage.removeItem("ImageUpdate");
                  localStorage.removeItem("ConditionsReimbursements");
                  localStorage.removeItem("ConditionsStipends");
                  localStorage.removeItem("ConditionsTaravales");
                  localStorage.removeItem("ConditionsId");
                  localStorage.removeItem("Status");
                  localStorage.removeItem("intl");
                  localStorage.removeItem("newReimbursement");
                  localStorage.removeItem("persist:v726-demo1-auth");
                  localStorage.removeItem("URL");
                  localStorage.removeItem("NotificationCheck");
                  history.go("/auth/login");
                }
              } )
              .catch((err) => {})
              .finally(() => {
                tokenFirebaseSignOut(fireTokenParam)
                  .then((res) => {}) 
                  .catch((err) => {
                  });
              });
            }, 3000)
          } 
         else if (res.data.status === 2) {
          if(res.data.errors.current_password){
            toast.error(res.data.errors.current_password, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
            });}
            else if (res.data.errors.password){
              toast.error(res.data.errors.password, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
            }
        }
          resetForm();
          changeLoader(false);
        }
 )
        .catch((err) => {
          changeLoader(false);
          toast.error(t("Cannot connect to server. Please try again later."), {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        });
        
    },
  });

  //Password field eye icon password show or hide.
  const oldPassWordHideShow = (type) => {
    if (type === "text") {
      setOldPassWordType("text");
    }
    if (type === "password") {
      setOldPassWordType("password");
    }
  };

  const newPassWordHideShow = (type) => {
    if (type === "text") {
      setNewPassWordType("text");
    }
    if (type === "password") {
      setNewPassWordType("password");
    }
  };

  const confirmNewPassWordTypeHideShow = (type) => {
    if (type === "text") {
      setConfirmNewPassWordType("text");
    }
    if (type === "password") {
      setConfirmNewPassWordType("password");
    }
  };

  //space not allowed
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <main className="dashboard-wrap inner-page reset-pass-wrap">
      <div className="">
        <Loading show={loader} color="#2d8f84" showSpinner={false} />
        <SideNav sideMenu={sideMenu} travelPreferences={travelPreferences} />
        <div className="right-section left-space">
          <Header
            title={t("Change Password")}
            travelPreferences={travelPreferences}
          />
          <div className="middle-content-padding reset-pass-inner">
            <div className="my-profile-wrap">
              <div className="personal-info">
                <div className="personal-info-header">
                  <h4>{t("Reset password")}</h4>
                </div>
                <form
                  className="password-reset-form"
                  onSubmit={formik.handleSubmit}
                  onReset={formik.resetForm}
                >
                  <div className="form-group">
                    <label htmlFor="email required">
                      {t("Current password")}{" "}
                      <span className="color-red">*</span>
                    </label>
                    <div className="input-box">
                      <div className="show-password">
                        <input
                          type={oldPassWordType}
                          className="form-control"
                          placeholder={t("Enter current password")}
                          name="oldPassword"
                          onKeyDown={handleKeyDown}
                          {...formik.getFieldProps("oldPassword")}
                        />
                        {oldPassWordType === "password" ? (
                          <img
                            className="eye-icon"
                            src="/media/images/eye-show.svg"
                            onClick={() => oldPassWordHideShow("text")}
                            alt="Unable to load"
                            width="100%"
                          />
                        ) : (
                          <img
                            className="eye-icon"
                            src="/media/images/eye-hide.svg"
                            onClick={() => oldPassWordHideShow("password")}
                            alt="Unable to load"
                            width="100%"
                          />
                        )}
                      </div>
                      {formik.touched.oldPassword &&
                      formik.errors.oldPassword ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.oldPassword}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      {t("New password")} <span className="color-red">*</span>
                    </label>
                    <div className="input-box">
                      <div className="show-password">
                        <input
                          type={newPassWordType}
                          className="form-control"
                          placeholder={t("Enter new password")}
                          name="newPassword"
                          onKeyDown={handleKeyDown}
                          {...formik.getFieldProps("newPassword")}
                        />
                        {newPassWordType === "password" ? (
                          <img
                            className="eye-icon"
                            src="/media/images/eye-show.svg"
                            onClick={() => newPassWordHideShow("text")}
                            alt="Unable to load"
                            width="100%"
                          />
                        ) : (
                          <img
                            className="eye-icon"
                            src="/media/images/eye-hide.svg"
                            onClick={() => newPassWordHideShow("password")}
                            alt="Unable to load"
                            width="100%"
                          />
                        )}
                      </div>

                      {formik.touched.newPassword &&
                      formik.errors.newPassword ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.newPassword}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="eamil">
                      {t("Confirm new password")}{" "}
                      <span className="color-red">*</span>
                    </label>
                    <div className="input-box">
                      <div className="show-password">
                        <input
                          type={confirmNewPassWordType}
                          className="form-control"
                          placeholder={t("Enter confirm new password")}
                          name="confirmPassword"
                          onKeyDown={handleKeyDown}
                          {...formik.getFieldProps("confirmPassword")}
                        />
                        {confirmNewPassWordType === "password" ? (
                          <img
                            className="eye-icon"
                            src="/media/images/eye-show.svg"
                            onClick={() =>
                              confirmNewPassWordTypeHideShow("text")
                            }
                            alt="Unable to load"
                            width="100%"
                          />
                        ) : (
                          <img
                            className="eye-icon"
                            src="/media/images/eye-hide.svg"
                            onClick={() =>
                              confirmNewPassWordTypeHideShow("password")
                            }
                            alt="Unable to load"
                            width="100%"
                          />
                        )}
                      </div>
                      {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.confirmPassword}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group btn-wrap mb-0">
                    <button className="btn-primary view-btn" type="Submit">
                      {t("Save changes")}
                    </button>
                    <button
                      className="btn btn-danger clear-btn"
                      type="button"
                      onClick={() => history.push("/dashboard")}
                    >
                      {t("Cancel")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};
