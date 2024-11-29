import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';


class BarChartGraph extends Component {

    render() {
        const { t } = this.props
        return (
            <div className="dashboard-layout background-white table-responsive">
                <div className='graph-heder'>
                    <div className='left-header'>
                    </div>
                    <div className='right-header text-right'>
                        <button
                            type="button"
                            className="btn-primary view-btn"
                            onClick={() => this.props.history.push("/paymentSummary")}
                        >
                            {t("View All")}
                        </button>
                    </div>
                </div>
                <div>
                    <canvas id="bar-chart" width="300" height="300"></canvas>
                </div>
            </div>
        )
    }
}
export default withTranslation()(withRouter(BarChartGraph))