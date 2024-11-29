import React, { Component } from 'react'
import Chart from 'chart.js/auto';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import StipendPieChart from '../UserInterfaceSection/StipendPieChart';
import StudySummaryDoughnut from '../UserInterfaceSection/StudySummaryDoughnut';
import BarChartGraph from '../UserInterfaceSection/BarChartGraph';

class StipendOnly extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stipendAddition: this.props.pieChartData,
            myStudiesData: this.props.counter,
            barChartStipendData: this.props.barChartStipend,
            stipendPendingTotalAmountCount: 0,
            stipendPaidTotalAmountCount: 0,
            paidStipends: 0,
            pendingStipends: 0,
            stipendPendingPercent: 0,
            stipendPaidPercent: 0,
            stipendPieChart: [],
            t: withTranslation(["Common"]),
            grapStipend: undefined,
            grapActive: undefined,
            grapCompleted: undefined,
            barChartData: undefined,
            pieChartPendingColorCode: "#CE8B54",
            pieChartPaidColorCode: "#00917C",
            activeStudies: 0,
            activePending: 0,
            completedPending: 0,
            studiesData: [],
            completedStudies: 0,
            currentYear: [],
            barChartMonths: [
                { Name: this.props.t("Jan"), id: 1, Year: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Feb"), id: 2, Year: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Mar"), id: 3, Year: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Apr"), id: 4, Year: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("May"), id: 5, Year: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Jun"), id: 6, Year: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Jul"), id: 7, Year: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Aug"), id: 8, Year: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Sep"), id: 9, Year: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Oct"), id: 10, Year: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Nov"), id: 11, Year: 0, stipendPaidAmount: 0 },
                { Name: this.props.t("Dec"), id: 12, Year: 0, stipendPaidAmount: 0 },
            ],
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
        this.barChartData();
        if (this.state.barChartStipendData !== 0) {
            document.getElementById('bar-chart').style.display = "block"
        } else {
            document.getElementById('bar-chart').style.display = "none"
        }
    }

    //Stipend pie chart data
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
                this.setState({ pendingStipends: pendingStipendResult, }, () => { })
                if (Obj.amount) {
                    this.state.stipendPendingTotalAmountCount = this.state.stipendPendingTotalAmountCount + parseFloat(Obj.amount);
                }
            } else if (Obj.status === "2.0") {
                paidStipendResult = paidStipendResult + 1
                this.setState({ paidStipends: paidStipendResult, }, () => { })
                if (Obj.amount) {
                    this.state.stipendPaidTotalAmountCount = this.state.stipendPaidTotalAmountCount + parseFloat(Obj.amount);
                }
            }
            this.state.stipendPendingPercent = ((pendingStipendResult * 100) / total).toFixed(0);
            this.state.stipendPaidPercent = ((paidStipendResult * 100) / total).toFixed(0);
        })

        this.state.stipendPieChart = [this.state.stipendPaidPercent, this.state.stipendPendingPercent]
        let ctx = document.getElementById('Stipend').getContext('2d');
        if (this.state.grapStipend !== undefined) {
            this.state.grapStipend.destroy()
        }
        this.state.grapStipend = new Chart(ctx, {
            type: "pie",
            data: {
                labels: [this.props.t("Paid"), this.props.t("Pending")],
                datasets: [{
                    backgroundColor: ["#00917C", "#CE8B54"],
                    borderColor: ["#00917C", "#CE8B54"],
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

    // studies chart data show.
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

    //bar chart data show.
    barChartData = () => {
        this.state.barChartMonths = [
            { Name: this.props.t("Jan"), id: 1, Year: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Feb"), id: 2, Year: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Mar"), id: 3, Year: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Apr"), id: 4, Year: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("May"), id: 5, Year: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Jun"), id: 6, Year: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Jul"), id: 7, Year: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Aug"), id: 8, Year: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Sep"), id: 9, Year: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Oct"), id: 10, Year: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Nov"), id: 11, Year: 0, stipendPaidAmount: 0 },
            { Name: this.props.t("Dec"), id: 12, Year: 0, stipendPaidAmount: 0 },
        ]
        let previousYearMonth = this.state.barChartMonths.filter(function (value, index, arr) {
            if (value.id > new Date().getMonth() + 1) {
                value.Year = new Date().getFullYear() - 1;
            }
            return value.id > new Date().getMonth() + 1;
        });
        let currentYearMonth = this.state.barChartMonths.filter(function (value, index, arr) {
            if (value.id <= new Date().getMonth() + 1) {
                value.Year = new Date().getFullYear();
            }
            return value.id <= new Date().getMonth() + 1;
        });
        this.setState({ currentYear: [...previousYearMonth, ...currentYearMonth] }, () => {
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
                    ]
                },
                plugins: [ChartDataLabels],
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (Item) => Item.label + ": " + Number(Item.formattedValue).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                            }
                        },
                        legend: { display: true },
                        datalabels: {
                            align: 'top',
                            rotation: 270,
                            formatter: (value, ctx) => {
                                const label = ctx.chart.data.labels[ctx.dataIndex];
                                return value === 0 ? "" : Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
                        paidStipends={this.state.paidStipends}
                        pendingStipends={this.state.pendingStipends}
                    />

                    <StudySummaryDoughnut
                        activeStudies={this.state.activeStudies}
                        completedStudies={this.state.completedStudies}
                    />

                    <BarChartGraph />
                </div>
            </div>
        )
    }
}
export default withTranslation()(withRouter(StipendOnly))