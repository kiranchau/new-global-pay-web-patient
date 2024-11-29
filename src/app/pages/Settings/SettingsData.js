import React, { useEffect, useState } from 'react'
import { changeLanguagesApi, multiLanguage, myProfile, patientPushNotification } from '../../modules/Auth/_redux/authCrud'
import { Footer } from '../Layout/Footer'
import { Header } from '../Layout/Header'
import { SideNav } from '../Layout/SideNav'
import { useTranslation } from "react-i18next";
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'


export const SettingsData = () => {
    const [data, setData] = useState([]);
    const [selectLang, setSelectLang] = useState("");
    const [currentLang, setCurrentLang] = useState("");
    const [selectCode, setSelectCode] = useState("")
    const { i18n, t } = useTranslation(["Common"]);
    const [Loader, setLoader] = useState(true)
    const [settingNotificationOnOff, setSettingsNotificationOnOff] = useState(localStorage.getItem("NotificationCheck"));
    const [sideMenu, setSideMenu] = useState(false)
    const [travelPreferences, setTravelPreferences] = useState(false)

    useEffect(() => {
        localStorage.getItem("ConditionsReimbursements") === "0" &&
            localStorage.getItem("ConditionsStipends") === "0" ?
            setSideMenu(false)
            : localStorage.getItem("ConditionsReimbursements") === "1" ?
                setSideMenu(true)
                : localStorage.getItem("ConditionsStipends") === "1" ?
                    setSideMenu(true)
                    : setSideMenu(false)

        localStorage.getItem("ConditionsTaravales") === "1"
            ? setTravelPreferences(true)
            : setTravelPreferences(false)

        setLoader(false)
        setSelectCode(localStorage.getItem("i18nextLng").replace(/['"]+/g, ''))
        MultiLanguageData()
        NotficationOnOff()
    }, [])

    //Get the user language api calling.
    const MultiLanguageData = () => {
        multiLanguage(localStorage.getItem('id'))
            .then((res) => {
                setData(res.data.records);
            }).catch((err) => {
            })
    }

    //Notification on and off api calling.
    const NotficationOnOff = () => {
        myProfile(localStorage.getItem('id'))
            .then((value) => {
                setSettingsNotificationOnOff(value.data.record.push_notification)
                localStorage.setItem("NotificationCheck",value.data.record.push_notification)
            }).catch((err) => {

            })
    }

    //Check conditions check push notification on and off api calling.
    const changePushNotificationSettings = (type) => {
        if (type === "1") {
            patientPushNotification(localStorage.getItem('id'), 0)
                .then((value) => {
                    if (value.data.status === 0) {
                        setSettingsNotificationOnOff("0");
                        localStorage.setItem("NotificationCheck","0")
                    }
                }).catch((err) => {
                })
        } else if (type === "0") {
            patientPushNotification(localStorage.getItem('id'), 1)
                .then((value) => {
                    if (value.data.status === 0) {
                        setSettingsNotificationOnOff("1");
                        localStorage.setItem("NotificationCheck","1")
                    }
                }).catch((err) => {
                })
        }
    }

    //Selected dropdown language 
    const selectCodeLanguage = (lang, name) => {
        setCurrentLang(name);
        setSelectCode(lang);
        localStorage.setItem('i18nextLng', selectCode)
    }

    //selected language value set the user account in api calling.
    const handlerLanguageChange = () => {
        setLoader(true)
        i18n.changeLanguage(selectCode);
        const langParams = {
            lang: localStorage.getItem("i18nextLng"),
        }
        changeLanguagesApi(localStorage.getItem('id'), langParams)
            .then((res) => {
                setLoader(false)
            }).catch((err) => {
                setLoader(false)
            })
    }

    return (
        <div>
            <main className="settings-wrap inner-page">
                <div className="">
                    <Loading
                        show={Loader}
                        color="#2d8f84"
                        showSpinner={false}
                    />
                    <SideNav sideMenu={sideMenu} travelPreferences={travelPreferences} />
                    <div className="right-section left-space">
                        <Header title={t("Settings")} travelPreferences={travelPreferences} />
                        <div className="middle-content-padding settings-inner-wrap">
                            <div className='card push-noti'>
                                <h6>{t("Push notifications")}</h6>
                                <div className="switch">
                                    <input type="checkbox"
                                        id="toggleAll"
                                        onChange={() => changePushNotificationSettings(settingNotificationOnOff)}
                                        checked={settingNotificationOnOff === "1" ? true : false}
                                    />
                                    <label htmlFor="toggleAll"></label>
                                </div>
                            </div>
                            <div className='card set-language-card'>
                                <h6>{t("Set language")}</h6>
                                <div className='set-language'>
                                    <div className='set-language-dropdown'>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle"
                                                title="Select language"
                                                type="button" id="dropdownMenuButton"
                                                data-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                {
                                                    data.filter((val) => {
                                                        if (currentLang !== "") {
                                                            return val;
                                                        } else if (val.name.toLowerCase().includes(selectLang.toLocaleLowerCase())) {
                                                            return val
                                                        }
                                                    }).map((val) => {
                                                        if (val.code === selectCode ) {
                                                            return (
                                                                <span> {val.name + " " + "(" + val.native + ")"}</span>
                                                            ) }
                                                    })
                                                }

                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <div className='search-box-wrap'>
                                                    <div className="input-group search-box">
                                                        <input type="search"
                                                            className="form-control rounded"
                                                            placeholder={t("Search here...")}
                                                            aria-label="Search"
                                                            aria-describedby="search-addon"
                                                            onChange={(event) => {
                                                                setSelectLang(event.target.value)
                                                            }}
                                                        />
                                                        <span className="input-group-text border-0" id="search-addon">
                                                            <i className="fas fa-search"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                {
                                                    data.filter((val) => {
                                                        if (selectLang === "") {
                                                            return val;
                                                        } else if (val.name.toLowerCase().includes(selectLang.toLocaleLowerCase())) {
                                                            return val
                                                        }
                                                    }).map((val) => {
                                                        if (val.code === "en" || val.code === "ar" || val.code === "hr" || val.code === "bg" || val.code === "zh" || val.code === "fr" || val.code === "it") {
                                                            return (
                                                                <button className={selectCode !== val.code ? "dropdown-item" : "dropdown-item active-language"}
                                                                    onClick={() => selectCodeLanguage(val.code, val.name, val.native)} key={val.id}>
                                                                    {val.name + " " + "(" + val.native + ")"}
                                                                    {
                                                                        selectCode === val.code ? <img src="/media/images/check.svg" alt="unable to load" /> : <></>
                                                                    }
                                                                </button>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='set-language-btn'>
                                        <button type='button' className='btn-primary'
                                            onClick={() => handlerLanguageChange()}
                                        >
                                            {t("Change language")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </main>
        </div>
    )
}
