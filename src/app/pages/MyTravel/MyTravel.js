import React, { Component } from 'react'
import CommonGrid from '../../CommonGrid/CommonGrid';
import { myTravel } from '../../modules/Auth/_redux/authCrud';
import { Footer } from '../Layout/Footer';
import { Header } from '../Layout/Header';
import { SideNav } from '../Layout/SideNav';
import moment from "moment";
import Loading from 'react-loading-bar'
import { withRouter } from "react-router";
import { withTranslation } from 'react-i18next';


class MyTravel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loader: false,
            t: withTranslation(["Common"]),
            headings: [
                { Name: "Visitname", id: 1 },
                { Name: "Visitdatetime", id: 2 },
                { Name: "Traveldate", id: 3 },
                { Name: "Travel type", id: 4 },
                { Name: "Status", id: 5 },
            ],
            selectedId: [],
            travelPreferences: true,
            sideMenu: false,
            filterDate: "",
        }
    }

    //Conditions based icon Hide show sidebar and left side popup
    componentDidMount() {
        if (
            localStorage.getItem("ConditionsReimbursements") === "1" &&
            localStorage.getItem("ConditionsStipends") !== "1" &&
            localStorage.getItem("ConditionsTaravales") === "0"
        ) {
            this.setState({ sideMenu: true, travelPreferences: false }, () => { })
        } else if (
            localStorage.getItem("ConditionsReimbursements") !== "1" &&
            localStorage.getItem("ConditionsStipends") === "1" &&
            localStorage.getItem("ConditionsTaravales") === "0"
        ) {
            this.setState({ sideMenu: true, travelPreferences: false }, () => { })
        } else if (
            localStorage.getItem("ConditionsReimbursements") === "1" &&
            localStorage.getItem("ConditionsStipends") === "1" &&
            localStorage.getItem("ConditionsTaravales") === "0"
        ) {
            this.setState({ sideMenu: true, travelPreferences: false }, () => { })
        } else if (
            localStorage.getItem("ConditionsReimbursements") !== "1" &&
            localStorage.getItem("ConditionsStipends") !== "1" &&
            localStorage.getItem("ConditionsTaravales") === "0"
        ) {
            this.setState({ sideMenu: false, travelPreferences: false }, () => { })
        }
        this.dataShow();
    }

    //My Travel Api calling and passing the Data in Commongrid
    dataShow = () => {
        this.setState({ loader: true }, () => { })
        this.state.selectedId = []
        let statusLabel = "";
        let splitTravelTypes = "";
        let travelTypeLabelConcat = "";
        myTravel(localStorage.getItem('id'), localStorage.getItem('StudiesId')).then((value) => {
            for (let x = 0; x < value.data.records.length; x++) {
                if (value.data.records[x].visit_start_date != null) {
                    if (new Date(value.data.records[x].visit_start_date).getFullYear() >= new Date().getFullYear()) {
                        if (new Date(value.data.records[x].visit_start_date).getMonth() + 1 >= new Date().getMonth() + 1) {
                            if (new Date(value.data.records[x].visit_start_date).getDate() >= new Date().getDate()) {
                                this.setState({ filterDate: value.data.records[x].visit_start_date }, () => { })
                            }
                        }
                        if (new Date(value.data.records[x].visit_start_date).getMonth() + 1 > new Date().getMonth() + 1) {
                            this.setState({ filterDate: value.data.records[x].visit_start_date }, () => { })
                        }
                    }
                    if (new Date(value.data.records[x].visit_start_date).getFullYear() > new Date().getFullYear()) {
                        this.setState({ filterDate: value.data.records[x].visit_start_date }, () => { })
                    }
                }
                if (value.data.records[x].status === "1")
                    statusLabel = "Pending".replaceAll('"', "");
                else if (value.data.records[x].status === "2")
                    statusLabel = "Approved".replaceAll('"', "");
                else if (value.data.records[x].status === "3")
                    statusLabel = "Denied".replaceAll('"', "");
                else if (value.data.records[x].status === "4")
                    statusLabel = "Cancelled".replaceAll('"', "");
                let result = value.data.records[x]._request_types?.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                    return letter.toUpperCase();
                });
                if (result !== undefined) {
                    splitTravelTypes = String(result).split(', ');
                    for (let i = 0; i < splitTravelTypes.length; i++) {
                        if (splitTravelTypes[i] === 'Air')
                            splitTravelTypes[i] = 'Air Transportation';
                        else if (splitTravelTypes[i] === 'Hotel')
                            splitTravelTypes[i] = 'Hotel Lodging';
                        else if (splitTravelTypes[i] === 'Ground')
                            splitTravelTypes[i] = 'Ground Transportation';
                    }
                    travelTypeLabelConcat = splitTravelTypes.map(t => t).join(', ');
                } else {
                    travelTypeLabelConcat = "None"
                }
                if (value.data.records[x].id === null) {
                } else {
                    this.state.selectedId.push(
                        {
                            "id": value.data.records[x].id,
                            "Visitname": value.data.records[x]._visit_name,
                            "Visitdatetime": value.data.records[x].visit_start_date,
                            "Traveldate": value.data.records[x].travel_start_date,
                            "Travel type": travelTypeLabelConcat,
                            "travelFilter": value.data.records[x]._request_types,
                            "Status": value.data.records[x].status,
                            "label": statusLabel,
                            "Comments": value.data.records[x].comment,
                            "Patient_Save": value.data.records[x].patient_save,
                            "FilterDate": this.state.filterDate,
                            "Searchdate": moment(value.data.records[x].visit_start_date).format("DD-MMM-YYYY HH:mm"),
                            "Searchdate1": moment(value.data.records[x].travel_start_date).format("DD-MMM-YYYY"),
                        },
                    );
                }
            }
            this.setState({ loader: false }, () => { })
        }).catch((error) => {
            this.setState({ loader: false }, () => { })
        }).finally(() => {
            if (
                localStorage.getItem("ConditionsReimbursements") === "1" &&
                localStorage.getItem("ConditionsStipends") === "1" &&
                localStorage.getItem("ConditionsTaravales") === "0"
            ) {
                this.setState({ travelPreferences: false, sideMenu: true }, () => { })
            } else if (
                localStorage.getItem("ConditionsReimbursements") !== "1" &&
                localStorage.getItem("ConditionsStipends") !== "1" &&
                localStorage.getItem("ConditionsTaravales") !== "0"
            ) {
                this.setState({ travelPreferences: true, sideMenu: false }, () => { })
                this.props.history.push("/dashboard")
            } else if (
                localStorage.getItem("ConditionsReimbursements") === "1" &&
                localStorage.getItem("ConditionsStipends") !== "1" &&
                localStorage.getItem("ConditionsTaravales") !== "0"
            ) {
                this.setState({ travelPreferences: true, sideMenu: true }, () => { })
                this.props.history.push("/dashboard");
            } else if (
                localStorage.getItem("ConditionsReimbursements") !== "1" &&
                localStorage.getItem("ConditionsStipends") === "1" &&
                localStorage.getItem("ConditionsTaravales") !== "0"
            ) {
                this.setState({ travelPreferences: true, sideMenu: true }, () => { })
                this.props.history.push("/dashboard");
            } else if (
                localStorage.getItem("ConditionsReimbursements") !== "1" &&
                localStorage.getItem("ConditionsStipends") !== "1" &&
                localStorage.getItem("ConditionsTaravales") === "0"
            ) {
                this.setState({ sideMenu: false }, () => { })
            } else if (
                localStorage.getItem("ConditionsReimbursements") === "1" &&
                localStorage.getItem("ConditionsStipends") === "1" &&
                localStorage.getItem("ConditionsTaravales") !== "0"
            ) {
                this.setState({ travelPreferences: true, sideMenu: true }, () => { })
                this.props.history.push("/dashboard");
            } else if (
                localStorage.getItem("ConditionsReimbursements") === "1" &&
                localStorage.getItem("ConditionsStipends") !== "1" &&
                localStorage.getItem("ConditionsTaravales") === "0"
            ) {
                this.setState({ travelPreferences: false, sideMenu: true }, () => { })
            } else if (
                localStorage.getItem("ConditionsReimbursements") !== "1" &&
                localStorage.getItem("ConditionsStipends") === "1" &&
                localStorage.getItem("ConditionsTaravales") === "0"
            ) {
                this.setState({ travelPreferences: false, sideMenu: true }, () => { })
            }
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
                        <div className="right-section left-space">
                            <Header handleToUpdate={() => this.handleToUpdate.bind(this)} travelPreferences={this.state.travelPreferences} title={t("My Travel")} />
                            <div className="middle-content-padding">
                                {!this.state.loader &&
                                    <CommonGrid rewardsData={this.state.selectedId} headings={this.state.headings} tableName={t("My travel")} history={this.props.history} />
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
export default withTranslation()(withRouter(MyTravel))
