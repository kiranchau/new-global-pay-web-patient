import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  allNotification,
  myProfile,
  signOut,
  studiesList,
  tokenFirebaseSignOut,
  userNotifications,
} from "../../modules/Auth/_redux/authCrud";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../../firebase";
import { forwardRef, useImperativeHandle } from "react";
import SVG from "react-inlinesvg";
import Modal from "react-modal";
// import {MenuItem} from "@material-ui/core/MenuItem";
// import {FormControl} from "@material-ui/core/FormControl";
// import {Select} from "@material-ui/core/Select";
import { MenuItem, FormControl, Select } from '@material-ui/core';


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
};

export const notificationIcon = function(Obj) {
  let imagesIcon = "";
  if (Obj.Method === "Booked" || Obj.Method === "Credited" || Obj.Method === "Approved") {
    imagesIcon = "/media/misc/approved.svg";
    return imagesIcon;
  } else if (Obj.Method === "Submitted" || Obj.Method === "Updated" ||  Obj.Method === "pending") {
    imagesIcon = "/media/misc/document.svg";
    return imagesIcon;
  } else if (Obj.Method === "Created" || Obj.Method === "Completed") {
    imagesIcon = "/media/misc/side-notification.svg";
    return imagesIcon;
  } else if (Obj.Method === "Cancelled" || Obj.Method === "Denied") {
    imagesIcon = "/media/misc/close-notification.svg";
    return imagesIcon;
  } else if (Obj.Method === "Recalled") {
    imagesIcon = "/media/misc/refresh.svg";
    return imagesIcon;
  } else if (Obj.Method === "Received") {
    imagesIcon = "/media/misc/download.png";
    return imagesIcon;
  } else {
    imagesIcon = "/media/misc/side-notification.svg";
    return imagesIcon;
  }
};


export const Header = forwardRef((props, ref) => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  var [result, setResult] = useState([]);
  const { i18n } = useTranslation(["Common"]);
  const [imageData, setImageData] = useState(
    localStorage.getItem("ImageUpdate")
  );
  const [dataResult, setDataResult] = useState(
    localStorage.getItem("SiteId") +
      "-" +
      localStorage.getItem("StudiesId") +
      "-" +
      localStorage.getItem("ConditionsReimbursements") +
      "-" +
      localStorage.getItem("ConditionsStipends") +
      "-" +
      localStorage.getItem("ConditionsTaravales") +
      "-" +
      localStorage.getItem("ConditionsId") +
      "-" +
      localStorage.getItem("Status")
  );
  const { t } = useTranslation(["Common"]);
  const [notificationContent, setNotificationContent] = useState([]);
  const [counting, setCounting] = useState(0);
  const pathname = window.location.pathname;
  const [handleToUpdate] = useState(props.handleToUpdate);
  const minute_Ms = 10000;
  const [imageLogo, setImageLogo] = useState("");

  useEffect(() => {
    startingPhase();
    StudiesData();
    myProfileImage();
    interval();
  }, [imageData, localStorage.getItem("ConditionsId")]);

  const startingPhase = () => {
    userNotifications(localStorage.getItem("id"))
      .then((res) => {
        if (res.data.count.length !== 0) {
          setCounting(res.data.count);
          setNotificationContent(res.data.notification);
        }
      })
      .catch((err) => {});
  };

  //MyProfile Image update.
  const myProfileImage = () => {
    myProfile(localStorage.getItem("id"))
      .then((value) => {
        localStorage.setItem("intl", value.data.record._international);
        if (value.data.file.length !== 0) {
          localStorage.setItem(
            "ImageUpdate",
            `${process.env.REACT_APP_API_URL}/api/v1/profile?hash=` +
              value.data.file[0].hash
          );
        } else {
          localStorage.setItem("ImageUpdate", "");
        }
        if (
          value.data.record.lang === "en" ||
          value.data.record.lang === "ar" ||
          value.data.record.lang === "hr" ||
          value.data.record.lang === "bg" ||
          value.data.record.lang === "zh" || 
          value.data.record.lang === "fr" || 
          value.data.record.lang === "it"
        ) {
          localStorage.setItem("i18nextLng", value.data.record.lang);
          i18n.changeLanguage(value.data.record.lang);
          const langParams = {
            lang: localStorage.getItem("i18nextLng"),
          };
        } else {
          localStorage.setItem("i18nextLng", "en");
          i18n.changeLanguage("en");
          const langParams = {
            lang: localStorage.getItem("i18nextLng"),
          };
        }

        localStorage.setItem("firstname", value.data.record.firstname);

        localStorage.setItem("lastname", value.data.record.lastname);
      })

      .catch(() => {});
  };

  useImperativeHandle(ref, () => ({
    childFunction1() {
      const image = localStorage.getItem("ImageUpdate");
      setImageData(image);
    },
  }));

  //firebase notification functions.
  onMessage(messaging, (payload) => {
    if (Notification.permission === "granted") {
      interval();
      let notification = new Notification(payload.notification.title, {
        body: payload.notification.body,
      });
    }
  });

  //notification api calling.
  const interval = () => {
    if (
      localStorage.getItem("id") === 0 ||
      localStorage.getItem("id") === "" ||
      localStorage.getItem("id") === null ||
      localStorage.getItem("id") === undefined
    ) {
    } else {
      setInterval(() => {
        userNotifications(localStorage.getItem("id"))
          .then((res) => {
            if (res.data.count.length !== 0) {
              setCounting(res.data.count);
              setNotificationContent(res.data.notification);
            }
          })
          .catch((err) => {});
      }, minute_Ms);
      return () => clearInterval(interval);
    }
  };

  //notification box close.
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("notification_overlay").style.display = "none";
  }

  // Log out operation and api calling.
  const Signout = () => {
    const fireTokenParam = {
      TokenID: localStorage.getItem("tokenId"),
      Method: "SignOut",
    };
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
      })
      .catch((err) => {})
      .finally(() => {
        tokenFirebaseSignOut(fireTokenParam)
          .then((res) => {})
          .catch((err) => {});
      });
  };

  //dropdown select the studies.
  const StudiesData = () => {
    studiesList(localStorage.getItem("id"))
      .then((res) => {
        for (let i = 1; i < res.data.records.length; i++) {
          if (res.data.records[i].id === localStorage.getItem("ConditionsId")) {
            localStorage.setItem("SiteId", res.data.records[i].site_id);
            localStorage.setItem("StudiesId", res.data.records[i].study_id);
            localStorage.setItem(
              "ConditionsReimbursements",
              res.data.records[i]._study_manage_reimbursements
            );
            localStorage.setItem(
              "ConditionsStipends",
              res.data.records[i]._study_visit_stipends
            );
            localStorage.setItem(
              "ConditionsTaravales",
              res.data.records[i]._study_subject_travel_preferences
            );
            localStorage.setItem("Status", res.data.records[i].status);
          } else if (
            res.data.records[0].id === localStorage.getItem("ConditionsId")
          ) {
            localStorage.setItem("SiteId", res.data.records[0].site_id);
            localStorage.setItem("StudiesId", res.data.records[0].study_id);
            localStorage.setItem(
              "ConditionsReimbursements",
              res.data.records[0]._study_manage_reimbursements
            );
            localStorage.setItem(
              "ConditionsStipends",
              res.data.records[0]._study_visit_stipends
            );
            localStorage.setItem(
              "ConditionsTaravales",
              res.data.records[0]._study_subject_travel_preferences
            );
            localStorage.setItem("Status", res.data.records[0].status);
          }
        }
        setData(res.data.records);
        setDataResult(
          localStorage.getItem("SiteId") +
            "-" +
            localStorage.getItem("StudiesId") +
            "-" +
            localStorage.getItem("ConditionsReimbursements") +
            "-" +
            localStorage.getItem("ConditionsStipends") +
            "-" +
            localStorage.getItem("ConditionsTaravales") +
            "-" +
            localStorage.getItem("ConditionsId") +
            "-" +
            localStorage.getItem("Status")
        );
      })
      .catch((err) => {})
      .finally(() => {
        myProfile(localStorage.getItem("id"))
          .then((value) => {
            setImageLogo(
              value.data.record.firstname.charAt(0) +
                value.data.record.lastname.charAt(0)
            );
          })
          .catch((err) => {
            this.setState({ loader: false });
          });
      });
  };

  //dropdown select the studies and then assigned
  const selectedVistis = (e) => {
    setResult(e.target.value.split("-"));
    let splitting = e.target.value.split("-");
    localStorage.setItem("SiteId", splitting[0]);
    localStorage.setItem("StudiesId", splitting[1]);
    localStorage.setItem("ConditionsReimbursements", splitting[2]);
    localStorage.setItem("ConditionsStipends", splitting[3]);
    localStorage.setItem("ConditionsTaravales", splitting[4]);
    localStorage.setItem("ConditionsId", splitting[5]);
    localStorage.setItem("Status", splitting[6]);
    setDataResult(
      localStorage.getItem("SiteId") +
        "-" +
        localStorage.getItem("StudiesId") +
        "-" +
        localStorage.getItem("ConditionsReimbursements") +
        "-" +
        localStorage.getItem("ConditionsStipends") +
        "-" +
        localStorage.getItem("ConditionsTaravales") +
        "-" +
        localStorage.getItem("ConditionsId") +
        "-" +
        localStorage.getItem("Status")
    );

    if (
      localStorage.getItem("ConditionsReimbursements") === "1" &&
      localStorage.getItem("ConditionsStipends") === "1" &&
      localStorage.getItem("ConditionsTaravales") === "0"
    ) {
      if (pathname === "/myStudies") {
      } else if (pathname === "/paymentSummary") {
        history.push("/stipend");
      }
    } else if (
      localStorage.getItem("ConditionsReimbursements") !== "1" &&
      localStorage.getItem("ConditionsStipends") !== "1" &&
      localStorage.getItem("ConditionsTaravales") !== "0"
    ) {
      if (pathname === "/myTravel" || pathname === "/preferencesTravelData") {
        history.push("/dashboard");
      } else {
        history.push("/dashboard");
      }
    } else if (
      localStorage.getItem("ConditionsReimbursements") === "1" &&
      localStorage.getItem("ConditionsStipends") !== "1" &&
      localStorage.getItem("ConditionsTaravales") !== "0"
    ) {
      if (pathname === "/myStudies") {
        history.push("/paymentSummary");
      } else if (pathname === "/paymentSummary") {
      } else if (
        pathname === "/myTravel" ||
        pathname === "/preferencesTravelData"
      ) {
        history.push("/dashboard");
      }
    } else if (
      localStorage.getItem("ConditionsReimbursements") !== "1" &&
      localStorage.getItem("ConditionsStipends") === "1" &&
      localStorage.getItem("ConditionsTaravales") !== "0"
    ) {
      if (pathname === "/myStudies") {
        history.push("/stipend");
      } else if (pathname === "/paymentSummary") {
        history.push("/stipend");
      } else if (pathname === "/dashboard") {
      } else if (
        pathname === "/myTravel" ||
        pathname === "/preferencesTravelData"
      ) {
        history.push("/dashboard");
      }
    } else if (
      localStorage.getItem("ConditionsReimbursements") !== "1" &&
      localStorage.getItem("ConditionsStipends") !== "1" &&
      localStorage.getItem("ConditionsTaravales") === "0"
    ) {
      if (pathname === "/myStudies") {
        history.push("/myTravel");
      } else if (pathname === "/stipend" || pathname === "/paymentSummary") {
        history.push("/dashboard");
      } else if (pathname === "/dashboard") {
      }
    } else if (
      localStorage.getItem("ConditionsReimbursements") === "1" &&
      localStorage.getItem("ConditionsStipends") === "1" &&
      localStorage.getItem("ConditionsTaravales") !== "0"
    ) {
      if (pathname === "/myStudies") {
        history.push("/stipend");
      } else if (pathname === "/dashboard") {
      } else if (
        pathname === "/myTravel" ||
        pathname === "/preferencesTravelData"
      ) {
        history.push("/dashboard");
      } else if (pathname === "/stipend" || pathname === "/paymentSummary") {
        history.push("/stipend");
      }
    } else if (
      localStorage.getItem("ConditionsReimbursements") === "1" &&
      localStorage.getItem("ConditionsStipends") !== "1" &&
      localStorage.getItem("ConditionsTaravales") === "0"
    ) {
      if (pathname === "/paymentSummary") {
      } else if (pathname === "/dashboard") {
      } else if (pathname === "/stipend") {
        history.push("/paymentSummary");
      }
    } else if (
      localStorage.getItem("ConditionsReimbursements") !== "1" &&
      localStorage.getItem("ConditionsStipends") === "1" &&
      localStorage.getItem("ConditionsTaravales") === "0"
    ) {
      if (pathname === "/dashboard") {
      } else if (pathname === "/paymentSummary") {
        history.push("/stipend");
      }
    }
    handleToUpdate();
  };

  //notification box is open.
  function notificationHeader() {
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("notification_overlay").style.display = "block";
  }

  //Go to Notification component
  function notificationPage() {
    allNotification(
      localStorage.getItem("StudiesId"),
      localStorage.getItem("id")
    )
      .then((res) => {
        setCounting(0);
        setNotificationContent([]);
        history.push("/notifications");
        closeNav();
      })
      .catch((err) => {});
  }

  return (
    <div className="sticky-header">
      <nav className="topbar">
        <h2 className="m-0 header-title">{props.title}</h2>
        {pathname === "/myProfile" ||
        pathname === "/reset-password" ||
        pathname === `/newRequest/${props.uniqueId}` ||
        pathname === "/settings" ||
        pathname === "/myStudies" ||
        pathname === "/preferencesTravelData" ? (
          <></>
        ) : (
          <div className="select-dropdown-wrap study-searh-dropdown">
            <label className="study-label">{t("Select study")}</label>
            <FormControl className="select-dropdown-form">
              <Select
                onChange={(e) => selectedVistis(e)}
                value={dataResult}
                className="select-dropdown"
              >
                {data.map((Obj) => {
                  return (
                    <MenuItem
                      key={Obj.id}
                      value={
                        Obj.site_id +
                        "-" +
                        Obj.study_id +
                        "-" +
                        Obj._study_manage_reimbursements +
                        "-" +
                        Obj._study_visit_stipends +
                        "-" +
                        Obj._study_subject_travel_preferences +
                        "-" +
                        Obj.id +
                        "-" +
                        Obj.status
                      }
                    >
                      <p className="mb-0">
                        <b>
                          {Obj._study_site_name}
                          {" - "}
                        </b>
                        {Obj._sponsor_name}
                        {" - "}
                        <b>{Obj._study_title}</b>
                      </p>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        )}
        <div className="r-section">
          <div id="notification_overlay"></div>
          <div id="mySidenav" className="sidenav">
            <div className="side-notification-head">
              <div className="d-flex align-items-center">
                <img
                  src="/media/misc/side-notification.svg"
                  alt="unable to load"
                />
                <h4 className="mb-0">{t("Notifications")}</h4>
              </div>
              <Link onClick={closeNav} title={t("Close")} className="closebtn">
                <img src="/media/misc/close.svg" alt="unable to load" />
              </Link>
            </div>
            <div className="notification-content">
              {notificationContent.length !== 0 ? (
                notificationContent.map((Obj) => {
                  let img = notificationIcon(Obj);
                  return (
                    <div className="notificaion-card" key={Obj.id}>
                      <div className="left-img">
                        <img src={img} alt="unable to load" />
                      </div>
                      <div className="right-content">
                        <h6>{Obj.Message + " " + Obj.VisitName}</h6>
                        <p>
                          {Obj._study_site_name !== null
                            ? Obj._study_site_name +
                              " - " +
                              Obj._sponsor_name +
                              " - " +
                              Obj._study_title
                            : Obj._sponsor_name + " - " + Obj._study_title}
                        </p>
                        <br />
                        <p>
                          {moment
                            .utc(Obj.DateStamp)
                            .local()
                            .format("DD-MMM-YYYY HH:mm")}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-data-row">
                  <div colSpan={5}>
                    <div className="data-not-found">
                      <img
                        src="/media/misc/no_notibell.png"
                        alt="unable to load"
                        width="100"
                        height="100"
                      />
                      <label className="text-center no-data-text">
                        {t(
                          "You are all caught up. You have no new notifications available."
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="botton-card">
              <button
                type="button"
                onClick={() => notificationPage()}
                className="btn-primary view-noti-btn"
              >
                {t("Show all prior notifications")}
              </button>
            </div>
          </div>
          <div className="notification-icon" onClick={notificationHeader}>
            <div className={counting === 0 ? "" : "pulse-base"}>
              {counting === 0 ? (
                <></>
              ) : (
                <span className="badge"> {counting}</span>
              )}
              <SVG
                src="/media/images/notification.svg"
                title={t("Notification")}
                alt="notification"
                width="100%"
              />
            </div>
          </div>
          <div className="my-profile">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle profile-text"
                  href="#"
                  id="navbardrop"
                  data-toggle="dropdown"
                >
                  <span className="profile-pic">
                    {imageData !== "" ? (
                      <img src={imageData} alt="" width="100%" />
                    ) : (
                      <span>{imageLogo}</span>
                    )}
                  </span>
                  {localStorage.getItem("firstname").replace(/['"]+/g, "") +
                    " " +
                    localStorage.getItem("lastname").replace(/['"]+/g, "")}
                </a>
                <div className="dropdown-menu">
                  <Link to="/myProfile" className="dropdown-item">
                    <SVG src="/media/misc/user.svg" alt="unable to load" />
                    {t("My profile")}
                  </Link>
                  <Link to="/reset-password" className="dropdown-item">
                    <SVG
                      src="/media/misc/reset-password.svg"
                      alt="unable to load"
                    />
                    {t("Change password")}
                  </Link>
                      {props.travelPreferences ? (
                        <></>
                      ) : (
                        <Link to="/preferencesTravelData" className="dropdown-item">
                          <img
                            className="travel-p-icon"
                            src="/media/misc/travel-p.png"
                            alt="unable to load"
                          />
                          {t("Travel preferences")}
                        </Link>
                      )}
                  <Link to="/settings" className="dropdown-item">
                    <SVG src="/media/misc/settings.svg" alt="unable to load" />
                    {t("Settings")}
                  </Link>
                  <Link to="/notifications" className="dropdown-item">
                    <SVG src="/media/misc/bell.svg" alt="unable to load" />
                    {t("Notifications")}
                  </Link>
                  <Link
                    className="dropdown-item"
                    onClick={() => setModal(true)}
                  >
                    <SVG src="/media/misc/log-out.svg" alt="unable to load" />
                    {t("Logout")}
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Modal
        isOpen={modal}
        style={customStyles}
        ariaHideApp={false}
        className="sign-out-modal"
      >
        <>
          <div>
            <label className="sign-out-text">
              {" "}
              {t("Are you sure you want to logout")}?
            </label>
            <button className="btn btn-primary w-95" onClick={() => Signout()}>
              {t("Yes")}
            </button>
            <button
              className="btn btn-danger w-95"
              onClick={() => setModal(false)}
              style={{marginLeft: "10px"}}
            >
              {t("No")}
            </button>
          </div>
        </>
      </Modal>
    </div>
  );
});
