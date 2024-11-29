/**
 * Create React App entry point. This and `public/index.html` files can not be
 * changed or moved.
 */
 import "react-app-polyfill/ie11";
 import "react-app-polyfill/stable";
 import React from "react";
 import ReactDOM from "react-dom";
 import axios from "axios";
 import './i18n';
 import * as _redux from "./redux";
 import store, { persistor } from "./redux/store";
 import App from "./app/App";
 import "./index.scss"; // Standard version
 import "./_common/_assets/plugins/icons/font/ki.css";
 import "socicon/css/socicon.css";
 import "@fortawesome/fontawesome-free/css/all.min.css";
 import "./_common/_assets/plugins/flaticon/flaticon.css";
 import "./_common/_assets/plugins/flaticon2/flaticon.css";
 // Datepicker
 import {
   LayoutProvider,
   SplashScreenProvider,
   AppSubheaderProvider,
 } from "./_common/layout";
 import { AppI18nProvider } from "./_common/i18n";
 import { initFacebookSdk } from "./_common/_helpers"
 
 
 /**
  * Base URL of the website.
  *
  * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
  */
 const { PUBLIC_URL } = `${process.env.API_URL}`;
 
 /**
  * Creates `axios-mock-adapter` instance for provided `axios` instance, add
  * basic mocks and returns it.
  *
  * @see https://github.com/ctimmerm/axios-mock-adapter
  */
 // const mock = _redux.mockAxios(axios);
 /**
  * Inject interceptors for axios.
  *
  * @see https://github.com/axios/axios#interceptors
  */
 _redux.setupAxios(axios, store);
 initFacebookSdk().then(startApp);
 
 function startApp() {
   ReactDOM.render(
     <AppI18nProvider>
       <LayoutProvider>
         <AppSubheaderProvider>
           <SplashScreenProvider>
             <App store={store} persistor={persistor} basename={PUBLIC_URL} />
           </SplashScreenProvider>
         </AppSubheaderProvider>
       </LayoutProvider>
     </AppI18nProvider>,
     document.getElementById("root")
   );
 }
 
 