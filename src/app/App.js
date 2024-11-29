/**
 * Entry application component used to compose providers and render Routes.
 * */

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { AuthInit } from "./modules/Auth";
import { Routes } from "../app/Routes";
import { I18nProvider } from "../_common/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_common/layout";
import { LoaderContext } from "./context";
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

export default function App({ store, persistor, basename }) {
  const [loader, updateloader] = useState(false);
  var [getUrl,setGetUrl] = useState(process.env.REACT_APP_API_URL2);
  var stableRecord = "";
  var userId = "";
  var studyId = "";
  var logout = "";
  useEffect(() => {
    const currentURL = window.location.href
    localStorage.setItem("URL",currentURL)
  }, [])

  if (localStorage.getItem("id")) {
    const currentURL = window.location.href
    const mainPath = currentURL.split("?cmd=");
    if (mainPath[0] === getUrl+"/") {
      const demo_Select_id = mainPath[1].split("&patient_id=");
      const user_Id = demo_Select_id[1].split("&study_id=");
      userId = user_Id[0];
      if (user_Id[0] === localStorage.getItem("id")) {
        const study_Id = user_Id[1].split("&visit_id=");
        studyId = study_Id[0];
        const record_Id = user_Id[1].split("&id=");
        stableRecord = record_Id[1];
      } else {
        logout = "logout"
      }
    }
  } else { }

  function changeLoader(val) {
    updateloader(val);
  }

  return (
    <Provider store={store}>
      <Loading
        show={loader}
        color="#2d8f84"
        showSpinner={false}
      />
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={basename}>
            {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
            <MaterialThemeProvider>
              {/* Provide `react-intl` context synchronized with Redux state.  */}
              <I18nProvider>
                {/* Render routes with provided `Layout`. */}
                <AuthInit>
                  <LoaderContext.Provider value={{ loader, changeLoader }}>
                    {/* <Routes /> */}
                    <Routes logout={logout} recordId={stableRecord} userId={userId} studyId={studyId} />
                  </LoaderContext.Provider>
                </AuthInit>
              </I18nProvider>
            </MaterialThemeProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}
