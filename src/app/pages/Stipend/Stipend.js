import React, { Component } from 'react'
import CommonGrid from '../../CommonGrid/CommonGrid';
import { stipendData } from '../../modules/Auth/_redux/authCrud';
import { Footer } from '../Layout/Footer';
import { Header } from '../Layout/Header';
import Loading from 'react-loading-bar'
import { SideNav } from '../Layout/SideNav';
import moment from "moment";
import { withRouter } from "react-router";
import { withTranslation } from 'react-i18next';


class Stipend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: false,
      t: withTranslation(["Common"]),
      headings: [
        { Name: "Visitname", id: 1 },
        { Name: "Stipendamount", id: 2 },
        { Name: "Completeddate", id: 3 },
        { Name: "Status", id: 4 },
      ],
      selectedId: [],
      sideMenu: false,
      travelPreferences: true,
    }
  }

  //Conditions based icon Hide show sidebar and left side popup
  componentDidMount() {
    if (
      localStorage.getItem("ConditionsReimbursements") === "1" &&
      localStorage.getItem("ConditionsStipends") === "1" &&
      localStorage.getItem('ConditionsTaravales') === "0"
    ) {
      this.setState({ sideMenu: true, travelPreferences: false }, () => { })
    } else if (
      localStorage.getItem("ConditionsReimbursements") !== "1" &&
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
    this.dataShow();
  }

  //Stipend Api calling and passing the Data in Commongrid
  dataShow = () => {
    this.setState({ loader: true }, () => { })
    this.state.selectedId = []
    let CompletedDateData = "";
    let statusLabel = "";
    stipendData(localStorage.getItem('StudiesId'),
      localStorage.getItem('id'),
      localStorage.getItem('SiteId'))
      .then((res) => {
        for (let x = 0; x < res.data.records.length; x++) {
          CompletedDateData = res.data.records[x].date
          if (res.data.records[x].status === "2.0")
            statusLabel = "Approved".replaceAll('"', "");
          else if (res.data.records[x].status === "1.0")
            statusLabel = "Pending".replaceAll('"', "");
          else if (res.data.records[x].status === "1.1")
            statusLabel = "Reviewed".replaceAll('"', "");
          else if (res.data.records[x].status === "0.0")
            statusLabel = "Draft".replaceAll('"', "");
          else if (res.data.records[x].status === "5.0")
            statusLabel = "Recalled".replaceAll('"', "");

          this.state.selectedId.push(
            {
              "id": res.data.records[x].id,
              "Visitname": res.data.records[x].name,
              "Stipendamount": parseFloat(res.data.records[x].stipend),
              "Completeddate": !CompletedDateData ? " " : CompletedDateData,
              "Status": res.data.records[x].status,
              "label": statusLabel,
              "SearchDate": !CompletedDateData ? " " : moment(CompletedDateData).format("DD-MMM-YYYY"),
            },
          );
        }
        this.setState({ loader: false }, () => { })
      }).catch((err) => {
        this.setState({ loader: false }, () => { })
      }).finally(() => {
        if (
          localStorage.getItem("ConditionsStipends") === "1" &&
          localStorage.getItem("ConditionsReimbursements") === "1" &&
          localStorage.getItem("ConditionsTaravales") === "0"
        ) {
          this.setState({ travelPreferences: false }, () => { })
        }
        else if (
          localStorage.getItem("ConditionsReimbursements") !== "1" &&
          localStorage.getItem("ConditionsStipends") !== "1" &&
          localStorage.getItem('ConditionsTaravales') !== "0"
        ) {
          if (window.location.pathname === "/stipend") {
            this.setState({ sideMenu: false, travelPreferences: true }, () => { })
            this.props.history.push("/dashboard")
          }
        } else if (
          localStorage.getItem("ConditionsReimbursements") === "1" &&
          localStorage.getItem("ConditionsStipends") !== "1" &&
          localStorage.getItem('ConditionsTaravales') !== "0"
        ) {
          if (window.location.pathname === "/stipend") {
            this.props.history.push("/paymentSummary")
          }
        } else if (
          localStorage.getItem("ConditionsReimbursements") !== "1" &&
          localStorage.getItem("ConditionsStipends") === "1" &&
          localStorage.getItem('ConditionsTaravales') !== "0"
        ) {
          this.setState({ travelPreferences: true }, () => { })
          this.props.history.push("/stipend")
        } else if (
          localStorage.getItem("ConditionsReimbursements") !== "1" &&
          localStorage.getItem("ConditionsStipends") !== "1" &&
          localStorage.getItem('ConditionsTaravales') === "0"
        ) {
          if (window.location.pathname === "/stipend") {
            this.props.history.push("/dashboard")
          }
        } else if (
          localStorage.getItem("ConditionsReimbursements") === "1" &&
          localStorage.getItem("ConditionsStipends") === "1" &&
          localStorage.getItem("ConditionsTaravales") !== "0"
        ) {
          this.setState({ travelPreferences: true }, () => { })
        } else if (
          localStorage.getItem("ConditionsReimbursements") === "1" &&
          localStorage.getItem("ConditionsStipends") !== "1" &&
          localStorage.getItem('ConditionsTaravales') === "0"
        ) {
          if (window.location.pathname === "/stipend") {
            this.props.history.push("/paymentSummary")
          }
        } else if (
          localStorage.getItem("ConditionsReimbursements") !== "1" &&
          localStorage.getItem("ConditionsStipends") === "1" &&
          localStorage.getItem('ConditionsTaravales') === "0"
        ) {
          this.setState({ travelPreferences: false }, () => { })
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
                  <CommonGrid rewardsData={this.state.selectedId} headings={this.state.headings} tableName={t("Stipend")} history={this.props.history} />
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
export default withTranslation()(withRouter(Stipend))