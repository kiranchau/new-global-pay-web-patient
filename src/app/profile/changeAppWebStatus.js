/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderContext } from "../../app/context";
import {
  ChangeAppStatus,
  getAppStatus,
  login,
} from "../modules/Auth/_redux/authCrud";
import {Dialog} from "@material-ui/core/Dialog";
import {Typography} from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
const initialValues = {
  popup_pword: "",
};
export const ChangeAppWebStatus = () => {
  let history = useHistory();
  const [AppStatus, setAppStatus] = useState();
  const [StatusMsg, setStatusMsg] = useState();
  const { loader, changeLoader } = useContext(LoaderContext);
  const [popup_pword, setPopup_pword] = useState("");
  const [error_message, seterror_message] = useState(false);
  const [error_message2, seterror_message2] = useState("Error");
  const [popup, setPopup] = useState(false);
  const ActionSchema = Yup.object().shape({
    popup_pword: Yup.string().required("Password field is required"),
  });

  useEffect(() => {
    getAppStatus()
      .then((value) => {
        if (value.data.appDown === false) {
          setAppStatus(true);
          setStatusMsg("Turn Off website and app");
        } else {
          setAppStatus(false);
          setStatusMsg("Turn On website and app");
        }
        changeLoader(false);;
      })
      .catch((error) => {
        changeLoader(false);
      });
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };
  const changeStatus = () => {
    ChangeAppStatus()
      .then((value) => {
        changeLoader(false);
        if (value.data.appDown === false) {
          setPopup(false);
          setAppStatus(true);
          seterror_message(false)
          setStatusMsg("Turn Off website and app");
        } else {
          setAppStatus(false);
          setPopup(false);
          seterror_message(false)
          setStatusMsg("Turn On website and app");
        }
      })
      .catch((error) => {
        changeLoader(false);
        seterror_message(false)
      });
  };

  const openPopup = () => {
    setPopup(true);
  };

  const handleClose = () => {
    setPopup(false);
  };
  const formik = useFormik({
    initialValues,
    validationSchema: ActionSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      changeLoader(true);

      login(localStorage.getItem("EmailAddress"), values.popup_pword)
        .then((data) => {
          changeStatus();
        })
        .catch((error) => {
          changeLoader(false);
          seterror_message(true);
          seterror_message2(error.response?.data.message);
        });
    },
  });

  return (
    <div className="col-md-6">
      <h6>Turn admin portal and mobile applications Off/On</h6>
      <div className="reward-btns Cstmstrewbtn" style={{ textAlign: "right" }}>
        <button className="submit-btn" onClick={() => openPopup()}>
          {StatusMsg}
        </button>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={popup}
          className="log-out-wrap"
        >
          <form onSubmit={formik.handleSubmit} onReset={formik.resetForm}>
            <div className="popuptitle">
              <DialogTitle className="popup-heading">
                Status Confirmation
              </DialogTitle>
            </div>
            <div className="popuptitle">
              {error_message && (
                <div>
                  <div
                    className="alert alert-custom alert-light-danger show mb-10"
                    role="alert"
                  >
                    <div className="alert-icon">
                      <span className="svg-icon svg-icon-3x svg-icon-danger">
                      </span>
                    </div>
                    <div className="alert-text font-weight-bold">
                      {error_message2}
                    </div>
                    <div
                      className="alert-close"
                      onClick={() => seterror_message(false)}
                    >
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">
                          <i className="ki ki-close"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <DialogContent>
                <Typography gutterBottom className="logut-content">
                  {/* Are You sure you want to {StatusMsg} ? */}
                  Please Enter Password for {StatusMsg} ?
                  <br />
                  <input
                    type="text"
                    name="popup_pword"
                    placeholder="Enter Password"
                    value={popup_pword}
                    className={`form-control form-control h-auto ${getInputClasses(
                      "popup_pword"
                    )}`}
                    {...formik.getFieldProps("popup_pword")}
                  />
                  {formik.touched.popup_pword && formik.errors.popup_pword ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.popup_pword}
                      </div>
                    </div>
                  ) : null}
                </Typography>
              </DialogContent>
            </div>
            <DialogActions>
              <button className="canclbtnpp" onClick={handleClose}>
                Cancel
              </button>

              <button
                type="submit"
                className="confirmbtnpp"
              >
                Yes
              </button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
};
