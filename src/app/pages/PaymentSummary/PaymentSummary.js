import React, { Component } from 'react'
import CommonGrid from '../../CommonGrid/CommonGrid';
import { reimbursements } from '../../modules/Auth/_redux/authCrud';
import { Footer } from '../Layout/Footer';
import { Header } from '../Layout/Header';
import { SideNav } from '../Layout/SideNav';
import moment from "moment";
import Loading from 'react-loading-bar'
import { withRouter } from "react-router";
import { withTranslation } from 'react-i18next';


class PaymentSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loader: false,
            t: withTranslation(["Common"]),
            headings: [
                { Name: "Visitname", id: 1 },
                { Name: "Reimbursementamount", id: 2 },
                { Name: "Number Of Items", id: 3 },
                { Name: "Submitdate", id: 4 },
                { Name: "Status", id: 5 },
            ],
            selectedId: [],
            travelPreferences: true,
            filesLength: null,
        }
    }

    // Conditions based icon Hide show sidebar and left side popup
    componentDidMount() {
        if (
            localStorage.getItem("ConditionsReimbursements") === "1" &&
            localStorage.getItem("ConditionsStipends") === "1" &&
            localStorage.getItem('ConditionsTaravales') === "0"
        ) {
            if (window.location.pathname === "/paymentSummary") {
                this.props.history.push("/stipend");
                this.setState({ travelPreferences: true }, () => { })
            }
        } else if (
            localStorage.getItem("ConditionsReimbursements") !== "1" &&
            localStorage.getItem("ConditionsStipends") === "1" &&
            localStorage.getItem('ConditionsTaravales') === "0"
        ) {
            if (window.location.pathname === "/paymentSummary") {
                this.setState({ travelPreferences: false }, () => { })
                this.props.history.push("/stipend");
            }
        } else if (
            localStorage.getItem("ConditionsReimbursements") === "1" &&
            localStorage.getItem("ConditionsStipends") !== "1" &&
            localStorage.getItem('ConditionsTaravales') === "0"
        ) {
            this.setState({ travelPreferences: false }, () => { })
        }
        this.dataShow();
    }

    //Reimbursement Api calling and passing the Data in Commongrid
    dataShow = () => {
        this.setState({ loader: true }, () => { })
        this.state.selectedId = []
        let statusLabel = "";
        reimbursements(localStorage.getItem('id'),
            localStorage.getItem('StudiesId')).then((res) => {
                for (var x = 0; x < res.data.records.length; x++) {

                    let demoCount = null;
                    if (res.data.records[x].id === null) {
                    } else {
                        if (res.data.records[x]) {
                            var filesData = [];
                            if (res.data.records[x].status === "2.0")
                                statusLabel = "Approved".replaceAll('"', "");
                            else if (res.data.records[x].status === "1.0")
                                statusLabel = "Pending".replaceAll('"', "");
                            else if (res.data.records[x].status === "1.1")
                                statusLabel = "Reviewed".replaceAll('"', "");
                            else if (res.data.records[x].status === "0.0")
                                statusLabel = "Draft".replaceAll('"', "");
                            else if (res.data.records[x].status === "4.0")
                                statusLabel = "Cancelled".replaceAll('"', "");
                            else if (res.data.records[x].status === "3.0")
                                statusLabel = "Denied".replaceAll('"', "");
                            else if (res.data.records[x].status === "5.0")
                                statusLabel = "Recalled".replaceAll('"', "");
                            for (var i = 0; i < res.data.records[x].items.length; i++) {
                                filesData.push(res.data.records[x].items[i]);
                                for (var j = 0; j < res.data.records[x].items[i].files.length; j++) {
                                    demoCount = res.data.records[x].items[i].files.length
                                }
                                this.setState({ filesLength: demoCount }, () => { })
                            }
                        }
                    }
                    this.state.selectedId.push(
                        {
                            "id": res.data.records[x].id,
                            "Visitname": res.data.records[x].visit_name.name,
                            "Reimbursementamount": parseFloat(res.data.records[x].amount),
                            "Number Of Items": res.data.records[x]._num_items,
                            "Submitdate": res.data.records[x].date_request,
                            "Status": res.data.records[x].status,
                            "label": statusLabel,
                            "Visit_id": res.data.records[x].visit_id,
                            "SearchDate": moment(res.data.records[x].date_request).format("DD-MMM-YYYY"),
                            "File": filesData,
                            "FileLength": this.state.filesLength,
                        },
                    );
                }
                this.setState({ loader: false }, () => { })
            }).catch((error) => {
                this.setState({ loader: false }, () => { })
            }).finally(() => {
                if (
                    localStorage.getItem("ConditionsReimbursements") === "1" &&
                    localStorage.getItem("ConditionsStipends") === "1" &&
                    localStorage.getItem('ConditionsTaravales') === "0"
                ) {
                    if (window.location.pathname === "/paymentSummary") {
                        this.props.history.push("/stipend");
                        this.setState({ travelPreferences: true }, () => { })
                    }
                } else if (
                    localStorage.getItem("ConditionsReimbursements") !== "1" &&
                    localStorage.getItem("ConditionsStipends") !== "1" &&
                    localStorage.getItem('ConditionsTaravales') !== "0"
                ) {
                    if (window.location.pathname === "/paymentSummary") {
                        this.setState({ sideMenu: false, travelPreferences: true }, () => { })
                        this.props.history.push("/dashboard")
                    }
                } else if (
                    localStorage.getItem("ConditionsReimbursements") === "1" &&
                    localStorage.getItem("ConditionsStipends") !== "1" &&
                    localStorage.getItem('ConditionsTaravales') !== "0"
                ) {
                    this.setState({ travelPreferences: true }, () => { })
                } else if (
                    localStorage.getItem("ConditionsReimbursements") !== "1" &&
                    localStorage.getItem("ConditionsStipends") === "1" &&
                    localStorage.getItem('ConditionsTaravales') !== "0"
                ) {
                    if (window.location.pathname === "/paymentSummary") {
                        this.props.history.push("/stipend");
                    }
                } else if (
                    localStorage.getItem("ConditionsReimbursements") !== "1" &&
                    localStorage.getItem("ConditionsStipends") !== "1" &&
                    localStorage.getItem('ConditionsTaravales') === "0"
                ) {
                    if (window.location.pathname === "/paymentSummary") {
                        this.props.history.push("/dashboard")
                    }
                } else if (
                    localStorage.getItem("ConditionsReimbursements") === "1" &&
                    localStorage.getItem("ConditionsStipends") === "1" &&
                    localStorage.getItem('ConditionsTaravales') !== "0"
                ) {
                    if (window.location.pathname === "/paymentSummary") {
                        this.props.history.push("/stipend");
                    }
                } else if (
                    localStorage.getItem("ConditionsReimbursements") === "1" &&
                    localStorage.getItem("ConditionsStipends") !== "1" &&
                    localStorage.getItem('ConditionsTaravales') === "0"
                ) {
                    this.setState({ travelPreferences: false }, () => { })
                } else if (
                    localStorage.getItem("ConditionsReimbursements") !== "1" &&
                    localStorage.getItem("ConditionsStipends") === "1" &&
                    localStorage.getItem('ConditionsTaravales') === "0"
                ) {
                    if (window.location.pathname === "/paymentSummary") {
                        this.props.history.push("/stipend");
                    }
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
                        <SideNav travelPreferences={this.state.travelPreferences} />
                        <div className="right-section left-space">
                            <Header handleToUpdate={() => this.handleToUpdate.bind(this)} travelPreferences={this.state.travelPreferences} title={t("Payment Summary")} />
                            <div className="middle-content-padding">
                                {!this.state.loader &&
                                    <CommonGrid rewardsData={this.state.selectedId} headings={this.state.headings} tableName={t("Payment Summary")} history={this.props.history} />
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
export default withTranslation()(withRouter(PaymentSummary))