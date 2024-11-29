import { Chart } from 'chart.js';
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ReimbursementPieChart from '../UserInterfaceSection/ReimbursementPieChart';
import StudySummaryDoughnut from '../UserInterfaceSection/StudySummaryDoughnut';
import BarChartGraph from '../UserInterfaceSection/BarChartGraph';

class ReimbursementsOnly extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reimbursementAddition: this.props.pieChartData,
            myStudiesData: this.props.counter,
            barChartReimbursementsData: this.props.barChartReimbursements,
            reimPendingPercent: 0,
            t: withTranslation(["Common"]),
            reimPaidTotalAmountCount: 0,
            reimPendingTotalAmountCount: 0,
            pieChartPendingColorCode: "#CE8B54",
            pieChartPaidColorCode: "#00917C",
            graphremReimbursement: undefined,
            reimbursementPieChart: [],
            pendingReimbursements: 0,
            paidReimbursements: 0,
            activeStudies: 0,
            activePending: 0,
            completedPending: 0,
            studiesData: [],
            completedStudies: 0,
            grapActive: undefined,
            barChartData: undefined,
            currentYear: [],
            barChartMonths: [
                { Name: this.props.t("Jan"), id: 1, Year: 0, reimbPaidAmount: 0 },
                { Name: this.props.t("Feb"), id: 2, Year: 0, reimbPaidAmount: 0 },
                { Name: this.props.t("Mar"), id: 3, Year: 0, reimbPaidAmount: 0 },
                { Name: this.props.t("Apr"), id: 4, Year: 0, reimbPaidAmount: 0 },
                { Name: this.props.t("May"), id: 5, Year: 0, reimbPaidAmount: 0 },
                { Name: this.props.t("Jun"), id: 6, Year: 0, reimbPaidAmount: 0 },
                { Name: this.props.t("Jul"), id: 7, Year: 0, reimbPaidAmount: 0 },
                { Name: this.props.t("Aug"), id: 8, Year: 0, reimbPaidAmount: 0 },
                { Name: this.props.t("Sep"), id: 9, Year: 0, reimbPaidAmount: 0 },
                { Name: this.props.t("Oct"), id: 10, Year: 0, reimbPaidAmount: 0 },
                { Name: this.props.t("Nov"), id: 11, Year: 0, reimbPaidAmount: 0 },
                { Name: this.props.t("Dec"), id: 12, Year: 0, reimbPaidAmount: 0 },
            ],
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
        this.barChartData();
        if (this.state.barChartReimbursementsData !== 0) {
            document.getElementById('bar-chart').style.display = "block"
        } else {
            document.getElementById('bar-chart').style.display = "none"
        }
    }

    //Reimbursement pie chart data.
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
                this.setState({ pendingReimbursements: pendingReimResult }, () => { })
                if (Obj.amount) {
                    this.state.reimPendingTotalAmountCount = this.state.reimPendingTotalAmountCount + parseFloat(Obj.amount)
                }
            }
            else if (Obj.status === "2.0") {
                paidReimResult = paidReimResult + 1
                this.setState({ paidReimbursements: paidReimResult }, () => { })
                if (Obj.amount) {
                    this.state.reimPaidTotalAmountCount = this.state.reimPaidTotalAmountCount + parseFloat(Obj.amount)
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

    //Studies chart data
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
                            return value === "0" ? "" : `${value}`;
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

    //bar chart data.
    barChartData = () => {
        this.state.barChartMonths = [
            { Name: this.props.t("Jan"), id: 1, Year: 0, reimbPaidAmount: 0 },
            { Name: this.props.t("Feb"), id: 2, Year: 0, reimbPaidAmount: 0 },
            { Name: this.props.t("Mar"), id: 3, Year: 0, reimbPaidAmount: 0 },
            { Name: this.props.t("Apr"), id: 4, Year: 0, reimbPaidAmount: 0 },
            { Name: this.props.t("May"), id: 5, Year: 0, reimbPaidAmount: 0 },
            { Name: this.props.t("Jun"), id: 6, Year: 0, reimbPaidAmount: 0 },
            { Name: this.props.t("Jul"), id: 7, Year: 0, reimbPaidAmount: 0 },
            { Name: this.props.t("Aug"), id: 8, Year: 0, reimbPaidAmount: 0 },
            { Name: this.props.t("Sep"), id: 9, Year: 0, reimbPaidAmount: 0 },
            { Name: this.props.t("Oct"), id: 10, Year: 0, reimbPaidAmount: 0 },
            { Name: this.props.t("Nov"), id: 11, Year: 0, reimbPaidAmount: 0 },
            { Name: this.props.t("Dec"), id: 12, Year: 0, reimbPaidAmount: 0 },
        ]
        let previousYearMonth = this.state.barChartMonths.filter(function (value) {
            if (value.id > new Date().getMonth() + 1) {
                value.Year = new Date().getFullYear() - 1;
            }
            return value.id > new Date().getMonth() + 1;
        });
        let currentYearMonth = this.state.barChartMonths.filter(function (value) {
            if (value.id <= new Date().getMonth() + 1) {
                value.Year = new Date().getFullYear();
            }
            return value.id <= new Date().getMonth() + 1;
        });
        this.setState({
            currentYear: [...previousYearMonth, ...currentYearMonth]
        }, () => {
            this.state.barChartReimbursementsData.map((res) => {
                for (let i = 0; i < this.state.currentYear.length; i++) {
                    if (this.state.currentYear[i].Year === new Date(res.date_added).getFullYear()) {
                        if (this.state.currentYear[i].id === new Date(res.date_added).getMonth() + 1) {
                            this.state.currentYear[i].reimbPaidAmount += parseFloat(res.amount)
                        }
                    }
                }
            })

            let ctx = document.getElementById('bar-chart').getContext('2d');
            if (this.state.barChartData !== undefined) {
                this.state.barChartData.destroy()
            }
            this.state.barChartData = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.state.currentYear.map((Obj) => this.props.t(Obj.Name)),
                    datasets: [
                        {
                            label: this.props.t("Reimbursement paid"),
                            backgroundColor: ["#7A942C"],
                            data: this.state.currentYear.map((Obj) => Obj.reimbPaidAmount)
                        },
                    ]
                },
                plugins: [ChartDataLabels],
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (Item) =>
                                    Item.label + ": $" + Item.formattedValue
                            },
                        },
                        legend: { display: true },
                        datalabels: {
                            align: 'top',
                            rotation: 270,
                            formatter: (value, ctx) => {
                                const label = ctx.chart.data.labels[ctx.dataIndex];
                                return value === 0 ? "" : "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            },
                            display: true,
                            color: 'black',
                            font: {
                                color: 'black',
                                style: 'bold',
                                size: '12px',
                            }
                        },
                    },
                    maintainAspectRatio: false,
                    title: {
                        display: true
                    },
                    responsive: true,
                }
            });
            this.state.barChartData.update();
        })
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
                    
                    <BarChartGraph/>
                </div>
            </div>
        )
    }
}
export default withTranslation()(withRouter(ReimbursementsOnly))