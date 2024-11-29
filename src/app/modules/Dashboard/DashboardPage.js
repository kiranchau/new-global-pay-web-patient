import React, { useState, useEffect, useContext } from "react"
import { Dash_Top_Wid } from "../../../_common/_partials/widgets/mixed/Dash_Top_Wid"
import { useSelector, shallowEqual, connect, useDispatch, WebAppLoggedInFlag_toggle } from "react-redux"
import * as auth from "../Auth/_redux/authRedux"
import { getDashData } from "../Auth/_redux/authCrud"
import {LoaderContext} from '../../../app/context'
export function DashboardPage(props) {
  const dispatch = useDispatch()
  const [dashData, setdashData] = useState([])
  const {loader, changeLoader} = useContext(LoaderContext);
  useEffect(() => {
    changeLoader(true);
    getDashBoardData();
  }, [])
  const getDashBoardData = () => {
    getDashData()
      .then((value) => {
        setdashData(value.data.data);
        changeLoader(false);
      })
      .catch((error) => {
        changeLoader(false);
      })
  }
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="accomplish-doc">
          <h3>Dashboard</h3>
          </div>
        </div>
      
        <div className="col-lg-12 dashboard-main-content">

          <Dash_Top_Wid dashData={dashData} />
          </div>
        </div>

    </>
  )
}
export default connect(null, auth.actions)(DashboardPage)
