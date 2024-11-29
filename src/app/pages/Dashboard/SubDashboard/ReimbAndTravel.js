
import React, { Component } from 'react'
import { Chart } from 'chart.js';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ReimbursementPieChart from '../UserInterfaceSection/ReimbursementPieChart';
import StudySummaryDoughnut from '../UserInterfaceSection/StudySummaryDoughnut';
import TravelNotificationCard from '../UserInterfaceSection/TravelNotificationCard';

class ReimbAndTravel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reimbursementAddition: this.props.reimbursementPieChartData,
            myStudiesData: this.props.counter,
            notificationData: this.props.notification,
            reimPendingPercent: 0,
            reimPaidPercent: 0,
            reimPaidTotalAmountCount: 0,
            reimPendingTotalAmountCount: 0,
            t: withTranslation(["Common"]),
            pieChartPendingColorCode: "#CE8B54",
            pieChartPaidColorCode: "#00917C",
            pendingReimbursements: 0,
            paidReimbursements: 0,
            graphremReimbursement: undefined,
            grapActive: undefined,
            grapCompleted: undefined,
            reimbursementPieChart: [],
            activeStudies: 0,
            activePending: 0,
            completedPending: 0,
            studiesData: [],
            completedStudies: 0,
        }
    }

    componentDidMount() {
        this.loadReimbursementPieChart()
        if (this.state.reimbursementAddition.length !== 0) {
            document.getElementById('Reimbursement_Main').style.display = "block"
            document.getElementById('data-not-found-reimbursement').style.display = "none"
        } else {
            document.getElementById('Reimbursement_Main').style.display = "none"
            document.getElementById('data-not-found-reimbursement').style.display = "block"
        }
        this.myStudiesActive();
        if (this.state.myStudiesData.length !== 0) {
            document.getElementById('active_Main').style.display = "block"
        } else {
            document.getElementById('active_Main').style.display = "none"
        }
    }

    //Reimbursement pie chart Data.
    loadReimbursementPieChart = () => {
        let total = 0;
        let paidReimResult = 0;
        let pendingReimResult = 0;
        this.state.reimbursementPieChart = [];
        this.state.reimbursementAddition.map((Obj) => {
            if (Obj.status === "1.0" || Obj.status === "2.0") {
                total = total + 1;
            }
            if (Obj.status === "1.0") {
                pendingReimResult = pendingReimResult + 1;
                this.setState({ pendingReimbursements: pendingReimResult, }, () => { })
                if (Obj.amount) {
                    this.state.reimPendingTotalAmountCount = this.state.reimPendingTotalAmountCount + parseFloat(Obj.amount)
                }
            }
            else if (Obj.status === "2.0") {
                paidReimResult = paidReimResult + 1
                this.setState({ paidReimbursements: paidReimResult, }, () => { })
                if (Obj.amount) {
                    this.state.reimPaidTotalAmountCount = this.state.reimPaidTotalAmountCount + parseFloat(Obj.amount);
                }
            }
            this.state.reimPendingPercent = ((pendingReimResult * 100) / total).toFixed(0);
            this.state.reimPaidPercent = ((paidReimResult * 100) / total).toFixed(0);
        })
        this.state.reimbursementPieChart = [this.state.reimPendingPercent, this.state.reimPaidPercent]
        let ctx = document.getElementById('Reimbursement').getContext('2d');
        if (this.state.graphremReimbursement !== undefined) {
            this.state.graphremReimbursement.destroy()
        }

        this.state.graphremReimbursement = new Chart(ctx, {
            type: "pie",
            data: {
                labels: [this.props.t("Pending"), this.props.t("Paid")],
                datasets: [{
                    backgroundColor: ["#CE8B54", "#00917C"],
                    borderColor: ["#CE8B54", "#00917C"],
                    borderWidth: 1,
                    data: this.state.reimbursementPieChart,
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
                        color: 'white',
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
        this.state.graphremReimbursement.update();
    }

    //Studies chart data.
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
                        color: "white",
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
        return (
            <div>
                <div className="middle-content">
                    <ReimbursementPieChart
                        reimPaidTotalAmountCount={this.state.reimPaidTotalAmountCount}
                        reimPaidPercent={this.state.reimPaidPercent}
                        pieChartPaidColorCode={this.state.pieChartPaidColorCode}
                        reimPendingTotalAmountCount={this.state.reimPendingTotalAmountCount}
                        pieChartPendingColorCode={this.state.pieChartPendingColorCode}
                        reimPendingPercent={this.state.reimPendingPercent}
                        paidReimbursements={this.state.paidReimbursements}
                        pendingReimbursements={this.state.pendingReimbursements}
                    />
                    <StudySummaryDoughnut
                        activeStudies={this.state.activeStudies}
                        completedStudies={this.state.completedStudies}
                    />
                    <TravelNotificationCard notificationData={this.state.notificationData}/>
                </div >
            </div >
        )
    }
}

export default withTranslation()(withRouter(ReimbAndTravel))