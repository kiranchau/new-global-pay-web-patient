/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React from "react";
import {
  deleteCommentData,
  deleteSpamsData,
  deleteUserMessageData,
  getAdminMessageData,
  getAllProductData,
  getNotifications,
  getPersonDropdown,
  getProductCategoryData,
  getReportedSpamsData,
  getRewData,
  getTempDayDelete,
  getUserMessageData,
  get_comment_Data,
  unlikeAccomplishment,
} from "../../../../app/modules/Auth/_redux/authCrud";
import { getAccomplishmentsData } from "../../../../app/modules/Auth/_redux/authCrud";
import { getAppUsersData } from "../../../../app/modules/Auth/_redux/authCrud";
import { deleteAdminMessageData } from "../../../../app/modules/Auth/_redux/authCrud";
import { UsersTemporaryDeleteData } from "../../../../app/modules/Auth/_redux/authCrud";
import { UsersPermanentDeleteData } from "../../../../app/modules/Auth/_redux/authCrud";
import { resetWealthCoins } from "../../../../app/modules/Auth/_redux/authCrud";
import ReactPaginate from "react-paginate";
import { withStyles } from "/styles";
import {Dialog} from "@material-ui/core/Dialog";
import {MuiDialogTitle} from "@material-ui/core/DialogTitle";
import {MuiDialogContent} from "@material-ui/core/DialogContent";
import {MuiDialogActions} from "@material-ui/core/DialogActions";
import {IconButton} from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {Typography} from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Parser from "html-react-parser";
import { useHistory } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { MdCreate } from "react-icons/md";

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
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default class AdvanceTablesWidget4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.rewardsData,
      tableName: this.props.tableName,
      SortingDirection: "asc",
      SortIcon: "/media/svg/icons/Design/sort_default.svg",
      HeadingNames: this.props.headings,
      API_Arr: this.props.rewardsData,
      pageCount: 0,
      initialpage: 0,
      perPage: 10,
      pageLimit: 10,
      currentPage: 0,
      search_Array: [],
      searchflag: false,
      isDeletedFlag: false,
      selectedEntry:10,
      showEntries: [
        { Name: "10" },
        { Name: "25" },
        { Name: "50" },
        { Name: "All" },
      ],
      openPopup: false,
      adminmsgID: "",
      msgType: "",
      pageNumber: 0,
      Temp_Permanent_DLT_BUtton: false,
      Rewards_Action_Button: false,
      accomplish_DLT_Button: false,
      Admin_DLT_Button: false,
      Spam_DLT_Button: false,
      Notification_DLT_Button: false,
      productCategory_DLT_Button: false,
      Spam_DLT_Button: false,
      Notification_DLT_Button: false,
      UserMSG_DLT_Button: false,
      ProductList_DLT_Button: false,
      AccComment_DLT_Button: false,
      column_id: null,
      Loader: false,
      searchText: "",
      NotificationDropDownArr: [],
      notificationID: null,
      fitnessNameHeader: localStorage.getItem("fitnessNameHeader"),
      TempDaysData: [],
      tempdays: null,
      alertboxContent:''
    };
    this.getKeys = this.getKeys.bind(this);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.onsearch = this.onsearch.bind(this);
    this.onclickAction = this.onclickAction.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onCLickEntries = this.onCLickEntries.bind(this);
    this.onCheckbox = this.onCheckbox.bind(this);
    this.onViewDeletedRecords = this.onViewDeletedRecords.bind(this);
    this.onHandleDropdown = this.onHandleDropdown.bind(this);
    this.onViewNotification = this.onViewNotification.bind(this);
  }
  componentDidMount() {
    if (this.state.tableName === "Notifications") {
      this.setState({ Loader: true });
      this.getNotificationDropdownData();
    }
    if (this.state.tableName === "App Users") {
      this.setState({ Loader: true });
      this.getTempDays();
    }
    const slice = this.state.API_Arr.slice(
      this.state.initialpage,
      this.state.initialpage + this.state.perPage
    );
    this.setState({
      data: slice,
      pageCount: Math.ceil(this.state.API_Arr.length / this.state.perPage),
    });
  }
  getNotificationDropdownData() {
    getPersonDropdown()
      .then((value) => {
        this.setState({ NotificationDropDownArr: value.data.data });
        this.setState({ Loader: false });
      })
      .catch((error) => {
        this.setState({ Loader: false });
      });
  }

  getTempDays() {
    getTempDayDelete()
      .then((value) => {
        this.setState({
          TempDaysData: value.data.Data,
          tempdays: value.data.Data[0].Value,
        });
        this.setState({ Loader: false });
      })
      .catch((error) => {
        this.setState({ Loader: false });
      });
  }
  async handlePageChange(pageNumber) {
    const selectedPage = pageNumber.selected;
    this.setState({ pageNumber: selectedPage });
    var temp = [];
    if (this.state.searchflag === true) {
      temp = this.state.search_Array;
    } else {
      temp = this.state.API_Arr;
    }
    var slice = [];
    const final = selectedPage * this.state.perPage; //2*10=20
    const finalPagevalue=selectedPage+1;
    
    if (selectedPage != 0) {
      for (var i = 0; i < final; i++) {
        slice = temp.slice(
          final,
          finalPagevalue * this.state.perPage//50+25 final +this.state.perPage
        );
      }
    } else {
      for (var i = 0; i < this.state.perPage; i++) {
        slice = temp.slice(
          this.state.initialpage,
          this.state.initialpage + this.state.perPage
        );
      }
    }
    this.setState({ data: slice });
  }

  onCLickEntries = (pageLimit) => {
    var tempArray = [];
    var slice = [];
    // condition for check searchdata or normal API data
    this.state.searchflag === true
      ? (tempArray = this.state.search_Array)
      : (tempArray = this.state.API_Arr);
    // checking all entries page
    if (pageLimit === "All") {
      slice = tempArray;
      this.setState({
        data: slice,
        perPage: tempArray.length,
        pageCount: 1,
        currentPage: 0,
        pageLimit: pageLimit,
        pageNumber:0,
        selectedEntry:pageLimit
      });
    } else {
      //  calculate pages as per API data
      var temp;
      pageLimit <= 50 && tempArray.length > 0
        ? (temp = Math.ceil(tempArray.length / pageLimit))
        : (temp = 1);

      slice = this.state.API_Arr.slice(
        this.state.initialpage,
        this.state.initialpage + pageLimit
      );
      this.setState({
        data: slice,
        perPage: pageLimit,
        pageCount: temp,
        currentPage: 0,
        pageLimit: pageLimit,
        pageNumber:0,
        selectedEntry:pageLimit
      });
    }
  };
  getKeys() {
    return Object.keys(this.state.data);
  }
  getHeader() {
    return this.state.HeadingNames.map((key, index) => {
      return (
        <th key={key.id.toString()}>
          {key.Name.charAt(0).toUpperCase() + key.Name.slice(1)}
          <img
            onClick={() => this.onSort(key.Name, key.id)}
            id={key.id}
            src={this.state.SortIcon}
            width="20"
            height="20"
          />
        </th>
      );
    });
  }

  onclickAction(id) {
    this.props.history.push({
      pathname: "/RewardAction/" + id,
      state: { detail: id },
    });
  }

  onclickWCAction(id) {
    this.props.history.push({
      pathname: "/WealthCoinAction/" + id,
      state: { detail: id },
    });
  }

  onClickAccomplishAction(id, ActionPageName) {
    localStorage.setItem("AccomplishActionPageName", ActionPageName);
    this.props.history.push({
      pathname: "/AccomplishAction/" + id,
      state: { detail: id },
    });
  }

 


  handleClose() {
    this.setState({ openPopup: false });
  }

  Acc_comment_unlike_action(action) {
    if (action === "unlike") {
      var data = { id: this.state.adminmsgID };
      unlikeAccomplishment(data)
        .then((value) => {
          toast.success("unlike successfully...!");
          this.setState({
            openPopup: false,
            data: value.data.Likes,
            API_Arr: value.data.Likes,
          });
        })
        .catch((error) => {
          toast.error("unlike Failed...!");
        });
    } else if (action === "delete") {
      deleteCommentData(this.state.adminmsgID)
        .then((value) => {
          toast.success("Deleted successfully...!");
          this.setState({
            openPopup: false,
            data: value.data.Comments,
            API_Arr: value.data.Comments,
          });
        })
        .catch((error) => {
          toast.error("Deleted Failed...!");
        });
    }
  }

  Delete_clicked(messages) {
    if (messages === "admin") {
      deleteAdminMessageData(this.state.adminmsgID)
        .then((value) => {
          toast.success("Deleted successfully...!");
          this.setState({
            openPopup: false,
            data: value.data.adminMessages,
            API_Arr: value.data.adminMessages,
            searchText: "",
          });
        })
        .catch((error) => {
        });
    } else if (messages === "user") {
      deleteUserMessageData(this.state.adminmsgID)
        .then((value) => {
          toast.success("Deleted successfully...!");
          this.setState({
            openPopup: false,
            data: value.data.UserMesaages,
            API_Arr: value.data.UserMesaages,
            searchText: "",
          });
        })
        .catch((error) => {
        });
    } else if (messages === "spams") {
      deleteSpamsData(this.state.adminmsgID)
        .then((value) => {
          toast.success("Deleted successfully...!");
          this.setState({
            openPopup: false,
            data: value.data.spamData,
            API_Arr: value.data.spamData,
            searchText: "",
          });
        })
        .catch((error) => {
        });
    }
  }
  
  openAlertPopUp(alertContent,id, type){
    this.setState({alertboxContent:alertContent, openPopup: true, adminmsgID: id, msgType: type});
  }
  Delete_clicked_APPUsers() {
    var data = {
      id: this.state.adminmsgID,
    };
    if (this.state.msgType === "permanent") {
      UsersPermanentDeleteData(data)
        .then((value) => {
          toast.success("User deleted successfully...!");
          this.setState({ openPopup: false, searchText: "" });
        })
        .catch((error) => {
          toast.error("User deleted failed !");
        });
    } else if (this.state.msgType === "temporary") {
      var request = {
        id: this.state.adminmsgID,
        days: this.state.tempdays,
      };
      UsersTemporaryDeleteData(request)
        .then((value) => {
          toast.success("User deleted successfully...!");
          this.setState({ openPopup: false, searchText: "" });
        })
        .catch((error) => {
          toast.error("User deleted failed!");
        });
    } else if (this.state.msgType === "ResetWC") {
      resetWealthCoins(this.state.adminmsgID)
        .then((value) => {
          toast.success("Wealth coins reset successfully...!");
          var reqData = {
            IsDeleted: this.state.isDeletedFlag,
          };
          getAppUsersData(reqData)
            .then((value) => {
              this.setState({
                searchText: "",
                API_Arr: value.data.usersData,
                openPopup: false,
              });

              const slice = value.data.usersData.slice(
                this.state.initialpage,
                this.state.initialpage + this.state.perPage
              );
              this.setState({
                data: slice,
                pageCount: Math.ceil(
                  this.state.API_Arr.length / this.state.perPage
                ),
              });
            })
            .catch((error) => {
            });
        })
        .catch((error) => {
          toast.error("Wealth coins reset failed!");
        });
    }

    var reqData = {
      IsDeleted: this.state.isDeletedFlag,
    };
    // API for refreshing screen Data

    getAppUsersData(reqData)
      .then((value) => {
        this.setState({ API_Arr: value.data.usersData });
        const slice = value.data.usersData.slice(
          this.state.initialpage,
          this.state.initialpage + this.state.perPage
        );
        this.setState({
          searchText: "",
          data: slice,
          pageCount: Math.ceil(this.state.API_Arr.length / this.state.perPage),
        });
      })
      .catch((error) => {
      });
  }
   // app Users click views.............
  onAppUsersView(id,type){
    if(type === 'FitnessView'){
      this.props.history.push({
        pathname: "/Users/FitnessData/" + id,
      });
    }else if(type === 'FriendsView'){
      this.props.history.push({
        pathname: "/Users/FriendsView/" + id,
      });
    }else if(type === 'UserView')
    {
    this.props.history.push({
      pathname: "/Users/UserView/" + id,
    });
  }
  
 }
  onSendMessage(id, name, userName) {
    localStorage.setItem("userName", userName);
    localStorage.setItem("uName", name);
    if (this.state.tableName === "Admin Messages") {
      this.props.history.push({
        pathname: "/Messages/SendMessage/" + id,
      });
    } else {
      this.props.history.push({
        pathname: "/SendMessage/" + id,
      });
    }
  }
  
  getRowsData() {
    var items = this.state.data;
    var keys = [];
    for (var i = 0; i < this.state.HeadingNames.length; i++) {
      keys.push({
        Name: this.state.HeadingNames[i].Name.replace(/\s+/g, ""),
        ID: this.state.HeadingNames[i].id,
      });
    }

    return items.map((row, index) => {
      return (
        <tr key={row.id.toString()}>
          <RenderRow
            key={row.id}
            className={"class"}
            data={row}
            keys={keys}
            tableName={this.state.tableName}
          />
          {this.state.tableName === "Accomplishment Comments" && (
            <td>
              <a
                className={
                  this.state.AccComment_DLT_Button === false
                    ? "btn  stdelbtn customstylebtn"
                    : "btn  stdelbtn customstylebtn disabled"
                }
                onClick={(id) =>
                  this.openAlertPopUp('Are you sure you want to delete Comment ?',row.id, "Delete",)
                }
              >
                <MdDelete />
              </a>
            </td>
          )}
          {this.state.tableName === "Accomplishment Likes" && (
            <td>
              <a
                className="btn btn-light-success font-weight-bolder font-size-sm"
                onClick={(id) =>
                  this.openAlertPopUp('Are you sure you want to unlike ?',row.id, "unlike",)
                }
              >
                Unlike
              </a>
            </td>
          )}
          {this.state.tableName === "Accomplishments" && (
            <td>
              <a
                className="btn  stdelbtn customstylebtn"
                onClick={(id) => this.onClickAccomplishAction(row.id, "View")}
                style={{
                  background: "#80C247",
                }}
              >
                <MdRemoveRedEye />
              </a>
              <a
                aria-disabled="true"
                className={
                  this.state.accomplish_DLT_Button === false
                    ? "btn  stdelbtn customstylebtn"
                    : "btn  stdelbtn customstylebtn disabled"
                }
                onClick={(id) => this.onClickAccomplishAction(row.id, "Delete")}
              >
                <MdDelete />
              </a>
            </td>
          )}
          {this.state.tableName === "Product List" && (
            <td>
              <a
                onClick={(id) => this.add_Product(row.id, "Edit")}
                className={
                  this.state.ProductList_DLT_Button === false
                    ? "btn  stdelbtn customstylebtn"
                    : "btn  stdelbtn customstylebtn disabled"
                }
                style={{
                  background: "#80C247",
                }}
              >
                <MdCreate />
              </a>

              <a
                className={
                  this.state.ProductList_DLT_Button === false
                    ? "btn  stdelbtn customstylebtn"
                    : "btn  stdelbtn customstylebtn disabled"
                }
                onClick={(id) => this.add_Product(row.id, "delete")}
              >
                <MdDelete />
              </a>
            </td>
          )}
          {this.state.tableName === "Survey" && (
            <td>
              <a
                className="btn  stdelbtn customstylebtn"
                onClick={(id) => this.SurveyAction(row.id, "Edit")}
                style={{
                  background: "#80C247",
                }}
              >
                <MdCreate />
              </a>
              <a
                className="btn  stdelbtn customstylebtn"
                onClick={(id) => this.SurveyAction(row.id, "Delete")}
              >
                <MdDelete />
              </a>
            </td>
          )}
          {this.state.tableName === "Product Category List" && (
            <td>
              <a
                onClick={(id) => this.add_Product(row.id, "Edit")}
                className={
                  this.state.productCategory_DLT_Button === false
                    ? "btn  stdelbtn customstylebtn"
                    : "btn  stdelbtn customstylebtn disabled"
                }
                style={{
                  background: "#80C247",
                }}
              >
                <MdCreate />
              </a>
              <a
                className={
                  this.state.productCategory_DLT_Button === false
                    ? "btn  stdelbtn customstylebtn "

                    : "btn  stdelbtn customstylebtn disabled"
                }
                onClick={(id) => this.add_Product(row.id, "delete")}
               >
                <MdDelete />
              </a>
            </td>
          )}
          {this.state.tableName === "Survey Responses" && (
            <td>
              <a
                className="btn Mobstyle btn-light-success font-weight-bolder font-size-sm"
                onClick={(id) => this.SurveyAction(row.id, "View")}
              >
                View
              </a>
            </td>
          )}
          {this.state.tableName === "Domain Notes Response" && (
            <td>
              <a
                className="btn btn-light-success font-weight-bolder font-size-sm"
                onClick={(id) => this.surveyDomain(row.domainId, row.personId)}
              >
                View
              </a>
            </td>
          )}

          {this.state.tableName === "Questions List" && (
            <td>
              <a
                className="btn  stdelbtn customstylebtn"
                onClick={(id) => this.add_Question(row.id,"Edit")}
                style={{
                  background: "#80C247",
                }}
              >
                <MdCreate />
              </a>
              <a
                className="btn  stdelbtn customstylebtn"
                onClick={(id) => this.onclickDelete(row.id)}
              >
                <MdDelete />
              </a>
            </td>
          )}
          {this.state.tableName === "Rewards" &&
            (this.state.tableName === "Rewards" && row.Status === "Pending" ? (
              <td>
                <a
                  className={
                    this.state.Rewards_Action_Button === false
                      ? "btn btn-light-success font-weight-bolder font-size-sm"
                      : "btn btn-light-success font-weight-bolder font-size-sm disabled"
                  }
                  onClick={(id) => this.onclickAction(row.id)}
                >
                  Action
                </a>
              </td>
            ) : (
              <td>
                <a className="btn btn-light-success font-weight-bolder font-size-sm disabled">
                  Action
                </a>
              </td>
            ))}

          {this.state.tableName === "App Users" && (
            <td>
              {row.WealthCoins != 0 ? (
                <a
                  className={
                    this.state.Temp_Permanent_DLT_BUtton === false
                      ? "btn btn-light-success font-weight-bolder font-size-sm"
                      : "btn btn-light-success font-weight-bolder font-size-sm disabled"
                  }
                  onClick={() => {
                    this.openAlertPopUp(
                      'Are you sure you want to Reset Wealth coins?',
                      row.id,
                      "ResetWC",
                      row.WealthCoins
                    );
                  }}
                >
                  Reset
                </a>
              ) : (
                <a className="btn btn-light-success font-weight-bolder font-size-sm disabled">
                  Reset
                </a>
              )}
            </td>
          )}
          {this.state.tableName === "App Users" && (
            <td>
              <a
                className="btn btn-light-success font-weight-bolder font-size-sm"
                onClick={() => {
                  this.onAppUsersView(row.id,'FriendsView');
                }}
              >
                View
              </a>
            </td>
          )}
          {this.state.tableName === "App Users" && (
            <td>
              <a
                className="btn btn-light-success font-weight-bolder font-size-sm"
                onClick={() => this.onAppUsersView(row.id,'FitnessView')}
              >
                View
              </a>
            </td>
          )}
          {this.state.tableName === "App Users" && (
            <td>
              <a
                className="btn btn-light-success font-weight-bolder font-size-sm"
                onClick={() =>
                  this.onSendMessage(row.id, row.Name, row.UserName)
                }
              >
                Send
              </a>
            </td>
          )}
          {this.state.tableName === "App Users" && (
            <td>
              <a
                className={
                  this.state.Temp_Permanent_DLT_BUtton === false
                    ? "btn btn-light-success font-weight-bolder font-size-sm"
                    : "btn btn-light-success font-weight-bolder font-size-sm disabled"
                }
                onClick={() =>
                  this.openAlertPopUp('Are you sure you want to delete this user temporary?',row.id, "temporary")
                }
              >
                Temporary
              </a>
              <a
                className={
                  this.state.Temp_Permanent_DLT_BUtton === false
                    ? "btn btn-light-success font-weight-bolder font-size-sm"
                    : "btn btn-light-success font-weight-bolder font-size-sm disabled"
                }
                onClick={() =>
                  this.openAlertPopUp('Are you sure you want to delete this user permanently?',row.id, "permanent")
                }
              >
                Permanent
              </a>
            </td>
          )}
          {this.state.tableName === "App Users" && (
            <td>
              <a
                onClick={(id) => this.onAppUsersView(row.id,'UserView')}
                className="btn btn-light-success font-weight-bolder font-size-sm"
              >
                View
              </a>
            </td>
          )}
          {this.state.tableName === "Admin Messages" && (
            <td>
              <a
                className={
                  this.state.Admin_DLT_Button === false
                    ? "btn  stdelbtn customstylebtn"
                    : "btn  stdelbtn customstylebtn disabled"
                }
                onClick={(id) =>
                  this.openAlertPopUp('Are you sure you want to delete Message?',row.id, "adminMessageDelete")
                }
              >
                <MdDelete />
              </a>
            </td>
          )}
          {this.state.tableName === "User Messages" && (
            <td>
              <a
                className={
                  this.state.UserMSG_DLT_Button === false
                    ? "btn  stdelbtn customstylebtn"
                    : "btn  stdelbtn customstylebtn disabled"
                }
                onClick={(id) =>
                  this.openAlertPopUp('Are you sure you want to delete Message ?',row.id, "UserMessageDelete")
                }
              >
                <MdDelete />
              </a>
            </td>
          )}
          {this.state.tableName === "WealthCoins" && (
            <td>
              <a
                className="btn btn-light-success font-weight-bolder font-size-sm"
                onClick={(id) => this.onclickWCAction(row.UserId)}
              >
                Action
              </a>
            </td>
          )}
          {this.state.tableName === "Reported Spams" && (
            <td>
              <a
                onClick={(id) => this.openAlertPopUp('Are you sure you want to delete Spam ?',row.id)}
                className={
                  this.state.Spam_DLT_Button === false
                    ? "btn btn-light-success font-weight-bolder font-size-sm"
                    : "btn btn-light-success font-weight-bolder font-size-sm disabled"
                }
              >
                Delete
              </a>
            </td>
          )}
        </tr>
      );
    });
  }

  onsearch = (search) => {
    this.setState({ searchText: search });
    var filteredData = [];
    var unfilterData = [];
    const excludeColumns = ["id"];
    const lowercasedValue = search.toLowerCase().trim();
    // checking Empty Search Data
    if (lowercasedValue === "") {
      var temp;
      const final = this.state.pageNumber * this.state.perPage;
      //  check page number for slicing data as per page
      if (this.state.pageNumber != 0) {
        //  check for All entries data
        if (this.state.pageLimit === "All") {
          temp = 1;
          // display All records in single page
          for (var i = 0; i < this.state.API_Arr.length; i++) {
            unfilterData = this.state.API_Arr.slice(
              0,
              this.state.API_Arr.length
            );
          }
        } else {
          // slice data per page
          for (var i = 0; i < final; i++) {
            temp = Math.ceil(this.state.API_Arr.length / this.state.perPage);
            unfilterData = this.state.API_Arr.slice(
              final,
              final + this.state.perPage
            );
          }
        }
      } else {
        if (this.state.pageLimit === "All") {
          temp = 1;
          for (var i = 0; i < this.state.API_Arr.length; i++) {
            unfilterData = this.state.API_Arr.slice(
              this.state.initialpage,
              this.state.initialpage + this.state.API_Arr.length
            );
          }
        } else {
          temp = Math.ceil(this.state.API_Arr.length / this.state.perPage);

          for (var i = 0; i < this.state.perPage; i++) {
            unfilterData = this.state.API_Arr.slice(
              this.state.initialpage,
              this.state.initialpage + this.state.perPage
            );
          }
        }
      }
      this.setState({
        data: unfilterData,
        searchflag: false,
        search_Array: filteredData,
        pageCount: temp,
        currentPage: 0,
        pageNumber:0
        });
    } else {
      // searching data as per page
      filteredData = this.state.API_Arr.filter((item) => {
        return Object.keys(item).some(
          (key) =>
            (excludeColumns.includes(key)
              ? false
              : typeof item[key] === "string" &&
                item[key]
                  .toString()
                  .toLowerCase()
                  .includes(lowercasedValue)) ||
            ((excludeColumns.includes(key)
              ? false
              : typeof item[key] === "number") &&
              item[key]
                .toString()
                .toLowerCase()
                .includes(lowercasedValue))
        );
      });
      var slice = [];
      const final = this.state.pageNumber * this.state.perPage;
      if (this.state.pageNumber != 0) {
        for (var i = 0; i < final; i++) {
          slice = filteredData.slice(0, this.state.perPage);
        }
      } else {
        for (var i = 0; i < this.state.perPage; i++) {
          slice = filteredData.slice(0, this.state.perPage);
        }
      }
      var temp;
      if (this.state.perPage <= 50 && filteredData.length > 0) {
        temp = Math.ceil(filteredData.length / this.state.perPage);
      } else {
        temp = 1;
      }
      this.setState({
        data: slice,
        search_Array: filteredData,
        searchflag: true,
        pageCount: temp,
        currentPage: 0,
        pageNumber:0
      });
    }
   };

  onSort = (Name, id) => {
    // for default checking when  sort column change
    if (this.state.column_id != id) {
      this.setState({
        SortingDirection: "asc",
        SortIcon: "/media/svg/icons/Design/sort_default.svg",
      });
      document.getElementById(id).src = "/media/svg/icons/Design/sort_des.svg";
    }
    var value = Name.replace(/\s+/g, "");
    var tempArray = [];
    if (this.state.searchflag === true) {
      tempArray = this.state.search_Array;
    } else {
      tempArray = this.state.API_Arr;
    }
    // ascending order code
    if (
      this.state.SortingDirection === "asc" ||
      this.state.SortingDirection === ""
    ) {
      let toSort = tempArray.filter((item) => item[value]);
      let nulls = tempArray.filter((item) => item[value] == null);
      var temptemp = toSort.sort((a, b) =>
        typeof a[value] === "string"
          ? b[value].localeCompare(a[value])
          : b[value] - a[value]
      );
      var temp = temptemp.concat(nulls);
      var slice = [];
      const final = this.state.pageNumber * this.state.perPage;
      // check page number and slice API data As per page
      if (this.state.pageNumber != 0) {
        for (var i = 0; i < final; i++) {
          slice = temp.slice(final, final + this.state.perPage);
        }
      } else {
        for (var i = 0; i < this.state.perPage; i++) {
          slice = temp.slice(
            this.state.initialpage,
            this.state.initialpage + this.state.perPage
          );
        }
      }
      this.setState({
        data: slice,
        SortingDirection: "desc",
        SortIcon: "/media/svg/icons/Design/sort_default.svg",
        column_id: id,
      });
      for (var i = 1; i <= this.state.HeadingNames.length; i++) {
        if (i == id)
          document.getElementById(id).src =
            "/media/svg/icons/Design/sort_asc.svg";
        else
          document.getElementById(i).src =
            "/media/svg/icons/Design/sort_default.svg";
      }
      // descending order code
    } else if (this.state.SortingDirection === "desc") {
      let toSort = tempArray.filter((item) => item[value]);
      let nulls = tempArray.filter((item) => item[value] == null);
      var temptemp = toSort.sort(
        (a, b) =>
          typeof a[value] === "string"
            ? a[value].localeCompare(b[value]) //letters
            : a[value] - b[value] //number
      );
      var temp = nulls.concat(temptemp);
      var slice = [];
      const final = this.state.pageNumber * this.state.perPage; //2*10=20
      if (this.state.pageNumber != 0) {
        for (var i = 0; i < final; i++) {
          slice = temp.slice(
            final,
            final + this.state.perPage //20+10
          );
        }
      } else {
        for (var i = 0; i < this.state.perPage; i++) {
          slice = temp.slice(
            this.state.initialpage,
            this.state.initialpage + this.state.perPage
          );
        }
      }
      this.setState({
        data: slice,
        SortingDirection: "asc",
        SortIcon: "/media/svg/icons/Design/sort_default.svg",
        column_id: id,
      });
      for (var i = 1; i <= this.state.HeadingNames.length; i++) {
        if (i == id)
          document.getElementById(id).src =
            "/media/svg/icons/Design/sort_des.svg";
        else
          document.getElementById(i).src =
            "/media/svg/icons/Design/sort_default.svg";
      }
    }
  };

  onCheckbox = (event) => {
    this.setState({ isDeletedFlag: event.target.checked });
  };
  onViewDeletedRecords = () => {
    var slice = [];
    const final = this.state.pageNumber * this.state.perPage;
    var data = {
      IsDeleted: this.state.isDeletedFlag,
    };
    if (this.state.tableName === "Rewards") {
      this.setState({ Loader: true });
      getRewData(data)
        .then((value) => {
          this.setState({
            API_Arr: value.data.rewardsData,
          });
          slice = value.data.rewardsData.slice(
            this.state.initialpage,
            this.state.initialpage + this.state.perPage
          );
          this.state.isDeletedFlag === true
            ? this.setState({ Rewards_Action_Button: true })
            : this.setState({ Rewards_Action_Button: false });
          this.setState({
            data: slice,
            pageCount: Math.ceil(
              this.state.API_Arr.length / this.state.perPage
            ),
          });
          this.setState({ Loader: false, pageNumber: 0 ,selectedEntry:10,perPage:10});
        })
        .catch((error) => {
        });
    } else if (this.state.tableName === "Accomplishments") {
      this.setState({ Loader: true });
      getAccomplishmentsData(data)
        .then((value) => {
          this.setState({
            API_Arr: value.data.accomplishmentData,
          });
          slice = value.data.accomplishmentData.slice(
            final,
            final + this.state.perPage
          );
          this.state.isDeletedFlag === true
            ? this.setState({ accomplish_DLT_Button: true })
            : this.setState({ accomplish_DLT_Button: false });
          this.setState({
            data: slice,
            pageCount: Math.ceil(
              this.state.API_Arr.length / this.state.perPage
            ),
          });
          this.setState({ Loader: false , pageNumber: 0 ,selectedEntry:10,perPage:10});
        })
        .catch((error) => {
        });
    } else if (this.state.tableName === "App Users") {
      this.setState({ Loader: true });
      getAppUsersData(data)
        .then((value) => {
          this.setState({ API_Arr: value.data.usersData });
          slice = value.data.usersData.slice(
            this.state.initialpage,
            this.state.initialpage + this.state.perPage
          );
          this.setState({
            data: slice,
            pageCount: Math.ceil(
              this.state.API_Arr.length / this.state.perPage
            ),
          });
          this.setState({ Loader: false ,pageNumber: 0 ,selectedEntry:10,perPage:10});
          this.state.isDeletedFlag === true
            ? this.setState({ Temp_Permanent_DLT_BUtton: true })
            : this.setState({ Temp_Permanent_DLT_BUtton: false });
        })
        .catch((error) => {
        });
    } else if (this.state.tableName === "Admin Messages") {
      this.setState({ Loader: true });
      getAdminMessageData(data)
        .then((value) => {
          this.setState({ API_Arr: value.data.adminMessages });
          slice = value.data.adminMessages.slice(
            this.state.initialpage,
            this.state.initialpage + this.state.perPage
          );
          this.state.isDeletedFlag === true
            ? this.setState({ Admin_DLT_Button: true })
            : this.setState({ Admin_DLT_Button: false });

          this.setState({
            data: slice,
            pageCount: Math.ceil(
              this.state.API_Arr.length / this.state.perPage
            ),
          });
          this.setState({ Loader: false , pageNumber: 0 ,selectedEntry:10,perPage:10});
        })
        .catch((error) => {
        });
    } else if (this.state.tableName === "Reported Spams") {
      this.setState({ Loader: true });
      getReportedSpamsData(data)
        .then((value) => {
          this.setState({ API_Arr: value.data.spamData });
          slice = value.data.spamData.slice(
            this.state.initialpage,
            this.state.initialpage + this.state.perPage
          );
          this.state.isDeletedFlag === true
            ? this.setState({ Spam_DLT_Button: true })
            : this.setState({ Spam_DLT_Button: false });

          this.setState({
            data: slice,
            pageCount: Math.ceil(
              this.state.API_Arr.length / this.state.perPage
            ),
          });
          this.setState({ Loader: false,pageNumber: 0 ,selectedEntry:10,perPage:10 });
        })
        .catch((error) => {
          this.setState({ Loader: false });
        });
    } else if (this.state.tableName === "Product List") {
      this.setState({ Loader: true });
      getAllProductData(data)
        .then((value) => {
          this.setState({ API_Arr: value.data.productsData });
          slice = value.data.productsData.slice(
            this.state.initialpage,
            this.state.initialpage + this.state.perPage
          );

          this.state.isDeletedFlag === true
            ? this.setState({ ProductList_DLT_Button: true })
            : this.setState({ ProductList_DLT_Button: false });

          this.setState({
            data: slice,
            pageCount: Math.ceil(
              this.state.API_Arr.length / this.state.perPage
            ),
          });
          this.setState({ Loader: false , pageNumber: 0 ,selectedEntry:10,perPage:10});
        })
        .catch((error) => {
          this.setState({ Loader: false });
        });
    } else if (this.state.tableName === "Product Category List") {
      this.setState({ Loader: true });
      getProductCategoryData(data)
        .then((value) => {
          this.setState({ API_Arr: value.data.categoriesData });
          slice = value.data.categoriesData.slice(
            this.state.initialpage,
            this.state.initialpage + this.state.perPage
          );
          this.state.isDeletedFlag === true
            ? this.setState({ productCategory_DLT_Button: true })
            : this.setState({ productCategory_DLT_Button: false });

          this.setState({
            data: slice,
            pageCount: Math.ceil(
              this.state.API_Arr.length / this.state.perPage
            ),
          });
          this.setState({ Loader: false ,pageNumber: 0 ,selectedEntry:10,perPage:10});
        })
        .catch((error) => {
          this.setState({ Loader: false });
        });
    } else if (this.state.tableName === "User Messages") {
      this.setState({ Loader: true });
      getUserMessageData(data)
        .then((value) => {
          this.setState({ API_Arr: value.data.UserMessages });
          slice = value.data.UserMessages.slice(
            this.state.initialpage,
            this.state.initialpage + this.state.perPage
          );
          this.state.isDeletedFlag === true
            ? this.setState({ UserMSG_DLT_Button: true })
            : this.setState({ UserMSG_DLT_Button: false });

          this.setState({
            data: slice,
            pageCount: Math.ceil(
              this.state.API_Arr.length / this.state.perPage
            ),
          });
          this.setState({ Loader: false, pageNumber: 0 ,selectedEntry:10,perPage:10});
        })
        .catch((error) => {
          this.setState({ Loader: false });
        });
    } else if (this.state.tableName === "Accomplishment Comments") {
      this.setState({ Loader: true });
      var request = {
        id: this.props.accomplishId,
        IsDeleted: this.state.isDeletedFlag,
      };
      get_comment_Data(request)
        .then((value) => {
          this.setState({ API_Arr: value.data.Comments });
          slice = value.data.Comments.slice(
            this.state.initialpage,
            this.state.initialpage + this.state.perPage
          );
          this.state.isDeletedFlag === true
            ? this.setState({ AccComment_DLT_Button: true })
            : this.setState({ AccComment_DLT_Button: false });

          this.setState({
            data: slice,
            pageCount: Math.ceil(
              this.state.API_Arr.length / this.state.perPage
            ),
          });
          this.setState({ Loader: false , pageNumber: 0 ,selectedEntry:10,perPage:10});
        })
        .catch((error) => {
          this.setState({ Loader: false });
        });
    }
    this.setState({ searchText: "" });
  };

  

  add_Product(id, type) {
    if (this.state.tableName === "Product List") {
      if (type === "Edit") {
        this.props.history.push({
          pathname: "/Products/ProductEdit/" + id,
        });
      }else if(type ==="Add"){
        this.props.history.push({
          pathname: "/Products/ProductAdd",
        });
      } else if (type === "delete") {
        this.props.history.push({
          pathname: "/Products/ProductAllDelete/" + id,
        });
      }
    } else if (this.state.tableName === "Product Category List") {
      if (type === "Edit") {
        this.props.history.push({
          pathname: "/Products/ProductCategoryEdit/" + id,
        });

      } else if(type ==="Add"){
        this.props.history.push({
          pathname: "/Products/ProductCategoryAdd",
        });
      }else if (type === "delete") {
        this.props.history.push({
          pathname: "/Products/ProductCategoryDelete/" + id,
        });
      }
    }
  }
  SurveyAction(id, type) {
    if (this.state.tableName === "Survey") {
      if (type === "Add") {
        this.props.history.push({
          pathname: "/Surveys/SurveyAdd",
        });
      }else if(type === "Edit"){
        this.props.history.push({
          pathname: "/Surveys/SurveyEdit/" + id,
        });
      } else if (type === "Delete") {
        this.props.history.push({
          pathname: "/Surveys/SurveyDelete/" + id,
        });
      }
    } else {
      if (type === "View") {
        this.props.history.push({
          pathname: "/Surveys/SurveyResponseView/" + id,
        });
      }
    }
  }

  add_Question(id,type) {
    if(type === "Add")
    {
    this.props.history.push({
      pathname: "/Questions/QuestionAdd",
    });
  }else{
    this.props.history.push({
      pathname: "/Questions/QuestionEdit/" + id,
    });
  }
  }
  onclickDelete(id) {
    this.props.history.push({
      pathname: "/Questions/QuestionDelete/" + id,
    });
  }

  surveyDomain(domainId, personId) {
    localStorage.setItem("domainId", domainId);
    localStorage.setItem("personId", personId);
    this.props.history.push({
      pathname: "/Surveys/DomainNotesResponseView/",
    });
  }
  onHandleDropdown(id) {
    this.setState({ notificationID: id });
  }
  onViewNotification() {
    this.setState({ Loader: true });
    getNotifications(this.state.notificationID)
      .then((value) => {
        this.setState({ API_Arr: value.data.data });
        const slice = value.data.data.slice(
          this.state.initialpage,
          this.state.initialpage + this.state.perPage
        );
        this.setState({
          data: slice,
          Loader: false,
          pageCount: Math.ceil(this.state.API_Arr.length / this.state.perPage),
        });
      })
      .catch((error) => {
        this.setState({ Loader: false });
      });
  }
  SelectTempDays(days) {
    this.setState({ tempdays: days });
  }
  render() {
    return (
      <div
        className={"my-accomplish " + this.state.tableName.replace(/\s+/g, "")}
      >
        <div className="accomplish-doc">
          <h3>{this.state.tableName}</h3>
          <ToastContainer autoClose={1500} />
          <div className="accomplish-page">
          </div>
        </div>
        <div>
          <Dialog
            onClose={($event) => this.handleClose()}
            aria-labelledby="customized-dialog-title"
            open={this.state.openPopup}
            className="log-out-wrap"
          >
            {this.state.msgType === "unlike" && (
              <DialogTitle className="popup-heading">
                Unlike Confirmation
              </DialogTitle>
            )}

            {this.state.msgType != "unlike" && (
              <span>
                {this.state.msgType != "ResetWC" && (
                  <DialogTitle className="popup-heading">
                    Delete Confirmation
                  </DialogTitle>
                )}
              </span>
            )}
            {this.state.msgType === "ResetWC" && (
              <DialogTitle className="popup-heading">
                Reset Confirmation
              </DialogTitle>
            )}
            <DialogContent dividers className="middle-content">
             <Typography gutterBottom className="logut-content">
                {/* for displaying alert box content */}
                 {this.state.alertboxContent}
                  <br />
                  {this.state.msgType == "temporary" && (
                  <select
                    style={{ width: 400 }}
                    onChange={($event) =>
                      this.SelectTempDays($event.target.value)
                    }
                  >
                  
                    {this.state.TempDaysData.map((key, index) => (
                      <option value={key.Value}>{key.Text}</option>
                    ))}
                  </select>
                  )}
                </Typography>
             </DialogContent>
            <DialogActions className="btn-wrapper">
              <div className="card-toolbar">
                <Link
                  className="btn btn-secondary mr-6"
                  onClick={($event) => this.handleClose()}
                  to="#"
                >
                  Cancel
                </Link>
                {this.state.tableName === "Admin Messages" && (
                  <Link
                    type="submit"
                    onClick={($event) => this.Delete_clicked("admin")}
                    to="#"
                    className="btn btn-danger logout-btn"
                  >
                    Yes
                  </Link>
                )}
                {this.state.tableName === "Reported Spams" && (
                  <Link
                    type="submit"
                    onClick={($event) => this.Delete_clicked("spams")}
                    to="#"
                    className="btn btn-danger logout-btn"
                  >
                    Yes
                  </Link>
                )}
                {this.state.tableName === "User Messages" && (
                  <Link
                    type="submit"
                    onClick={($event) => this.Delete_clicked("user")}
                    to="#"
                    className="btn btn-danger logout-btn"
                  >
                    Yes
                  </Link>
                )}
                {this.state.tableName === "App Users" && (
                  <Link
                    type="submit"
                    onClick={($event) => this.Delete_clicked_APPUsers()}
                    to="#"
                    className="btn btn-danger logout-btn"
                  >
                    Yes
                  </Link>
                )}
                {this.state.tableName === "Accomplishment Comments" && (
                  <Link
                    type="submit"
                    onClick={($event) =>
                      this.Acc_comment_unlike_action("delete")
                    }
                    to="#"
                    className="btn btn-danger logout-btn"
                  >
                    Yes
                  </Link>
                )}
                {this.state.tableName === "Accomplishment Likes" && (
                  <Link
                    type="submit"
                    onClick={($event) =>
                      this.Acc_comment_unlike_action("unlike")
                    }
                    to="#"
                    className="btn btn-danger logout-btn"
                  >
                    Yes
                  </Link>
                )}
              </div>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

const RenderRow = (props) => {
  const history = useHistory();
  const onclickUNameLink = (id, action) => {
    if (props.tableName === "WealthCoins") {
      history.push({
        pathname: "/UserView/" + id,
      });
    } else if (props.tableName === "Accomplishments") {
      localStorage.setItem("Acc_like/comment", action);
      history.push({
        pathname: "/Accomplishment_Likes_comments/" + id,
      });
    }
  };

  const onclickReportedScams = (id) => {
    if (props.data.Entity === "accomplishment") {
      localStorage.setItem("AccomplishActionPageName", "ReportedSpamsView");
      window.open("/AccomplishAction/" + id, "_blank").focus();
     } else if (props.data.Entity === "Comment") {
      localStorage.setItem("AccomplishActionPageName", "accomplishmentcomment");
      window.open("/ReportedEntityView/" + id, "_blank").focus();
     } else if (props.data.Entity === "productcomment") {
      localStorage.setItem("AccomplishActionPageName", "accomplishmentcomment");
      window.open("/ReportedEntityView/" + id, "_blank").focus();
     }
  };
  return props.keys.map((key, index) => {
    var path = `${process.env.REACT_APP_IMAGE_PATH}/MessageImage/${props.data.Image_Video}`;
    //Need to change later to setup in environment
    var useImgPath = `https://coreentitiesservice-bucket-4os9odb7wvie.s3.amazonaws.com/MessageImage/${props.data.Image_Video}`;
    if (props.tableName === "Admin Messages" && index + 1 === 4) {
      return (
        <td>
          {" "}
          <a target="_blank" rel="noopener noreferrer" href={path}>
            View
          </a>
        </td>
      );
    } else if (props.tableName === "User Messages" && index + 1 === 4) {
      return (
        <td>
          {" "}
          {props.data.Image_Video != "" && props.data.Image_Video != "-" ? (
            <a target="_blank" rel="noopener noreferrer" href={useImgPath}>
              View
            </a>
          ) : (
            <label>{props.data.Image_Video}</label>
          )}
        </td>
      );
    } else if (props.tableName === "WealthCoins" && index + 1 === 3) {
      return (
        <td>
          <a
            style={{ color: "#0000FF" }}
            onClick={(id) => onclickUNameLink(props.data.UserId, "")}
          >
            {props.data.UserName}
          </a>
        </td>
      );
    } else if (props.tableName === "Accomplishments" && index + 1 === 7) {
      return (
        <td>
          <a
            style={{ color: "#0000FF" }}
            onClick={(id) => onclickUNameLink(props.data.id, "comment")}
          >
            {props.data.Comments}
          </a>
        </td>
      );
    } else if (props.tableName === "Accomplishments" && index + 1 === 8) {
      return (
        <td>
          <a
            style={{ color: "#0000FF" }}
            onClick={(id) => onclickUNameLink(props.data.id, "likes")}
          >
            {props.data.Likes}
          </a>
        </td>
      );
    } else if (props.tableName === "Product Category List" && index + 1 === 3) {
      return (
        <td style={{ backgroundColor: props.data.Color }}>
          {props.data.Color}
        </td>
      );
    } else if (props.tableName === "Reported Spams" && index + 1 === 2) {
      return (
        <td style={{ backgroundColor: props.data.Color }}>
          <a
            style={{ color: "#0000FF" }}
            onClick={(id) => onclickReportedScams(props.data.EntityId)}
          >
            {props.data.EntityId}
          </a>
        </td>
      );
    } else {
      return props.data[key.Name] != undefined ||
        props.data[key.Name] != null ? (
        <td key={props.data[key.Name]}>
          {Parser(String(props.data[key.Name]))}
        </td>
      ) : (
        <td>-</td>
      );
    }
  });
};
