import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class StudySummaryDoughnut extends Component {
   
    render() {
        const { t } = this.props
        return (
            <div className="dash-slider-wrap background-white table-responsive travel-chart-wrap">
                <div className='graph-heder'>
                    <div className='left-header'>
                        <h4>{t("Study summary")}</h4>
                    </div>
                </div>
                <div className='pie-chart-column'>
                    <div id="active_Main" className='donut-chart mt-3'>
                        <canvas id="active" height="300" width="300" />
                    </div>
                    <div className='progress-bar-wrap'>
                        <div className='pending-bar chart-status'>
                            <div className='d-flex bar-label'>
                                <span className="status-box" style={{ backgroundColor: '#CE8B54' }}></span>
                                <label>{t("Active")}</label>
                            </div>
                            <span className='status-per'>{this.props.activeStudies}</span>
                        </div>
                        <div className='pending-bar chart-status'>
                            <div className='d-flex bar-label'>
                                <span className="status-box" style={{ backgroundColor: '#00917C' }}></span>
                                <label>{t("Completed")}</label>
                            </div>
                            <span className='status-per'>{this.props.completedStudies}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withTranslation()(withRouter(StudySummaryDoughnut))