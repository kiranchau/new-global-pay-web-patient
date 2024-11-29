import React, { useRef, useState } from "react";
import IdleTimer from "react-idle-timer";
import { useHistory } from "react-router-dom";
import { Dialog, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { signOut, tokenFirebaseSignOut } from "./modules/Auth/_redux/authCrud";
import { useTranslation } from "react-i18next";

let countdownInterval;
let timeout;
const SessionTimeout = () => {

  let history = useHistory();
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [timeoutCountdown, setTimeoutCountdown] = useState(0);
  const { t } = useTranslation(["Common"]);
  const idleTimer = useRef(null);
  const clearSessionTimeout = () => {
    clearTimeout(timeout);
  };

  const clearSessionInterval = () => {
    clearInterval(countdownInterval);
  };
  // logout fucntion
  const handleLogout = () => {
    setTimeoutModalOpen(false);
    clearSessionInterval();
    clearSessionTimeout();
    onLogout();
  };

  // when we click on continue button
  const handleContinue = () => {
    setTimeoutModalOpen(false);
    clearSessionInterval();
    clearSessionTimeout();
  };

  // when we do any events
  const onActive = () => {
    if (!timeoutModalOpen) {
      clearSessionInterval();
      clearSessionTimeout();
    }
  };

  // when IDLE time starts
  const onIdle = () => {
    const delay = 3000 * 1;
    // if (isAuthenticated && !timeoutModalOpen) {
    timeout = setTimeout(() => {
      let countDown = 30;
      setTimeoutModalOpen(true);
      setTimeoutCountdown(countDown);
      countdownInterval = setInterval(() => {
        if (countDown > 0) {
          setTimeoutCountdown(--countDown);
        } else {
          handleLogout();
        }
      }, 1000);
    }, delay);
    // }
  };

  // call logout sessions
  const onLogout = () => {
    const fireTokenParam = {
      "TokenID": localStorage.getItem("tokenId").replace(/['"]+/g, ""),
      "Method": "SignOut"
    }
    signOut(localStorage.getItem('id').replace(/['"]+/g, '')).then((res) => {
      if (res.data.status === 0) {
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        localStorage.removeItem('id');
        localStorage.removeItem('tokenId');
        localStorage.removeItem('SiteId');
        localStorage.removeItem('StudiesId');
        localStorage.removeItem('ImageUpdate');
        localStorage.removeItem('i18nextLng');
        localStorage.removeItem('ConditionsReimbursements');
        localStorage.removeItem('ConditionsStipends');
        localStorage.removeItem('ConditionsTaravales');
        localStorage.removeItem('ConditionsId');
        localStorage.removeItem('Status');
        localStorage.removeItem("newReimbursement");
        localStorage.removeItem('intl');
        localStorage.removeItem('persist:v726-demo1-auth');
        localStorage.removeItem('URL');
        localStorage.removeItem('NotificationCheck');
        history.go("/auth/login");
      }
    }).catch((err) => {
    }).finally(() => {
      tokenFirebaseSignOut(fireTokenParam).then((res) => {
      }).catch((err) => {
      })
    })
  };
  return (
    <>
      {/* to find out IDLE TIME of system */}
      <IdleTimer
        ref={idleTimer}
        onActive={onActive}
        onIdle={onIdle}
        debounce={250}
        timeout={300000} // 5 mins=300000 ms
      />
      <div>
        <Dialog
          //   onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={timeoutModalOpen}
          className="session-time-out"
        >
          <DialogTitle className="popup-heading"><h3>{t("Session Timeout")}</h3></DialogTitle>
          <DialogContent dividers className="middle-content">
            <Typography gutterBottom className="logut-content">
              <h4>{t("The current session is about to expire in")}{" "}
                <span>{timeoutCountdown}</span> {t("seconds.")}</h4>
            </Typography>
            <Typography gutterBottom className="logut-content">
              <h4> {t("Would you like to continue the session")}?</h4>
            </Typography>
          </DialogContent>
          <DialogActions className="btn-wrapper">
            <div className="card-toolbar">
              <Link
                className="btn btn-danger mr-6"
                onClick={onLogout}
                to="#"
              >
                {t("Logout")}
              </Link>
              <Link
                color="primary"
                type="submit"
                onClick={handleContinue}
                to="#"
                className="btn btn-primary logout-btn"
              >
                {t("Continue")}
              </Link>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default SessionTimeout;
