import React, { useEffect } from "react";
import { Redirect, Switch, Route, useHistory } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Layout } from "../_common/layout";
import BasePage from "./BasePage";
import { AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/Errors/ErrorsPage";
import SessionTimeout from "./SessionTimeout";
import { signOut, studiesList, tokenFirebaseSignOut } from "./modules/Auth/_redux/authCrud";



export function Routes(props) {
  const history = useHistory();
  const studyId = props.studyId;
  const userId = props.userId;
  const recordId = props.recordId;
  useEffect(() => {
    if (userId.length !== 0) {
      studiesList(userId).then((res) => {
        for (var i = 0; i < res.data.records.length; i++) {
          if (studyId.toString() === res.data.records[i].study_id) {
            localStorage.setItem('SiteId', res.data.records[i].site_id)
            localStorage.setItem('StudiesId', res.data.records[i].study_id)
            localStorage.setItem('ConditionsReimbursements', res.data.records[i]._study_manage_reimbursements)
            localStorage.setItem('ConditionsStipends', res.data.records[i]._study_visit_stipends)
            localStorage.setItem('ConditionsTaravales', res.data.records[i]._study_subject_travel_preferences)
            localStorage.setItem('ConditionsId', res.data.records[i].id)
            localStorage.setItem('Status', res.data.records[i].status)
            urlCalling();
          }
        }
      }).catch((err1) => {
      })
    }

    if (props.logout === "logout") {
      const fireTokenParam = {
        "TokenID": localStorage.getItem("tokenId").replace(/['"]+/g, ""),
        "Method": "SignOut"
      }
      signOut(localStorage.getItem('id').replace(/['"]+/g, '')).then((res) => {
        if (res.data.status === 0) {
          localStorage.removeItem('firstname');
          localStorage.removeItem('lastname');
          localStorage.removeItem('id');
          localStorage.removeItem('tokenId');
          localStorage.removeItem('SiteId');
          localStorage.removeItem('StudiesId');
          localStorage.removeItem('ImageUpdate');
          localStorage.removeItem('i18nextLng');
          localStorage.removeItem('ConditionsReimbursements');
          localStorage.removeItem('ConditionsStipends');
          localStorage.removeItem('ConditionsTaravales');
          localStorage.removeItem('ConditionsId');
          localStorage.removeItem('Status');
          localStorage.removeItem("newReimbursement");
          localStorage.removeItem('intl');
          localStorage.removeItem('persist:v726-demo1-auth');
          history.go("/auth/login");
        }
      }).catch((err) => {
      }).finally(() => {
        tokenFirebaseSignOut(fireTokenParam).then((res) => {
        }).catch((err) => {
        })
      })
    }
  }, [])

  const urlCalling = () => {
    history.push({ pathname: "/newRequest/" + recordId });
  }


  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.authToken != null,
    }),
    shallowEqual
  );



  return (

    <Switch>
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>
          <AuthPage />
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/auth" to="/" />
      )}

      <Route path="/error" component={ErrorsPage} />
      {/* <Route path="/reset-password" component={ResetPassword} /> */}


      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/auth/login" />
      ) : (
        <Layout>
          {/* Auto LogOff sessionn calling */}
          <SessionTimeout />
          {/*  */}
          <BasePage />
        </Layout>
      )}
    </Switch>
  );
}
