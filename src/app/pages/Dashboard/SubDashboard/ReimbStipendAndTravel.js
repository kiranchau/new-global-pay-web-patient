import React, { Component } from 'react'
import Chart from 'chart.js/auto';
import Progress from 'react-progressbar';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import TravelNotificationCard from '../UserInterfaceSection/TravelNotificationCard';
import BarChartGraph from '../UserInterfaceSection/BarChartGraph';

class ReimbStipendAndTravel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stipendAddition: this.props.stipendPieChartData,
            reimbursementAddition: this.props.reimbursementPieChartData,
            notificationData: this.props.notification,
            t: withTranslation(["Common"]),
            barChartReimbursementsData: this.props.barChartReimbursements,
            barChartStipendData: this.props.barChartStipend,
            stipendPendingTotalAmountCount: 0,
            stipendPaidTotalAmountCount: 0,
            stipendPendingPercent: 0,
            stipendPending: 0,
            stipendPaid: 0,
            reimbursementsPaid: 0,
            reimbursementsPending: 0,
            stipendPaidPercent: 0,
            stipendPieChart: [],
            grapStipend: undefined,
            pieChartTital: this.props.t("Stipends"),
            pieChartPendingColorCode: "#CE8B54",
            pieChartPaidColorCode: "#00917C",
            reimPendingPercent: 0,
            reimPaidPercent: 0,
            reimPendingTotalAmountCount: 0,
            reimbPaidTotalAmountCount: 0,
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
        if (this.state.stipendAddition.length !== 0) {
            document.getElementById('Stipend_Main').style.display = "block"
            document.getElementById('data-not-found-stipends').style.display = "none"
            document.getElementById('Reimbursement_Main').style.display = "none"
            document.getElementById('data-not-found-reimbursement').style.display = "none"
        } else {
            document.getElementById('data-not-found-stipends').style.display = "block"
            document.getElementById('Stipend_Main').style.display = "none"
            document.getElementById('Reimbursement_Main').style.display = "none"
            document.getElementById('data-not-found-reimbursement').style.display = "none"
        }
        this.barChartData();
        if (this.state.barChartReimbursementsData !== 0 && this.state.barChartStipendData !== 0) {
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
        let stipendPendingTotalAmountCount = 0;
        let stipendPaidTotalAmountCount = 0;
        const newLocal = this;
        newLocal.state.stipendPieChart = []
        this.state.stipendAddition.map((Obj) => {
            if (Obj.status === "1.0" || Obj.status === "2.0") {
                total = total + 1;
            }
            if (Obj.status === "1.0") {
                pendingStipendResult = pendingStipendResult + 1;
                this.setState({ stipendPending: pendingStipendResult, }, () => { })
                if (Obj.amount) {
                    stipendPendingTotalAmountCount = stipendPendingTotalAmountCount + parseFloat(Obj.amount)
                    this.state.stipendPendingTotalAmountCount = stipendPendingTotalAmountCount;
                }
            } else if (Obj.status === "2.0") {
                paidStipendResult = paidStipendResult + 1;
                this.setState({ stipendPaid: paidStipendResult, }, () => { })
                if (Obj.amount) {
                    stipendPaidTotalAmountCount = stipendPaidTotalAmountCount + parseFloat(Obj.amount)
                    this.state.stipendPaidTotalAmountCount = stipendPaidTotalAmountCount;
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

    //Reimbursement pie chart data
    loadReimbursementPieChart = () => {
        let total = 0;
        let paidReimResult = 0;
        let pendingReimResult = 0;
        let reimPendingTotalAmountCount = 0;
        let reimbPaidTotalAmountCount = 0;
        const newLocal = this;
        newLocal.state.reimbursementPieChart = [];
        this.state.reimbursementAddition.map((Obj) => {
            if (Obj.status === "1.0" || Obj.status === "2.0") {
                total = total + 1;
            }
            
            if (Obj.status === "1.0") {
                pendingReimResult = pendingReimResult + 1;
                this.setState({ reimbursementsPending: pendingReimResult, }, () => { })
                if (Obj.amount) {
                    reimPendingTotalAmountCount = reimPendingTotalAmountCount + parseFloat(Obj.amount)
                    this.state.reimPendingTotalAmountCount = reimPendingTotalAmountCount
                }
            }
            else if (Obj.status === "2.0") {
                paidReimResult = paidReimResult + 1
                this.setState({ reimbursementsPaid: paidReimResult,}, () => { })
                if (Obj.amount) {
                    reimbPaidTotalAmountCount = reimbPaidTotalAmountCount + parseFloat(Obj.amount)
                    this.state.reimbPaidTotalAmountCount = reimbPaidTotalAmountCount;
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

    //stipend and reimbursement pie chart arrow click data.
    piechartArrowClick = (type) => {
        if (type === "right") {
            this.setState({ pieChartTital: this.props.t("Stipends") }, () => { })
            this.loadStipendPieChart();
            if (this.state.stipendAddition.length !== 0) {
                document.getElementById('Stipend_Main').style.display = "block"
                document.getElementById('data-not-found-stipends').style.display = "none"
                document.getElementById('Reimbursement_Main').style.display = "none"
                document.getElementById('data-not-found-reimbursement').style.display = "none"
            } else {
                document.getElementById('data-not-found-stipends').style.display = "block"
                document.getElementById('Stipend_Main').style.display = "none"
                document.getElementById('Reimbursement_Main').style.display = "none"
                document.getElementById('data-not-found-reimbursement').style.display = "none"
            }
        } else if (type === "left") {
            this.setState({ pieChartTital: this.props.t("Reimbursements") }, () => { })
            this.loadReimbursementPieChart();
            if (this.state.reimbursementAddition.length !== 0) {
                document.getElementById('Reimbursement_Main').style.display = "block"
                document.getElementById('Stipend_Main').style.display = "none"
                document.getElementById('data-not-found-stipends').style.display = "none"
                document.getElementById('data-not-found-reimbursement').style.display = "none"
            } else {
                document.getElementById('data-not-found-stipends').style.display = "none"
                document.getElementById('Stipend_Main').style.display = "none"
                document.getElementById('Reimbursement_Main').style.display = "none"
                document.getElementById('data-not-found-reimbursement').style.display = "block"
            }
        }
    }

    //Bar char data show.
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
            this.state.barChartReimbursementsData.map((res) => {
                for (let i = 0; i < this.state.currentYear.length; i++) {
                    if (this.state.currentYear[i].Year === new Date(res.date_added).getFullYear()) {
                        if (this.state.currentYear[i].id === new Date(res.date_added).getMonth() + 1) {
                            this.state.currentYear[i].reimbPaidAmount += parseInt(res.amount)
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
                    labels: this.state.currentYear.map((Obj) => Obj.Name),
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
        const { t } = this.props;
        return (
            <div>
                <div className="middle-content">
                    <div className="dash-slider-wrap background-white table-responsive">
                        <div className='graph-heder'>
                            <div className='left-header'>
                                <h4>{t("Payment summary")} - {this.state.pieChartTital}</h4>
                            </div>
                        </div>
                        <div>
                            {this.state.pieChartTital === t("Stipends") ?
                                <img
                                    src="/media/misc/chevron-right.svg"
                                    alt="right"
                                    title={t("Reimbursement")}
                                    width="100%"
                                    onClick={(e) => { this.piechartArrowClick("left") }}
                                    className="right_arrow"
                                />
                                :
                                <img
                                    src="/media/misc/chevron-left.svg"
                                    alt="left"
                                    title={t("Stipends")}
                                    width="100%"
                                    onClick={(e) => { this.piechartArrowClick("right") }}
                                    className="left_arrow"
                                />
                            }
                        </div>
                        <div>
                            <div id="Stipend_Main" className="animate__animated animate__fadeInLeft">
                                <canvas id="Stipend" height="300" width="300" />
                            </div>
                            <div id="data-not-found-stipends">
                                {/* <center> */}
                                    <div className='no-data-row dddf'>
                                        <div colSpan={5}>
                                            <div className="data-not-found">
                                                <img
                                                    src="/media/misc/MicrosoftTeams-image.png"
                                                    alt="unable to load"
                                                    width="100"
                                                    height="100"
                                                />
                                                <label className="text-center no-data-text">{this.props.t("No stipends summary available")}</label>
                                            </div>
                                        </div>
                                    </div>
                                {/* </center> */}
                            </div>
                            <div id="Reimbursement_Main" className="animate__animated animate__fadeInRight">
                                <canvas id="Reimbursement" height="300" width="300" />
                            </div>
                            <div id="data-not-found-reimbursement">
                                {/* <center> */}
                                    <div className='no-data-row'>
                                        <div colSpan={5}>
                                            <div className="data-not-found">
                                                <img
                                                    src="/media/misc/MicrosoftTeams-image.png"
                                                    alt="unable to load"
                                                    width="100"
                                                    height="100"
                                                />
                                                <label className="text-center no-data-text">{t("No reimbursements summary available")}</label>
                                            </div>
                                        </div>
                                    </div>
                                {/* </center> */}
                            </div>
                        </div>
                        <div className='progress-bar-wrap'>
                            <div className='paid-bar'>
                                <div className='d-flex bar-label'>
                                    <label>{t("Paid Amount")}</label>
                                    <label>: <b>{this.state.pieChartTital === t("Stipends") ?
                                        Number(this.state.stipendPaidTotalAmountCount).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) :
                                        Number(this.state.reimbPaidTotalAmountCount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</b></label>
                                </div>
                                <Progress color={this.state.pieChartPaidColorCode} completed={this.state.pieChartTital === t("Stipends") ? this.state.stipendPaidPercent : this.state.reimPaidPercent} />
                            </div>
                            <div className='pending-bar'>
                                <div className='d-flex bar-label'>
                                    <label>{t("Pending Amount")}</label>
                                    <label>: <b>{this.state.pieChartTital === t("Stipends") ?
                                        Number(this.state.stipendPendingTotalAmountCount).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) :
                                        Number(this.state.reimPendingTotalAmountCount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                    }</b></label>
                                </div>
                                <Progress color={this.state.pieChartPendingColorCode} completed={this.state.pieChartTital === t("Stipends") ? this.state.stipendPendingPercent : this.state.reimPendingPercent} />
                            </div>
                        </div>
                        <hr />
                        <div className='bottom-label'>
                            <div className='left'>
                                {
                                    this.state.pieChartTital === t("Stipends") ?
                                        <><label>{t("Paid Stipends")}</label><label>: <b>{this.state.stipendPaid}</b></label></>
                                        : <><label>{t("Paid Reimbursements")}</label><label>: <b>{this.state.reimbursementsPaid}</b></label></>
                                }
                            </div>
                            <div className='left'>
                                {
                                    this.state.pieChartTital === t("Stipends") ?
                                        <><label>{t("Pending Stipends")}</label><label>: <b>{this.state.stipendPending}</b></label></>
                                        : <><label>{t("Pending Reimbursements")}</label><label>: <b>{this.state.reimbursementsPending}</b></label></>
                                }
                            </div>
                        </div>
                    </div>

                    <BarChartGraph />

                    <TravelNotificationCard notificationData={this.state.notificationData}/>
                </div>
            </div>
        )
    }
}
export default withTranslation()(withRouter(ReimbStipendAndTravel));