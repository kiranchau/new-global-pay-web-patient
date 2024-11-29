import React from 'react'
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from '../../../_common/_helpers/AssetsHelpers'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';



export const SideNav = ({ sideMenu, travelPreferences }) => {
  const pathname = window.location.pathname
  const history = useHistory();
  const { t } = useTranslation(["Common"]);

  return (
    <ul className="side-nav-link">
      <li className="client-logo">
        <img src="/media/images/client-logo.png" onClick={() => history.push("/dashboard")} alt="Unable to load" width="100%" />
      </li>
      <li className="nav-tab">
        <Link to='/dashboard' className={pathname === '/dashboard' ? "active" : ""}>
          <span>
            <SVG src={toAbsoluteUrl("/media/images/home.svg")} />
          </span>
          <span>{t("Dashboard")}</span>
        </Link>
      </li>
      <li className="nav-tab">
        <Link to="/myStudies" className={pathname === '/myStudies' ? "active" : ""} >
          <svg xmlns="http://www.w3.org/2000/svg" width="21.085" height="18.365" viewBox="0 0 21.085 18.365">
            <g id="studie" transform="translate(-9.75 -78.236)">
              <g id="Group_21" data-name="Group 21" transform="translate(10 78.651)">
                <path id="Path_7" data-name="Path 7" d="M18.217-432.3a2.329,2.329,0,0,0-1.551,1.217,2.443,2.443,0,0,0-.242,1.217v.415l-2.626.012-2.63.012-.262.125a1.671,1.671,0,0,0-.782.782l-.125.261v7.935l.133.27a1.993,1.993,0,0,0,.31.447l.177.177.012,1.809.012,1.809.125.262a1.671,1.671,0,0,0,.782.782l.262.125H28.772l.262-.125a1.671,1.671,0,0,0,.782-.782l.125-.262.012-1.813.012-1.809.177-.177a1.843,1.843,0,0,0,.31-.443l.133-.27v-7.935l-.125-.262a1.671,1.671,0,0,0-.782-.782l-.262-.125-2.626-.012-2.63-.012v-.431a2.3,2.3,0,0,0-.677-1.8,2.434,2.434,0,0,0-1.128-.616C22.088-432.365,18.511-432.361,18.217-432.3Zm4.379.765a1.548,1.548,0,0,1,.769.79,1.452,1.452,0,0,1,.141.782l.016.516H17.061l.016-.516a1.452,1.452,0,0,1,.141-.782,2.091,2.091,0,0,1,.29-.447,1.9,1.9,0,0,1,.794-.467c.089-.02.995-.036,2.075-.032l1.913.008Zm6.82,2.828a.807.807,0,0,1,.459.467c.081.177.085.242.085,3.948s0,3.77-.085,3.948a.808.808,0,0,1-.459.467l-.2.1h-7.15v-.548a3.839,3.839,0,0,0-.048-.717,1.2,1.2,0,0,0-.62-.62,11.886,11.886,0,0,0-2.208,0,.97.97,0,0,0-.367.254c-.266.262-.3.4-.3,1.084v.548H11.37l-.2-.1a.807.807,0,0,1-.459-.467c-.081-.177-.085-.242-.085-3.948s0-3.77.085-3.948a.808.808,0,0,1,.459-.467l.2-.1H29.214Zm-8.1,7.738.1.1v2.828l-.1.1-.1.1H19.361l-.1-.1-.1-.1v-2.828l.1-.1.1-.1h1.861Zm-2.8,2.381a3.837,3.837,0,0,0,.048.717,1.2,1.2,0,0,0,.62.62,11.891,11.891,0,0,0,2.208,0,1.2,1.2,0,0,0,.62-.62,3.837,3.837,0,0,0,.048-.717v-.548l3.625-.008,3.625-.012v1.571c0,1.494,0,1.579-.085,1.752a.808.808,0,0,1-.459.467l-.2.1H12.014l-.2-.1a.807.807,0,0,1-.459-.467c-.081-.173-.085-.258-.085-1.752v-1.571l3.625.012,3.625.008v.548Z" transform="translate(-10 432.349)" fill="#b8b8b8" stroke="#b8b8b8" strokeWidth="0.5" />
              </g>
            </g>
          </svg>
          <span>{t("My studies")}</span>
        </Link>
      </li>
      {
        sideMenu === false ? <></> :
          <li className="nav-tab">
            <Link to="/stipend" className={pathname === '/paymentSummary' || pathname === '/stipend' ?
              "active" : ""}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g id="payments" data-name="Mask Group 63" transform="translate(-549.933 -132.933)">
                  <g id="line_8_" transform="translate(549.99 136.544)">
                    <path id="Path_672" data-name="Path 672" d="M20.458,21.847l-.239-1.474L3.178,23.146,1.459,15.178,0,15.493l2.017,9.354Z" transform="translate(0 -8.069)" />
                    <path id="Path_673" data-name="Path 673" d="M4.25,16.921h20.9V5.059H4.25ZM5.743,6.551H23.657v8.877H5.743Z" transform="translate(-1.264 -5.059)" />
                    <path id="Path_674" data-name="Path 674" d="M18.431,11.557V10.195a.708.708,0,0,1,.405.558l.855-.115a1.471,1.471,0,0,0-.405-.834,1.437,1.437,0,0,0-.855-.378V9.08h-.49v.345a1.363,1.363,0,0,0-1.281,1.408,1.508,1.508,0,0,0,.309.959,1.853,1.853,0,0,0,.972.591v1.459a.93.93,0,0,1-.331-.293,1.167,1.167,0,0,1-.2-.481l-.882.1a1.875,1.875,0,0,0,.466,1.062,1.546,1.546,0,0,0,.949.45v.634h.49v-.652a1.611,1.611,0,0,0,1.029-.529,1.578,1.578,0,0,0,.37-1.063,1.414,1.414,0,0,0-.294-.925A2.16,2.16,0,0,0,18.431,11.557Zm-.49-.166a.752.752,0,0,1-.327-.257.6.6,0,0,1-.109-.343.623.623,0,0,1,.119-.37.632.632,0,0,1,.317-.237Zm.9,2.259a.682.682,0,0,1-.412.242V12.532a.849.849,0,0,1,.437.26.631.631,0,0,1,.134.4A.691.691,0,0,1,18.843,13.649Z" transform="translate(-4.916 -6.255)" />
                  </g>
                </g>
              </svg>
              <span>{t("Payment summary")}</span>
            </Link>
          </li>
      }

      {
        travelPreferences === false
          ?
          <li className="nav-tab">
            <Link to="/myTravel" className={pathname === '/myTravel' || pathname === pathname?.includes('/newRequest') ?
              "active" : ""}>
              <svg id="mytravel-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 22.5 32.503">
                <path id="travel" d="M24,9H20V4a1,1,0,0,0,1-1,3,3,0,0,0-3-3H14a3,3,0,0,0-3,3,1,1,0,0,0,1,1V9H8a3,3,0,0,0-3,3V26a3,3,0,0,0,3,3h.277a1.949,1.949,0,0,0-.207,1.518A2,2,0,1,0,11.723,29h8.555a1.949,1.949,0,0,0-.207,1.518A2,2,0,1,0,23.723,29H24a3,3,0,0,0,3-3V12A3,3,0,0,0,24,9ZM14,1h4a2,2,0,0,1,2,2H19a1,1,0,0,0-1-1H14a1,1,0,0,0-1,1H12A2,2,0,0,1,14,1Zm5,3V9H13V4a1,1,0,0,0,1-1h4A1,1,0,0,0,19,4ZM10,31a1,1,0,1,1,1-1A1,1,0,0,1,10,31Zm12,0a1,1,0,1,1,1-1A1,1,0,0,1,22,31Zm4-5a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2V16h8v1a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V16h8ZM15,17V14h2v3Zm11-2H18V14a1,1,0,0,0-1-1H15a1,1,0,0,0-1,1v1H6V12a2,2,0,0,1,2-2H24a2,2,0,0,1,2,2Z" transform="translate(-4.75 0.25)" fill="#111918" stroke="#000" strokeWidth="0.5" />
              </svg>
              <span>{t("My travel")}</span>
            </Link>
          </li>
          : <></>
      }

      <li className="nav-tab">
        <Link to="/helpSupport" className={pathname === '/helpSupport' ? "active" : ""}>
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="21" viewBox="0 0 23 21">
            <g id="help" transform="translate(-28.84 -78)">
              <g id="help-svgrepo-com" transform="translate(30.795 78.955)">
                <path id="Path_671" data-name="Path 671" d="M13.121,14.455c0-1.909,1.5-2.229,2.022-2.745a2.864,2.864,0,1,0-4.727-2.972" transform="translate(-3.576 -3)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                <line id="Line_54" data-name="Line 54" transform="translate(9.545 14.318)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                <circle id="Ellipse_66" data-name="Ellipse 66" cx="9.545" cy="9.545" r="9.545" transform="translate(0 0)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </g>
            </g>
          </svg>
          <span>{t("Help & Product Support")}</span>
        </Link>
      </li>
      <li className="logo">
        <img src="/media/misc/white-logo.png" alt="Unable to load" width="100%" />
      </li>
    </ul>
  )
}
