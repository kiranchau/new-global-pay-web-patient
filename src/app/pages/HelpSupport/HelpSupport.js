import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Footer } from '../Layout/Footer';
import { Header } from '../Layout/Header';
import { SideNav } from '../Layout/SideNav';
import { withTranslation } from 'react-i18next';

class HelpSupport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sideMenu: false,
      t: withTranslation(["Common"]),
      travelPreferences: true,
    }
  }

  //dropdown select the study wise sidebar menu and left side popup travelpreferences icon hide show.
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
  }

  //Parent-to-child component call data update.
  handleToUpdate = () => {
    this.componentDidMount();
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <main className="dashboard-wrap inner-page">
          <div className="">
            <SideNav sideMenu={this.state.sideMenu} travelPreferences={this.state.travelPreferences} />
            <div className="right-section left-space">
              <Header handleToUpdate={() => this.handleToUpdate.bind(this)} travelPreferences={this.state.travelPreferences} title={t("Help & Product Support")} />
              <div className="middle-content-padding">
                <div className="middle-content mt-3">
                  <div className="dashboard-layout background-white help_support">
                    <div className="dash-reimbursement-table">
                      <div className="text-center help-info-text border-0" style={{ display: "block" }}>
                        <p>{t("Please contact your clinical side for general assistance, or if you need to cancel reschedule your study visit.")}<br />
                          {t("If you need to amend or cancel your travel request, please contact Clinedge at")} <a href="tel:8004282147">
                            <svg className='mr-2 ml-2' xmlns="http://www.w3.org/2000/svg" width="19.299" height="19.334" viewBox="0 0 19.299 19.334">
                              <path id="help-phone" d="M19.41,14.977v2.609a1.74,1.74,0,0,1-1.9,1.74,17.212,17.212,0,0,1-7.506-2.67,16.96,16.96,0,0,1-5.219-5.219A17.212,17.212,0,0,1,2.119,3.9,1.74,1.74,0,0,1,3.85,2H6.459A1.74,1.74,0,0,1,8.2,3.5,11.168,11.168,0,0,0,8.807,5.94a1.74,1.74,0,0,1-.391,1.835l-1.1,1.1A13.916,13.916,0,0,0,12.53,14.1l1.1-1.1A1.74,1.74,0,0,1,15.47,12.6a11.168,11.168,0,0,0,2.444.609,1.74,1.74,0,0,1,1.5,1.766Z" transform="translate(-1.111 -1)" fill="none" stroke="#75dc00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                            800-428-2147</a>.</p>
                      </div>
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
}
export default withTranslation()(withRouter(HelpSupport))