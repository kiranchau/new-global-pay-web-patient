
import React, { Component } from 'react'
import { Chart } from 'chart.js';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import StipendPieChart from '../UserInterfaceSection/StipendPieChart';
import StudySummaryDoughnut from '../UserInterfaceSection/StudySummaryDoughnut';
import TravelNotificationCard from '../UserInterfaceSection/TravelNotificationCard';

class StipendAndTravel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stipendAddition: this.props.stipendPieChartData,
            myStudiesData: this.props.counter,
            notificationData: this.props.notification,
            pendingStipendResult: 0,
            stipendPendingTotalAmountCount: 0,
            stipendPaidTotalAmountCount: 0,
            stipendPendingPercent: 0,
            stipendPaidPercent: 0,
            stipendPieChart: [],
            t: withTranslation(["Common"]),
            grapStipend: undefined,
            grapActive: undefined,
            grapCompleted: undefined,
            pieChartPendingColorCode: "#CE8B54",
            pieChartPaidColorCode: "#00917C",
            activeStudies: 0,
            activePending: 0,
            completedPending: 0,
            studiesData: [],
            completedStudies: 0,
            stipendPending: 0,
            stipendPaid: 0,
        }
    }

    componentDidMount() {
        this.loadStipendPieChart();
        if (this.state.stipendAddition.length !== 0) {
            document.getElementById('Stipend_Main').style.display = "block"
            document.getElementById('data-not-found-stipends').style.display = "none"
        } else {
            document.getElementById('Stipend_Main').style.display = "none"
            document.getElementById('data-not-found-stipends').style.display = "block"
        }
        this.myStudiesActive();
        if (this.state.myStudiesData.length !== 0) {
            document.getElementById('active_Main').style.display = "block"
        } else {
            document.getElementById('active_Main').style.display = "none"
        }
    }

    //stipend pie chart data.
    loadStipendPieChart = () => {
        let total = 0;
        let paidStipendResult = 0;
        this.state.stipendPieChart = []
        let pendingStipendResult = 0;
        this.state.stipendAddition.map((Obj) => {
            if (Obj.status === "1.0" || Obj.status === "2.0") {
                total = total + 1;
            }
            if (Obj.status === "1.0") {
                pendingStipendResult = pendingStipendResult + 1;
                this.setState({ stipendPending: pendingStipendResult, }, () => { })
                if (Obj.amount) {
                    this.state.stipendPendingTotalAmountCount = this.state.stipendPendingTotalAmountCount + parseFloat(Obj.amount);
                }
            } else if (Obj.status === "2.0") {
                paidStipendResult = paidStipendResult + 1
                this.setState({ stipendPaid: paidStipendResult, }, () => { })
                if (Obj.amount) {
                    this.state.stipendPaidTotalAmountCount = this.state.stipendPaidTotalAmountCount + parseFloat(Obj.amount);
                }
            }
            this.state.stipendPendingPercent = ((pendingStipendResult * 100) / total).toFixed(0);
            this.state.stipendPaidPercent = ((paidStipendResult * 100) / total).toFixed(0);
        })

        this.state.stipendPieChart = [this.state.stipendPendingPercent, this.state.stipendPaidPercent]
        let ctx = document.getElementById('Stipend').getContext('2d');
        if (this.state.grapStipend !== undefined) {
            this.state.grapStipend.destroy()
        }
        this.state.grapStipend = new Chart(ctx, {
            type: "pie",
            data: {
                labels: [this.props.t("Pending"), this.props.t("Paid")],
                datasets: [{
                    backgroundColor: ["#CE8B54", "#00917C"],
                    borderColor: ["#CE8B54", "#00917C"],
                    borderWidth: 1,
                    data: this.state.stipendPieChart,
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
        this.state.grapStipend.update();
    }

    //studies chart data.
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
        return (
            <div>
                <div className="middle-content">
                    <StipendPieChart
                        stipendPaidTotalAmountCount={this.state.stipendPaidTotalAmountCount}
                        pieChartPaidColorCode={this.state.pieChartPaidColorCode}
                        stipendPaidPercent={this.state.stipendPaidPercent}
                        stipendPendingTotalAmountCount={this.state.stipendPendingTotalAmountCount}
                        pieChartPendingColorCode={this.state.pieChartPendingColorCode}
                        stipendPendingPercent={this.state.stipendPendingPercent}
                        paidStipends={this.state.stipendPaid}
                        pendingStipends={this.state.stipendPending}
                    />
                    <StudySummaryDoughnut
                        activeStudies={this.state.activeStudies}
                        completedStudies={this.state.completedStudies}
                    />
                    <TravelNotificationCard notificationData={this.state.notificationData}/>
                </div>
            </div>
        )
    }
}
export default withTranslation()(withRouter(StipendAndTravel))