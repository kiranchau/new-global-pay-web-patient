/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import Dropdown from "react-bootstrap/Dropdown"
import { useSelector, shallowEqual } from "react-redux"
import objectPath from "object-path"
import { withStyles } from "@material-ui/core/styles"
import {Button} from "@material-ui/core/Button"
import {Dialog} from "@material-ui/core/Dialog"
import {MuiDialogTitle} from "@material-ui/core/DialogTitle"
import {MuiDialogContent} from "@material-ui/core/DialogContent"
import {MuiDialogActions} from "@material-ui/core/DialogActions"
import {IconButton} from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import {Typography} from "@material-ui/core/Typography"
import { useHtmlClassService } from "../../../_core/AppLayout"
import { toAbsoluteUrl } from "../../../../_helpers"
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns"
import { useGoogleLogout } from "react-google-login"
import {MenuItem} from '@material-ui/core/MenuItem';
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

// google logout
export function UserProfileDropdown() {
  const clientId =
    "203175466304-jam3rr6ohpfk51ttle1qoav2e79qov0u.apps.googleusercontent.com" //google app id
  const onLogoutSuccess = (res) => {
  }
  const onFailure2 = () => {
  }
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure: onFailure2,
  })

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const Logout_clicked = () => {
    signOut()
  }
  const handleClose = () => {
    setOpen(false)
  }
  const { user } = useSelector((state) => state.auth)
  const uiService = useHtmlClassService()
  const layoutProps = useMemo(() => {
    return {
      light: objectPath.get(uiService.config, "extras.user.dropdown.style") === "light",
    }
  }, [uiService])
  const profileImg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

    const userInfo = useSelector((state) => state.auth.userInfo, shallowEqual)

  return (
    <Dropdown drop="down" alignRight data-tut="my_profile">
      <div></div>
      <Dropdown.Toggle as={DropdownTopbarItemToggler} id="dropdown-toggle-user-profile">
        <div
          className={
            "btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2 header-user"
          }
        >
          <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
            Hi,
          </span>{" "}
          <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
            {localStorage.getItem('FirstName')+' '+localStorage.getItem('LastName')}
          </span>
          <span className="symbol symbol-35 symbol-light-success">
            <span className="symbol-label font-size-h5 font-weight-bold">
              <img
                alt=""
                id="img"
                className="img"
                style={{ width: "35px", height: "35px", borderRadius: 50 }}
              />
            </span>
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl dropdown-user-menu">
        <>
          {/** ClassName should be 'dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl' */}
          {layoutProps.light && (
            <>
              <div className="d-flex align-items-center p-8 rounded-top">
                <div className="symbol symbol-md bg-light-primary mr-3 flex-shrink-0">
                  <img src={toAbsoluteUrl("/media/users/300_21.jpg")} alt="" />
                </div>
                <div className="text-dark m-0 flex-grow-1 mr-3 font-size-h5">
                {localStorage.getItem('FirstName')+' '+localStorage.getItem('LastName')}
                </div>
              </div>
              <div className="separator separator-solid"></div>
            </>
          )}

          {!layoutProps.light && (
            <div
              className="d-flex align-items-center justify-content-between p-8 bgi-size-cover bgi-no-repeat rounded-top"
              style={{
                backgroundColor: "rgb(128 194 71)",
              }}
            >
              <div className="symbol bg-white-o-15 mr-3 my-profile-img">
                <span className="symbol-label text-success font-weight-bold font-size-h4">
                  <img
                    alt=""
                    id="img"
                    className="img"
                    style={{ borderRadius: 5 }}
                  />
                </span>
              </div>
              <div className="text-white m-0 flex-grow-1 mr-3 font-size-h5 my-profile-text">
              {localStorage.getItem('FirstName')+' '+localStorage.getItem('LastName')}
              </div>
            </div>
          )}
        </>


        <div className="navi navi-spacer-x-0 pt-5">
          <Dropdown.Item className="navi-item px-8 cursor-pointer">
          <Link  to="/changeP">
            <div className="navi-link">
              <div className="navi-icon mr-2">
                <i className="flaticon2-calendar-3 text-success" />
              </div>
              <div className="navi-text">
                <div className="font-weight-bold cursor-pointer">Change Password</div>
              </div>
            </div>
            </Link>
          </Dropdown.Item>
          

         
          <div className="navi-separator mt-3"></div>

          <div className="navi-footer  px-8 py-5">
          <Dropdown.Item>
            <Link 
              onClick={handleClickOpen}
              to="#"
              className="btn btn-primary font-weight-bold log-out-btn"
             >
              Log Out
             </Link>
             </Dropdown.Item>
            </div>
        </div>
        
        <div>
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            className="log-out-wrap"
          >
            <DialogTitle className="popup-heading">Log Out</DialogTitle>
            <DialogContent dividers className="middle-content">
              <Typography gutterBottom className="logut-content">
                Are you sure you want to logout?
              </Typography>
            </DialogContent>
            <DialogActions className="btn-wrapper">
              <div className="card-toolbar">
                <Link className="btn btn-secondary mr-6" onClick={handleClose} to="#">
                  Cancel
                </Link>
                 </div>
            </DialogActions>
          </Dialog>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
