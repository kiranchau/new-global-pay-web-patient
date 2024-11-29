
import React, { Component } from 'react'
import { Chart } from 'chart.js';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import StipendPieChart from '../UserInterfaceSection/StipendPieChart';
import ReimbursementPieChart from '../UserInterfaceSection/ReimbursementPieChart';
import BarChartGraph from '../UserInterfaceSection/BarChartGraph';


class StipendAndReimb extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stipendAddition: this.props.stipendPieChartData,
            reimbursementAddition: this.props.reimbursementPieChartData,
            barChartReimbursementsData: this.props.barChartReimbursements,
            barChartStipendData: this.props.barChartStipend,
            stipendPendingTotalAmountCount: 0,
            stipendPaidTotalAmountCount: 0,
            stipendPendingPercent: 0,
            stipendPaidPercent: 0,
            stipendPending: 0,
            stipendPaid: 0,
            reimbursementPending: 0,
            reimbursementPaid: 0,
            stipendPieChart: [],
            grapStipend: undefined,
            t: withTranslation(["Common"]),
            pieChartPendingColorCode: "#CE8B54",
            pieChartPaidColorCode: "#00917C",
            reimPendingPercent: 0,
            reimPaidPercent: 0,
            reimPendingTotalAmountCount: 0,
            reimPaidTotalAmountCount: 0,
            graphremReimbursement: undefined,
            reimbursementPieChart: [],
            barChartData: undefined,
            currentYear: [],
            barChartMonths: [
                { Name: this.props.t("Jan"), id: 1, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Feb"), id: 2, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Mar"), id: 3, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Apr"), id: 4, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("May"), id: 5, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Jun"), id: 6, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Jul"), id: 7, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Aug"), id: 8, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Sep"), id: 9, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Oct"), id: 10, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Nov"), id: 11, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Dec"), id: 12, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
            ],
        }
    }

    componentDidMount() {
        this.loadStipendPieChart();
        this.loadReimbursementPieChart();
        if (this.state.stipendAddition.length !== 0) {
            document.getElementById('Stipend_Main').style.display = "block"
            document.getElementById('data-not-found-stipends').style.display = "none"
        } else {
            document.getElementById('Stipend_Main').style.display = "none"
            document.getElementById('data-not-found-stipends').style.display = "block"
        }
        if (this.state.reimbursementAddition.length !== 0) {
            document.getElementById('Reimbursement_Main').style.display = "block"
            document.getElementById('data-not-found-reimbursement').style.display = "none"
        } else {
            document.getElementById('Reimbursement_Main').style.display = "none"
            document.getElementById('data-not-found-reimbursement').style.display = "block"
        }
        this.barChartData();
        if (this.state.barChartReimbursementsData !== 0 && this.state.barChartStipendData !== 0) {
            document.getElementById('bar-chart').style.display = "block"
        } else {
            document.getElementById('bar-chart').style.display = "none"
        }
    }

    //stipend pie chart data show.
    loadStipendPieChart = () => {
        let total = 0;
        let paidStipendResult = 0;
        let pendingStipendResult = 0;
        this.state.stipendPieChart = []
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
                this.setState({
                    stipendPaid: paidStipendResult,
                    reimbursementPending: 0,
                    reimbursementPaid: 0,
                }, () => { })
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

    //Reimbursement pie chart data show.
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
                this.setState({ reimbursementPending: pendingReimResult, }, () => { })
                if (Obj.amount) {
                    this.state.reimPendingTotalAmountCount = this.state.reimPendingTotalAmountCount + parseFloat(Obj.amount)
                }
            }
            else if (Obj.status === "2.0") {
                paidReimResult = paidReimResult + 1
                this.setState({ reimbursementPaid: paidReimResult, }, () => { })
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

    //bar chart data show.
    barChartData = () => {
        this.state.barChartMonths = [
            { Name: this.props.t("Jan"), id: 1, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Feb"), id: 2, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Mar"), id: 3, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Apr"), id: 4, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("May"), id: 5, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Jun"), id: 6, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Jul"), id: 7, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Aug"), id: 8, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Sep"), id: 9, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Oct"), id: 10, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Nov"), id: 11, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Dec"), id: 12, Year: 0, reimbPaidAmount: 0, stipendPaidAmount: 0 },
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
            this.state.barChartStipendData.map((res) => {
                if (res.status === "2.0") {
                    for (let i = 0; i < this.state.currentYear.length; i++) {
                        if (this.state.currentYear[i].Year === new Date(res.date).getFullYear()) {
                            if (this.state.currentYear[i].id === new Date(res.date).getMonth() + 1) {
                                this.state.currentYear[i].stipendPaidAmount += parseFloat(res.amount)
                            }
                        }
                    }
                }
            })

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
                            label: this.props.t("Stipend paid"),
                            backgroundColor: ["#ECC424"],
                            data: this.state.currentYear.map((Obj) => Obj.stipendPaidAmount)
                        },
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
                            }
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

                    <ReimbursementPieChart
                        reimPaidTotalAmountCount={this.state.reimPaidTotalAmountCount}
                        reimPaidPercent={this.state.reimPaidPercent}
                        pieChartPaidColorCode={this.state.pieChartPaidColorCode}
                        reimPendingTotalAmountCount={this.state.reimPendingTotalAmountCount}
                        pieChartPendingColorCode={this.state.pieChartPendingColorCode}
                        reimPendingPercent={this.state.reimPendingPercent}
                        paidReimbursements={this.state.reimbursementPaid}
                        pendingReimbursements={this.state.reimbursementPending}
                    />

                    <BarChartGraph />
                </div>
            </div>
        )
    }
}
export default withTranslation()(withRouter(StipendAndReimb))