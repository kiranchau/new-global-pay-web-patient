import React, { Component } from 'react'
import { SideNav } from '../Layout/SideNav';
import { Header } from '../Layout/Header';
import { Footer } from '../Layout/Footer';
import "react-image-lightbox/style.css";
import { withTranslation } from 'react-i18next';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import StipendOnly from './SubDashboard/StipendOnly';
import { barChartShowData, myStudies, myTravel, notificationsDashboard, reimbursements, stipendData } from '../../modules/Auth/_redux/authCrud';
import ReimbursementsOnly from './SubDashboard/ReimbursementsOnly';
import StipendAndReimb from './SubDashboard/StipendAndReimb';
import TravelsOnly from './SubDashboard/TravelsOnly';
import StipendAndTravel from './SubDashboard/StipendAndTravel';
import ReimbAndTravel from './SubDashboard/ReimbAndTravel';
import ReimbStipendAndTravel from './SubDashboard/ReimbStipendAndTravel';

class NewDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loader: false,
            sideMenu: false,
            travelPreferences: true,
            stipendConditions: "",
            reimbursementConditions: "",
            travelConditions: "",
            stipendAndReimb: "",
            stipendAndTravel: "",
            reimbAndTravel: "",
            reimbStipendAndTravel: "",
            stipendAddition: [],
            reimbursementAddition: [],
            travelAddition: [],
            studiesData: [],
            notificationData: [],
            barChartStipendData: [],
            barChartReimbursementsData: [],
        }
    }

    componentDidMount() {
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
        this.MyTravelNotificationAlertData();
        this.barChart();
        this.stipendDataShow(localStorage.getItem('StudiesId'), localStorage.getItem('SiteId'));
        this.reimbursementDataShow(localStorage.getItem('StudiesId'));
        this.travelData();
    }

    //Notification api calling.
    MyTravelNotificationAlertData = () => {
        this.setState({ notificationData: [] }, () => { })
        notificationsDashboard(localStorage.getItem('id'), localStorage.getItem('StudiesId'))
            .then((res) => {
                for (let i = 0; i < res.data.records.length; i++) {
                    if (res.data.records[i].id !== null && res.data.records[i].study_status === "0") {
                        this.state.notificationData.push(res.data.records[i].request)
                    }
                }
            }).catch((err) => {
            })
    }

    //Bar chart data api calling.
    barChart = () => {
        this.setState({ barChartStipendData: [] }, () => { })
        this.setState({ barChartReimbursementsData: [] }, () => { })
        barChartShowData(localStorage.getItem('id'), localStorage.getItem('StudiesId'))
            .then((res) => {
                this.setState({ barChartReimbursementsData: res.data.paidReimbursements }, () => { })
                this.setState({ barChartStipendData: res.data.stipend }, () => { })
            }).catch((err) => {
            })
    }

    //stipend data api calling.
    stipendDataShow = async (studyId, siteId) => {
        this.setState({ loader: true }, () => { })
        this.state.stipendAddition = [];
        this.setState({ stipendConditions: "0" }, () => { })
        await stipendData(studyId, localStorage.getItem('id'), siteId)
            .then((res) => {
                this.state.stipendAddition = this.state.stipendAddition.concat(res.data.records)
            }).catch((err) => {
                this.setState({ loader: false }, () => { })
            }).finally(() => {
                myStudies(localStorage.getItem("id"))
                    .then((res) => {
                        this.state.studiesData = res.data.records
                        this.setState({ loader: false }, () => { })
                    }).catch((err) => {
                        this.setState({ loader: false }, () => { })
                    });
            })
    }

    //reimbursement data api calling.
    reimbursementDataShow = async (studies) => {
        this.setState({ loader: true }, () => { })
        this.state.reimbursementAddition = [];
        this.setState({ reimbursementConditions: "0", stipendAndReimb: "0", reimbAndTravel: 0 }, () => { })
        await reimbursements(localStorage.getItem('id'), studies)
            .then((value) => {
                this.state.reimbursementAddition = this.state.reimbursementAddition.concat(value.data.records)
            }).catch((error) => {
                this.setState({ loader: false }, () => { })
            }).finally(() => {
                myStudies(localStorage.getItem("id"))
                    .then((res) => {
                        this.state.studiesData = res.data.records
                        if (
                            localStorage.getItem("ConditionsReimbursements") === "1" &&
                            localStorage.getItem("ConditionsStipends") !== "1" &&
                            localStorage.getItem("ConditionsTaravales") !== "0"
                        ) {
                            this.setState({
                                sideMenu: true,
                                travelPreferences: true,
                                reimbursementConditions: "1"
                            }, () => { })
                        } else if (
                            localStorage.getItem("ConditionsReimbursements") === "1" &&
                            localStorage.getItem("ConditionsStipends") === "1" &&
                            localStorage.getItem("ConditionsTaravales") !== "0"
                        ) {
                            this.setState({
                                sideMenu: true,
                                travelPreferences: true,
                                stipendAndReimb: "1"
                            }, () => { })
                        }
                        this.setState({ loader: false }, () => { })
                    }).catch((err) => {
                        this.setState({ loader: false }, () => { })
                    });
            })
    }

    //travel data api alling.
    travelData = () => {
        this.setState({ loader: true }, () => { })
        this.state.travelAddition = []
        this.setState({
            travelConditions: "0",
            stipendAndTravel: "0",
            reimbAndTravel: "0",
            reimbStipendAndTravel: "0"
        }, () => { })
        myTravel(localStorage.getItem('id'), localStorage.getItem('StudiesId')).then((value) => {
            for (let i = 0; i < value.data.records.length; i++) {
                if (value.data.records[i].id !== null) {
                    this.state.travelAddition = this.state.travelAddition.concat(value.data.records[i])
                }
            }
        }).catch((error) => {
            this.setState({ loader: false }, () => { })
        }).finally(() => {
            myStudies(localStorage.getItem("id"))
                .then((res) => {
                    this.state.studiesData = res.data.records
                    if (
                        localStorage.getItem("ConditionsReimbursements") === "1" &&
                        localStorage.getItem("ConditionsStipends") === "1" &&
                        localStorage.getItem("ConditionsTaravales") === "0"
                    ) {
                        this.setState({
                            sideMenu: true,
                            travelPreferences: false,
                            reimbStipendAndTravel: "1"
                        }, () => { })
                    } else if (
                        localStorage.getItem("ConditionsReimbursements") !== "1" &&
                        localStorage.getItem("ConditionsStipends") !== "1" &&
                        localStorage.getItem("ConditionsTaravales") === "0"
                    ) {
                        this.setState({
                            sideMenu: false,
                            travelPreferences: false,
                            travelConditions: "1"
                        }, () => { })
                    } else if (
                        localStorage.getItem("ConditionsReimbursements") !== "1" &&
                        localStorage.getItem("ConditionsStipends") === "1" &&
                        localStorage.getItem("ConditionsTaravales") === "0"
                    ) {
                        this.setState({
                            sideMenu: true,
                            travelPreferences: false,
                            stipendAndTravel: "1"
                        }, () => { })
                    } else if (
                        localStorage.getItem("ConditionsReimbursements") === "1" &&
                        localStorage.getItem("ConditionsStipends") !== "1" &&
                        localStorage.getItem("ConditionsTaravales") === "0"
                    ) {
                        this.setState({
                            sideMenu: true,
                            travelPreferences: false,
                            reimbAndTravel: "1"
                        }, () => { })
                    } else if (
                        localStorage.getItem("ConditionsReimbursements") !== "1" &&
                        localStorage.getItem("ConditionsStipends") === "1" &&
                        localStorage.getItem("ConditionsTaravales") !== "0"
                    ) {
                        this.setState({
                            sideMenu: true,
                            travelPreferences: true,
                            stipendConditions: "1"
                        }, () => { })
                    } else if (
                        localStorage.getItem("ConditionsStipends") !== "1" &&
                        localStorage.getItem("ConditionsReimbursements") !== "1" &&
                        localStorage.getItem("ConditionsTaravales") !== "0"
                    ) {
                        this.setState({
                            sideMenu: false,
                            travelPreferences: true
                        }, () => { })
                    }
                    this.setState({ loader: false }, () => { })
                }).catch((err) => {
                    this.setState({ loader: false }, () => { })
                });
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
                <main className="dashboard-wrap inner-page">
                    <div className="">
                        <Loading
                            show={this.state.loader}
                            color="#2d8f84"
                            showSpinner={false}
                        />
                        <SideNav sideMenu={this.state.sideMenu} travelPreferences={this.state.travelPreferences} />
                        <div className="right-section left-space">
                            <Header handleToUpdate={() => this.handleToUpdate.bind(this)} travelPreferences={this.state.travelPreferences} title={t("Dashboard")} />
                            <div className="middle-content-padding">
                                {
                                    this.state.reimbStipendAndTravel === "1" ?
                                        <ReimbStipendAndTravel
                                            stipendPieChartData={this.state.stipendAddition}
                                            reimbursementPieChartData={this.state.reimbursementAddition}
                                            notification={this.state.notificationData}
                                            barChartReimbursements={this.state.barChartReimbursementsData}
                                            barChartStipend={this.state.barChartStipendData}
                                        />
                                        : <></>
                                }
                                {
                                    this.state.stipendConditions === "1" ?
                                        <StipendOnly
                                            pieChartData={this.state.stipendAddition}
                                            counter={this.state.studiesData}
                                            barChartStipend={this.state.barChartStipendData}
                                        />
                                        : <></>
                                }
                                {
                                    this.state.reimbursementConditions === "1" ?
                                        <ReimbursementsOnly
                                            pieChartData={this.state.reimbursementAddition}
                                            counter={this.state.studiesData}
                                            barChartReimbursements={this.state.barChartReimbursementsData}
                                        />
                                        : <></>
                                }
                                {
                                    this.state.stipendAndReimb === "1" ?
                                        <StipendAndReimb
                                            stipendPieChartData={this.state.stipendAddition}
                                            reimbursementPieChartData={this.state.reimbursementAddition}
                                            barChartReimbursements={this.state.barChartReimbursementsData}
                                            barChartStipend={this.state.barChartStipendData}
                                        />
                                        : <></>
                                }
                                {
                                    this.state.travelConditions === "1" ?
                                        <TravelsOnly
                                            pieChartData={this.state.travelAddition}
                                            counter={this.state.studiesData}
                                            notification={this.state.notificationData}
                                        />
                                        : <></>
                                }
                                {
                                    this.state.stipendAndTravel === "1" ?
                                        <StipendAndTravel
                                            stipendPieChartData={this.state.stipendAddition}
                                            counter={this.state.studiesData}
                                            notification={this.state.notificationData}
                                        />
                                        : <></>
                                }
                                {
                                    this.state.reimbAndTravel === "1" ?
                                        <ReimbAndTravel
                                            reimbursementPieChartData={this.state.reimbursementAddition}
                                            counter={this.state.studiesData}
                                            notification={this.state.notificationData}
                                        />
                                        : <></>
                                }
                            </div>
                            <Footer />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
export default withTranslation()(NewDashboard)