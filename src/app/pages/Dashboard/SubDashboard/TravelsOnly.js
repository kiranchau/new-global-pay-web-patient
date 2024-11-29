import { Chart } from 'chart.js';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import StudySummaryDoughnut from '../UserInterfaceSection/StudySummaryDoughnut';
import TravelNotificationCard from '../UserInterfaceSection/TravelNotificationCard';

class TravelsOnly extends Component {
    constructor(props) {
        super(props)
        this.state = {
            travelAddition: this.props.pieChartData,
            myStudiesData: this.props.counter,
            notificationData: this.props.notification,
            travelPieChart: [],
            travelStautsPending: 0,
            travelStatusDenied: 0,
            travelStatusApproved: 0,
            travelStatusBooked: 0,
            travelStatusReceived: 0,
            grapTravel: undefined,
            grapActive: undefined,
            grapCompleted: undefined,
            t: withTranslation(["Common"]),
            activeStudies: 0,
            activePending: 0,
            completedPending: 0,
            studiesData: [],
            completedStudies: 0,
        }
    }

    componentDidMount() {
        this.loadTravelPieChart();
        if (this.state.travelAddition.length !== 0) {
            document.getElementById('Travel_Main').style.display = "block"
            document.getElementById('data-not-found-travels').style.display = "none"
        } else {
            document.getElementById('Travel_Main').style.display = "none"
            document.getElementById('data-not-found-travels').style.display = "block"
        }
        this.myStudiesActive();
        if (this.state.myStudiesData.length !== 0) {
            document.getElementById('active_Main').style.display = "block"
        } else {
            document.getElementById('active_Main').style.display = "none"
        }
    }

    //travel pie chart data show
    loadTravelPieChart = () => {
        this.state.travelPieChart = [];
        let total = 0;
        let travelCurrentStatusPending = 0;
        let travelCurrentStatusDenied = 0;
        let travelCurrentStatusApproved = 0;
        let travelCurrentStatusCancelled = 0;
        let travelCurrentStatusReceived = 0;
        let travelCurrentStatusBooked = 0;
        this.state.travelAddition.map((Obj) => {
            total = total + 1;
            if (Obj.travel_status === "Submitted - Pending") {
                travelCurrentStatusPending = travelCurrentStatusPending + 1;
            } else if (Obj.travel_status === "Denied") {
                travelCurrentStatusDenied = travelCurrentStatusDenied + 1;
            } else if (Obj.travel_status === "Approved") {
                travelCurrentStatusApproved = travelCurrentStatusApproved + 1;
            } else if (Obj.travel_status === "Cancelled") {
                travelCurrentStatusCancelled = travelCurrentStatusCancelled + 1;
            }
            else if (Obj.travel_status === "Booked") {
                travelCurrentStatusBooked = travelCurrentStatusBooked + 1;
            }
            else if (Obj.travel_status === "Received") {
                travelCurrentStatusReceived = travelCurrentStatusReceived + 1;
            }
            this.state.travelStautsPending = ((travelCurrentStatusPending * 100) / total).toFixed(0);
            this.state.travelStatusDenied = ((travelCurrentStatusDenied * 100) / total).toFixed(0);
            this.state.travelStatusApproved = ((travelCurrentStatusApproved * 100) / total).toFixed(0);
            this.state.travelStatusCancelled = ((travelCurrentStatusCancelled * 100) / total).toFixed(0);
            this.state.travelStatusReceived = ((travelCurrentStatusReceived * 100) / total).toFixed(0);
            this.state.travelStatusBooked = ((travelCurrentStatusBooked* 100) / total).toFixed(0);
        })
        this.state.travelPieChart = [
            this.state.travelStatusApproved,
            this.state.travelStautsPending,
            this.state.travelStatusDenied,
            this.state.travelStatusCancelled,
            this.state.travelStatusReceived,
            this.state.travelStatusBooked
        ]
        let ctx = document.getElementById('Travel').getContext('2d');
        if (this.state.grapTravel !== undefined) {
            this.state.grapTravel.destroy()
        }
        this.state.grapTravel = new Chart(ctx, {
            type: "pie",
            data: {
                labels: [this.props.t("Approved"), this.props.t("Pending"), this.props.t("Denied"), this.props.t("Cancelled"),this.props.t("Booked"),this.props.t("Received")],
                datasets: [{
                    backgroundColor: ["#00917C", "#CE8B54", "#3A3637", "#992409",'rgb(27 95 135)' ,'rgb(233 187 30)'],
                    borderColor: ["#00917C", "#CE8B54", "#3A3637", "#992409"],
                    borderWidth: 1,
                    data: this.state.travelPieChart,
                }]
            },
            plugins: [ChartDataLabels],
            options: {
                elements: {
                    arc: {
                        borderWidth: 0,
                    },
                    line: {
                        tension: 0,
                        fill: true
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (Item) => Item.label + ": " + Item.formattedValue + '%'
                        }
                    },
                    legend: { display: false },
                    datalabels: {
                        formatter: (value, ctx) => {
                            const label = ctx.chart.data.labels[ctx.dataIndex];
                            return value === "0" ? "" : `${value}%`;
                        },
                        display: true,
                        color: "white",
                        font: {
                            color: 'black',
                            weight: 'bold',
                        }
                    },
                },
                title: {
                    display: true,
                    text: ""
                },
                hover: { mode: null },
            }
        })
        this.state.grapTravel.update();
    }

    //studies chart data show.
    myStudiesActive = () => {
        let total = 0;
        this.state.studiesData = [];
        this.state.myStudiesData.map((Obj) => {
            total = total + 1;
            if (Obj.status === "0") {
                this.state.activeStudies = this.state.activeStudies + 1;
            }
            if (Obj.status === "2") {
                this.state.completedStudies = this.state.completedStudies + 1;
            }
        })
        this.state.studiesData = [this.state.activeStudies, this.state.completedStudies]

        let ctx = document.getElementById('active').getContext('2d');
        if (this.state.grapActive !== undefined) {
            this.state.grapActive.destroy()
        }
        this.state.grapActive = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [this.props.t("Active"), this.props.t("Completed")],
                datasets: [{
                    data: this.state.studiesData,
                    backgroundColor: ["#CE8B54", "#00917C"],
                    hoverBackgroundColor: ["#CE8B54", "#00917C"]
                }]
            },
            plugins: [ChartDataLabels],
            options: {
                plugins: {
                    legend: { display: false },
                    datalabels: {
                        formatter: (value, ctx) => {
                            const label = ctx.chart.data.labels[ctx.dataIndex];
                            return value === 0 ? "" : `${value}`;
                        },
                        display: true,
                        color: 'white',
                        font: {
                            color: 'black',
                            weight: 'bold',
                        }
                    },
                },
                elements: {
                    center: {
                        text: '50%'  //set as you wish
                    },
                    arc: {
                        borderWidth: 0,
                    }
                },
                cutoutPercentage: 75,
            }
        });
        this.state.grapActive.update();
    }

    render() {
        const { t } = this.props
        return (
            <div>
                <div className="middle-content">
                    <div className="dash-slider-wrap background-white table-responsive travel-chart-wrap">
                        <div className='graph-heder'>
                            <div className='left-header'>
                                <h4>{t("Travel summary")}</h4>
                            </div>
                        </div>
                        <div className='pie-chart-column'>
                            <div id="Travel_Main" >
                                <canvas id="Travel" height="300" width="300" />
                            </div>
                            <div className='progress-bar-wrap'>
                                <div className='pending-bar chart-status'>
                                    <div className='d-flex bar-label'>
                                        <span className="status-box" style={{ backgroundColor: '#00917C' }}></span>
                                        <label>{t("Approved")}</label>
                                    </div>
                                    <span className='status-per'>{this.state.travelStatusApproved}%</span>
                                </div>
                                <div className='pending-bar chart-status'>
                                    <div className='d-flex bar-label'>
                                        <span className="status-box" style={{ backgroundColor: '#CE8B54' }}></span>
                                        <label>{t("Pending")}</label>
                                    </div>
                                    <span className='status-per'>{this.state.travelStautsPending}%</span>
                                </div>
                                <div className='pending-bar chart-status'>
                                    <div className='d-flex bar-label'>
                                        <span className="status-box" style={{ backgroundColor: '#3A3637' }}></span>
                                        <label>{t("Denied")}</label>
                                    </div>
                                    <span className='status-per'>{this.state.travelStatusDenied}%</span>
                                </div>

                                <div className='pending-bar chart-status'>
                                    <div className='d-flex bar-label'>
                                        <span className="status-box" style={{ backgroundColor: '#992409' }}></span>
                                        <label>{t("Cancelled")}</label>
                                    </div>
                                    <span className='status-per'>{this.state.travelStatusCancelled}%</span>
                                </div>
                                <div className='pending-bar chart-status'>
                                    <div className='d-flex bar-label'>
                                        <span className="status-box" style={{ backgroundColor: 'rgb(233 187 30)' }}></span>
                                        <label>{t("Received")}</label>
                                    </div>
                                    <span className='status-per'>{this.state.travelStatusReceived}%</span>
                                </div>
                                <div className='pending-bar chart-status'>
                                    <div className='d-flex bar-label'>
                                        <span className="status-box" style={{ backgroundColor: 'rgb(27 95 135)' }}></span>
                                        <label>{t("Booked")}</label>
                                    </div>
                                    <span className='status-per'>{this.state.travelStatusBooked}%</span>
                                </div>
                            </div>

                            <div id="data-not-found-travels">
                                <center>
                                    <tr className='no-data-row dddf'>
                                        <td colSpan={5}>
                                            <div className="data-not-found">
                                                <img
                                                    src="/media/misc/MicrosoftTeams-image.png"
                                                    alt="unable to load"
                                                    width="100"
                                                    height="100"
                                                />
                                                <label className="text-center no-data-text">{t("No travels summary available")}</label>
                                            </div>
                                        </td>
                                    </tr>
                                </center>
                            </div>
                        </div>
                    </div>
                    <StudySummaryDoughnut
                        activeStudies={this.state.activeStudies}
                        completedStudies={this.state.completedStudies}
                    />
                    <TravelNotificationCard notificationData={this.state.notificationData} />
                </div>
            </div>
        )
    }
}
export default withTranslation()(withRouter(TravelsOnly))