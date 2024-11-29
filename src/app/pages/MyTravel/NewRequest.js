import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import CommonGrid from '../../CommonGrid/CommonGrid'
import { LoaderContext } from '../../context'
import { myTravel } from '../../modules/Auth/_redux/authCrud'
import { Footer } from '../Layout/Footer'
import { Header } from '../Layout/Header'
import { SideNav } from '../Layout/SideNav'
import { useTranslation } from 'react-i18next'

export const NewRequest = () => {
    const { id } = useParams()
    const history = useHistory();
    const { t } = useTranslation(["Common"]);
    const { loader, changeLoader } = useContext(LoaderContext);
    const [travelRequestData, setTravelRequestData] = useState([]);
    const [travelPreferences, setTravelPreferences] = useState(false)
    const [sideMenu, setSideMenu] = useState(false)
    const [headings] = useState([
        { Name: "Travel type", id: 1 },
        { Name: "Departure date", id: 2 },
        { Name: "Departure time", id: 3 },
        { Name: "Return date", id: 4 },
        { Name: "Return time", id: 5 },
    ]);

    useEffect(() => {
        changeLoader(true);
        DataShow();
        localStorage.removeItem("URL")
    }, [id])

    //Travel Request form Api calling and passing the Data in Commongrid
    const DataShow = () => {
        localStorage.getItem("ConditionsReimbursements") === "0" &&
            localStorage.getItem("ConditionsStipends") === "0" ?
            setSideMenu(false)
            : localStorage.getItem("ConditionsReimbursements") === "1" ?
                setSideMenu(true)
                : localStorage.getItem("ConditionsStipends") === "1" ?
                    setSideMenu(true)
                    : setSideMenu(false)

        if (localStorage.getItem("ConditionsTaravales") === "1") {
            setTravelPreferences(true)
            history.push("/dashboard");
        } else {
            setTravelPreferences(false)
        }
        myTravel(localStorage.getItem('id'), localStorage.getItem('StudiesId')).then((value) => {
            let travel_Types_Data = "";
            for (let x = 0; x < value.data.records.length; x++) {
                if (id === value.data.records[x].id) {
                    if (value.data.records[x]) {
                        for (let i = 0; i < value.data.records[x].request._travel_types.length; i++) {
                            travel_Types_Data = value.data.records[x].request._travel_types;
                        }
                    }
                    var dataArray = [{
                        "id": value.data.records[x].id,
                        "VisitDateTime": value.data.records[x].visit_start_date,
                        "Study": value.data.records[x].site_name !== null ? value.data.records[x].site_name + " - " + value.data.records[x].sponsor + " - " + value.data.records[x].protocol + " - " + value.data.records[x].title : value.data.records[x].sponsor + " - " + value.data.records[x].protocol + " - " + value.data.records[x].title,
                        "TravelDate": value.data.records[x].travel_start_date,
                        "UpdatedBy": value.data.records[x].submitted_by,
                        "SubmittedAt": value.data.records[x].date_added,
                        "TravelEndDate": value.data.records[x].travel_end_date,
                        "TravelTypesData": travel_Types_Data,
                        "Patient_Save": value.data.records[x].patient_save,
                        "Visit_Id": value.data.records[x].visit_id,
                        "Comment": value.data.records[x].comment,
                    }]
                    setTravelRequestData(dataArray)
                } else if (id !== value.data.records[x].id) {
                }
            }
            changeLoader(false);
        }).catch((error) => {
            changeLoader(false);
        })
    }

    return (
        <div>
            <main className="dashboard-wrap inner-page">
                <div className="">
                    <SideNav sideMenu={sideMenu} travelPreferences={travelPreferences} />
                    <div className="right-section left-space">
                        <Header uniqueId={id} travelPreferences={travelPreferences} title={t("My Travel")} />
                        <div className="middle-content-padding">
                            {!loader &&
                                <CommonGrid rewardsData={travelRequestData} headings={headings} tableName={t("MyTravel New Request")} history={history} />
                            }
                        </div>
                        <Footer />
                    </div>
                </div>
            </main>
        </div>
    )
}
