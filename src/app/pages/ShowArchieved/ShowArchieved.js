import React, { Component } from 'react'
import { SideNav } from '../Layout/SideNav';
import { Header } from '../Layout/Header';
import { Footer } from '../Layout/Footer';
import { archievedNotification, undoNotification } from '../../modules/Auth/_redux/authCrud';
import moment from "moment";
import { notificationIcon } from '../Layout/Header';
import { withTranslation } from 'react-i18next';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class ShowArchieved extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loader: false,
            allArchievedNotifications: [],
            sideMenu: false,
            travelPreferences: false,
            spinner: false,
        }
        this.toastId = React.createRef(null);
    }

    componentDidMount() {
        this.accessOfConditions();
        this.showArchievedNotifications();
    }

    accessOfConditions = () => {
        if (
            localStorage.getItem("ConditionsReimbursements") === "1" &&
            localStorage.getItem("ConditionsStipends") === "1" &&
            localStorage.getItem('ConditionsTaravales') === "0"
        ) {
            this.setState({ sideMenu: true, travelPreferences: false }, () => { })
        } else if (
            localStorage.getItem("ConditionsReimbursements") !== "1" &&
            localStorage.getItem("ConditionsStipends") !== "1" &&
            localStorage.getItem('ConditionsTaravales') !== "0"
        ) {
            this.setState({ sideMenu: false, travelPreferences: true }, () => { })
        } else if (
            localStorage.getItem("ConditionsReimbursements") === "1" &&
            localStorage.getItem("ConditionsStipends") !== "1" &&
            localStorage.getItem('ConditionsTaravales') !== "0"
        ) {
            this.setState({ sideMenu: true, travelPreferences: true }, () => { })
        } else if (
            localStorage.getItem("ConditionsReimbursements") !== "1" &&
            localStorage.getItem("ConditionsStipends") === "1" &&
            localStorage.getItem('ConditionsTaravales') !== "0"
        ) {
            this.setState({ sideMenu: true, travelPreferences: true }, () => { })
        } else if (
            localStorage.getItem("ConditionsReimbursements") !== "1" &&
            localStorage.getItem("ConditionsStipends") !== "1" &&
            localStorage.getItem('ConditionsTaravales') === "0"
        ) {
            this.setState({ sideMenu: false, travelPreferences: false }, () => { })
        } else if (
            localStorage.getItem("ConditionsReimbursements") === "1" &&
            localStorage.getItem("ConditionsStipends") === "1" &&
            localStorage.getItem('ConditionsTaravales') !== "0"
        ) {
            this.setState({ sideMenu: true, travelPreferences: true }, () => { })
        } else if (
            localStorage.getItem("ConditionsReimbursements") === "1" &&
            localStorage.getItem("ConditionsStipends") !== "1" &&
            localStorage.getItem('ConditionsTaravales') === "0"
        ) {
            this.setState({ sideMenu: true, travelPreferences: false }, () => { })
        } else if (
            localStorage.getItem("ConditionsReimbursements") !== "1" &&
            localStorage.getItem("ConditionsStipends") === "1" &&
            localStorage.getItem('ConditionsTaravales') === "0"
        ) {
            this.setState({ sideMenu: true, travelPreferences: false }, () => { })
        }
    }

    //Show archieved notification api calling.
    showArchievedNotifications = () => {
        this.setState({ loader: true }, () => { })
        this.setState({ spinner: true }, () => { })
        archievedNotification(localStorage.getItem('id'), localStorage.getItem('StudiesId')).then((res) => {
            ;
            this.state.allArchievedNotifications = res.data.notification
            this.setState({ spinner: false }, () => { })
            this.setState({ loader: false }, () => { })
        }).catch((err) => {
            this.setState({ loader: false }, () => { })
        }).finally(() => {
            this.accessOfConditions();
        })
    }

    //restore Notification api calling.
    restoreNotifications = (id) => {
        this.setState({ loader: true }, () => { })
        this.setState({ spinner: true }, () => { })
        const div = document.getElementById('right-left' + id);
        div.classList.add('animate__animated');
        div.classList.add('animate__fadeInLeft');
        undoNotification(id)
            .then((res) => {
                if (res.data.status === 0) {
                    if (!toast.isActive(this.toastId.current)) {
                        this.toastId.current = toast.success(this.props.t('Notification restored successfully'), {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: false,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                        });
                    }
                    this.showArchievedNotifications()
                    this.setState({ spinner: false }, () => { })
                    this.setState({ loader: false }, () => { })
                }
            }).catch((err) => {
                this.setState({ loader: false }, () => { })
            })
    }

    //Parent-to-child component call data update.
    handleToUpdate = (someArg) => {
        this.componentDidMount();
    }

    render() {
        const { t } = this.props
        return (
            <div>
                <main className="travel-preferences-wrap inner-page">
                    <div className="">
                        <Loading
                            show={this.state.loader}
                            color="#2d8f84"
                            showSpinner={false}
                        />
                        <SideNav sideMenu={this.state.sideMenu} travelPreferences={this.state.travelPreferences} />
                        <div style={{ marginLeft: "120px" }} className="right-section">
                            <Header handleToUpdate={() => this.handleToUpdate.bind(this)} travelPreferences={this.state.travelPreferences} title={t("Notifications")} />
                            <div className="middle-content-padding">
                                <div>
                                    <div className='table-wrapper'>
                                        <div className='table-header'>
                                            <h6 className='visible text-white'>{t("All Archived Notifications")}</h6>
                                            <div className="input-group rounded">
                                                <button className='btn btn-primary show-archive-btn' onClick={() => this.props.history.push("/notifications")}>
                                                    {t("Back to notifications")}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="table-height table-responsive notification-scroll">
                                            <div className='notification-content'>
                                                {
                                                    this.state.spinner ?
                                                        <center className="spinner-center">
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="lg"
                                                                role="status"
                                                                aria-hidden="true"
                                                            />
                                                        </center>
                                                        :
                                                        this.state.allArchievedNotifications.length !== 0 ?
                                                            this.state.allArchievedNotifications.map((Obj) => {
                                                                let img = notificationIcon(Obj);
                                                                return (
                                                                    <div key={Obj.id} id={'right-left' + Obj.id} className='notificaion-card'>
                                                                        <div className='left-img'>
                                                                            <img src={img} alt="unable to load" />
                                                                        </div>
                                                                        <div className='right-content'>
                                                                            <div className='study_name'>
                                                                                <h6>{Obj.VisitName !== "" ? Obj.Message + " " + Obj.VisitName : Obj.Message}</h6>
                                                                                <div className='tooltip-show'>
                                                                                    <svg className='unarchive-icon' onClick={() => this.restoreNotifications(Obj.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19">
                                                                                        <path id="archive-green" d="M21.706,5.292l-3-3A1,1,0,0,0,18,2H6a1,1,0,0,0-.707.293l-3,3A1,1,0,0,0,2,6V19a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V6a.994.994,0,0,0-.294-.708ZM6.414,4H17.586l1,1H5.414ZM12,18,7,13h3V10h4v3h3Z" transform="translate(-2 -2)" fill="#548235" />
                                                                                    </svg>
                                                                                    <span className='custom-tooltip'>{t("Unarchive")}</span>
                                                                                </div>
                                                                            </div>
                                                                            <p>
                                                                                {Obj._study_site_name !== null ? Obj._study_site_name + " - " + Obj._sponsor_name + " - " + Obj._study_title : Obj._sponsor_name + " - " + Obj._study_title}
                                                                            </p>
                                                                            <p>
                                                                                {moment.utc(Obj.DateStamp).local().format("DD-MMM-YYYY HH:mm")}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }) :
                                                            <div className='no-data-row'>
                                                                <div colSpan={5}>
                                                                    <div className="data-not-found">
                                                                        <img
                                                                            src="/media/misc/no_notibell.png"
                                                                            alt="unable to load"
                                                                            width="100"
                                                                            height="100"
                                                                        />
                                                                        <label className="text-center no-data-text">{t("No archived notifications are available")}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </main>
                <ToastContainer
                />
            </div>
        )
    }
}
export default withTranslation()(ShowArchieved)
