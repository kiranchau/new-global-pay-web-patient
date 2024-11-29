import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import moment from 'moment'

class TravelNotificationCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { t } = this.props
        return (
            <div className="Notification-alert background-white">
                <div className="tabel-header">
                    <h4>{t("Confirmed Travel")}</h4>
                    {
                        this.props.notificationData.length !== 0 ?
                            <button type="button " className="btn-primary view-btn"
                                onClick={() => this.props.history.push("/myTravel")}
                            >
                                {t("View All")}
                            </button>
                            : ""
                    }
                </div>
                <div className="travel-ticket-wrap">
                    {
                        this.props.notificationData.length !== 0 ?
                            this.props.notificationData.map((Obj) => {
                                return (
                                    <div className="travel-ticket" key={Obj.id}>
                                        <p className="display-flex">
                                           
                                            
                                        </p>
                                        <div className="display-flex destination">
                                           <div>
                                             <span className="label">{t("From")}</span>
                                              <p className="mb-0 destination-name">{Obj.travel_from === "" ? "" : Obj.travel_from.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())}</p>
                                            </div>
                                            <span className="time-duration"><img className="views-icon" alt="" src="/media/images/aroplane.svg" width="100%" /></span>
                                            <div>
                                            <span className="label">{t("To")}</span>
                                            <p className="mb-0 destination-name">{Obj.travel_to === "" ? "" : Obj.travel_to.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white inner-card">
                                            <div className="display-flex travel-date-card">
                                                <p className="mb-2 label">{t("Traveldate")}</p>
                                                <p className="mb-0 travel-date ml-1">{moment.utc(Obj.travel_start_date).local().format('DD MMM YYYY')}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div className="data-not-found">
                                <img
                                    src="/media/misc/MicrosoftTeams-image.png"
                                    alt="unable to load"
                                />
                                <label className="text-center no-data-text">{t("There are no recorded travel arrangements for the next 5 days to display.")}</label>
                            </div>
                    }
                </div>
            </div>
        )
    }
}
export default withTranslation()(withRouter(TravelNotificationCard))