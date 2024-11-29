
import React, { Suspense, useEffect, useState } from "react";
import { Redirect, Switch, useHistory } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_common/layout";
import { studiesList } from "./modules/Auth/_redux/authCrud";
import NewDashboard from "./pages/Dashboard/NewDashboard";
import HelpSupport from "./pages/HelpSupport/HelpSupport";
import MyProfileData from "./pages/MyProfile/MyProfileData";
import { MyStudies } from "./pages/MyStudies/MyStudies";
import MyTravel from "./pages/MyTravel/MyTravel";
import { NewRequest } from "./pages/MyTravel/NewRequest";
import Notifications from "./pages/Notifications/Notifications";
import PaymentSummary from "./pages/PaymentSummary/PaymentSummary";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import { SettingsData } from "./pages/Settings/SettingsData";
import ShowArchieved from "./pages/ShowArchieved/ShowArchieved";
import Stipend from "./pages/Stipend/Stipend";
import PreferencesTravelData from "./pages/TravelPreferences/PreferencesTravelData";

export default function BasePage() {
  const [Isfirst_visit] = useState(false)
  const [url, setURL] = useState(localStorage.getItem("URL"))
  var [getUrl, setGetUrl] = useState(process.env.REACT_APP_API_URL2);
  const history = useHistory();

  useEffect(() => {
    const path = url.split("?cmd=view-patient-travel-request&patient_id=");
    if (getUrl + "/" === path[0]) {
      const patientId = path[1].split("&study_id=");
      if (patientId[0] === localStorage.getItem("id")) {
        const studyId = patientId[1].split("&visit_id=");
        const study = studyId[0];
        const id = studyId[1].split("&id=");
        const ids = id[1];
        studiesList(localStorage.getItem("id")).then((res) => {
          for (var i = 0; i < res.data.records.length; i++) {
            if (study.toString() === res.data.records[i].study_id) {
              localStorage.setItem('SiteId', res.data.records[i].site_id)
              localStorage.setItem('StudiesId', res.data.records[i].study_id)
              localStorage.setItem('ConditionsReimbursements', res.data.records[i]._study_manage_reimbursements)
              localStorage.setItem('ConditionsStipends', res.data.records[i]._study_visit_stipends)
              localStorage.setItem('ConditionsTaravales', res.data.records[i]._study_subject_travel_preferences)
              localStorage.setItem('ConditionsId', res.data.records[i].id)
              localStorage.setItem('Status', res.data.records[i].status)
              history.push("newRequest/" + ids);
            }
          }
        }).catch((err1) => {
        })
      }
    }
  }, [url])

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          Isfirst_visit ?
            <Redirect exact from="/" to="/PreNotification" /> :
            <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={NewDashboard} />
        <ContentRoute path="/helpSupport" component={HelpSupport} />
        <ContentRoute path="/reset-password" component={ResetPassword} />
        <ContentRoute path="/myTravel" component={MyTravel} />
        <ContentRoute path="/myStudies" component={MyStudies} />
        <ContentRoute path="/newRequest/:id" component={NewRequest} />
        <ContentRoute path="/paymentSummary" component={PaymentSummary} />
        <ContentRoute path="/stipend" component={Stipend} />
        <ContentRoute path="/preferencesTravelData" component={PreferencesTravelData} />
        <ContentRoute path="/settings" component={SettingsData} />
        <ContentRoute path="/notifications" component={Notifications} />
        <ContentRoute path="/showArchieved" component={ShowArchieved} />
        <ContentRoute path="/myProfile" component={MyProfileData} />
        :
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
