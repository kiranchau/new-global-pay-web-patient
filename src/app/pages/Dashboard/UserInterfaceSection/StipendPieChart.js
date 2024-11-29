import React, { Component } from 'react'
import Progress from 'react-progressbar';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class StipendPieChart extends Component {

    render() {
        const { t } = this.props
        return (
            <div className="dash-slider-wrap background-white table-responsive">
                <div className='graph-heder'>
                    <div className='left-header'>
                        <h4>{t("Payment summary")} - {t("Stipends")}</h4>
                    </div>
                </div>
                <div>
                    <div id="Stipend_Main" >
                        <canvas id="Stipend" height="300" width="300" />
                    </div>
                    <div id="data-not-found-stipends">
                        <div className='no-data-row'>
                            <div colSpan={5}>
                                <div className="data-not-found">
                                    <img
                                        src="/media/misc/MicrosoftTeams-image.png"
                                        alt="unable to load"
                                        width="100"
                                        height="100"
                                    />
                                    <label className="text-center no-data-text">{t("No stipends summary available")}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='progress-bar-wrap'>
                    <div className='paid-bar'>
                        <div className='d-flex bar-label'>
                            <>
                                <label>{t("Paid Amount")}</label><label>: <b>{Number(this.props.stipendPaidTotalAmountCount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</b></label>
                            </>
                        </div>
                        <Progress color={this.props.pieChartPaidColorCode} completed={this.props.stipendPaidPercent} />
                    </div>
                    <div className='pending-bar'>
                        <div className='d-flex bar-label'>
                            <>
                                <label>{t("Pending Amount")}</label><label>: <b>{Number(this.props.stipendPendingTotalAmountCount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</b></label>
                            </>
                        </div>
                        <Progress color={this.props.pieChartPendingColorCode} completed={this.props.stipendPendingPercent} />
                    </div>
                </div>
                <hr />
                <div className='bottom-label'>
                    <div className='left'>
                        <>
                            <label>{t("Paid Stipends")}</label><label>: <b>{this.props.paidStipends}</b></label>
                        </>
                    </div>
                    <div className='left'>
                        <>
                            <label>{t("Pending Stipends")}</label><label>: <b>{this.props.pendingStipends}</b></label>
                        </>
                    </div>
                </div>
            </div>
        )
    }
}
export default withTranslation()(withRouter(StipendPieChart))