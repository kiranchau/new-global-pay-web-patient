import React, { useContext, useEffect, useState } from 'react'
import CommonGrid from '../../CommonGrid/CommonGrid'
import { Footer } from '../Layout/Footer'
import { Header } from '../Layout/Header'
import { SideNav } from '../Layout/SideNav'
import { LoaderContext } from '../../../app/context'
import { useHistory } from 'react-router-dom'
import { myStudies } from '../../modules/Auth/_redux/authCrud'
import { useTranslation } from 'react-i18next'


export const MyStudies = () => {
    const { t } = useTranslation(["Common"]);
    const history = useHistory()
    const [myStudiesData, setMyStudiesData] = useState([])
    let selectedId = [];
    const [sideMenu, setSideMenu] = useState(false)
    const [travelPreferences, setTravelPreferences] = useState(false)
    const { loader, changeLoader } = useContext(LoaderContext);
    const [headings] = useState([
        { Name: "Sponsor", id: 1 },
        { Name: "Protocol", id: 2 },
        { Name: "Clinicaldescription", id: 3 },
    ]);

    useEffect(() => {
        changeLoader(true);
        manageSideMenu();
        DataShow();
    }, [])

    //Sidebar menus hide show.
    const manageSideMenu = () => {
        localStorage.getItem("ConditionsReimbursements") === "0" &&
            localStorage.getItem("ConditionsStipends") === "0" ?
            setSideMenu(false)
            : localStorage.getItem("ConditionsReimbursements") === "1" ?
                setSideMenu(true)
                : localStorage.getItem("ConditionsStipends") === "1" ?
                    setSideMenu(true)
                    : setSideMenu(false)

        localStorage.getItem("ConditionsTaravales") === "1" ?
            setTravelPreferences(true)
            : setTravelPreferences(false)
    }

    //My Studies Api calling and passing the Data in Commongrid
    const DataShow = () => {
        myStudies(localStorage.getItem('id'))
            .then((value) => {
                setMyStudiesData(value.data.records);
                changeLoader(false);
            }).catch((err) => {
                changeLoader(false);
            })
    }

    for (let x = 0; x < myStudiesData.length; x++) {
        if (myStudiesData[x].status === "0") {
            selectedId.push(
                {
                    "id": myStudiesData[x].id,
                    "Sponsor": myStudiesData[x]._sponsor_name,
                    "Protocol": myStudiesData[x]._study_protocol,
                    "Clinicaldescription": myStudiesData[x]._study_title,
                    "StudyId": myStudiesData[x].study_id,
                    "SiteId": myStudiesData[x].site_id,
                    "ConditionsReimbursements": myStudiesData[x]._study_manage_reimbursements,
                    "ConditionsStipends": myStudiesData[x]._study_visit_stipends,
                    "ConditionsTaravales": myStudiesData[x]._study_subject_travel_preferences,
                    "ConditionsId": myStudiesData[x].id,
                    "Status": myStudiesData[x].status,
                    "ActionTravel": myStudiesData[x]._num_travel,
                    "ActionPaymentSummary": myStudiesData[x]._num_reimbursements,
                },
            );
        }
    }

    return (
        <main className="dashboard-wrap inner-page">
            <div className="">
                <SideNav sideMenu={sideMenu} travelPreferences={travelPreferences} />
                <div className="right-section left-space">
                    <Header title={t("My Studies")} travelPreferences={travelPreferences} />
                    <div className="middle-content-padding">
                        {!loader &&
                            <CommonGrid rewardsData={selectedId} headings={headings} tableName={t("My Studies")} history={history} />
                        }
                    </div>  
                    <Footer />
                </div>
            </div>
        </main>
    )
}
