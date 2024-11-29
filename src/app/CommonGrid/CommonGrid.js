import React, { Component, Suspense } from "react";
import ReactPaginate from "react-paginate";
import Modal from "react-modal";
import { useHistory, withRouter } from "react-router-dom";
import moment from "moment";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { withTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
// import {Tooltip} from "@material-ui/core/Tooltip";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hourData from "./hourData";
// import {MenuItem} from "@material-ui/core/MenuItem";
// import {FormControl} from "@material-ui/core/FormControl";
// import {Select} from "@material-ui/core/Select";
import { Tooltip, MenuItem, FormControl, Select } from '@material-ui/core';


import {
  newReimbursementVisitName,
  newReimbursement_Post,
  newRequestImgUpload,
  newReimbursementItemType,
  reimbursements,
  newRequest_Post,
  reimbursementAttachements,
  myTravel,
  stipendData,
  myStudies,
  downloadAttachements,
  myTravelNewReimbursementAddress,
  allCountriesStatestimezones,
  myTravelNewReiAmountCalculated,
} from "../modules/Auth/_redux/authCrud";
import { Spinner } from "react-bootstrap";
import i18next from "i18next";
import minuteData from "./minuteData";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "#fff",
  },
  tooltip: {
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: theme.shadows[1],
    fontFamily: "Roboto-Regular",
    fontSize: 12,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();
  return <Tooltip arrow classes={classes} {...props} />;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    border: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: "100%",
    width: "50vw",
    overflow: "visible",
  },
};

const coustamStyleDocumnetFilesOpen = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 900,
    height: 600,
  },
};

const ViewReceiptsModalCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 600,
  },
};

const RequestHasBeenSubmitedCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
};

const itemTypePopupBox = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    maxWidth: "90%",
    width: "auto",
    // minWidth: 'auto'
    // height: '100%',
  },
};

const MenuProps = {
  PaperProps: {
    style: {
      width: 40,
      marginTop: 90,
      marginLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
};

const Note = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
};

class CommonGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: withTranslation(["Common"]),
      profileDataStateName: "",
      headingName: this.props.headings,
      data: this.props.rewardsData,
      tableName: this.props.tableName,
      sortingDirection: "desc",
      SortIcon: "/media/svg/icons/Design/sort_default.svg",
      api_Arr: this.props.rewardsData,
      column_id: null,
      searchflag: false,
      search_Array: [],
      pageNumber: 0,
      initialpage: 0,
      perPage: 10,
      selectedEntry: 10,
      showEntries: [
        { name: "10" },
        { name: "25" },
        { name: "50" },
        { name: this.props.t("All") },
      ],
      searchText: "",
      startDate: null,
      endDate: null,
      myTravelNewRequestList: "",
      inputBoxes: [],
      dateValidation: "",
      myTravelNewRequestDropDown: [
        { name: "Air Transportation", valueName: "Air" },
        { name: "Hotel Lodging", valueName: "Hotel" },
        { name: "Ground Transportation", valueName: "Ground" },
      ],
      siteID: "",
      studiesID: "",
      travel_types_id: [],
      checkConditionsNewRequest: [],
      depentureDateUpdate: [
        {
          id: 1,
          type: "Air Transportation",
          valueName: "Air",
          depentureDate: "",
          depentureTime: "00:00",
          depentureHour: "",
          depentureMinute: "",
          returnDate: "",
          returnTime: "00:00",
          returnHour: "",
          returnMinute: "",
        },
        {
          id: 2,
          type: "Ground Transportation",
          valueName: "Ground",
          depentureDate: "",
          depentureTime: "00:00",
          depentureHour: "",
          depentureMinute: "",
          returnDate: "",
          returnTime: "00:00",
          returnHour: "",
          returnMinute: "",
        },
        {
          id: 3,
          type: "Hotel Lodging",
          valueName: "Hotel",
          depentureDate: "",
          depentureTime: "00:00",
          depentureHour: "",
          depentureMinute: "",
          returnDate: "",
          returnTime: "00:00",
          returnHour: "",
          returnMinute: "",
        },
      ],
      searchData: false,
      tabRefreshing: 0,
      conditionsStipends: localStorage.getItem("ConditionsStipends"),
      conditionsReimbursements: localStorage.getItem(
        "ConditionsReimbursements"
      ),
      newReContent: false,
      selectedId: [],
      commentData: "",
      newRequestArrData: [
        {
          id: 1,
          type: "Air Transportation",
          valueName: "Air",
          travel_types_id: "",
          depentureDates: "",
          depentureTime: "00:00",
          depentureHour: "",
          depentureMinute: "",
          returnDate: "",
          returnTime: "00:00",
          returnHour: "",
          returnMinute: "",
        },
        {
          id: 2,
          type: "Ground Transportation",
          valueName: "Ground",
          travel_types_id: "",
          depentureDates: "",
          depentureTime: "00:00",
          depentureHour: "",
          depentureMinute: "",
          returnDate: "",
          returnTime: "00:00",
          returnHour: "",
          returnMinute: "",
        },
        {
          id: 3,
          type: "Hotel Lodging",
          valueName: "Hotel",
          travel_types_id: "",
          depentureDates: "",
          depentureTime: "00:00",
          depentureHour: "",
          depentureMinute: "",
          returnDate: "",
          returnTime: "00:00",
          returnHour: "",
          returnMinute: "",
        },
      ],
      valueChanged: "0",
      loaded: false,
      travelMethodNote: "",
      submitTravelRequestDropdownErr: "",
      filterDate: "",
      filesLength: null,
      ModalCounter: false,
      receiptsList: [],
      isView: false,
      receiptsName: "",
      receiptsType: "",
      showReceipts: "",
      Warning: false,
      newWarningMessage: "",
      visitNameList: [],
      visitName: "",
      newReStatus: 1,
      visitNameErr: "",
      itemTypesList: [],
      addressBasedItemType: "0",
      amountDistanceBasedItemType: "0",
      milesInternationalItemType: "0",
      uploadReceiptsItemType: "0",
      newReimbursementFormInsertAndRead: false,
      newReimbursementMultipleRecord: {
        id: 0,
        type_id: "",
        travelDate: "",
        itemTypeErr: "",
        startAddress1: "",
        startAddress2: "",
        startCity: "",
        startState: "",
        startZipCode: "",
        endAddress1: "",
        endAddress2: "",
        endCity: "",
        endState: "",
        endZipCode: "",
        date: "",
        amountErr: "",
        itemTypeErr: "",
        amount: "",
        distance: "",
        roundTrip: "0",
        notes: "",
        amountRequired: null,
        uploadRequired: null,
        files: [],
      },
      myTravelNewReimburesementsAdd: [],
      statesDist: [],
      currentTotalAmount: "",
      itemTypeFormInsertAndRead: false,
      selectedStartAddressId: "",
      selectedEndAddressId: "",
      amountValidation: this.props.t(
        "Please select or enter a start and end address to have the amount automatically calculated."
      ),
      milesTravels: this.props.t("One"),
      fileImagesData: [],
      testDeletionOptionTextError: "",
      receiptsloaded: false,
      fileList: [],
      itemTypeUpdateButton: false,
      viewReimbursementData: false,
      newReimbursementMultipleRecordUpdate: [],
      recordId: 0,
      newReAmount_Required: true,
      newReUpload_Required: 1,
      addNewReimbursementFormConfirmation: false,
      conditionBasedTravelTypeParams: [
        { label: "Air Transportation", condition: "" },
        { label: "Ground Transportation", condition: "" },
        { label: "Hotel Lodging", condition: "" },
      ],
      conditionBasedTravelTypeToggle: "",
      addressLayout: [
        {
          label: "Address line 1",
          placeholder: "Enter address line 1",
          startName: "startAddress1",
          endName: "endAddress1",
        },
        {
          label: "Address line 2",
          placeholder: "Enter address line 2",
          startName: "startAddress2",
          endName: "endAddress2",
        },
        {
          label: "City",
          placeholder: "Enter city",
          startName: "startCity",
          endName: "endCity",
        },
        {
          label: "State",
          placeholder: "",
          startName: "startState",
          endName: "endState",
        },
        {
          label: "Zip code",
          placeholder: "Enter zip code",
          startName: "startZipCode",
          endName: "endZipCode",
        },
      ],
    };
    this.toastId = React.createRef(null);
    this.getHeader = this.getHeader.bind(this);
    this.tableBody = this.tableBody.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.newReimbursementsvisitname = this.newReimbursementsvisitname.bind(
      this
    );
    this.newReimbursementitemTypes = this.newReimbursementitemTypes.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.rewardsData !== 0) {
      if (this.state.tableName === this.props.t("MyTravel New Request")) {
        this.setState({ data: newProps.rewardsData }, () => { });
      }
    }
  }

  //Table Name wise operation is working.
  componentDidMount() {
    i18next.changeLanguage(localStorage.getItem("i18nextLng"));
    if (this.state.tableName === this.props.t("Stipend")) {
      this.setState({ tabRefreshing: 2 }, () => { });
    }
    if (this.state.tableName === this.props.t("Payment Summary")) {
      this.setState({ tabRefreshing: 1 }, () => { });
    }
    var newArray = [];
    if (this.state.tableName === this.props.t("MyTravel New Request")) {
      if (this.state.data[0]?.Patient_Save === "0") {
        this.setState(
          {
            newReContent: true,
            commentData: this.state.data[0]?.Comment,
            travelMethodNote:
              "Please select your preferred travel method(s) and provide the associated departure and arrival dates and times for each.",
          },
          () => { }
        );
      } else if (this.state.data[0]?.Patient_Save === "1") {
        this.setState(
          {
            newReContent: false,
            commentData: this.state.data[0]?.Comment,
            travelMethodNote:
              "Please contact your clinical site if you need to cancel or adjust your study travel.",
          },
          () => { }
        );
      }
      for (var i = 0; i < this.state.data[0]?.TravelTypesData.length; i++) {
        var NamesOfLabel =
          this.state.data[0]?.TravelTypesData[i].label.charAt(0).toUpperCase() +
          this.state.data[0]?.TravelTypesData[i].label.slice(1);
        for (let x = 0; x < this.state.newRequestArrData.length; x++) {
          if (this.state.newRequestArrData[x].valueName === NamesOfLabel) {
            this.state.newRequestArrData[
              x
            ].id = this.state.data[0]?.TravelTypesData[i].id;
          }
        }
        if (this.state.data[0]?.TravelTypesData[i].selected === "1") {
          NamesOfLabel =
            this.state.data[0]?.TravelTypesData[i].label
              .charAt(0)
              .toUpperCase() +
            this.state.data[0]?.TravelTypesData[i].label.slice(1);
          for (var x = 0; x < this.state.newRequestArrData.length; x++) {
            if (this.state.newRequestArrData[x].valueName === NamesOfLabel) {
              this.state.newRequestArrData[
                x
              ].travel_types_id = this.state.data[0]?.TravelTypesData[
                i
              ].travel_request_id;
              this.state.newRequestArrData[x].depentureDates = moment(
                this.state.data[0]?.TravelTypesData[i].departure_date
              )
                .format("YYYY-MM-DD hh:mm a")
                .split(" ")[0];
              this.state.newRequestArrData[
                x
              ].depentureTime = this.state.data[0]?.TravelTypesData[
                i
              ].departure_date.split(" ")[1];
              this.state.newRequestArrData[
                x
              ].depentureHour = this.state.newRequestArrData[
                x
              ].depentureTime.split(":")[0];
              this.state.newRequestArrData[
                x
              ].depentureMinute = this.state.newRequestArrData[
                x
              ].depentureTime.split(":")[1];
              this.state.newRequestArrData[x].returnDate = moment(
                this.state.data[0]?.TravelTypesData[i].return_date
              )
                .format("YYYY-MM-DD hh:mm a")
                .split(" ")[0];
              this.state.newRequestArrData[
                x
              ].returnTime = this.state.data[0]?.TravelTypesData[
                i
              ].return_date.split(" ")[1];
              this.state.newRequestArrData[
                x
              ].returnHour = this.state.newRequestArrData[x].returnTime.split(
                ":"
              )[0];
              this.state.newRequestArrData[
                x
              ].returnMinute = this.state.newRequestArrData[x].returnTime.split(
                ":"
              )[1];
            }
          }
          newArray = this.state.myTravelNewRequestDropDown.filter((Obj) => {
            return Obj.valueName !== NamesOfLabel;
          });
          this.state.myTravelNewRequestDropDown = newArray;
          this.state.travel_types_id.push(
            this.state.data[0]?.TravelTypesData[i].id
          );
          for (var x = 0; x < this.state.newRequestArrData.length; x++) {
            if (this.state.newRequestArrData[x].valueName === NamesOfLabel) {
              this.state.inputBoxes.push(this.state.newRequestArrData[x].type);
            }
          }
          for (var y = 0; y < this.state.depentureDateUpdate.length; y++) {
            if (this.state.depentureDateUpdate[y].valueName === NamesOfLabel) {
              this.state.depentureDateUpdate[
                y
              ].id = this.state.data[0]?.TravelTypesData[i].id;
              this.state.data[0]?.TravelTypesData[i].departure_date ===
                "0000-00-00 00:00:00"
                ? (this.state.depentureDateUpdate[y].depentureDate = "")
                : (this.state.depentureDateUpdate[y].depentureDate = moment(
                  this.state.data[0]?.TravelTypesData[i].departure_date
                )
                  .format("YYYY-MM-DD hh:mm a")
                  .split(" ")[0]);
              this.state.depentureDateUpdate[
                y
              ].depentureTime = this.state.data[0]?.TravelTypesData[
                i
              ].departure_date.split(" ")[1];
              this.state.depentureDateUpdate[
                y
              ].depentureHour = this.state.depentureDateUpdate[
                y
              ].depentureTime.split(":")[0];
              this.state.depentureDateUpdate[
                y
              ].depentureMinute = this.state.depentureDateUpdate[
                y
              ].depentureTime.split(":")[1];
              this.state.data[0]?.TravelTypesData[i].return_date ===
                "0000-00-00 00:00:00"
                ? (this.state.depentureDateUpdate[y].returnDate = "")
                : (this.state.depentureDateUpdate[y].returnDate = moment(
                  this.state.data[0]?.TravelTypesData[i].return_date
                )
                  .format("YYYY-MM-DD hh:mm a")
                  .split(" ")[0]);
              this.state.depentureDateUpdate[
                y
              ].returnTime = this.state.data[0]?.TravelTypesData[
                i
              ].return_date.split(" ")[1];
              this.state.depentureDateUpdate[
                y
              ].returnHour = this.state.depentureDateUpdate[y].returnTime.split(
                ":"
              )[0];
              this.state.depentureDateUpdate[
                y
              ].returnMinute = this.state.depentureDateUpdate[
                y
              ].returnTime.split(":")[1];
            }
          }
          this.state.checkConditionsNewRequest.push(true);
        }
      }
    }
    const slice = this.state.api_Arr.slice(
      this.state.initialpage,
      this.state.initialpage + this.state.perPage
    );
    this.setState({
      data: slice,
      pageCount: Math.ceil(this.state.api_Arr.length / this.state.perPage),
    });
    this.setState(
      {
        siteID: localStorage.getItem("SiteId"),
        studiesID: localStorage.getItem("StudiesId"),
      },
      () => { }
    );
    this.newReimbursementsvisitname();
    this.newReimbursementitemTypes();
    this.myTravelNewReimburesementsAddressData();
  }

  //New Reimbursement Visit dropdown api calling.
  newReimbursementsvisitname = () => {
    newReimbursementVisitName(
      localStorage.getItem("StudiesId"),
      localStorage.getItem("SiteId"),
      localStorage.getItem("id")
    )
      .then((res) => {
        this.state.visitNameList = res.data.records;
      })
      .catch((err) => { });
  };

  //New Reimbursement Item Type dropdown api calling.
  newReimbursementitemTypes = () => {
    newReimbursementItemType(localStorage.getItem("id"))
      .then((res) => {
        this.state.itemTypesList = res.data.records;
      })
      .catch((err) => { });
  };

  //New reimbursement form Start address and End address
  myTravelNewReimburesementsAddressData = () => {
    myTravelNewReimbursementAddress(
      localStorage.getItem("id"),
      localStorage.getItem("id")
    )
      .then((val) => {
        this.setState(
          { myTravelNewReimburesementsAdd: val.data.patient_locations },
          () => { }
        );
      })
      .catch((err) => { });

    allCountriesStatestimezones()
      .then((value) => {
        this.setState({ statesDist: value.data.states.US }, () => { });
      })
      .catch((err) => { });
  };

  //dropdown wise pages record set.
  onCLickEntries = (e) => {
    var tempArray = [];
    var slice = [];
    this.state.searchflag
      ? (tempArray = this.state.search_Array)
      : (tempArray = this.state.api_Arr);
    if (e.target.value === this.props.t("All")) {
      slice = tempArray;
      this.setState({
        data: slice,
        perPage: tempArray.length,
        pageCount: 1,
        currentPage: 0,
        pageLimit: e.target.value,
        pageNumber: 0,
        selectedEntry: e.target.value,
      });
    } else {
      var temp;
      e.target.value <= 50 && tempArray.length > 0
        ? (temp = Math.ceil(tempArray.length / e.target.value))
        : (temp = 1);
      slice = this.state.api_Arr.slice(
        this.state.initialpage,
        this.state.initialpage + e.target.value
      );
      this.setState({
        data: slice,
        perPage: e.target.value,
        pageCount: temp,
        currentPage: 0,
        pageLimit: e.target.value,
        pageNumber: 0,
        selectedEntry: e.target.value,
      });
    }
  };

  //Sorting
  onSort = (Name, id) => {
    var i;
    if (this.state.column_id !== id) {
      this.setState({
        sortingDirection: "asc",
        SortIcon: "/media/svg/icons/Design/sort_default.svg",
      });
      document.getElementById(id).src = "/media/svg/icons/Design/sort_des.svg";
    }
    // var value = Name.replace(/\s+/g," ");
    var value = Name.replace(/ /g, " ");
    var tempArray = [];
    if (this.state.searchflag) {
      tempArray = this.state.search_Array;
    } else {
      tempArray = this.state.api_Arr;
    }
    if (
      this.state.sortingDirection === "asc" ||
      this.state.sortingDirection === ""
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
      if (this.state.pageNumber !== 0) {
        for (i = 0; i < final; i++) {
          slice = temp.slice(final, final + this.state.perPage);
        }
      } else {
        for (i = 0; i < this.state.perPage; i++) {
          slice = temp.slice(
            this.state.initialpage,
            this.state.initialpage + this.state.perPage
          );
        }
      }
      this.setState({
        data: slice,
        sortingDirection: "desc",
        SortIcon: "/media/svg/icons/Design/sort_default.svg",
        column_id: id,
      });
      for (i = 1; i <= this.state.headingName.length; i++) {
        if (i === id)
          document.getElementById(id).src =
            "/media/svg/icons/Design/sort_asc.svg";
        else
          document.getElementById(i).src =
            "/media/svg/icons/Design/sort_default.svg";
      }
    } else if (this.state.sortingDirection === "desc") {
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
      const final = this.state.pageNumber * this.state.perPage;
      if (this.state.pageNumber !== 0) {
        for (i = 0; i < final; i++) {
          slice = temp.slice(final, final + this.state.perPage);
        }
      } else {
        for (i = 0; i < this.state.perPage; i++) {
          slice = temp.slice(
            this.state.initialpage,
            this.state.initialpage + this.state.perPage
          );
        }
      }
      this.setState({
        data: slice,
        sortingDirection: "asc",
        SortIcon: "/media/svg/icons/Design/sort_default.svg",
        column_id: id,
      });
      for (i = 1; i <= this.state.headingName.length; i++) {
        if (i === id)
          document.getElementById(id).src =
            "/media/svg/icons/Design/sort_des.svg";
        else
          document.getElementById(i).src =
            "/media/svg/icons/Design/sort_default.svg";
      }
    }
  };

  //Paginations
  async handlePageChange(pageNumber) {
    var i;
    const selectedPage = pageNumber.selected;
    this.setState({ pageNumber: selectedPage });
    const finalperPage = pageNumber.selected + 1;
    var temp = [];
    if (this.state.searchflag) {
      temp = this.state.search_Array;
    } else {
      temp = this.state.api_Arr;
    }
    var slice = [];
    const final = selectedPage * this.state.perPage;
    if (selectedPage !== 0) {
      for (i = 0; i < final; i++) {
        slice = temp.slice(final, finalperPage * this.state.perPage);
      }
    } else {
      for (i = 0; i < this.state.perPage; i++) {
        slice = temp.slice(
          this.state.initialpage,
          this.state.initialpage + this.state.perPage
        );
      }
    }
    this.setState({ data: slice }, () => { });
  }

  //used to displays header for respective tables
  getHeader = () => {
    if (this.state.tableName === this.props.t("MyTravel New Request")) {
      return this.state.headingName.map((key, index) => {
        return (
          <th key={key.id.toString()}>
            {this.props
              .t(key.Name)
              .charAt(0)
              .toUpperCase() + this.props.t(key.Name).slice(1)}
          </th>
        );
      });
    } else if (
      this.state.tableName === this.props.t("Payment Summary") ||
      this.state.tableName === this.props.t("My travel") ||
      this.state.tableName === this.props.t("Stipend") ||
      this.state.tableName === this.props.t("My Studies")
    ) {
      return this.state.headingName.map((key, index) => {
        return (
          <th key={key.id.toString()}>
            <span onClick={() => this.onSort(key.Name, key.id)}>
              {this.props
                .t(key.Name)
                .charAt(0)
                .toUpperCase() + this.props.t(key.Name).slice(1)}
            </span>
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
  };

  getKeys = () => {
    return Object.keys(this.state.data);
  };

  //My Travel page New request button code
  newRequest(id, type) {
    if (this.state.tableName === this.props.t("My travel")) {
      if (type === "Add") {
        this.props.history.push({ pathname: "/newRequest/" + id });
      }
    }
  }

  //My travel page view request image code.
  viewRequest(id, type) {
    if (this.state.tableName === this.props.t("My travel")) {
      if (type === "View") {
        this.props.history.push({ pathname: "/newRequest/" + id });
      }
    }
  }

  //reimbursement receipts data particular fetch list wise
  reimbursementsReceiptsShowList = (id) => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id === id) {
        this.setState({ ModalCounter: true }, () => { });
        for (var j = 0; j < this.state.data[i].File.length; j++) {
          for (var x = 0; x < this.state.data[i].File[j].files.length; x++) {
            this.state.receiptsList.push(this.state.data[i].File[j].files[x]);
            var imageData = this.state.data[i].File[j].files[x].hash;
            reimbursementAttachements(imageData)
              .then((value) => { })
              .catch((error) => { });
          }
        }
      }
    }
  };

  //reimbursements Receipts Modal Close
  reimbursementsReceiptsCloseList = () => {
    this.setState({ ModalCounter: false, receiptsList: [] }, () => []);
  };

  //receipt show function type wise
  receiptsView = (e, ext, hashCode, name) => {
    e.preventDefault();
    this.setState(
      {
        isView: true,
        receiptsName: name,
        receiptsType: ext,
        showReceipts: `${process.env.REACT_APP_API_URL}/api/v1/attachments/${hashCode}`,
      },
      () => { }
    );
  };

  //receipt close function type wise
  receiptsClose = () => {
    this.setState(
      { isView: false, receiptsName: "", receiptsType: "", showReceipts: "" },
      () => { }
    );
  };

  //receipts download functions type wise
  receiptsDownload = (ext, hashCode) => {
    if (
      ext === "png" ||
      ext === "jpg" ||
      ext === "jpeg" ||
      ext === "gif" ||
      ext === "jfif" ||
      ext === "pdf" ||
      ext === "csv" ||
      ext === "txt"
    ) {
      downloadAttachements(hashCode)
        .then(() => {
          window.location.href = `${process.env.REACT_APP_API_URL}/api/v1/attachments_download/${hashCode}`;
        })
        .catch((error) => { });
    } else if (
      ext === "pptx" ||
      ext === "ppt" ||
      ext === "doc" ||
      ext === "docx" ||
      ext === "xlsx" ||
      ext === "xls"
    ) {
      reimbursementAttachements(hashCode)
        .then((value) => {
          window.location.href = `${process.env.REACT_APP_API_URL}/api/v1/attachments/${hashCode}`;
        })
        .catch((error) => { });
    }
  };

  // new request or reimbursement date and study completed warning message show.
  warningMessageOpen = (view, date, studyCompleteOrNot) => {
    if (view === "newRequestNote") {
      var checkDate = "";
      this.setState({ Warning: true }, () => { });
      if (new Date(date).getFullYear() >= new Date().getFullYear()) {
        if (new Date(date).getMonth() + 1 >= new Date().getMonth() + 1) {
          if (new Date(date).getDate() >= new Date().getDate()) {
            checkDate = date;
          }
        }
        if (new Date(date).getMonth() + 1 > new Date().getMonth() + 1) {
          checkDate = date;
        }
      }
      if (new Date(date).getFullYear() > new Date().getFullYear()) {
        checkDate = date;
      }
      if (studyCompleteOrNot !== "0") {
        this.setState(
          {
            newWarningMessage: this.props.t(
              "Changes cannot be made to completed study visits. Please contact the site if you have any questions."
            ),
          },
          () => { }
        );
      } else if (!checkDate) {
        this.setState(
          {
            newWarningMessage: this.props.t(
              "Changes cannot be made to past study visits. Please contact the site if you have any questions."
            ),
          },
          () => { }
        );
      }
    } else if (view === "newReimbursementNote") {
      this.setState(
        {
          Warning: true,
          newWarningMessage: this.props.t(
            "Changes cannot be made to completed study visits. Please contact the site if you have any questions."
          ),
        },
        () => { }
      );
    }
  };

  // new request or reimbursement warning message close.
  warningMessageClose = () => {
    this.setState(
      {
        Warning: false,
        newWarningMessage: this.props.t(
          "Changes cannot be made to completed study visits. Please contact the site if you have any questions."
        ),
      },
      () => { }
    );
  };

  //table Name wise all table data show.
  tableBody() {
    return this.state.data.map((res, index) => {
      var keys = this.state.headingName;
      return (
        <tr key={res.id}>
          <RenderRow
            onClickData={(e) => {
              this.viewReimbursement(e);
            }}
            key={res.id}
            data={res}
            className={"class"}
            keys={keys}
            tableName={this.state.tableName}
          />
          {this.state.tableName === this.props.t("Payment Summary") && (
            <td>
              {res.FileLength !== null ? (
                <svg
                  id="view-icon"
                  onClick={() => this.reimbursementsReceiptsShowList(res.id)}
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                >
                  <title>{this.props.t("Receipts")}</title>
                  <g data-name="Mask Group 7" transform="translate(-1226 -453)">
                    <g id="eye" transform="translate(1229.549 458.745)">
                      <path
                        id="Path_14"
                        data-name="Path 14"
                        d="M1.362,11.3S4.29,5.447,9.415,5.447,17.468,11.3,17.468,11.3s-2.929,5.857-8.053,5.857S1.362,11.3,1.362,11.3Z"
                        transform="translate(-1.362 -5.447)"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                      <ellipse
                        id="Ellipse_9"
                        data-name="Ellipse 9"
                        cx="2.196"
                        cy="2.196"
                        rx="2.196"
                        ry="2.196"
                        transform="translate(5.857 3.661)"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </g>
                  </g>
                </svg>
              ) : null}
            </td>
          )}
          {this.state.tableName === this.props.t("My travel") && (
            <td>
              <BootstrapTooltip title={res.Comments !== "" ? res.Comments : ""}>
                <div
                  className={
                    res.Comments !== ""
                      ? "comment-icon "
                      : "comment-icon no-comment"
                  }
                >
                  <img
                    src="/media/images/comment-icon.svg"
                    alt="comment"
                    width="100%"
                  />
                </div>
              </BootstrapTooltip>
            </td>
          )}
          {this.state.tableName === this.props.t("My travel") && (
            <td className="pdf-icon">

              {res.Patient_Save === "0" ? (
                localStorage.getItem("Status") === "2" ||
                  moment(res.Visitdatetime).format("DD-MM-YYYY") !==
                  moment(res.FilterDate).format("DD-MM-YYYY") ? (
                  <button
                    className="btn btn-primary new-req-btn disabled-btn"
                    onClick={() =>
                      this.warningMessageOpen(
                        "newRequestNote",
                        res.Visitdatetime,
                        localStorage.getItem("Status")
                      )
                    }
                  >
                    + {this.props.t("New request")}
                  </button>
                ) : (
                  <button
                    className="btn btn-primary new-req-btn"
                    onClick={() => this.newRequest(res.id, "Add")}
                  >
                    + {this.props.t("New request")}
                  </button>
                )
              ) : (
                <img
                  src="/media/misc/pdf.svg"
                  onClick={() => this.viewRequest(res.id, "View")}
                  alt="unable to load"
                  title={this.props.t("View request")}
                />
              )}
            </td>
          )}
          {this.state.tableName === this.props.t("My Studies") && (
            <td>
              {(res.ConditionsStipends === "1" ||
                res.ConditionsReimbursements === "1") &&
                res.ActionPaymentSummary !== "0" ? (
                <svg
                  id="payment-icon"
                  className="mr-3"
                  onClick={() =>
                    this.paymentSummaryReimb(
                      res.StudyId,
                      res.SiteId,
                      res.ConditionsReimbursements,
                      res.ConditionsStipends,
                      res.ConditionsTaravales,
                      res.ConditionsId,
                      res.Status
                    )
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <title>{this.props.t("Payment Summary")}</title>
                  <g
                    id="Mask_Group_63"
                    data-name="Mask Group 63"
                    transform="translate(-549.933 -132.933)"
                  >
                    <g id="line_8_" transform="translate(549.99 136.544)">
                      <path
                        id="Path_672"
                        data-name="Path 672"
                        d="M20.458,21.847l-.239-1.474L3.178,23.146,1.459,15.178,0,15.493l2.017,9.354Z"
                        transform="translate(0 -8.069)"
                      />
                      <path
                        id="Path_673"
                        data-name="Path 673"
                        d="M4.25,16.921h20.9V5.059H4.25ZM5.743,6.551H23.657v8.877H5.743Z"
                        transform="translate(-1.264 -5.059)"
                      />
                      <path
                        id="Path_674"
                        data-name="Path 674"
                        d="M18.431,11.557V10.195a.708.708,0,0,1,.405.558l.855-.115a1.471,1.471,0,0,0-.405-.834,1.437,1.437,0,0,0-.855-.378V9.08h-.49v.345a1.363,1.363,0,0,0-1.281,1.408,1.508,1.508,0,0,0,.309.959,1.853,1.853,0,0,0,.972.591v1.459a.93.93,0,0,1-.331-.293,1.167,1.167,0,0,1-.2-.481l-.882.1a1.875,1.875,0,0,0,.466,1.062,1.546,1.546,0,0,0,.949.45v.634h.49v-.652a1.611,1.611,0,0,0,1.029-.529,1.578,1.578,0,0,0,.37-1.063,1.414,1.414,0,0,0-.294-.925A2.16,2.16,0,0,0,18.431,11.557Zm-.49-.166a.752.752,0,0,1-.327-.257.6.6,0,0,1-.109-.343.623.623,0,0,1,.119-.37.632.632,0,0,1,.317-.237Zm.9,2.259a.682.682,0,0,1-.412.242V12.532a.849.849,0,0,1,.437.26.631.631,0,0,1,.134.4A.691.691,0,0,1,18.843,13.649Z"
                        transform="translate(-4.916 -6.255)"
                      />
                    </g>
                  </g>
                </svg>
              ) : (
                <svg className="blank-icon"></svg>
              )}
              {res.ConditionsTaravales !== "1" && res.ActionTravel !== "0" ? (
                <svg
                  id="my-travel-icon"
                  title={this.props.t("My travel")}
                  onClick={() =>
                    this.myTravelStudyWise(
                      res.StudyId,
                      res.SiteId,
                      res.ConditionsReimbursements,
                      res.ConditionsStipends,
                      res.ConditionsTaravales,
                      res.ConditionsId,
                      res.Status
                    )
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  x="0px"
                  y="0px"
                  width="25px"
                  height="25px"
                  viewBox="0 0 22.5 32.503"
                >
                  <title>{this.props.t("My travel")}</title>
                  <path
                    id="travel"
                    d="M24,9H20V4a1,1,0,0,0,1-1,3,3,0,0,0-3-3H14a3,3,0,0,0-3,3,1,1,0,0,0,1,1V9H8a3,3,0,0,0-3,3V26a3,3,0,0,0,3,3h.277a1.949,1.949,0,0,0-.207,1.518A2,2,0,1,0,11.723,29h8.555a1.949,1.949,0,0,0-.207,1.518A2,2,0,1,0,23.723,29H24a3,3,0,0,0,3-3V12A3,3,0,0,0,24,9ZM14,1h4a2,2,0,0,1,2,2H19a1,1,0,0,0-1-1H14a1,1,0,0,0-1,1H12A2,2,0,0,1,14,1Zm5,3V9H13V4a1,1,0,0,0,1-1h4A1,1,0,0,0,19,4ZM10,31a1,1,0,1,1,1-1A1,1,0,0,1,10,31Zm12,0a1,1,0,1,1,1-1A1,1,0,0,1,22,31Zm4-5a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2V16h8v1a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V16h8ZM15,17V14h2v3Zm11-2H18V14a1,1,0,0,0-1-1H15a1,1,0,0,0-1,1v1H6V12a2,2,0,0,1,2-2H24a2,2,0,0,1,2,2Z"
                    transform="translate(-4.75 0.25)"
                    fill="#111918"
                    stroke="#000"
                    strokeWidth="0.5"
                  />
                </svg>
              ) : (
                <svg className="blank-icon"></svg>
              )}
            </td>
          )}
        </tr>
      );
    });
  }

  //all table global search
  onsearch = (search) => {
    var i;
    this.setState({ searchText: search });
    var filteredData = [];
    var unfilterData = [];
    const excludeColumns = ["id"];
    const lowercasedValue = search.toLowerCase().trim();
    if (lowercasedValue === "") {
      var temp;
      const final = this.state.pageNumber * this.state.perPage;
      if (this.state.pageNumber !== 0) {
        if (this.state.pageLimit === this.props.t("All")) {
          temp = 1;
          for (i = 0; i < this.state.api_Arr.length; i++) {
            unfilterData = this.state.api_Arr.slice(
              0,
              this.state.api_Arr.length
            );
          }
        } else {
          for (i = 0; i < final; i++) {
            temp = Math.ceil(this.state.api_Arr.length / this.state.perPage);
            unfilterData = this.state.api_Arr.slice(
              final,
              final + this.state.perPage
            );
          }
        }
      } else {
        if (this.state.pageLimit === this.props.t("All")) {
          temp = 1;
          for (i = 0; i < this.state.api_Arr.length; i++) {
            unfilterData = this.state.api_Arr.slice(
              this.state.initialpage,
              this.state.initialpage + this.state.api_Arr.length
            );
          }
        } else {
          temp = Math.ceil(this.state.api_Arr.length / this.state.perPage);
          for (i = 0; i < this.state.perPage; i++) {
            unfilterData = this.state.api_Arr.slice(
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
        pageNumber: 0,
      });
    } else {
      filteredData = this.state.api_Arr.filter((item) => {
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
      if (this.state.pageNumber !== 0) {
        for (i = 0; i < final; i++) {
          slice = filteredData.slice(0, this.state.perPage);
        }
      } else {
        for (i = 0; i < this.state.perPage; i++) {
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
        pageNumber: 0,
      });
    }
  };

  //used to displays reimbursement
  reimbursementsTab = () => {
    this.setState(
      {
        searchText: "",
        dateValidation: "",
        selectedId: [],
        tableName: this.props.t("Payment Summary"),
        startDate: "",
        endDate: "",
      },
      () => { }
    );
    this.reimbursementsApiResponse();
  };

  //reimbursement api calling.
  reimbursementsApiResponse = () => {
    var i;
    this.setState({ searchData: true }, () => { });
    const heading = [
      { Name: "Visitname", id: 1 },
      { Name: "Reimbursementamount", id: 2 },
      { Name: "Number Of Items", id: 3 },
      { Name: "Submitdate", id: 4 },
      { Name: "Status", id: 5 },
      // { Name: "Transaction id", id: 6 },
    ];
    reimbursements(
      localStorage.getItem("id"),
      localStorage.getItem("StudiesId"),
      moment(this.state.startDate).format("DD-MM-YYYY"),
      moment(this.state.endDate).format("DD-MM-YYYY")
    )
      .then((value) => {
        for (var x = 0; x < value.data.records.length; x++) {
          let demoCount = null;
          if (value.data.records[x].id === null) {
          } else {
            if (value.data.records[x]) {
              var filesData = [];
              var statusLabel = "";
              if (value.data.records[x].status === "2.0")
                statusLabel = "Approved".replaceAll('"', "");
              else if (value.data.records[x].status === "1.0")
                statusLabel = "Pending".replaceAll('"', "");
              else if (value.data.records[x].status === "1.1")
                statusLabel = "Reviewed".replaceAll('"', "");
              else if (value.data.records[x].status === "0.0")
                statusLabel = "Draft".replaceAll('"', "");
              else if (value.data.records[x].status === "4.0")
                statusLabel = "Cancelled".replaceAll('"', "");
              else if (value.data.records[x].status === "3.0")
                statusLabel = "Denied".replaceAll('"', "");
              else if (value.data.records[x].status === "5.0")
                statusLabel = "Recalled".replaceAll('"', "");
              for (i = 0; i < value.data.records[x].items.length; i++) {
                filesData.push(value.data.records[x].items[i]);
                for (
                  var j = 0;
                  j < value.data.records[x].items[i].files.length;
                  j++
                ) {
                  demoCount = value.data.records[x].items[i].files.length;
                }
                this.setState({ filesLength: demoCount }, () => { });
              }
            }
          }
          this.state.selectedId.push({
            id: value.data.records[x].id,
            Visitname: value.data.records[x].visit_name.name,
            Reimbursementamount: parseFloat(value.data.records[x].amount),
            "Number Of Items": value.data.records[x]._num_items,
            Submitdate: value.data.records[x].date_request,
            Status: value.data.records[x].status,
            label: statusLabel,
            Visit_id: value.data.records[x].visit_id,
            SearchDate: moment(value.data.records[x].date_request).format(
              "DD-MMM-YYYY"
            ),
            File: filesData,
            FileLength: this.state.filesLength,
          });
        }
        this.setState(
          {
            data: this.state.selectedId,
            api_Arr: this.state.selectedId,
            headingName: heading,
          },
          () => { }
        );
        const slice = this.state.api_Arr.slice(
          this.state.initialpage,
          this.state.initialpage + this.state.perPage
        );
        this.setState(
          {
            data: slice,
            pageCount: Math.ceil(
              this.state.api_Arr.length / this.state.perPage
            ),
            searchData: false,
            selectedId: [],
            tabRefreshing: 1,
            pageNumber: 0,
            selectedEntry: 10,
            perPage: 10,
          },
          () => { }
        );
      })
      .catch((error) => { });
  };

  //used to display stipened
  stipendTab = () => {
    this.setState(
      {
        searchText: "",
        dateValidation: "",
        selectedId: [],
        tableName: this.props.t("Stipend"),
        startDate: "",
        endDate: "",
      },
      () => { }
    );
    this.stipendApiResposne();
  };

  //stipend api calling.
  stipendApiResposne = () => {
    this.setState({ searchData: true }, () => { });
    const heading = [
      { Name: "Visitname", id: 1 },
      { Name: "Stipendamount", id: 2 },
      { Name: "Completeddate", id: 3 },
      { Name: "Status", id: 4 },
    ];
    stipendData(
      localStorage.getItem("StudiesId"),
      localStorage.getItem("id"),
      localStorage.getItem("SiteId")
    )
      .then((res) => {
        var statusLabel = "";
        for (var x = 0; x < res.data.records.length; x++) {
          var CompletedDateData = res.data.records[x].date;
          if (res.data.records[x].status === "2.0")
            statusLabel = "Approved".replaceAll('"', "");
          else if (res.data.records[x].status === "1.0")
            statusLabel = "Pending1".replaceAll('"', "");
          else if (res.data.records[x].status === "1.1")
            statusLabel = "Reviewed".replaceAll('"', "");
          else if (res.data.records[x].status === "0.0")
            statusLabel = "Draft".replaceAll('"', "");
          else if (res.data.records[x].status === "5.0")
            statusLabel = "Recalled".replaceAll('"', "");
          this.state.selectedId.push({
            id: res.data.records[x].id,
            Visitname: res.data.records[x].name,
            Stipendamount: parseFloat(res.data.records[x].stipend),
            Completeddate: !CompletedDateData ? " " : CompletedDateData,
            Status: res.data.records[x].status,
            label: statusLabel,
            SearchDate: !CompletedDateData
              ? " "
              : moment(CompletedDateData).format("DD-MMM-YYYY"),
          });
        }
        this.setState(
          {
            data: this.state.selectedId,
            api_Arr: this.state.selectedId,
            headingName: heading,
            tableName: this.props.t("Stipend"),
          },
          () => { }
        );
        const slice = this.state.api_Arr.slice(
          this.state.initialpage,
          this.state.initialpage + this.state.perPage
        );
        this.setState(
          {
            data: slice,
            pageCount: Math.ceil(
              this.state.api_Arr.length / this.state.perPage
            ),
          },
          () => { }
        );
        this.setState(
          {
            searchData: false,
            pageNumber: 0,
            selectedEntry: 10,
            perPage: 10,
            selectedId: [],
            tabRefreshing: 2,
          },
          () => { }
        );
      })
      .catch((err) => { });
  };

  //all table date filter table name wise work.
  dateClear = (startDate, endDate) => {
    if (
      startDate === "" ||
      startDate === null ||
      endDate === "" ||
      endDate === null
    ) {
      this.setState(
        { dateValidation: "", startDate: "", endDate: "", selectedId: [] },
        () => { }
      );
    } else {
      if (this.state.tableName === this.props.t("Payment Summary")) {
        this.setState({ startDate: "", endDate: "" }, () => {
          this.reimbursementsApiResponse();
        });
      } else if (this.state.tableName === this.props.t("My travel")) {
        this.setState({ startDate: "", endDate: "" }, () => {
          this.myTravelApiResponse();
        });
      } else if (this.state.tableName === this.props.t("Stipend")) {
        this.setState({ startDate: "", endDate: "" }, () => {
          this.stipendApiResposne();
        });
      }
    }
  };

  //my travel api calling.
  myTravelApiResponse = () => {
    this.setState({ searchData: true }, () => { });
    const heading = [
      { Name: "Visitname", id: 1 },
      { Name: "Visitdatetime", id: 2 },
      { Name: "Traveldate", id: 3 },
      { Name: "Travel type", id: 4 },
      { Name: "Status", id: 5 },
    ];
    myTravel(
      localStorage.getItem("id"),
      localStorage.getItem("StudiesId"),
      moment(this.state.startDate).format("DD-MM-YYYY"),
      moment(this.state.endDate).format("DD-MM-YYYY")
    )
      .then((value) => {
        var statusLabel = "";
        for (var x = 0; x < value.data.records.length; x++) {
          if (value.data.records[x].visit_start_date !== null) {
            if (
              new Date(value.data.records[x].visit_start_date).getFullYear() >=
              new Date().getFullYear()
            ) {
              if (
                new Date(value.data.records[x].visit_start_date).getMonth() +
                1 >=
                new Date().getMonth() + 1
              ) {
                if (
                  new Date(value.data.records[x].visit_start_date).getDate() >=
                  new Date().getDate()
                ) {
                  this.setState(
                    { filterDate: value.data.records[x].visit_start_date },
                    () => { }
                  );
                }
              }
              if (
                new Date(value.data.records[x].visit_start_date).getMonth() +
                1 >
                new Date().getMonth() + 1
              ) {
                this.setState(
                  { filterDate: value.data.records[x].visit_start_date },
                  () => { }
                );
              }
            }
            if (
              new Date(value.data.records[x].visit_start_date).getFullYear() >
              new Date().getFullYear()
            ) {
              this.setState(
                { filterDate: value.data.records[x].visit_start_date },
                () => { }
              );
            }
          }
          if (value.data.records[x].id === null) {
          } else {
            if (value.data.records[x].status === "1")
              statusLabel = "Pending".replaceAll('"', "");
            else if (value.data.records[x].status === "2")
              statusLabel = "Approved".replaceAll('"', "");
            else if (value.data.records[x].status === "3")
              statusLabel = "Denied".replaceAll('"', "");
            else if (value.data.records[x].status === "4")
              statusLabel = "Cancelled".replaceAll('"', "");
            var result = value.data.records[x]._request_types
              ?.toLowerCase()
              .replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
              });
            if (result !== undefined) {
              var splitTravelTypes = String(result).split(", ");
              for (let i = 0; i < splitTravelTypes.length; i++) {
                if (splitTravelTypes[i] === "Air")
                  splitTravelTypes[i] = "Air Transportation";
                else if (splitTravelTypes[i] === "Hotel")
                  splitTravelTypes[i] = "Hotel Lodging";
                else if (splitTravelTypes[i] === "Ground")
                  splitTravelTypes[i] = "Ground Transportation";
              }
              var travelTypeLabelConcat = splitTravelTypes
                .map((t) => t)
                .join(", ");
            } else {
              travelTypeLabelConcat = splitTravelTypes = "None";
            }
            this.state.selectedId.push({
              id: value.data.records[x].id,
              Visitname: value.data.records[x]._visit_name,
              Visitdatetime: value.data.records[x].visit_start_date,
              Traveldate: value.data.records[x].travel_start_date,
              "Travel type": travelTypeLabelConcat,
              travelFilter: value.data.records[x]._request_types,
              Status: value.data.records[x].status,
              label: statusLabel,
              Comments: value.data.records[x].comment,
              Patient_Save: value.data.records[x].patient_save,
              FilterDate: this.state.filterDate,
              Searchdate: moment(value.data.records[x].visit_start_date).format(
                "DD-MMM-YYYY HH:mm"
              ),
              Searchdate1: moment(
                value.data.records[x].travel_start_date
              ).format("DD-MMM-YYYY"),
            });
          }
        }
        this.setState(
          {
            headingName: heading,
            data: this.state.selectedId,
            api_Arr: this.state.selectedId,
          },
          () => { }
        );
        const slice = this.state.api_Arr.slice(
          this.state.initialpage,
          this.state.initialpage + this.state.perPage
        );
        this.setState({
          data: slice,
          pageCount: Math.ceil(this.state.api_Arr.length / this.state.perPage),
        });
        this.setState(
          {
            searchData: false,
            pageNumber: 0,
            selectedEntry: 10,
            perPage: 10,
            selectedId: [],
          },
          () => { }
        );
      })
      .catch((error) => { });
  };

  //handles the action from dropdown under newreimbursement
  NewRequestList = (e) => {
    const value = e.target.value;
    !value
      ? this.setState({ myTravelNewRequestList: "" }, () => { })
      : this.setState({ myTravelNewRequestList: value }, () => { });
  };

  //creates new row under newreimbursement
  InputRowsCreated = () => {
    if (
      this.state.myTravelNewRequestList === "" ||
      this.state.myTravelNewRequestList === null
    ) {
      this.setState(
        {
          submitTravelRequestDropdownErr: this.props.t(
            "Please select a travel type."
          ),
        },
        () => { }
      );
    } else {
      this.setState({ submitTravelRequestDropdownErr: "" }, () => { });
    }

    this.state.inputBoxes.push(this.state.myTravelNewRequestList);
    for (var i = 0; i < this.state.myTravelNewRequestDropDown.length; i++) {
      if (
        this.state.myTravelNewRequestDropDown[i].name ===
        this.state.myTravelNewRequestList
      ) {
        var selectedFilter = this.state.myTravelNewRequestDropDown.filter(
          (item) => item.name !== this.state.myTravelNewRequestList
        );
        this.setState(
          {
            myTravelNewRequestDropDown: selectedFilter,
            myTravelNewRequestList: "",
          },
          () => { }
        );
      }
    }
  };

  //Travel submit request Page cancel button operation.
  newRequestCancel = (type) => {
    if (this.state.tableName === this.props.t("MyTravel New Request")) {
      if (type === "Cancel") {
        this.props.history.push({ pathname: "/myTravel" });
      }
    }
  };

  //global date filter used in the table name wise.
  dateFilter = (startDate, endDate) => {
    var statusLabel = "";
    if (
      (startDate === "" || startDate === null) &&
      (endDate === "" || endDate === null)
    ) {
      this.setState(
        {
          dateValidation: this.props.t("Start date and end date are required."),
        },
        () => { }
      );
    } else if (
      (startDate !== "" || startDate !== null) &&
      (endDate === "" || endDate === null)
    ) {
      this.setState(
        {
          dateValidation: this.props.t("Start date and End date are required."),
        },
        () => { }
      );
    } else if (
      (startDate === "" || startDate === null) &&
      (endDate !== "" || endDate !== null)
    ) {
      this.setState(
        {
          dateValidation: this.props.t("Start date and End date are required."),
        },
        () => { }
      );
    } else if (
      (startDate !== "" || startDate !== null) &&
      (endDate !== "" || endDate !== null)
    ) {
      this.setState({ dateValidation: "", selectedId: [] }, () => { });
      if (this.state.tableName === this.props.t("Payment Summary")) {
        this.reimbursementsApiResponse();
      } else if (this.state.tableName === this.props.t("My travel")) {
        this.myTravelApiResponse();
      } else if (this.state.tableName === this.props.t("Stipend")) {
        const heading = [
          { Name: "Visitname", id: 1 },
          { Name: "Stipendamount", id: 2 },
          { Name: "Completeddate", id: 3 },
          { Name: "Status", id: 4 },
          // { Name: "Transaction id", id: 5 },
        ];
        this.setState({ searchData: true }, () => { });
        stipendData(
          localStorage.getItem("StudiesId"),
          localStorage.getItem("id"),
          localStorage.getItem("SiteId"),
          moment(this.state.startDate).format("DD-MM-YYYY"),
          moment(this.state.endDate).format("DD-MM-YYYY")
        )
          .then((res) => {
            var statusLabel = "";
            for (var x = 0; x < res.data.records.length; x++) {
              var CompletedDateData = res.data.records[x].date;
              if (res.data.records[x].status === "2.0")
                statusLabel = "Approved".replaceAll('"', "");
              else if (res.data.records[x].status === "1.0")
                statusLabel = "Pending".replaceAll('"', "");
              else if (res.data.records[x].status === "1.1")
                statusLabel = "Reviewed".replaceAll('"', "");
              else if (res.data.records[x].status === "0.0")
                statusLabel = "Draft".replaceAll('"', "");
              else if (res.data.records[x].status === "5.0")
                statusLabel = "Recalled".replaceAll('"', "");
              this.state.selectedId.push({
                id: res.data.records[x].id,
                Visitname: res.data.records[x].name,
                Stipendamount: parseFloat(res.data.records[x].stipend),
                Completeddate: !CompletedDateData ? " " : CompletedDateData,
                Status: res.data.records[x].status,
                label: statusLabel,
                SearchDate: !CompletedDateData
                  ? " "
                  : moment(CompletedDateData).format("DD-MMM-YYYY"),
              });
            }
            this.setState(
              {
                data: this.state.selectedId,
                api_Arr: this.state.selectedId,
                headingName: heading,
                tableName: this.props.t("Stipend"),
              },
              () => { }
            );
            const slice = this.state.api_Arr.slice(
              this.state.initialpage,
              this.state.initialpage + this.state.perPage
            );
            this.setState({
              data: slice,
              pageCount: Math.ceil(
                this.state.api_Arr.length / this.state.perPage
              ),
            });
            this.setState(
              {
                searchData: false,
                pageNumber: 0,
                selectedEntry: 10,
                perPage: 10,
                selectedId: [],
              },
              () => { }
            );
          })
          .catch((err) => {
            this.setState({ searchData: false }, () => { });
          });
      }
    }
  };

  //my travel form depenture date changed function.
  handleDepentureDateChanged = (date, i, Obj) => {
    var value = moment(date).format("YYYY-MM-DD");
    var indexInput = i;
    var label = Obj;
    for (var i = 0; i < this.state.newRequestArrData.length; i++) {
      if (label === this.state.newRequestArrData[i].type) {
        this.state.newRequestArrData[i].depentureDates = value;
        this.state.travel_types_id.map((Obj, index) => {
          if (index === indexInput) {
            this.state.newRequestArrData[i].travel_types_id = Obj;
          }
        });
      }
    }

    for (var x = 0; x < this.state.depentureDateUpdate.length; x++) {
      if (label === this.state.depentureDateUpdate[x].type) {
        return this.setState(
          {
            depentureDateUpdate: [
              ...this.state.depentureDateUpdate,
              (this.state.depentureDateUpdate[x].depentureDate = value),
            ],
          },
          () => { }
        );
      }
    }
  };

  //my travel form depenture Hour changed function.
  handleDepentureHourChanged = (e, i, Obj) => {
    var value = e.target.value;
    var indexInput = i;
    var label = Obj;
    for (var i = 0; i < this.state.newRequestArrData.length; i++) {
      if (label === this.state.newRequestArrData[i].type) {
        this.state.newRequestArrData[i].depentureHour = value;
        this.state.newRequestArrData[
          i
        ].depentureTime = this.state.newRequestArrData[i].depentureTime.replace(
          this.state.newRequestArrData[i].depentureTime.split(":")[0],
          value
        );
        this.state.travel_types_id.map((Obj, index) => {
          if (index === indexInput) {
            this.state.newRequestArrData[i].travel_types_id = Obj;
          }
        });
      }
    }
    for (var x = 0; x < this.state.depentureDateUpdate.length; x++) {
      if (label === this.state.depentureDateUpdate[x].type) {
        this.state.depentureDateUpdate[
          x
        ].depentureTime = this.state.depentureDateUpdate[
          x
        ].depentureTime.replace(
          this.state.depentureDateUpdate[x].depentureTime.split(":")[0],
          value
        );
        return this.setState(
          {
            depentureDateUpdate: [
              ...this.state.depentureDateUpdate,
              (this.state.depentureDateUpdate[x].depentureHour = value),
            ],
          },
          () => { }
        );
      }
    }
  };

  //my travel form depenture minute changed function.
  handleDepentureMinuteChanged = (e, i, Obj) => {
    var value = e.target.value;
    var indexInput = i;
    var label = Obj;
    for (var i = 0; i < this.state.newRequestArrData.length; i++) {
      if (label === this.state.newRequestArrData[i].type) {
        this.state.newRequestArrData[i].depentureMinute = value;
        this.state.newRequestArrData[i].depentureTime =
          this.state.newRequestArrData[i].depentureTime.split(":")[0] +
          ":" +
          value;
        this.state.travel_types_id.map((Obj, index) => {
          if (index === indexInput) {
            this.state.newRequestArrData[i].travel_types_id = Obj;
          }
        });
      }
    }
    for (var x = 0; x < this.state.depentureDateUpdate.length; x++) {
      if (label === this.state.depentureDateUpdate[x].type) {
        this.state.depentureDateUpdate[
          x
        ].depentureTime = this.state.depentureDateUpdate[
          x
        ].depentureTime.replace(
          this.state.depentureDateUpdate[x].depentureTime.split(":")[1],
          value
        );
        return this.setState(
          {
            depentureDateUpdate: [
              ...this.state.depentureDateUpdate,
              (this.state.depentureDateUpdate[x].depentureMinute = value),
            ],
          },
          () => { }
        );
      }
    }
  };

  //my travel form return date changed function.
  handleReturnDateChanged = (date, i, Obj) => {
    var value = moment(date).format("YYYY-MM-DD");
    var indexInput = i;
    var label = Obj;
    for (var i = 0; i < this.state.newRequestArrData.length; i++) {
      if (label === this.state.newRequestArrData[i].type) {
        this.state.newRequestArrData[i].returnDate = value;
        this.state.travel_types_id.map((Obj, index) => {
          if (index === indexInput) {
            this.state.newRequestArrData[i].travel_types_id = Obj;
          }
        });
      }
    }

    for (var x = 0; x < this.state.depentureDateUpdate.length; x++) {
      if (label === this.state.depentureDateUpdate[x].type) {
        return this.setState(
          {
            depentureDateUpdate: [
              ...this.state.depentureDateUpdate,
              (this.state.depentureDateUpdate[x].returnDate = value),
            ],
          },
          () => { }
        );
      }
    }
  };

  //my travel form return Hour changed function.
  handleReturnHourChanged = (e, i, Obj) => {
    var value = e.target.value;
    var indexInput = i;
    var label = Obj;
    for (var i = 0; i < this.state.newRequestArrData.length; i++) {
      if (label === this.state.newRequestArrData[i].type) {
        this.state.newRequestArrData[i].returnHour = value;
        this.state.newRequestArrData[
          i
        ].returnTime = this.state.newRequestArrData[i].returnTime.replace(
          this.state.newRequestArrData[i].returnTime.split(":")[0],
          value
        );
        this.state.travel_types_id.map((Obj, index) => {
          if (index === indexInput) {
            this.state.newRequestArrData[i].travel_types_id = Obj;
          }
        });
      }
    }
    for (var x = 0; x < this.state.depentureDateUpdate.length; x++) {
      if (label === this.state.depentureDateUpdate[x].type) {
        this.state.depentureDateUpdate[
          x
        ].returnTime = this.state.depentureDateUpdate[x].returnTime.replace(
          this.state.depentureDateUpdate[x].returnTime.split(":")[0],
          value
        );
        return this.setState(
          {
            depentureDateUpdate: [
              ...this.state.depentureDateUpdate,
              (this.state.depentureDateUpdate[x].returnHour = value),
            ],
          },
          () => { }
        );
      }
    }
  };

  //my travel form return Minute changed function.
  handleReturnMinuteChanged = (e, i, Obj) => {
    var value = e.target.value;
    var indexInput = i;
    var label = Obj;
    for (var i = 0; i < this.state.newRequestArrData.length; i++) {
      if (label === this.state.newRequestArrData[i].type) {
        this.state.newRequestArrData[i].returnMinute = value;
        this.state.newRequestArrData[i].returnTime =
          this.state.newRequestArrData[i].returnTime.split(":")[0] +
          ":" +
          value;
        this.state.travel_types_id.map((Obj, index) => {
          if (index === indexInput) {
            this.state.newRequestArrData[i].travel_types_id = Obj;
          }
        });
      }
    }
    for (var x = 0; x < this.state.depentureDateUpdate.length; x++) {
      if (label === this.state.depentureDateUpdate[x].type) {
        this.state.depentureDateUpdate[
          x
        ].returnTime = this.state.depentureDateUpdate[x].returnTime.replace(
          this.state.depentureDateUpdate[x].returnTime.split(":")[1],
          value
        );
        return this.setState(
          {
            depentureDateUpdate: [
              ...this.state.depentureDateUpdate,
              (this.state.depentureDateUpdate[x].returnMinute = value),
            ],
          },
          () => { }
        );
      }
    }
  };

  //travel request index wise Remove button bind
  myTravelNewRequestRecords = (Obj, index) => {
    var label = Obj;
    var indexInput = index;
    var newArr = this.state.inputBoxes.filter((name) => {
      return label !== name;
    });
    this.setState({ inputBoxes: newArr }, () => { });
    if (label === "Air Transportation") {
      this.setState(
        {
          myTravelNewRequestDropDown: [
            ...this.state.myTravelNewRequestDropDown,
            { name: "Air Transportation", valueName: "Air" },
          ],
        },
        () => { }
      );
    } else if (label === "Hotel Lodging") {
      this.setState(
        {
          myTravelNewRequestDropDown: [
            ...this.state.myTravelNewRequestDropDown,
            { name: "Hotel Lodging", valueName: "Hotel" },
          ],
        },
        () => { }
      );
    } else if (label === "Ground Transportation") {
      this.setState(
        {
          myTravelNewRequestDropDown: [
            ...this.state.myTravelNewRequestDropDown,
            { name: "Ground Transportation", valueName: "Ground" },
          ],
        },
        () => { }
      );
    }
    for (var i = 0; i < this.state.depentureDateUpdate.length; i++) {
      if (this.state.depentureDateUpdate[i].type === Obj) {
        this.state.depentureDateUpdate[i].depentureDate = "";
        this.state.depentureDateUpdate[i].depentureHour = "";
        this.state.depentureDateUpdate[i].depentureMinute = "";
        this.state.depentureDateUpdate[i].depentureTime = "";
        this.state.depentureDateUpdate[i].returnDate = "";
        this.state.depentureDateUpdate[i].returnTime = "";
        this.state.depentureDateUpdate[i].returnHour = "";
        this.state.depentureDateUpdate[i].returnMinute = "";
      }
    }
  };

  //travel request index wise data push the api calling.
  newRequestSaveData = () => {
    this.setState(
      {
        loaded: true,
        conditionBasedTravelTypeToggle: "",
      },
      () => { }
    );
    let newDate = new Date();
    var myTravelReqData = [];
    //Air,Hotel
    for (var i = 0; i < this.state.inputBoxes.length; i++) {
      for (var j = 0; j < this.state.newRequestArrData.length; j++) {
        if (this.state.inputBoxes[i] === this.state.newRequestArrData[j].type) {
          myTravelReqData.push(this.state.newRequestArrData[j]);
        }
      }
    }
    var data = {
      Patient_id: localStorage.getItem("id"),
      submitted_by: localStorage.getItem("id"),
      StudiesID: localStorage.getItem("StudiesId"),
      SiteID: localStorage.getItem("SiteId"),
      Visit_Id: this.state.data[0].Visit_Id,
      Visit_Start_Date: this.state.data[0].VisitDateTime,
      Visit_End_Date: this.state.data[0].VisitDateTime,
      Travel_Start_Date: this.state.data[0].TravelDate,
      Travel_End_Date: this.state.data[0].TravelEndDate,
      Comment: this.state.commentData,
      Patient_Save: 1,
      id_data: this.state.data[0].id,
      date_added: moment(new Date(newDate)).format("YYYY-MM-DD HH:mm"),
    };
    if (myTravelReqData.length !== 0) {
      myTravelReqData.map((item) => {
        if (
          item.type === "Air Transportation" ||
          item.type === "Ground Transportation"
        ) {
          if (
            (item.depentureDates === "" || item.depentureDates === "Invalid") &&
            (item.depentureTime === "00:00:00" ||
              item.depentureTime === "00:00") &&
            (item.returnDate === "" || item.returnDate === "Invalid") &&
            (item.returnTime === "00:00:00" || item.returnTime === "00:00")
          ) {
            for (
              var x = 0;
              x < this.state.conditionBasedTravelTypeParams.length;
              x++
            ) {
              if (
                this.state.conditionBasedTravelTypeParams[x].label == item.type
              ) {
                this.state.conditionBasedTravelTypeParams[x].condition = false;
                this.state.conditionBasedTravelTypeToggle = "1";
              }
            }
            this.setState({ loaded: false }, () => { });
          } else if (
            item.depentureDates === "" ||
            item.depentureDates === "Invalid" ||
            item.depentureTime === "00:00:00" ||
            item.depentureTime === "00:00"
          ) {
            for (
              var x = 0;
              x < this.state.conditionBasedTravelTypeParams.length;
              x++
            ) {
              if (
                this.state.conditionBasedTravelTypeParams[x].label == item.type
              ) {
                this.state.conditionBasedTravelTypeParams[x].condition = false;
                this.state.conditionBasedTravelTypeToggle = "2";
              }
            }
            this.setState({ loaded: false }, () => { });
          } else if (
            item.returnDate === "" ||
            item.returnDate === "Invalid" ||
            item.returnTime === "00:00:00" ||
            item.returnTime === "00:00"
          ) {
            for (
              var x = 0;
              x < this.state.conditionBasedTravelTypeParams.length;
              x++
            ) {
              if (
                this.state.conditionBasedTravelTypeParams[x].label == item.type
              ) {
                this.state.conditionBasedTravelTypeParams[x].condition = false;
                this.state.conditionBasedTravelTypeToggle = "3";
              }
            }
            this.setState({ loaded: false }, () => { });
          } else if (
            (item.depentureDates !== "" || item.depentureDates !== "Invalid") &&
            (item.depentureTime !== "00:00:00" ||
              item.depentureTime !== "00:00") &&
            (item.returnDate !== "" || item.returnDate !== "Invalid") &&
            (item.returnTime !== "00:00:00" || item.returnTime !== "00:00")
          ) {
            for (
              var x = 0;
              x < this.state.conditionBasedTravelTypeParams.length;
              x++
            ) {
              if (
                this.state.conditionBasedTravelTypeParams[x].label == item.type
              ) {
                this.state.conditionBasedTravelTypeParams[x].condition = true;
                this.conditionParams(data, myTravelReqData);
              }
            }
          }
        }
        if (item.type === "Hotel Lodging") {
          for (
            var x = 0;
            x < this.state.conditionBasedTravelTypeParams.length;
            x++
          ) {
            if (
              this.state.conditionBasedTravelTypeParams[x].label == item.type
            ) {
              this.state.conditionBasedTravelTypeParams[x].condition = true;
              this.conditionParams(data, myTravelReqData);
            }
          }
        }
      });
    } else {
      if (!toast.isActive(this.toastId.current)) {
        this.toastId.current = toast.error(
          this.props.t("Please select your preferred travel type(s)"),
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      }
      this.setState({ loaded: false }, () => { });
    }
    this.validationsToggle();
  };

  validationsToggle = () => {
    if (this.state.conditionBasedTravelTypeToggle === "1") {
      if (!toast.isActive(this.toastId.current)) {
        this.toastId.current = toast.error(
          this.props.t(
            "Please provide departure,  date and time for selected travel type."
          ),
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      }
    } else if (this.state.conditionBasedTravelTypeToggle === "2") {
      if (!toast.isActive(this.toastId.current)) {
        this.toastId.current = toast.error(
          this.props.t(
            "Please provide departure date and time for selected travel type."
          
          ),
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      }
    } else if (this.state.conditionBasedTravelTypeToggle === "3") {
      if (!toast.isActive(this.toastId.current)) {
        this.toastId.current = toast.error(
          this.props.t(
            "Please provide return date and time for selected travel type."
            
          ),
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      }
    }
  };

  conditionParams = (data, myTravelReqData) => {
    var count = 0;
    if (myTravelReqData.length !== 0) {
      myTravelReqData.map((item) => {
        for (
          var x = 0;
          x < this.state.conditionBasedTravelTypeParams.length;
          x++
        ) {
          if (this.state.conditionBasedTravelTypeParams[x].label == item.type) {
            if (
              this.state.conditionBasedTravelTypeParams[x].condition == true
            ) {
              count = count + 1;
            }
            if (myTravelReqData.length == count) {
              newRequest_Post(localStorage.getItem("id"), data, myTravelReqData)
                .then((value) => {
                  if (value.data.status === 0) {
                    this.setState({ loaded: false }, () => { });
                    this.props.history.push("/myTravel");
                  }
                })
                .catch((err) => { });
            }
          }
        }
      });
    }
  };

  //My Studies dropdown data change onClick
  selectedStudies = (e) => {
    this.setState({ valueChanged: e.target.value }, () => { });
    const heading = [
      { Name: "Sponsor", id: 1 },
      { Name: "Protocol", id: 2 },
      { Name: "Clinicaldescription", id: 3 },
    ];
    this.setState({ searchData: true }, () => { });
    myStudies(localStorage.getItem("id"))
      .then((value) => {
        for (var j = 0; j < value.data.records.length; j++) {
          if (
            value.data.records[j].status === this.state.valueChanged ||
            this.state.valueChanged === "1"
          ) {
            this.state.selectedId.push({
              id: value.data.records[j].id,
              Sponsor: value.data.records[j]._sponsor_name,
              Protocol: value.data.records[j]._study_protocol,
              Clinicaldescription: value.data.records[j]._study_title,
              StudyId: value.data.records[j].study_id,
              SiteId: value.data.records[j].site_id,
              ConditionsReimbursements:
                value.data.records[j]._study_manage_reimbursements,
              ConditionsStipends: value.data.records[j]._study_visit_stipends,
              ConditionsTaravales:
                value.data.records[j]._study_subject_travel_preferences,
              ConditionsId: value.data.records[j].id,
              ActionTravel: value.data.records[j]._num_travel,
              ActionPaymentSummary: value.data.records[j]._num_reimbursements,
            });
          }
          this.setState(
            { data: this.state.selectedId, api_Arr: this.state.selectedId },
            () => { }
          );
          const slice = this.state.api_Arr.slice(
            this.state.initialpage,
            this.state.initialpage + this.state.perPage
          );
          this.setState(
            {
              data: slice,
              pageCount: Math.ceil(
                this.state.api_Arr.length / this.state.perPage
              ),
            },
            () => { }
          );
        }
        this.setState(
          {
            searchData: false,
            pageNumber: 0,
            selectedEntry: 10,
            perPage: 10,
            selectedId: [],
          },
          () => { }
        );
      })
      .catch((err) => { });
  };

  //My Studies table payment summary button operation
  paymentSummaryReimb = (
    studyId,
    siteId,
    conditionsReimbursements,
    conditionsStipends,
    conditionsTaravales,
    conditionsId,
    status
  ) => {
    localStorage.setItem("SiteId", siteId);
    localStorage.setItem("StudiesId", studyId);
    localStorage.setItem("ConditionsReimbursements", conditionsReimbursements);
    localStorage.setItem("ConditionsStipends", conditionsStipends);
    localStorage.setItem("ConditionsTaravales", conditionsTaravales);
    localStorage.setItem("ConditionsId", conditionsId);
    localStorage.setItem("Status", status);
    this.props.history.push({
      pathname: "/paymentSummary",
    });
  };

  //My Studies table My travel button operation
  myTravelStudyWise = (
    studyId,
    siteId,
    conditionsReimbursements,
    conditionsStipends,
    conditionsTaravales,
    conditionsId,
    status
  ) => {
    localStorage.setItem("SiteId", siteId);
    localStorage.setItem("StudiesId", studyId);
    localStorage.setItem("ConditionsReimbursements", conditionsReimbursements);
    localStorage.setItem("ConditionsStipends", conditionsStipends);
    localStorage.setItem("ConditionsTaravales", conditionsTaravales);
    localStorage.setItem("ConditionsId", conditionsId);
    localStorage.setItem("Status", status);
    this.props.history.push({
      pathname: "/myTravel",
    });
  };

  //new Reimbursement Insert and Read Form
  newReimbursementFormOpen = (view) => {
    if (view === "Add") {
      this.setState(
        {
          addNewReimbursementFormConfirmation: false,
          newReimbursementFormInsertAndRead: true,
        },
        () => { }
      );
      this.reimbursementsApiResponse();
      this.myTravelNewReimburesementsAddressData();
    } else {
      this.setState(
        {
          newReimbursementFormInsertAndRead: true,
        },
        () => { }
      );
      this.myTravelNewReimburesementsAddressData();
    }
  };

  //new Reimbursement new record add yes or no condition.
  addNewReimbursementFormConfirmationClose = () => {
    this.setState(
      {
        addNewReimbursementFormConfirmation: false,
      },
      () => { }
    );
    this.reimbursementsApiResponse();
  };

  // new Reimbursement Form Close.
  newReimbursementFormClose = () => {
    this.setState(
      {
        newReimbursementMultipleRecordUpdate: [],
        viewReimbursementData: false,
        newReimbursementFormInsertAndRead: false,
        visitName: "",
        visitNameErr: "",
        itemTypeErr: "",
        currentTotalAmount: "",
        newReimbursementMultipleRecord: {
          ...this.state.newReimbursementMultipleRecord,
          type_id: "",
        },
      },
      () => { }
    );
  };


  // select visit Name function.
  visitNameSelect = (id) => {
    if (id === "blank") {
      this.setState(
        { visitName: "", visitNameErr: "Visit is required" },
        () => { }
      );
    } else {
      this.setState({ visitName: id, visitNameErr: "" }, () => { });

    }
  };

  //select item type function.
  itemTypeSelect = (id) => {
    if (id === "blank") {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            itemTypeErr: "",
            type_id: "",
          },
        },
        () => { }
      );
    } else {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            itemTypeErr: "",
            type_id: id,
          },
          itemTypeFormInsertAndRead: true,
        },
        () => { }
      );
    }
    this.state.itemTypesList.map((Obj) => {
      if (Obj.id === id) {
        return this.setState(
          {
            addressBasedItemType: Obj.address_based,
            amountDistanceBasedItemType: Obj.direct_mileage_entry,
            milesInternationalItemType: Obj.intl,
            uploadReceiptsItemType: Obj.uploads_required,
          },
          () => {
            if (this.state.addressBasedItemType === "1") {
              this.myTravelNewReimburesementsAddressData();
            }
          }
        );
      }
    });
  };

  // item type form close.
  itemTypeFormClose = () => {
    this.setState(
      {
        itemTypeFormInsertAndRead: false,
        itemTypeUpdateButton: false,
        selectedEndAddressId: "",
        selectedStartAddressId: "",
        fileImagesData: [],
        itemTypeList: [],
        testDeletionOptionTextError: "",
        myTravelNewReimburesementsAdd: [],
        statesDist: [],
        newReimbursementMultipleRecord: {
          ...this.state.newReimbursementMultipleRecord,
          travelDate: "",
          startAddress1: "",
          startAddress2: "",
          startCity: "",
          startState: "",
          startZipCode: "",
          endAddress1: "",
          endAddress2: "",
          endCity: "",
          endState: "",
          endZipCode: "",
          amount: "",
          date: "",
          amountErr: "",
          itemTypeErr: "",
          distance: "",
          roundTrip: "",
          notes: "",
          amountRequired: null,
          uploadRequired: null,
          files: [],
          type_id: "",
        },
      },
      () => { }
    );
  };

  //new reimbursement travel date select
  handleInputTypeTravelDate = (e) => {
    this.setState(
      {
        newReimbursementMultipleRecord: {
          ...this.state.newReimbursementMultipleRecord,
          travelDate: e.value,
          date: "",
        },
      },
      () => { }
    );
  };

  handleInputAddress = (e) => {
    if (
      e.target.value !== "" ||
      e.target.value !== null ||
      e.target.value !== undefined
    ) {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            [e.target.name]: e.target.value,
          },
        },
        () => {
          this.manualAddress();
        }
      );
    } else {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            [e.target.name]: "",
          },
        },
        () => {
          this.manualAddress();
        }
      );
    }
  };

  handleInputAddressStartstate = (e, key) => {
    if (key !== "" || key !== null || key !== undefined) {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            startState: key,
          },
        },
        () => {
          this.manualAddress();
        }
      );
    } else {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            startState: "",
          },
        },
        () => {
          this.manualAddress();
        }
      );
    }
  };
  handleInputAddressendstate = (e, key) => {
    if (key !== "" || key !== null || key !== undefined) {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            endState: key,
          },
        },
        () => {
          this.manualAddress();
        }
      );
    } else {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            endState: "",
          },
        },
        () => {
          this.manualAddress();
        }
      );
    }
  };

  handleInputComments = (e) => {
    if (
      e.target.value !== "" ||
      e.target.value !== null ||
      e.target.value !== undefined
    ) {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            [e.target.name]: e.target.value,
          },
        },
        () => { }
      );
    } else {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            [e.target.name]: "",
          },
        },
        () => { }
      );
    }
  };

  // new reimbursement insert manual address function.
  manualAddress = (e) => {
    if (
      (this.state.newReimbursementMultipleRecord.startAddress1 !== "" ||
        this.state.newReimbursementMultipleRecord.startAddress2 !== "") &&
      this.state.newReimbursementMultipleRecord.startCity !== "" &&
      this.state.newReimbursementMultipleRecord.startState !== "" &&
      this.state.newReimbursementMultipleRecord.startZipCode !== "" &&
      (this.state.newReimbursementMultipleRecord.endAddress1 !== "" ||
        this.state.newReimbursementMultipleRecord.endAddress2 !== "") &&
      this.state.newReimbursementMultipleRecord.endCity !== "" &&
      this.state.newReimbursementMultipleRecord.endState !== "" &&
      this.state.newReimbursementMultipleRecord.endZipCode !== ""
    ) {
      this.amountCalculated();
    } else {
    }
  };

  //new reimbursement manual address type then amount update and changed.
  amountUpdatedChanged = (e, error) => {
    if (
      e.target.value === "" ||
      e.target.value === null ||
      e.target.value === undefined
    ) {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            [e.target.name]: e.target.value,
            [error]: "",
          },
        },
        () => { }
      );
    } else if (e.target.value <= 5.0) {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            [e.target.name]: e.target.value,
            [error]: this.props.t("The entered amount must exceed $5.00."),
          },
        },
        () => { }
      );
    } else {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            [e.target.name]: e.target.value,
            [error]: "",
          },
        },
        () => { }
      );
    }
  };

  //new reimbursement manual amount updated and blur.
  amountUpdatedBlur = (e, error) => {
    if (
      e.target.value === "" ||
      e.target.value === null ||
      e.target.value === undefined
    ) {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            [e.target.name]: e.target.value,
            [error]: "",
          },
        },
        () => { }
      );
    }
  };
  handleInputAddressendstate = (e, key) => {
    if (key !== "" || key !== null || key !== undefined) {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            endState: key,
          },
        },
        () => {
          this.manualAddress();
        }
      );
    } else {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            endState: "",
          },
        },
        () => {
          this.manualAddress();
        }
      );
    }
  };
  //New Reimbursement select the Start address and api calling.
  selectedStartAddress = (startParams) => {
    this.setState({ selectedStartAddressId: startParams.id }, () => {
      !this.state.selectedStartAddressId
        ? this.setState({
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            startAddress1: "",
            startAddress2: "",
            startCity: "",
            startState: "",
            startZipCode: "",
          },
        })
        : myTravelNewReimbursementAddress(
          localStorage.getItem("id"),
          localStorage.getItem("id")
        )
          .then((val) => {
            for (var i = 0; i < val.data.patient_locations.length; i++) {
              if (
                val.data.patient_locations[i].id ===
                this.state.selectedStartAddressId
              ) {
                this.setState({
                  newReimbursementMultipleRecord: {
                    ...this.state.newReimbursementMultipleRecord,
                    startAddress1: val.data.patient_locations[i].address,
                    startAddress2: val.data.patient_locations[i].address2,
                    startCity: val.data.patient_locations[i].city,
                    startState: val.data.patient_locations[i].state,
                    startZipCode: val.data.patient_locations[i].zipcode,
                  },
                });
              }
            }
            if (
              this.state.selectedEndAddressId !== "" &&
              this.state.selectedStartAddressId !== ""
            ) {
              this.amountCalculated();
            }
          })
          .catch((err) => { });
    });
  };

  //New Reimbursement select the End address and api calling.
  selectedEndAddress = (startParams) => {
    this.setState(
      {
        selectedEndAddressId: startParams.id,
      },
      () => {
        !this.state.selectedEndAddressId
          ? this.setState(
            {
              newReimbursementMultipleRecord: {
                ...this.state.newReimbursementMultipleRecord,
                endAddress1: "",
                endAddress2: "",
                endCity: "",
                endState: "",
                endZipCode: "",
              },
            },
            () => { }
          )
          : myTravelNewReimbursementAddress(
            localStorage.getItem("id"),
            localStorage.getItem("id")
          )
            .then((val) => {
              for (var i = 0; i < val.data.patient_locations.length; i++) {
                if (
                  val.data.patient_locations[i].id ===
                  this.state.selectedEndAddressId
                ) {
                  this.setState(
                    {
                      newReimbursementMultipleRecord: {
                        ...this.state.newReimbursementMultipleRecord,
                        endAddress1: val.data.patient_locations[i].address,
                        endAddress2: val.data.patient_locations[i].address2,
                        endCity: val.data.patient_locations[i].city,
                        endState: val.data.patient_locations[i].state,
                        endZipCode: val.data.patient_locations[i].zipcode,
                      },
                    },
                    () => { }
                  );
                }
              }
              if (
                this.state.selectedEndAddressId !== "" &&
                this.state.selectedStartAddressId !== ""
              ) {
                this.amountCalculated();
              }
            })
            .catch((err) => { });
      }
    );
  };

  //New Reimbursement amount auto calculated and api calling.
  amountCalculated = () => {
    this.setState(
      {
        newReimbursementMultipleRecord: {
          ...this.state.newReimbursementMultipleRecord,
          roundTrip: "0",
        },
      },
      () => { }
    );
    const myReimStartEndAddress = {
      Startaddress1: this.state.newReimbursementMultipleRecord.startAddress1,
      Startaddress2: this.state.newReimbursementMultipleRecord.startAddress2,
      Startcity: this.state.newReimbursementMultipleRecord.startCity,
      Startstate: this.state.newReimbursementMultipleRecord.startState,
      Startzipcode: this.state.newReimbursementMultipleRecord.startZipCode,
      Endaddress1: this.state.newReimbursementMultipleRecord.endAddress1,
      Endaddress2: this.state.newReimbursementMultipleRecord.endAddress2,
      Endcity: this.state.newReimbursementMultipleRecord.endCity,
      Endstate: this.state.newReimbursementMultipleRecord.endState,
      Endzipcode: this.state.newReimbursementMultipleRecord.endZipCode,
      patient_id: localStorage.getItem("id"),
      type_id: this.state.newReimbursementMultipleRecord.type_id,
      study_id: localStorage.getItem("StudiesId"),
      roundtrip: this.state.newReimbursementMultipleRecord.roundTrip,
    };
    myTravelNewReiAmountCalculated(
      myReimStartEndAddress,
      localStorage.getItem("id")
    )
      .then((val) => {
        if (val.data.status === 0) {
          this.setState(
            {
              newReimbursementMultipleRecord: {
                ...this.state.newReimbursementMultipleRecord,
                amount: val.data.amount,
                distance: val.data.distance,
                amountErr: "",
              },
            },
            () => { }
          );
        } else if (val.data.status === 2) {
          this.setState(
            {
              newReimbursementMultipleRecord: {
                ...this.state.newReimbursementMultipleRecord,
                amount: "",
                distance: "",
                amountErr: this.props.t(
                  "The distance could not be computed for one or more address items."
                ),
              },
            },
            () => { }
          );
        }
      })
      .catch((err) => { });
  };

  //New Reimbursement roundtripcheckbox check and api calling.
  roundTripChecked = (e) => {
    this.setState(
      {
        newReimbursementMultipleRecord: {
          ...this.state.newReimbursementMultipleRecord,
          roundTrip: e.target.checked ? "1" : "0",
        },
      },
      () => {
        const myReimStartEndAddress = {
          roundtrip: this.state.newReimbursementMultipleRecord.roundTrip,
          Startaddress1: this.state.newReimbursementMultipleRecord
            .startAddress1,
          Startaddress2: this.state.newReimbursementMultipleRecord
            .startAddress2,
          Startcity: this.state.newReimbursementMultipleRecord.startCity,
          Startstate: this.state.newReimbursementMultipleRecord.startState,
          Startzipcode: this.state.newReimbursementMultipleRecord.startZipCode,
          Endaddress1: this.state.newReimbursementMultipleRecord.endAddress1,
          Endaddress2: this.state.newReimbursementMultipleRecord.endAddress2,
          Endcity: this.state.newReimbursementMultipleRecord.endCity,
          Endstate: this.state.newReimbursementMultipleRecord.endState,
          Endzipcode: this.state.newReimbursementMultipleRecord.endZipCode,
          patient_id: localStorage.getItem("id"),
          type_id: this.state.newReimbursementMultipleRecord.type_id,
          study_id: localStorage.getItem("StudiesId"),
        };
        myTravelNewReiAmountCalculated(
          myReimStartEndAddress,
          localStorage.getItem("id")
        )
          .then((val) => {


            if (val.data.status === 2) {
              this.setState(
                {
                  newReimbursementMultipleRecord: {
                    ...this.state.newReimbursementMultipleRecord,
                    amountErr: val.data.error,
                  },
                },
                () => { }
              );
            } else if (val.data.status === 0) {
              this.setState(
                {
                  newReimbursementMultipleRecord: {
                    ...this.state.newReimbursementMultipleRecord,
                    amount: val.data.amount,
                    distance: val.data.distance,
                    amountErr: "",
                    date: "",
                  },
                },
                () => {
                  this.state.newReimbursementMultipleRecord.roundTrip === "1"
                    ? this.setState(
                      { milesTravels: this.props.t("Two") },
                      () => { }
                    )
                    : this.setState(
                      { milesTravels: this.props.t("One") },
                      () => { }
                    );
                }
              );
            }
          })
          .catch((err) => { });
      }
    );
  };

  //Receipts uploading in New Reimbursements
  receiptUploads = (e, type) => {
    if (this.state.fileImagesData.length !== 0) {
    } else {
      this.setState({ testDeletionOptionTextError: "" }, () => { });
    }
    if (e.target.files[0] === undefined) {
      if (type === "true1") {
        this.setState({ receiptsloaded: false }, () => { });
      }
    } else {
      if (type === "true1") {
        this.setState({ receiptsloaded: true }, () => { });
      }
      this.state.fileList = e.target.files;
      for (var i = 0; i < this.state.fileList.length; i++) {
        var fileUploadData = [];
        fileUploadData = this.state.fileList[i];
        newRequestImgUpload(this.state.fileList[i], localStorage.getItem("id"))
          .then((res) => {
            this.setState(
              {
                fileImagesData: this.state.fileImagesData.concat([
                  res.data.file,
                ]),
                receiptsloaded: false,
              },
              () => { }
            );
          })
          .catch((err) => {
            this.setState({ receiptsloaded: false }, () => { });
          });
      }
    }
  };

  //New Reimbursement file Upload deleted
  uploadFilesDelete = (hash) => {
    const newArray = this.state.fileImagesData.filter((Obj) => {
      return Obj.hash !== hash;
    });
    this.setState({ fileImagesData: newArray }, () => { });
  };

  //new reimbursment form submit check.
  newReimbursementsSubmit = (e) => {
    e.preventDefault();
    if (this.state.newReimbursementMultipleRecord.type_id === "5" && this.state.newReimbursementMultipleRecord.travelDate === ""
      && this.state.addressBasedItemType === "1") {
      {
        this.setState(
          {
            newReimbursementMultipleRecord: {
              ...this.state.newReimbursementMultipleRecord,
              date: this.props.t("Please select travel date."),

            },
          },
          () => { }
        );
      }


    }
    else if (
      this.state.newReimbursementMultipleRecord.amount === "" ||
      this.state.newReimbursementMultipleRecord.amount === null ||
      this.state.newReimbursementMultipleRecord.amount === undefined
    ) {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            //  date: this.props.t("Travel Date is required."),
            amountErr: this.props.t("Amount is required."),
          },
        },
        () => { }
      );
    } else if (this.state.newReimbursementMultipleRecord.amount <= 5.0) {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            amountErr: this.props.t("The entered amount must exceed $5.00."),
          },
        },
        () => { }
      );
    } else if (this.state.uploadReceiptsItemType === "1") {
      if (this.state.fileImagesData.length !== 0) {
        this.setState({ testDeletionOptionTextError: "" }, () => { });
        this.allDataNewReimbursement();
      } else {
        this.setState(
          {
            testDeletionOptionTextError: this.props.t(
              "File upload is required."
            ),
          },
          () => { }
        );
      }
    } else {
      this.allDataNewReimbursement();
    }
  };

  //new reimbursement form submit all fields check and submit finally.
  allDataNewReimbursement = () => {
    this.state.currentTotalAmount = 0;
    this.state.currentAmount = 0;
    this.state.recordId = this.state.recordId + 1;
    this.state.newReimbursementMultipleRecord.id = this.state.recordId;
    this.state.newReimbursementMultipleRecord.amountRequired = this.state.newReAmount_Required;
    this.state.newReimbursementMultipleRecord.uploadRequired = this.state.newReUpload_Required;
    this.setState(
      {
        newReimbursementMultipleRecord: {
          ...this.state.newReimbursementMultipleRecord,
          type_id: this.state.newReimbursementMultipleRecord.type_id,
          notes: this.state.newReimbursementMultipleRecord.notes,
        },
      },
      () => { }
    );
    this.state.newReimbursementMultipleRecord = {
      id: this.state.newReimbursementMultipleRecord.id,
      type_id: this.state.newReimbursementMultipleRecord.type_id,
      amount: this.state.newReimbursementMultipleRecord.amount,
      distance:
        this.state.newReimbursementMultipleRecord.distance === undefined
          ? ""
          : this.state.newReimbursementMultipleRecord.distance,
      travelDate:
        this.state.newReimbursementMultipleRecord.travelDate === undefined
          ? ""
          : this.state.newReimbursementMultipleRecord.travelDate,
      startAddress1:
        this.state.newReimbursementMultipleRecord.startAddress1 === undefined
          ? ""
          : this.state.newReimbursementMultipleRecord.startAddress1,
      startAddress2:
        this.state.newReimbursementMultipleRecord.startAddress2 === undefined
          ? ""
          : this.state.newReimbursementMultipleRecord.startAddress2,
      startCity:
        this.state.newReimbursementMultipleRecord.startCity === undefined
          ? ""
          : this.state.newReimbursementMultipleRecord.startCity,
      startState:
        this.state.newReimbursementMultipleRecord.startState === undefined
          ? ""
          : this.state.newReimbursementMultipleRecord.startState,
      startZipCode:
        this.state.newReimbursementMultipleRecord.startZipCode === undefined
          ? ""
          : this.state.newReimbursementMultipleRecord.startZipCode,
      endAddress1:
        this.state.newReimbursementMultipleRecord.endAddress1 === undefined
          ? ""
          : this.state.newReimbursementMultipleRecord.endAddress1,
      endAddress2:
        this.state.newReimbursementMultipleRecord.endAddress2 === undefined
          ? ""
          : this.state.newReimbursementMultipleRecord.endAddress2,
      endCity:
        this.state.newReimbursementMultipleRecord.endCity === undefined
          ? ""
          : this.state.newReimbursementMultipleRecord.endCity,
      endState:
        this.state.newReimbursementMultipleRecord.endState === undefined
          ? ""
          : this.state.newReimbursementMultipleRecord.endState,
      endZipCode:
        this.state.newReimbursementMultipleRecord.endZipCode === undefined
          ? ""
          : this.state.newReimbursementMultipleRecord.endZipCode,
      notes:
        this.state.newReimbursementMultipleRecord.notes === undefined
          ? ""
          : this.state.newReimbursementMultipleRecord.notes,
      amountRequired: this.state.newReimbursementMultipleRecord.amountRequired,
      uploadRequired: this.state.newReimbursementMultipleRecord.uploadRequired,
      roundTrip: this.state.newReimbursementMultipleRecord.roundTrip,
      files: [],
      itemTypeErr: this.state.newReimbursementMultipleRecord.itemTypeErr,
      amountErr: this.state.newReimbursementMultipleRecord.amountErr,
      date: this.state.newReimbursementMultipleRecord.date,
    };
    this.state.newReimbursementMultipleRecord.files = this.state.fileImagesData;
    this.setState(
      {
        newReimbursementMultipleRecordUpdate: [
          ...this.state.newReimbursementMultipleRecordUpdate,
          this.state.newReimbursementMultipleRecord,
        ],
      },
      () => {
        this.state.newReimbursementMultipleRecordUpdate.map((Obj) => {
          const amount = parseFloat(Obj.amount);
          this.state.currentAmount = this.state.currentAmount + amount;
          this.setState(
            { currentTotalAmount: this.state.currentAmount },
            () => { }
          );
        });
        localStorage.setItem(
          "newReimbursement",
          JSON.stringify(this.state.newReimbursementMultipleRecordUpdate)
        );
      }
    );
    this.state.fileImagesData = [];
    this.setState(
      {
        selectedStartAddressId: "",
        selectedEndAddressId: "",
        newReimbursementMultipleRecord: {
          ...this.state.newReimbursementMultipleRecord,
          type_id: "",
          travelDate: "",
          date: "",
          startAddress1: "",
          startAddress2: "",
          startCity: "",
          startState: "",
          startZipCode: "",
          endAddress1: "",
          endAddress2: "",
          endCity: "",
          endState: "",
          endZipCode: "",
          amountErr: "",
          itemTypeErr: "",
          amount: "",
          distance: "",
          roundTrip: "0",
          notes: "",
          amountRequired: null,
          uploadRequired: null,
          files: [],
        },
        itemTypeFormInsertAndRead: false,
      },
      () => { }
    );
  };

  //new reimbursment form remove the particular record.
  removeTheItemType = (id) => {
    this.state.currentTotalAmount = 0;
    this.state.currentAmount = 0;
    this.setState(
      {
        newReimbursementMultipleRecordUpdate: this.state.newReimbursementMultipleRecordUpdate.filter(
          (Obj) => {
            return Obj.id !== id;
          }
        ),
      },
      () => {
        this.state.newReimbursementMultipleRecordUpdate.map((Obj) => {
          const amount = parseFloat(Obj.amount);
          this.state.currentAmount = this.state.currentAmount + amount;
        });
        localStorage.setItem(
          "newReimbursement",
          JSON.stringify(this.state.newReimbursementMultipleRecordUpdate)
        );
        this.state.currentAmount === 0
          ? this.setState({ currentTotalAmount: "" }, () => { })
          : this.setState(
            { currentTotalAmount: this.state.currentAmount },
            () => { }
          );
      }
    );
  };

  //new reimbursement form edit the particular record.
  editTheItemType = (id) => {
    this.state.fileImagesData = [];
    this.setState(
      {
        newReimbursementMultipleRecord: this.state.newReimbursementMultipleRecordUpdate.find(
          (Obj) => {
            if (Obj.id === id) {
              this.state.itemTypesList.map((val) => {
                if (val.id === Obj.type_id) {
                  return this.setState(
                    {
                      addressBasedItemType: val.address_based,
                      amountDistanceBasedItemType: val.direct_mileage_entry,
                      milesInternationalItemType: val.intl,
                    },
                    () => {
                      if (this.state.addressBasedItemType === "1") {
                        this.myTravelNewReimburesementsAddressData();
                      }
                    }
                  );
                }
              });
              Obj.files.map((item, index) => {
                return this.state.fileImagesData.push(item);
              });
              return Obj.id === id;
            }
          }
        ),
      },
      () => { }
    );
    this.setState(
      {
        itemTypeFormInsertAndRead: true,
        itemTypeUpdateButton: true,
      },
      () => { }
    );
  };

  //new reimbursement form update the validation check.
  newReimbursementsUpdate = (e, id) => {
    e.preventDefault();
    if (
      this.state.newReimbursementMultipleRecord.amount === "" ||
      this.state.newReimbursementMultipleRecord.amount === null ||
      this.state.newReimbursementMultipleRecord.amount === undefined
    ) {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            amountErr: this.props.t("Amount is required."),
          },
        },
        () => { }
      );
    } else if (this.state.newReimbursementMultipleRecord.amount <= 5.0) {
      this.setState(
        {
          newReimbursementMultipleRecord: {
            ...this.state.newReimbursementMultipleRecord,
            amountErr: this.props.t("The entered amount must exceed $5.00."),
          },
        },
        () => { }
      );
    } else if (this.state.newReimbursementMultipleRecord.type_id === "8") {
      if (this.state.fileImagesData.length !== 0) {
        this.setState({ testDeletionOptionTextError: "" }, () => { });
        this.allDataNewReimbursementUpdate(id);
      } else {
        this.setState(
          {
            testDeletionOptionTextError: this.props.t(
              "File upload is required."
            ),
          },
          () => { }
        );
      }
    } else {
      this.allDataNewReimbursementUpdate(id);
    }
  };

  //new reimbursement form update and all data check and submit.
  allDataNewReimbursementUpdate = (id) => {
    this.state.currentTotalAmount = 0;
    for (
      var i = 0;
      i < this.state.newReimbursementMultipleRecordUpdate.length;
      i++
    ) {
      if (this.state.newReimbursementMultipleRecordUpdate[i].type_id === id) {
        this.state.newReimbursementMultipleRecordUpdate[i].files = [];
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].type_id = this.state.newReimbursementMultipleRecord.type_id;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].amount = this.state.newReimbursementMultipleRecord.amount;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].distance = this.state.newReimbursementMultipleRecord.distance;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].travelDate = this.state.newReimbursementMultipleRecord.travelDate;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].startAddress1 = this.state.newReimbursementMultipleRecord.startAddress1;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].startAddress2 = this.state.newReimbursementMultipleRecord.startAddress2;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].startCity = this.state.newReimbursementMultipleRecord.startCity;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].startState = this.state.newReimbursementMultipleRecord.startState;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].startZipCode = this.state.newReimbursementMultipleRecord.startZipCode;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].endAddress1 = this.state.newReimbursementMultipleRecord.endAddress1;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].endAddress2 = this.state.newReimbursementMultipleRecord.endAddress2;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].endCity = this.state.newReimbursementMultipleRecord.endCity;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].endState = this.state.newReimbursementMultipleRecord.endState;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].endZipCode = this.state.newReimbursementMultipleRecord.endZipCode;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].roundTrip = this.state.newReimbursementMultipleRecord.roundTrip;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].notes = this.state.newReimbursementMultipleRecord.notes;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].amountRequired = this.state.newReAmount_Required;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].uploadRequired = this.state.newReUpload_Required;
        this.state.newReimbursementMultipleRecordUpdate[
          i
        ].files = this.state.fileImagesData;
      }
    }
    this.state.newReimbursementMultipleRecordUpdate.map((Obj) => {
      const amount = parseFloat(Obj.amount);
      this.state.currentTotalAmount = this.state.currentTotalAmount + amount;
    });
    localStorage.setItem(
      "newReimbursement",
      JSON.stringify(this.state.newReimbursementMultipleRecordUpdate)
    );
    this.setState(
      {
        newReimbursementMultipleRecord: {
          ...this.state.newReimbursementMultipleRecord,
          type_id: "",
          travelDate: "",
          startAddress1: "",
          startAddress2: "",
          startCity: "",
          startState: "",
          startZipCode: "",
          endAddress1: "",
          endAddress2: "",
          endCity: "",
          endState: "",
          endZipCode: "",
          amountErr: "",
          itemTypeErr: "",
          date: "",
          amount: "",
          distance: "",
          roundTrip: "0",
          notes: "",
          amountRequired: null,
          uploadRequired: null,
          files: [],
        },
      },
      () => { }
    );
    this.state.fileImagesData = [];
    this.setState(
      {
        itemTypeFormInsertAndRead: false,
        itemTypeUpdateButton: false,
      },
      () => { }
    );
  };

  //new reimbursement form submit.
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.visitName !== "") {
      var data = {
        SiteID: localStorage.getItem("SiteId"),
        StudiesID: localStorage.getItem("StudiesId"),
        newReStatus: this.state.newReStatus,
        newReVisit: this.state.visitName,
      };
      if (this.state.newReimbursementMultipleRecordUpdate.length !== 0) {
        this.setState({ loaded: true }, () => { });
        newReimbursement_Post(
          data,
          this.state.newReimbursementMultipleRecordUpdate,
          localStorage.getItem("id")
        )
          .then((value) => {
            if (value.data.status === 0) {
              localStorage.removeItem("newReimbursement");
              this.setState(
                {
                  newReimbursementFormInsertAndRead: false,
                  addNewReimbursementFormConfirmation: true,
                  loaded: false,
                  currentTotalAmount: 0,
                  currentAmount: 0,
                  visitName: "",
                  newReimbursementMultipleRecordUpdate: [],
                },
                () => { }
              );
            }
          })
          .catch((err) => { });
      } else {
        this.setState(
          {
            newReimbursementMultipleRecord: {
              ...this.state.newReimbursementMultipleRecord,
              itemTypeErr: this.props.t("Item type is required."),
            },
          },
          () => { }
        );
      }
    } else {
      this.setState(
        { visitNameErr: this.props.t("Visit is required") },
        () => { }
      );
    }
  };

  //view reimbursement form particular record wise.
  viewReimbursement = (data) => {
    this.state.currentAmount = 0;
    this.state.currentTotalAmount = 0;
    this.setState(
      {
        newReimbursementFormInsertAndRead: true,
        viewReimbursementData: true,
        visitName: data.Visit_id,
      },
      () => { }
    );
    this.state.newReimbursementMultipleRecordUpdate = data.File;
    this.state.newReimbursementMultipleRecordUpdate.map((Obj) => {
      const amount = parseFloat(Obj.amount);
      this.state.currentAmount = this.state.currentAmount + amount;
      this.setState({ currentTotalAmount: this.state.currentAmount }, () => { });
    });
  };

  //view item type form particular record in reimbursement wise.
  viewTheItemType = (id) => {
    this.state.fileImagesData = [];
    this.setState(
      {
        newReimbursementMultipleRecord: this.state.newReimbursementMultipleRecordUpdate.find(
          (Obj) => {
            if (Obj.id === id) {
              Obj.files.map((item) => {
                return this.state.fileImagesData.push(item);
              });
              return Obj.id === id;
            }
          }
        ),
      },
      () => { }
    );
    for (
      var j = 0;
      j < this.state.newReimbursementMultipleRecordUpdate.length;
      j++
    ) {
      if (this.state.newReimbursementMultipleRecordUpdate[j].id === id) {
        this.state.itemTypesList.map((Obj) => {
          if (
            Obj.id ===
            this.state.newReimbursementMultipleRecordUpdate[j].type_id
          ) {
            return this.setState(
              {
                addressBasedItemType: Obj.address_based,
                amountDistanceBasedItemType: Obj.direct_mileage_entry,
                milesInternationalItemType: Obj.intl,
              },
              () => {
                if (this.state.addressBasedItemType === "1") {
                  this.myTravelNewReimburesementsAddressData();
                }
              }
            );
          }
        });
        if (
          this.state.newReimbursementMultipleRecordUpdate[j]
            .address_start_id === "0" &&
          this.state.newReimbursementMultipleRecordUpdate[j].address_end_id ===
          "0"
        ) {
          this.setState(
            {
              itemTypeFormInsertAndRead: true,
              newReimbursementMultipleRecord: {
                ...this.state.newReimbursementMultipleRecord,
                type_id: this.state.newReimbursementMultipleRecordUpdate[j]
                  .type_id,
                amount: this.state.newReimbursementMultipleRecordUpdate[j]
                  .amount,
                notes: this.state.newReimbursementMultipleRecordUpdate[j].notes,
              },
            },
            () => { }
          );
        } else {
          this.setState(
            {
              itemTypeFormInsertAndRead: true,
              selectedStartAddressId: this.state
                .newReimbursementMultipleRecordUpdate[j].address_start.id,
              selectedEndAddressId: this.state
                .newReimbursementMultipleRecordUpdate[j].address_end.id,
              newReimbursementMultipleRecord: {
                ...this.state.newReimbursementMultipleRecord,
                type_id: this.state.newReimbursementMultipleRecordUpdate[j]
                  .type_id,
                travelDate: moment(
                  this.state.newReimbursementMultipleRecordUpdate[j].date_travel
                ).format("DD-MMM-YYYY"),
                startAddress1: this.state.newReimbursementMultipleRecordUpdate[
                  j
                ].address_start.address,
                startAddress2: this.state.newReimbursementMultipleRecordUpdate[
                  j
                ].address_start.address2,
                startCity: this.state.newReimbursementMultipleRecordUpdate[j]
                  .address_start.city,
                startState: this.state.newReimbursementMultipleRecordUpdate[j]
                  .address_start.state,
                startZipCode: this.state.newReimbursementMultipleRecordUpdate[j]
                  .address_start.zipcode,
                endAddress1: this.state.newReimbursementMultipleRecordUpdate[j]
                  .address_end.address,
                endAddress2: this.state.newReimbursementMultipleRecordUpdate[j]
                  .address_end.address2,
                endCity: this.state.newReimbursementMultipleRecordUpdate[j]
                  .address_end.city,
                endState: this.state.newReimbursementMultipleRecordUpdate[j]
                  .address_end.state,
                endZipCode: this.state.newReimbursementMultipleRecordUpdate[j]
                  .address_end.zipcode,
                amount: this.state.newReimbursementMultipleRecordUpdate[j]
                  .amount,
                distance: this.state.newReimbursementMultipleRecordUpdate[j]
                  .distance,
                roundTrip: this.state.newReimbursementMultipleRecordUpdate[j]
                  .roundtrip,
                notes: this.state.newReimbursementMultipleRecordUpdate[j].notes,
              },
            },
            () => { }
          );
        }
      }
    }
  };

  //Date icon click the Open the calender popup box
  fromDatepicker = () => {
    this._fromcalendar.setOpen(true);
  };
  travelDateCalendar = () => {
    this._travelDateCalendar.setOpen(true);
  };
  toDatepicker = () => {
    this._tocalendar.setOpen(true);
  };

  render() {
    const { t } = this.props;
    return (
      <Suspense fallback={<div>Loading... </div>}>
        <div>
          <div
            className={
              this.state.tableName === t("My Studies")
                ? "table-wrapper my-Studies"
                : this.state.tableName === t("Payment Summary") ||
                  this.state.tableName === t("Stipend")
                  ? "table-wrapper payment-summary"
                  : "table-wrapper submit-travel-request"
            }
          >
            <div className="table-header">
              {this.state.tableName === t("My travel") && (
                <h6 className="visible text-white">{t("Travel summary")}</h6>
              )}
              {this.state.tableName === t("MyTravel New Request") && (
                <h6 className="visible text-white">
                  {t("Submit travel request")}
                </h6>
              )}
              {(this.state.tableName === t("Payment Summary") &&
                this.state.tableName === t("My Studies") &&
                this.state.tableName === t("Stipend")) || (
                  <h6 className="visible text-white"></h6>
                )}
              <div className="My-study-header">
                <div className="my-study-select ">
                  {this.state.tableName === t("My Studies") && (
                    <div className="select-dropdown-wrap study-searh-dropdown">
                      <FormControl className="select-dropdown-form d-flex justify-content-center align-item-center">
                        <Select
                          value={this.state.valueChanged}
                          onChange={(e) => {
                            this.selectedStudies(e);
                          }}
                          className="select-dropdown"
                          MenuProps={MenuProps}
                          style={{ background: "white", color: "black" }}
                        >
                          <MenuItem
                            value="0"
                            Selected={
                              this.state.valueChanged === "0" ? "selected" : ""
                            }
                          >
                            <span className="mb-0"> {t("Active studies")}</span>
                          </MenuItem>
                          <MenuItem
                            value="2"
                            Selected={
                              this.state.valueChanged === "2" ? "selected" : ""
                            }
                          >
                            <span className="mb-0">
                              {t("Completed studies")}
                            </span>
                          </MenuItem>
                          <MenuItem
                            value="1"
                            Selected={
                              this.state.valueChanged === "1" ? "selected" : ""
                            }
                          >
                            <span className="mb-0">{t("All studies")}</span>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  )}
                </div>
                {(this.state.tableName !== t("Payment Summary") &&
                  this.state.tableName !== t("Stipend") &&
                  this.state.tableName !== t("My Studies") &&
                  this.state.tableName !== t("My travel")) || (
                    <div className="input-group rounded">
                      <input
                        type="search"
                        className="form-control rounded"
                        placeholder={t("Search here...")}
                        aria-label="Search"
                        aria-describedby="search-addon"
                        value={this.state.searchText}
                        onChange={($event) => this.onsearch($event.target.value)}
                      />
                      <span
                        className="input-group-text border-0"
                        id="search-addon"
                      >
                        <i className="fas fa-search"></i>
                      </span>
                    </div>
                  )}
              </div>
            </div>

            <div className="tabs-wrap">
              {(this.state.tableName !== t("Payment Summary") &&
                this.state.tableName !== t("Stipend")) || (
                  <div className="tabs">
                    {this.state.conditionsStipends === "1" ? (
                      <button
                        type="button"
                        onClick={
                          this.state.tabRefreshing === 1
                            ? () => this.stipendTab()
                            : null
                        }
                        className={
                          this.state.tableName === t("Stipend")
                            ? " stipend-tab active-tab"
                            : " stipend-tab"
                        }
                      >
                        {t("Stipends")}
                      </button>
                    ) : (
                      <></>
                    )}
                    {this.state.conditionsReimbursements === "1" ? (
                      <button
                        type="button"
                        onClick={
                          this.state.tabRefreshing === 2
                            ? () => this.reimbursementsTab()
                            : null
                        }
                        className={
                          this.state.tableName === t("Payment Summary")
                            ? " reimbursements-tab active-tab"
                            : " reimbursements-tab"
                        }
                      >
                        {t("Reimbursements")}
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              {this.state.tableName === t("My travel") && <div></div>}
            </div>
            <div className="date-filter-wrap">
              {(this.state.tableName !== t("Payment Summary") &&
                this.state.tableName !== t("My travel") &&
                this.state.tableName === t("MyTravel New Request")) ||
                this.state.tableName === t("My Studies") || (
                  <div>
                    <div className="form-group mb-0 input-date">
                      <label> {t("From")}: </label>
                      <div className="date-picker-wrap">
                        <DatePicker
                          selected={this.state.startDate}
                          onChange={(date) =>
                            this.setState({ startDate: date }, () => { })
                          }
                          dateFormat="dd-MMM-yyyy"
                          placeholderText="dd-mmm-yyyy"
                          maxDate={this.state.endDate}
                          ref={(c) => (this._fromcalendar = c)}
                        />
                        <img
                          src="/media/misc/date-icon.svg"
                          onClick={() => this.fromDatepicker()}
                          alt="Unable to load"
                          width="100%"
                          className="date-icon"
                        />
                      </div>
                      <label> {t("To")}: </label>
                      <div className="date-picker-wrap">
                        <DatePicker
                          selected={this.state.endDate}
                          onChange={(date) =>
                            this.setState({ endDate: date }, () => { })
                          }
                          dateFormat="dd-MMM-yyyy"
                          placeholderText="dd-mmm-yyyy"
                          minDate={this.state.startDate}
                          ref={(c) => (this._tocalendar = c)}
                        />
                        <img
                          src="/media/misc/date-icon.svg"
                          onClick={() => this.toDatepicker()}
                          alt="Unable to load"
                          width="100%"
                          className="date-icon"
                        />
                      </div>
                      <div className="filter-cancel">
                        <div className="filter-btn-wrap">
                          <button
                            type="button"
                            className="btn btn-primary filter-btn"
                            onClick={() =>
                              this.dateFilter(
                                this.state.startDate,
                                this.state.endDate
                              )
                            }
                          >
                            {t("Filter")}
                          </button>
                        </div>
                        <div className="clear-btn-wrap">
                          <button
                            type="button"
                            className="btn btn-danger clear-btn"
                            onClick={() =>
                              this.dateClear(
                                this.state.startDate,
                                this.state.endDate
                              )
                            }
                          >
                            {t("Reset")}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="color-red">
                        {this.state.dateValidation !== ""
                          ? this.state.dateValidation
                          : ""}
                      </span>
                    </div>
                  </div>
                )}
              <div className="date-button-wrap">
                {(this.state.tableName !== t("Payment Summary") &&
                  this.state.tableName !== t("My travel") &&
                  this.state.tableName === t("MyTravel New Request")) ||
                  this.state.tableName === t("My Studies") || (
                    <div className="date-button"></div>
                  )}
                <div className="add-btn-wrap">
                  {this.state.tableName === t("Payment Summary") && (
                    <button
                      type="text"
                      className={
                        localStorage.getItem("Status") === "2"
                          ? "btn btn-primary add-reimburement-btn disabled-btn"
                          : "btn btn-primary add-reimburement-btn"
                      }
                      onClick={
                        localStorage.getItem("Status") === "2"
                          ? () => {
                            this.warningMessageOpen("newReimbursementNote");
                          }
                          : () => {
                            this.newReimbursementFormOpen();
                          }
                      }
                    >
                      {t("+ New reimbursement")}
                    </button>
                  )}
                </div>
              </div>
              {this.state.tableName === t("MyTravel New Request") && (
                <div className="top-container filter-text">
                  <div className="study-text-wrap">
                    <p>
                      <b>{t("Study")}:</b> {this.state.data[0]?.Study}
                    </p>
                    <div className="filter-textbox visit_time">
                      <p className="mb-0">
                        <b>{t("Visitdatetime")}: </b>{" "}
                        <label>
                          {this.state.data[0]?.VisitDateTime.substr(11, 8) ===
                            "00:00:00"
                            ? moment(this.state.data[0]?.VisitDateTime).format(
                              "DD-MMM-YYYY"
                            )
                            : moment(this.state.data[0]?.VisitDateTime).format(
                              "DD-MMM-YYYY HH:mm"
                            )}
                        </label>
                      </p>
                    </div>
                  </div>
                  <div className="travel-right">
                    <p className="flex-row">
                      <span className="updated-text flex-width">
                        <b>{t("Updated by")}: </b>{" "}
                        {this.state.data[0]?.UpdatedBy}{" "}
                      </span>
                      <span className="submitted-text flex-width">
                        <b>{t("Submitted at")}: </b>
                        <label>
                          {moment
                            .utc(this.state.data[0]?.SubmittedAt)
                            .local()
                            .format("DD-MMM-YYYY HH:mm")}
                        </label>
                      </span>
                    </p>
                    <div className="filter-textbox visit_time">
                      <p className="mb-0 flex-width">
                        <b>{t("Earliest arrival date")}: </b>
                        <label>
                          {moment(this.state.data[0]?.TravelDate).format(
                            "DD-MMM-YYYY"
                          )}
                        </label>
                      </p>
                      <p className="mb-0 flex-width">
                        <b>{t("Latest departure date")}: </b>
                        <label>
                          {moment(this.state.data[0]?.TravelEndDate).format(
                            "DD-MMM-YYYY"
                          )}
                        </label>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={
                this.state.tableName === t("MyTravel New Request")
                  ? "new-travel-request"
                  : ""
              }
            >
              {this.state.tableName === t("MyTravel New Request") ? (
                <span
                  className={
                    this.state.data[0]?.Patient_Save === "0"
                      ? "myTravel-color-black"
                      : "myTravel-color-red"
                  }
                >
                  {this.props.t(this.state.travelMethodNote)}
                </span>
              ) : (
                ""
              )}
              <div
                className={
                  this.state.tableName === t("My travel") ? "my-tavel-info" : ""
                }
              >
                <div className="table-height table-responsive">
                  {this.state.searchData ? (
                    <div className="no-data-row">
                      <div className="data-not-found position-unset">
                        <Spinner
                          as="span"
                          animation="border"
                          size="lg"
                          role="status"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ) : (
                    <table
                      className={
                        this.state.tableName === t("MyTravel New Request")
                          ? "table table-striped"
                          : "table table-striped"
                      }
                    >
                      <thead>
                        <tr>
                          {this.getHeader()}
                          {this.state.tableName === t("Payment Summary") && (
                            <th>{t("Receipts")}</th>
                          )}
                          {this.state.tableName === t("My travel") && (
                            <th>{t("Comment")}</th>
                          )}
                          {this.state.tableName === t("My travel") && (
                            <th>{t("Request")}</th>
                          )}
                          {this.state.tableName === t("My Studies") && (
                            <th className="action-th">{t("Action")}</th>
                          )}
                          {this.state.tableName === t("MyTravel New Request") &&
                            this.state.data[0]?.Patient_Save === "0" ? (
                            <th>{t("Remove")}</th>
                          ) : null}
                        </tr>
                      </thead>
                      {(this.state.tableName !== t("MyTravel New Request") &&
                        this.state.api_Arr.length !== 0 && (
                          <tbody>{this.tableBody()}</tbody>
                        )) ||
                        (this.state.tableName !== t("MyTravel New Request") && (
                          <tbody>
                            <div className="no-data-row">
                              <div className="data-not-found">
                                <img
                                  src="/media/misc/MicrosoftTeams-image.png"
                                  alt="unable to load"
                                  width="100"
                                  height="100"
                                />
                                <label className="text-center no-data-text">
                                  {t("No data available")}
                                </label>
                              </div>
                            </div>
                          </tbody>
                        ))}
                      {this.state.tableName === t("MyTravel New Request") && (
                        <tbody>
                          {this.state.inputBoxes.map((Obj, index) => {
                            if (Obj === "") {
                            } else if (Obj === "Hotel Lodging") {
                              return (
                                <tr key={index}>
                                  <td>
                                    <label>{Obj}</label>
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  {this.state.data[0]?.Patient_Save === "0" ? (
                                    <td>
                                      <button
                                        type="button"
                                        disabled={
                                          this.state.checkConditionsNewRequest[
                                            index
                                          ] === true
                                            ? true
                                            : false
                                        }
                                        className="btn btn-danger clear-btn"
                                        onClick={() =>
                                          this.myTravelNewRequestRecords(
                                            Obj,
                                            index
                                          )
                                        }
                                      >
                                        {t("Remove")}
                                      </button>
                                    </td>
                                  ) : null}
                                </tr>
                              );
                            } else {
                              return (
                                <tr key={index}>
                                  <td>
                                    <label>{Obj}</label>
                                  </td>
                                  <td>
                                    <div className="d-flex justify-content-center dp-time">
                                      {this.state.newReContent
                                        ? this.state.depentureDateUpdate.map(
                                          (val, index) => {
                                            if (val.type === Obj) {
                                              if (
                                                val.depentureDate !== "" ||
                                                val.depentureDate === ""
                                              ) {
                                                return (
                                                  <div className="date-picker-wrap">
                                                    <DatePicker
                                                      selected={
                                                        val.depentureDate !== ""
                                                          ? new Date(
                                                            val.depentureDate
                                                          )
                                                          : val.depentureDate
                                                      }
                                                      onChange={(date) =>
                                                        this.handleDepentureDateChanged(
                                                          date,
                                                          index,
                                                          Obj
                                                        )
                                                      }
                                                      dateFormat="dd-MMM-yyyy"
                                                      placeholderText="dd-mmm-yyyy"
                                                      minDate={
                                                        new Date(
                                                          this.state.data[0]?.TravelDate
                                                        )
                                                      }
                                                      maxDate={
                                                        new Date(
                                                          this.state.data[0]?.VisitDateTime
                                                        )
                                                      }
                                                      ref={(c) =>
                                                        (this._depentureNotNullDatePicker = c)
                                                      }
                                                    />
                                                    <img
                                                      src="/media/misc/date-icon.svg"
                                                      alt="Unable to load"
                                                      width="100%"
                                                      className="date-icon"
                                                    />
                                                  </div>
                                                );
                                              }
                                            }
                                          }
                                        )
                                        : !this.state.newReContent
                                          ? this.state.depentureDateUpdate.map(
                                            (val, index) => {
                                              if (val.type === Obj) {
                                                if (val.depentureDate !== "") {
                                                  return (
                                                    <label>
                                                      {" "}
                                                      {moment(
                                                        val.depentureDate
                                                      ).format("DD-MMM-YYYY")}
                                                    </label>
                                                  );
                                                } else {
                                                  return "-";
                                                }
                                              }
                                            }
                                          )
                                          : ""}
                                    </div>
                                  </td>
                                  {/* =============================Depanture */}
                                  <td>
                                    <div className="d-flex justify-content-center dp-time">
                                      {this.state.newReContent
                                        ? this.state.depentureDateUpdate.map(
                                          (val, index) => {
                                            if (val.type === Obj) {
                                              if (
                                                val.depentureHour !== "" ||
                                                val.depentureHour === ""
                                              ) {
                                                return (
                                                  <div className="set-language set-Country psgWidth">
                                                    <div className="set-language-dropdown set-Country-dropdown">
                                                      <div className="dropdown ">
                                                        <button
                                                          className="btn btn-secondary dropdown-toggle"
                                                          type="button"
                                                          data-toggle="dropdown"
                                                        >
                                                          {val.depentureHour !==
                                                            ""
                                                            ? val.depentureHour
                                                            : t("00")}
                                                        </button>
                                                        <div
                                                          className="dropdown-menu dropdown-menuTop psgWidth-Dropdown"
                                                          onClick={(e) =>
                                                            this.handleDepentureHourChanged(
                                                              e,
                                                              index,
                                                              Obj
                                                            )
                                                          }
                                                        >
                                                          {hourData.map(
                                                            (hours) => {
                                                              return (
                                                                <button
                                                                  className={
                                                                    val.depentureHour ===
                                                                      hours.hour
                                                                      ? "dropdown-item active-language dropdownPadding"
                                                                      : "dropdown-item dropdownPadding"
                                                                  }
                                                                  key={hours}
                                                                  type="button"
                                                                  value={
                                                                    hours.hour
                                                                  }
                                                                >
                                                                  {hours.hour}
                                                                </button>
                                                              );
                                                            }
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                              {
                                                return (
                                                  <div className="set-language set-Country NumberWidth">
                                                    <div className="set-language-dropdown set-Country-dropdown">
                                                      <div className="dropdown ">
                                                        <button
                                                          className="btn btn-secondary dropdown-toggle"
                                                          type="button"
                                                          data-toggle="dropdown"
                                                        >
                                                          {val.depentureMinute !==
                                                            ""
                                                            ? val.depentureMinute
                                                            : t("00")}
                                                        </button>
                                                        <div
                                                          className="dropdown-menu dropdown-menuHeight dropdown-menuTop psgWidth-Dropdown"
                                                          onClick={(e) =>
                                                            this.handleDepentureMinuteChanged(
                                                              e,
                                                              index,
                                                              Obj
                                                            )
                                                          }
                                                        >
                                                          {minuteData.map(
                                                            (minutes) => {
                                                              return (
                                                                <button
                                                                  className={
                                                                    val.depentureMinute ===
                                                                      minutes.minute
                                                                      ? "dropdown-item active-language dropdownPadding"
                                                                      : "dropdown-item dropdownPadding"
                                                                  }
                                                                  key={
                                                                    minutes
                                                                  }
                                                                  type="button"
                                                                  value={
                                                                    minutes.minute
                                                                  }
                                                                >
                                                                  {
                                                                    minutes.minute
                                                                  }
                                                                </button>
                                                              );
                                                            }
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            }
                                          }
                                        )
                                        : ""}
                                      &nbsp;&nbsp;
                                      {this.state.newReContent
                                        ? this.state.depentureDateUpdate.map(
                                          (val, index) => {
                                            if (val.type === Obj) {
                                              if (
                                                val.depentureMinute !== "" ||
                                                val.depentureMinute === ""
                                              ) {
                                                return (
                                                  <div className="set-language set-Country psgWidth">
                                                    <div className="set-language-dropdown set-Country-dropdown">
                                                      <div className="dropdown ">
                                                        <button
                                                          className="btn btn-secondary dropdown-toggle"
                                                          type="button"
                                                          data-toggle="dropdown"
                                                        >
                                                          {val.depentureMinute !==
                                                            ""
                                                            ? val.depentureMinute
                                                            : t("00")}
                                                        </button>
                                                        <div
                                                          className="dropdown-menu dropdown-menuHeight dropdown-menuTop psgWidth-Dropdown"
                                                          onClick={(e) =>
                                                            this.handleDepentureMinuteChanged(
                                                              e,
                                                              index,
                                                              Obj
                                                            )
                                                          }
                                                        >
                                                          {minuteData.map(
                                                            (minutes) => {
                                                              return (
                                                                <button
                                                                  className={
                                                                    val.depentureMinute ===
                                                                      minutes.minute
                                                                      ? "dropdown-item active-language dropdownPadding"
                                                                      : "dropdown-item dropdownPadding"
                                                                  }
                                                                  key={
                                                                    minutes
                                                                  }
                                                                  type="button"
                                                                  value={
                                                                    minutes.minute
                                                                  }
                                                                >
                                                                  {
                                                                    minutes.minute
                                                                  }
                                                                </button>
                                                              );
                                                            }
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            }
                                          }
                                        )
                                        : ""}
                                      {!this.state.newReContent
                                        ? this.state.depentureDateUpdate.map(
                                          (val, index) => {
                                            if (val.type === Obj) {
                                              if (val.depentureTime !== "") {
                                                if (
                                                  val.depentureTime ===
                                                  "00:00:00"
                                                ) {
                                                  return "-";
                                                } else {
                                                  return (
                                                    <label>
                                                      {val.depentureHour +
                                                        ":" +
                                                        val.depentureMinute}
                                                    </label>
                                                  );
                                                }
                                              }
                                            }
                                          }
                                        )
                                        : ""}
                                    </div>{" "}
                                  </td>
                                  <td>
                                    <div className="d-flex justify-content-center dp-time">
                                      {this.state.newReContent
                                        ? this.state.depentureDateUpdate.map(
                                          (val, index) => {
                                            if (val.type === Obj) {
                                              if (
                                                val.returnDate !== "" ||
                                                val.returnDate === ""
                                              ) {
                                                return (
                                                  <div className="date-picker-wrap">
                                                    <DatePicker
                                                      selected={
                                                        val.returnDate !== ""
                                                          ? new Date(
                                                            val.returnDate
                                                          )
                                                          : val.returnDate
                                                      }
                                                      onChange={(date) =>
                                                        this.handleReturnDateChanged(
                                                          date,
                                                          index,
                                                          Obj
                                                        )
                                                      }
                                                      dateFormat="dd-MMM-yyyy"
                                                      placeholderText="dd-mmm-yyyy"
                                                      maxDate={
                                                        new Date(
                                                          this.state.data[0]?.TravelEndDate
                                                        )
                                                      }
                                                      minDate={
                                                        new Date(
                                                          this.state.data[0]?.VisitDateTime
                                                        )
                                                      }
                                                      ref={(c) =>
                                                        (this._returndateNotNullDatePicker = c)
                                                      }
                                                    />
                                                    <img
                                                      src="/media/misc/date-icon.svg"
                                                      alt="Unable to load"
                                                      width="100%"
                                                      className="date-icon"
                                                    />
                                                  </div>
                                                );
                                              }
                                            }
                                          }
                                        )
                                        : !this.state.newReContent
                                          ? this.state.depentureDateUpdate.map(
                                            (val, index) => {
                                              if (val.type === Obj) {
                                                if (val.returnDate !== "") {
                                                  return (
                                                    <label>
                                                      {moment(
                                                        val.returnDate
                                                      ).format("DD-MMM-YYYY")}
                                                    </label>
                                                  );
                                                } else {
                                                  return "-";
                                                }
                                              }
                                            }
                                          )
                                          : ""}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex justify-content-center dp-time">
                                      {this.state.newReContent
                                        ? this.state.depentureDateUpdate.map(
                                          (val, index) => {
                                            if (val.type === Obj) {
                                              if (
                                                val.returnHour !== "" ||
                                                val.returnHour === ""
                                              ) {
                                                return (
                                                  <div className="set-language set-Country psgWidth">
                                                    <div className="set-language-dropdown set-Country-dropdown">
                                                      <div className="dropdown ">
                                                        <button
                                                          className="btn btn-secondary dropdown-toggle"
                                                          type="button"
                                                          data-toggle="dropdown"
                                                        >
                                                          {val.returnHour !==
                                                            ""
                                                            ? val.returnHour
                                                            : t("00")}
                                                        </button>
                                                        <div
                                                          className="dropdown-menu psgWidth-Dropdown dropdown-menuTop "
                                                          onClick={(e) =>
                                                            this.handleReturnHourChanged(
                                                              e,
                                                              index,
                                                              Obj
                                                            )
                                                          }
                                                        >
                                                          {hourData.map(
                                                            (hours) => {
                                                              return (
                                                                <button
                                                                  className={
                                                                    val.returnHour ===
                                                                      hours.hour
                                                                      ? "dropdown-item active-language dropdownPadding"
                                                                      : "dropdown-item dropdownPadding"
                                                                  }
                                                                  key={hours}
                                                                  type="button"
                                                                  value={
                                                                    hours.hour
                                                                  }
                                                                >
                                                                  {hours.hour}
                                                                </button>
                                                              );
                                                            }
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            }
                                          }
                                        )
                                        : ""}
                                      &nbsp;&nbsp;
                                      {this.state.newReContent
                                        ? this.state.depentureDateUpdate.map(
                                          (val, index) => {
                                            if (val.type === Obj) {
                                              if (
                                                val.returnMinute !== "" ||
                                                val.returnMinute === ""
                                              ) {
                                                return (
                                                  <div className="set-language set-Country psgWidth">
                                                    <div className="set-language-dropdown set-Country-dropdown">
                                                      <div className="dropdown ">
                                                        <button
                                                          className="btn btn-secondary dropdown-toggle"
                                                          type="button"
                                                          data-toggle="dropdown"
                                                        >
                                                          {val.returnMinute !==
                                                            ""
                                                            ? val.returnMinute
                                                            : t("00")}
                                                        </button>
                                                        <div
                                                          className="dropdown-menu psgWidth-Dropdown dropdown-menuHeight dropdown-menuTop"
                                                          onClick={(e) =>
                                                            this.handleReturnMinuteChanged(
                                                              e,
                                                              index,
                                                              Obj
                                                            )
                                                          }
                                                        >
                                                          {minuteData.map(
                                                            (minutes) => {
                                                              return (
                                                                <button
                                                                  className={
                                                                    val.returnMinute ===
                                                                      minutes.minute
                                                                      ? "dropdown-item active-language dropdownPadding"
                                                                      : "dropdown-item dropdownPadding"
                                                                  }
                                                                  key={
                                                                    minutes
                                                                  }
                                                                  type="button"
                                                                  value={
                                                                    minutes.minute
                                                                  }
                                                                >
                                                                  {
                                                                    minutes.minute
                                                                  }
                                                                </button>
                                                              );
                                                            }
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            }
                                          }
                                        )
                                        : ""}
                                      {!this.state.newReContent
                                        ? this.state.depentureDateUpdate.map(
                                          (val, index) => {
                                            if (val.type === Obj) {
                                              if (val.returnTime !== "") {
                                                if (
                                                  val.returnTime ===
                                                  "00:00:00"
                                                ) {
                                                  return "-";
                                                } else {
                                                  return (
                                                    <label>
                                                      {val.returnHour +
                                                        ":" +
                                                        val.returnMinute}
                                                    </label>
                                                  );
                                                }
                                              }
                                            }
                                          }
                                        )
                                        : ""}
                                    </div>{" "}
                                  </td>
                                  {this.state.data[0]?.Patient_Save === "0" ? (
                                    <td>
                                      <button
                                        type="button"
                                        disabled={
                                          this.state.checkConditionsNewRequest[
                                            index
                                          ] === true
                                            ? true
                                            : false
                                        }
                                        className="btn btn-danger clear-btn"
                                        onClick={() =>
                                          this.myTravelNewRequestRecords(
                                            Obj,
                                            index
                                          )
                                        }
                                      >
                                        {t("Remove")}
                                      </button>
                                    </td>
                                  ) : null}
                                </tr>
                              );
                            }
                          })}
                        </tbody>
                      )}
                    </table>
                  )}
                  {this.state.tableName === t("MyTravel New Request") && (
                    <div className="submit-travel-main">
                      {this.state.data[0]?.Patient_Save === "0" ? (
                        this.state.myTravelNewRequestDropDown.length !== 0 ? (
                          <div className="submit-travel">
                            <div className="set-language-dropdown set-Country-dropdown">
                              <div className="dropdown ">
                                <button
                                  className="btn btn-secondary dropdown-toggle"
                                  type="button"
                                  data-toggle="dropdown"
                                  style={{ width: "212px" }}
                                >
                                  {this.state.myTravelNewRequestList === ""
                                    ? t("Types of Travel")
                                    : this.state.myTravelNewRequestList === "0"
                                      ? t("Types of Travel")
                                      : this.state.myTravelNewRequestList === "1"
                                        ? t("Air Transportation")
                                        : this.state.myTravelNewRequestList === "2"
                                          ? t("Hotel Lodging")
                                          : this.state.myTravelNewRequestList === "3"
                                            ? t("Ground Transporatuion")
                                            : ""}
                                  {this.state.myTravelNewRequestList}
                                </button>
                                <div
                                  className="dropdown-menu dropdown-menuHeight dropdown-menuTop"
                                  onClick={(e) => this.NewRequestList(e)}
                                  style={{ width: "212px" }}
                                >
                                  {this.state.myTravelNewRequestDropDown.map(
                                    (item) => {
                                      return (
                                        <button
                                          className={
                                            this.state
                                              .myTravelNewRequestList ===
                                              item.name
                                              ? "dropdown-item active-language"
                                              : "dropdown-item"
                                          }
                                          key={item.id}
                                          type="button"
                                          value={item.name}
                                        >
                                          {item.name}
                                        </button>
                                      );
                                    }
                                  )}
                                </div>

                                <button
                                  onClick={() => this.InputRowsCreated()}
                                  disabled={!this.state.newReContent}
                                  className="btn btn-primary filter-btn"
                                  style={{ marginLeft: "10px" }}
                                >
                                  + {t("Add")}
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                      <div className="ml-4">
                        <p className="color-red">
                          {this.state.submitTravelRequestDropdownErr}
                        </p>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">{t("Comments")}</label>
                        <textarea
                          className="form-control"
                          placeholder={t("Enter comments")}
                          disabled={!this.state.newReContent}
                          rows={1}
                          onChange={(e) =>
                            this.setState({ commentData: e.target.value })
                          }
                          value={this.state.commentData}
                        />
                      </div>
                      <div className="submit-travel-button">
                        {this.state.data[0]?.Patient_Save === "0" ? (
                          <button
                            className="btn btn-primary filter-btn"
                            disabled={
                              !this.state.newReContent || this.state.loaded
                            }
                            onClick={(e) => this.newRequestSaveData(e)}
                          >
                            {t("Submit")}&nbsp;&nbsp;
                            {this.state.loaded ? (
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="color-white"
                              />
                            ) : (
                              ""
                            )}
                          </button>
                        ) : (
                          ""
                        )}
                        <button
                          className="btn btn-danger clear-btn"
                          onClick={() => this.newRequestCancel("Cancel")}
                        >
                          {t("Cancel")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {(this.state.tableName !== t("Payment Summary") &&
              this.state.tableName !== t("My travel") &&
              this.state.tableName === t("MyTravel New Request")) || (
                <div className="pagination-wrap">
                  <div className="view-per-apge">
                    <span>{t("View")}</span>
                    <div className="set-language set-Country psgWidth" style={{ margin: "0px 10px" }}>
                      <div className="set-language-dropdown set-Country-dropdown">
                        <div className="dropdown">
                          <button
                            className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                            type="button"
                            data-toggle="dropdown"
                          >
                            {this.state.selectedEntry}
                          </button>
                          <div
                            className="dropdown-menu dropdown-menupagn psgWidth-Dropdown"
                            onClick={(e) => this.onCLickEntries(e)}
                          >
                            {this.state.showEntries.map((key, item) => {
                              return (
                                <button
                                  className={
                                    this.state.selectedEntry != key.name
                                      ? "dropdown-item dropdownPadding"
                                      : "dropdown-item active-language dropdownPadding"
                                  }
                                  key={item.code}
                                  type="button"
                                  value={key.name}
                                >
                                  {key.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: "144px" }}>{t("Rows per page")}</div>
                  </div>
                  <nav
                    aria-label="Page navigation example"
                    className="pagination-bottom"
                  >
                    {this.state.api_Arr.length !== 0 && (
                      <span>
                        <ReactPaginate
                          initialPage={this.state.pageNumber}
                          forcePage={this.state.pageNumber}
                          previousClassName={"glyphicon glyphicon-menu-left"}
                          previousLabel={<FaChevronLeft title={t("Previous")} />}
                          nextLabel={<FaChevronRight title={t("Next")} />}
                          nextClassName={"glyphicon glyphicon-menu-right"}
                          breakLabel={"..."}
                          breakClassName={"break-me"}
                          pageCount={this.state.pageCount}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={2}
                          onPageChange={($event) => this.handlePageChange($event)}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"active"}
                        />
                      </span>
                    )}
                  </nav>
                </div>
              )}
          </div>
          {/* Reimbursement Form Insert and Read */}
          <Modal
            isOpen={this.state.newReimbursementFormInsertAndRead}
            onRequestClose={() => {
              this.newReimbursementFormClose();
            }}
            ariaHideApp={false}
            style={customStyles}
          >
            <>
              <div className="modal-header">
                <h4>
                  {this.state.viewReimbursementData
                    ? t("View Reimbursement Request")
                    : t("New Reimbursement Request")}
                </h4>
                <img
                  onClick={() => {
                    this.newReimbursementFormClose();
                  }}
                  title={t("Close")}
                  src="/media/misc/close.svg"
                  alt="unable to load"
                />
              </div>
              <div className="modal-content new-reiumbursement py-3 px-4 mb-0">
                <form onSubmit={(e) => this.handleSubmit(e)}>

                  <div className="inner-form-wrap outer-form " style={{ overflow: "visible" ,marginBottom:"0px"}}>
                    <div className="row mb-0" >
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="sel1">
                            {t("Visit")} <span className="color-red">*</span>
                          </label>

                          <div className="set-language set-Country">
                            <div className="set-language-dropdown set-Country-dropdown">
                              <div className="dropdown">
                                <button
                                  className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                  type="button"
                                  disabled={
                                    this.state.viewReimbursementData ? true : false
                                  }
                                  data-toggle="dropdown"
                                >
                                  {this.state.visitName === ""
                                    ? t("Select visit")
                                    : ""}
                                  {this.state.visitNameList.map((Obj) => {
                                    if (this.state.visitName === Obj.id) {
                                      return (
                                        <span selected="selected">
                                          {this.state.visitName === Obj.id
                                            ? Obj.name
                                            : ""}
                                        </span>
                                      );
                                    }
                                  })}
                                </button>
                                <div className="dropdown-menu dropdown-menuHeight" style={{ maxHeight: "260px" }}>
                                  <button
                                    className={
                                      this.state.visitName !== ""
                                        ? "dropdown-item"
                                        : "dropdown-item active-language"
                                    }
                                    type="button"
                                    onClick={() => this.visitNameSelect("blank")}
                                  >
                                    {t("Select visit")}
                                  </button>
                                  {this.state.visitNameList.map((Obj) => {
                                    return (
                                      <button
                                        className={
                                          this.state.visitName !== Obj.id
                                            ? "dropdown-item"
                                            : "dropdown-item active-language"
                                        }
                                        key={Obj.id}
                                        type="button"
                                        onClick={() => this.visitNameSelect(Obj.id)}
                                        value={
                                          this.state.visitName !== Obj.id
                                            ? ""
                                            : "selected"
                                        }
                                      >
                                        {Obj.name}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="color-red">{this.state.visitNameErr}</p>
                        </div>
                      </div>
                      <div className="col-12">
                        {/*---MyNewDrop-------- */}
                        <div className="form-group mb-0">
                          <label htmlFor="sel1">
                            {t(" Reimbursement Items")} <span className="color-red">*</span>
                          </label>

                          <div className="set-language set-Country">
                      <div className="set-language-dropdown set-Country-dropdown">
                        <div className="dropdown">
                        <div className="items-types-wrap mt-0">
                          {this.state.newReimbursementMultipleRecordUpdate.map(
                            (Obj) => {
                              if (Obj.id !== 0) {
                                return (
                                  <section>
                                  <div className="items-types" key={Obj.id}>
                                  <div className="d-flex justify-content-between" style={{width:'35rem'}}>
                                    <h6 className="mb-0">
                                      {Obj.type_id === "2"
                                        ? t("Other")
                                        : Obj.type_id === "3"
                                          ? t("Meal")
                                          : Obj.type_id === "4"
                                            ? t("Mileage Reimbursement")
                                            : Obj.type_id === "5"
                                              ? t("Ground Transportation")
                                              : Obj.type_id === "6"
                                                ? t("Parking")
                                                : Obj.type_id === "7"
                                                  ? t("Car Service")
                                                  : Obj.type_id === "8"
                                                    ? t("Test Deletion Option")
                                                    : ""}
                                    </h6>
                                    <span className="form-group mb-0 mx-2">
                                  {  Number(Obj.amount).toLocaleString("en-US", { style: "currency", currency: "USD",})}
                                    </span>
                                    </div>
                                    <div>        
                                    {this.state.viewReimbursementData ? (                       
                                      <span>
                                        <i
                                          className="fa fa-eye"
                                          title={t("View")}
                                          onClick={() =>
                                            this.viewTheItemType(Obj.id)
                                          }
                                        ></i>
                                      </span>
                                    ) : (
                                      <span>
                                        <i
                                          className="fa fa-edit"
                                          title={t("Edit")}
                                          onClick={() =>
                                            this.editTheItemType(Obj.id)
                                          }
                                        ></i>
                                        <i
                                          className="fa fa-trash"
                                          title={t("Delete")}
                                          onClick={() =>
                                            this.removeTheItemType(Obj.id)
                                          }
                                        ></i>
                                      </span>
                                    )}
                                    </div>
                                  </div>
                                  </section>
                                );
                                
                              }
                            }
                          )}
                          {this.state.currentTotalAmount !== "" ?
                            <div className="form-group mb-0">
                               <div className="form-group mb-0" style={{paddingLeft: "10px"}}>
                                    <label htmlFor="email" className="t-amount-text">
                                      <div className="d-flex justify-content-between" style={{width:'35rem'}}>
                                         <div>
                                         {t("Total Current Amount ")} :{" "}
                                         </div>
                            <div className="text-right" style={{paddingRight: '10px'}}>
                               {this.state.currentTotalAmount !== ""
                                    ? Number(
                                       this.state.currentTotalAmount
                                       ).toLocaleString("en-US", { style: "currency", currency: "USD",})
                               : ""}
                            </div>
                                       </div>
                                    </label>
                              </div>
                              </div>
                         :""}

                        </div>

                          <button
                            className=" d-grid gap-2 col-12 mx-0 btn btn-primary reimburseSpecialBtn dropdown-toggle-padding "
                            type="button"
                            disabled={
                              this.state.viewReimbursementData ? true : false
                            }
                            data-toggle="dropdown"
                            
                          >
                            {this.state.newReimbursementMultipleRecord.type_id === ""
                              ? t("+ New Item ")
                              : ""}
                              
                            {this.state.itemTypesList.map((Obj) => {
                              if (localStorage.getItem('intl') === "true") {
                              if (Obj.intl === "1") {
                              return (
                                <span>
                                  {this.state.newReimbursementMultipleRecord.type_id === Obj.id
                                    ? Obj.name
                                    : ""}
                                </span>
                              );
                              }}
                              else{
                                return (
                                <span>
                                  {this.state.newReimbursementMultipleRecord.type_id === Obj.id
                                    ? Obj.name
                                    : ""}
                                </span>
                              );

                              }


                            })}
                          </button>
                          
                          <div className="dropdown-menu dropdown-menuHeight" style={{maxHeight:"160px"}}>
                            <button
                              className={
                                this.state.newReimbursementMultipleRecord.type_id !== ""
                                  ? "dropdown-item"
                                  : "dropdown-item active-language"
                              }
                              type="button"
                              onClick={() => this.itemTypeSelect("blank")}
                            >
                              {t("Select item type")}
                            </button>
                            {this.state.itemTypesList.map((Obj) => {
                              if (localStorage.getItem('intl') === "true") {
                              if (Obj.intl === "1") {
                              return (
                                <button
                                  className={
                                    this.state.newReimbursementMultipleRecord.type_id !== Obj.id
                                      ? "dropdown-item"
                                      : "dropdown-item active-language"
                                  }
                                  key={Obj.id}
                                  type="button"
                                  onClick={() => this.itemTypeSelect(Obj.id)}
                                >
                                  {Obj.name}
                                </button>
                              );
                           }}
                           else{
                            return (
                                <button
                                  className={
                                    this.state.newReimbursementMultipleRecord.type_id !== Obj.id
                                      ? "dropdown-item"
                                      : "dropdown-item active-language"
                                  }
                                  key={Obj.id}
                                  type="button"
                                  onClick={() => this.itemTypeSelect(Obj.id)}
                                >
                                  {Obj.name}
                                </button>
                              );
                           }
                           })} {/*----DropDown Mapping end here----*/}
                          </div>
                        </div>
                      </div>
                    </div>
                          <p className="color-red">{this.state.newReimbursementMultipleRecord.itemTypeErr}</p>

                        </div>
                      </div>
                      <div className="col-12">
                      </div>
                    </div>
                    {/*---MyNewDrop-------- */}

                  </div>

                      
                       
                        {this.state.currentTotalAmount !== ""
                          ? 
                      <div className="btn-wrap">
                    {this.state.viewReimbursementData ? (
                      ""
                    ) : (
                      <button
                        className="submit-btn"
                        type="submit"
                        value="Submit"
                      >
                        {t("Submit")}&nbsp;&nbsp;
                        {this.state.loaded ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="color-white"
                          />
                        ) : (
                          ""
                        )}
                      </button>
                    )}
                    <button
                      className="cancel-btn"
                      onClick={() => {
                        this.newReimbursementFormClose();
                      }}
                    >
                      {t("Cancel")}
                    </button>
                  </div> : ""}
                </form>
              </div>
            </>
          </Modal>

          {/* Item Type Form Insert and Read*/}
          <Modal
            isOpen={this.state.itemTypeFormInsertAndRead}
            onRequestClose={() => {
              this.itemTypeFormClose();
            }}
            ariaHideApp={false}
            style={itemTypePopupBox}
          >
            <>
              <div className="modal-wrap">
                <div className="modal-header">
                  <h4>
                    {this.state.newReimbursementMultipleRecord.type_id === "2"
                      ? t("Other")
                      : this.state.newReimbursementMultipleRecord.type_id ===
                        "3"
                        ? t("Meal")
                        : this.state.newReimbursementMultipleRecord.type_id ===
                          "4"
                          ? t("Mileage Reimbursement")
                          : this.state.newReimbursementMultipleRecord.type_id ===
                            "5"
                            ? t("Ground Transportation")
                            : this.state.newReimbursementMultipleRecord.type_id ===
                              "6"
                              ? t("Parking")
                              : this.state.newReimbursementMultipleRecord.type_id ===
                                "7"
                                ? t("Car Service")
                                : this.state.newReimbursementMultipleRecord.type_id ===
                                  "8"
                                  ? t("Test Deletion Option")
                                  : ""}
                  </h4>
                  <img
                    onClick={() => {
                      this.itemTypeFormClose();
                    }}
                    title={t("Close")}
                    src="/media/misc/close.svg"
                    alt="unable to load"
                  />
                </div>
                <div className="new-reiumbursement modal-content p-0">
                  <form>
                    <div className="inner-form-wrap ">
                      <div className="mileage-reimbursement-wrap">
                        <div className="left-side ">
                          {this.state.addressBasedItemType === "1" ? (
                            <>
                              <div className="form-group item-type-date">
                                <label htmlFor="email">
                                  {t("Travel Date")}
                                </label>
                                <div className="travel-date-wrap">
                                  {this.state.viewReimbursementData ? (
                                    <DatePicker
                                      disabled
                                      className="form-control"
                                      onChange={(date) =>
                                        this.handleInputTypeTravelDate({
                                          name: "travelDate",
                                          value: date,
                                        })
                                      }
                                      dateFormat="dd-MMM-yyyy"
                                      maxDate={new Date()}
                                      placeholderText="dd-mmm-yyyy"
                                      ref={(c) =>
                                        (this._travelDateCalendar = c)
                                      }
                                      value={
                                        this.state
                                          .newReimbursementMultipleRecord
                                          .travelDate === "Invalid date"
                                          ? "dd-mmm-yyyy"
                                          : this.state
                                            .newReimbursementMultipleRecord
                                            .travelDate
                                      }
                                    />
                                  ) : (
                                    <DatePicker
                                      selected={
                                        this.state
                                          .newReimbursementMultipleRecord
                                          .travelDate !== ""
                                          ? new Date(
                                            this.state.newReimbursementMultipleRecord.travelDate
                                          )
                                          : ""
                                      }
                                      className="form-control"
                                      onChange={(date) =>
                                        this.handleInputTypeTravelDate({
                                          name: "travelDate",
                                          value: date,
                                        })
                                      }
                                      dateFormat="dd-MMM-yyyy"
                                      maxDate={new Date()}
                                      placeholderText="dd-mmm-yyyy"
                                      ref={(c) =>
                                        (this._travelDateCalendar = c)
                                      }
                                    />
                                  )}
                                  <p className="color-red">
                                    {
                                      this.state.newReimbursementMultipleRecord
                                        .date
                                    }
                                  </p>
                                  <img
                                    src="/media/misc/date-icon.svg"
                                    onClick={
                                      this.state.viewReimbursementData
                                        ? ""
                                        : () => this.travelDateCalendar()
                                    }
                                    alt="Unable to load"
                                    width="100%"
                                    className="date-icon"
                                  />
                                </div>
                              </div>
                              <hr className="mt-3 mb-3" />
                              {this.state.addressBasedItemType === "1" ? (
                                <p className="color-green">
                                  {this.state.amountValidation}
                                </p>
                              ) : (
                                ""
                              )}

                              <hr className="mt-3 mb-3" />
                            </>
                          ) : null}
                          <div className="form-group amount-dollar">
                            <label htmlFor="email">
                              {t("Amount")} <span className="color-red">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={
                                this.state.addressBasedItemType === "1"
                                  ? t("Auto calculated")
                                  : t("Enter amount")
                              }
                              disabled={
                                this.state.viewReimbursementData ||
                                  this.state.addressBasedItemType === "1"
                                  ? true
                                  : false
                              }
                              autoComplete="off"
                              name="amount"
                              value={
                                this.state.newReimbursementMultipleRecord.amount
                              }
                              onChange={(e) => {
                                this.amountUpdatedChanged(e, "amountErr");
                              }}
                              onBlur={(e) => {
                                this.amountUpdatedBlur(e, "amountErr");
                              }}
                              onKeyPress={(event) => {
                                if (!/[0-9.]/g.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                            />
                            <p className="color-red">
                              {
                                this.state.newReimbursementMultipleRecord
                                  .amountErr
                              }
                            </p>

                            <img
                              src="/media/images/dollar.svg"
                              alt="notification"
                              width="100%"
                            />
                          </div>
                          {this.state.amountDistanceBasedItemType === "1" &&
                            this.state.addressBasedItemType === "1" ? (
                            <div className="form-group ">
                              <label htmlFor="email">
                                {t("Miles Traveled")} 
                                ({this.state.newReimbursementMultipleRecord.roundTrip === "1" ? "Two Way" : "One Way" })
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="distance"
                                disabled={
                                  this.state.milesInternationalItemType === "1"
                                    ? true
                                    : false
                                }
                                onChange={(e) => this.handleInputAddress(e)}
                                value={
                                  this.state.newReimbursementMultipleRecord
                                    .distance
                                }
                              />
                            </div>
                          ) : (
                            ""
                          )}
                          {this.state.addressBasedItemType === "1" ? (
                            <>
                              <div className="checkbox form-group text-left">
                                <label>{t("Round Trip")}</label>
                                <label className="d-inline">
                                  <input
                                    type="checkbox"
                                    name="roundTrip"
                                    disabled={
                                      this.state.viewReimbursementData
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => this.roundTripChecked(e)}
                                    checked={
                                      this.state.newReimbursementMultipleRecord
                                        .roundTrip === "1"
                                        ? true
                                        : false
                                    }
                                  />
                                  <span className="font-weight-normal ml-2 font-size-14">
                                    {t("This is a round trip")}
                                  </span>
                                </label>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                          <div className="form-group">
                            {
                              this.state.viewReimbursementData ? (
                                this.state.fileImagesData.length === 0
                                  ? (
                                    ""
                                  ) : (<label htmlFor="email" >{t("Uploaded Receipts")}</label>)
                              ) : (
                                <label htmlFor="email">
                                  {t("Upload Receipts")}{" "}
                                  {this.state.uploadReceiptsItemType === "1" ? (
                                    <span className="color-red">*</span>
                                  ) : (
                                    ""
                                  )}
                                </label>
                              )}
                            {this.state.viewReimbursementData ? (
                              ""
                            ) : (
                              <div className="file-input">
                                <input
                                  type="file"
                                  title=""
                                  value=""
                                  onChange={(e) =>
                                    this.receiptUploads(e, "true1")
                                  }
                                  multiple
                                />
                                <span className="button" variant="primary">
                                  {t("Choose files")} &nbsp;&nbsp;
                                  {this.state.receiptsloaded ? (
                                    <Spinner
                                      as="span"
                                      animation="border"
                                      size="sm"
                                      role="status"
                                      aria-hidden="true"
                                      className="color-white"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </span>
                                <span className="label" data-js-label>
                                  {t("Drag and drop files here to upload")}
                                </span>
                              </div>
                            )}
                            {this.state.uploadReceiptsItemType === "1" ? (
                              <p className="color-red">
                                {this.state.testDeletionOptionTextError}
                              </p>
                            ) : this.state.fileImagesName !== [] ||
                              this.state.fileImagesData !== [] ||
                              this.state.uploadReceiptsItemType === "1" ? (
                              ""
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="form-group">
                            {this.state.fileImagesData.map((Obj) => {
                              var name = Obj.name;
                              var ext = name.substr(name.lastIndexOf(".") + 1);
                              if (ext !== "") {
                                return (
                                  <div className="modal-content view-receipt-content">
                                    <div className="view-files-wrap">
                                      <div className="file-row">
                                        <div className="file-name">
                                          <div className="file-format">
                                            {ext === "png" ||
                                              ext === "jpg" ||
                                              ext === "jpeg" ||
                                              ext === "gif" ||
                                              ext === "jfif" ? (
                                              <img
                                                src="/media/misc/image-file.svg"
                                                alt="unable to load"
                                              />
                                            ) : ext === "pptx" ||
                                              ext === "ppt" ? (
                                              <img
                                                src="/media/images/powerpoint-ppt.svg"
                                                alt="unable to load"
                                              />
                                            ) : ext === "txt" ||
                                              ext === "doc" ||
                                              ext === "docx" ? (
                                              <img
                                                src="/media/misc/word-doc.svg"
                                                alt="unable to load"
                                              />
                                            ) : ext === "xlsx" ||
                                              ext === "xls" ||
                                              ext === "csv" ? (
                                              <img
                                                src="/media/misc/excel.svg"
                                                alt="unable to load"
                                              />
                                            ) : ext === "pdf" ? (
                                              <img
                                                src="/media/misc/pdf-file.svg"
                                                alt="unable to load"
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <p>{Obj.name}</p>
                                        </div>
                                        <div className="action-btn-wrap">
                                          {this.state.viewReimbursementData ? (
                                            <button
                                              type="button"
                                              className="btn m-0 p-0"
                                              title={t("View")}
                                            >
                                              <img
                                                onClick={(e) => {
                                                  this.receiptsView(
                                                    e,
                                                    ext,
                                                    Obj.hash,
                                                    Obj.name
                                                  );
                                                }}
                                                src="/media/images/view.svg"
                                                alt="unable to load"
                                              />
                                            </button>
                                          ) : (
                                            <button
                                              type="button"
                                              className="btn m-0 p-0"
                                              title={t("Delete")}
                                            >
                                              <img
                                                height="20"
                                                width="20"
                                                onClick={() => {
                                                  this.uploadFilesDelete(
                                                    Obj.hash
                                                  );
                                                }}
                                                src="/media/images/trash-red.svg"
                                                alt="unable to load"
                                              />
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">{t("Comments")}</label>
                            <textarea
                              rows={3}
                              className="form-control"
                              name="notes"
                              disabled={
                                this.state.viewReimbursementData ? true : false
                              }
                              placeholder={t("Enter comments")}
                              onChange={(e) => this.handleInputComments(e)}
                              value={
                                this.state.newReimbursementMultipleRecord.notes
                              }
                            />
                          </div>
                        </div>

                        {this.state.addressBasedItemType === "1" ? (
                          <div className="mileage-reimbursement border-l">
                            <div className="start-address">
                              <h4>{t("Start address")}</h4>
                              <div className="form-group">
                               <label htmlFor="sel1">{t("Previously used or saved address")}</label>
                                <div className="select-icon">
                                  <div className="set-language set-Country">
                                    <div className="set-language-dropdown set-Country-dropdown">
                                      <div className="dropdown">
                                        <button
                                          className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                          type="button"
                                          disabled={
                                            this.state.viewReimbursementData
                                              ? true
                                              : false
                                          }
                                          data-toggle="dropdown"
                                        >
                                          {this.state.selectedStartAddressId !==
                                            ""
                                            ? this.state.myTravelNewReimburesementsAdd.map(
                                              (Obj) => {
                                                if (
                                                  Obj.id ===
                                                  this.state
                                                    .selectedStartAddressId
                                                )
                                                  return (
                                                    <span>
                                                      {Obj.address}{" "}
                                                      {Obj.address2} {Obj.key}{" "}
                                                      {Obj.zipcode} {Obj.city} {Obj.state}
                                                    </span>
                                                  );
                                              }
                                            )
                                            : t("Select a saved location")}
                                        </button>

                                        <div className="dropdown-menu dropdown-menuHeight" style={{ maxHeight: "260px" }}>
                                          <button
                                            className={
                                              this.state.selectedStartAddressId !== " "
                                                ? "dropdown-item"
                                                : "dropdown-item active-language"
                                            }
                                            type="button"
                                            onClick={() =>this.setState(
                                            {selectedStartAddressId: "",selectedStartAddressIdName: t("Select a saved location" ), },() => {})}>
                                            {t("Select a saved location")}
                                          </button>
                                          {this.state.myTravelNewReimburesementsAdd.map(
                                            (Obj) => {
                                              {
                                              }
                                              if (
                                                Obj.address == null &&
                                                Obj.address2 == null &&
                                                Obj.city == null &&
                                                Obj.state == null &&
                                                Obj.zipcode == null
                                              ) {
                                                return (
                                                  <button
                                                    className={
                                                      this.state
                                                        .selectedStartAddressId !==
                                                        Obj.id
                                                        ? "dropdown-item itemPadding"
                                                        : "dropdown-item active-language"
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                      this.selectedStartAddress(
                                                        Obj
                                                      )
                                                    }
                                                  >
                                                    {Obj.address} {Obj.address2}{" "}
                                                    {Obj.key} {Obj.zipcode}{" "}{Obj.city}
                                                  </button>
                                                );
                                              } else if (
                                                Obj.address == null &&
                                                Obj.address2 == null &&
                                                Obj.city == null &&
                                                Obj.state == null &&
                                                Obj.zipcode == null
                                              ) {
                                                return (
                                                  <button
                                                    className={
                                                      this.state
                                                        .selectedStartAddressId !==
                                                        Obj.id
                                                        ? "dropdown-item itemPadding"
                                                        : "dropdown-item active-language"
                                                    }
                                                    value={Obj.id}
                                                    key={Obj.id}
                                                    type="button"
                                                    onClick={() =>
                                                      this.selectedStartAddress(
                                                        Obj
                                                      )
                                                    }
                                                  >
                                                    {Obj.address +
                                                      " " +
                                                      Obj.address2 +
                                                      " " +
                                                      Obj.city +
                                                      " " +
                                                      Obj.state +
                                                      " " +
                                                      Obj.zipcode}
                                                  </button>
                                                );
                                              } else if (
                                                Obj.address == null &&
                                                Obj.address2 == null &&
                                                Obj.city == null &&
                                                Obj.state == null &&
                                                Obj.zipcode == null
                                              ) {
                                                return (
                                                  <button
                                                    className={
                                                      this.state
                                                        .selectedStartAddressId !==
                                                        Obj.id
                                                        ? "dropdown-item itemPadding"
                                                        : "dropdown-item active-language"
                                                    }
                                                    value={Obj.id}
                                                    key={Obj.id}
                                                    type="button"
                                                    onClick={() =>
                                                      this.selectedStartAddress(
                                                        Obj
                                                      )
                                                    }
                                                  >
                                                    {Obj.address +
                                                      " " +
                                                      Obj.address2 +
                                                      " " +
                                                      Obj.city +
                                                      " " +
                                                      Obj.state +
                                                      " " +
                                                      Obj.zipcode}
                                                  </button>
                                                );
                                              } else if (
                                                Obj.address == null &&
                                                Obj.address2 == null &&
                                                Obj.city == null &&
                                                Obj.state == null &&
                                                Obj.zipcode == null
                                              ) {
                                                return (
                                                  <button
                                                    value={Obj.id}
                                                    className={
                                                      this.state
                                                        .selectedStartAddressId !==
                                                        Obj.id
                                                        ? "dropdown-item itemPadding"
                                                        : "dropdown-item active-language"
                                                    }
                                                    key={Obj.id}
                                                    type="button"
                                                    onClick={() =>
                                                      this.selectedStartAddress(
                                                        Obj
                                                      )
                                                    }
                                                  >
                                                    {Obj.address +
                                                      " " +
                                                      Obj.address2 +
                                                      " " +
                                                      Obj.city +
                                                      " " +
                                                      Obj.state +
                                                      " " +
                                                      Obj.zipcode}
                                                  </button>
                                                );
                                              } else if (
                                                Obj.address == null &&
                                                Obj.address2 == null &&
                                                Obj.city == null &&
                                                Obj.state == null &&
                                                Obj.zipcode == null
                                              ) {
                                                return (
                                                  <button
                                                    value={Obj.id}
                                                    className={
                                                      this.state
                                                        .selectedStartAddressId !==
                                                        Obj.id
                                                        ? "dropdown-item itemPadding"
                                                        : "dropdown-item active-language"
                                                    }
                                                    key={Obj.id}
                                                    type="button"
                                                    onClick={() =>
                                                      this.selectedStartAddress(
                                                        Obj
                                                      )
                                                    }
                                                  >
                                                    {Obj.address +
                                                      " " +
                                                      Obj.address2 +
                                                      " " +
                                                      Obj.city +
                                                      " " +
                                                      Obj.state +
                                                      " " +
                                                      Obj.zipcode}
                                                  </button>
                                                );
                                              } else {
                                                return (
                                                  <button
                                                    value={Obj.id}
                                                    className={
                                                      this.state
                                                        .selectedStartAddressId !==
                                                        Obj.id
                                                        ? "dropdown-item itemPadding"
                                                        : "dropdown-item active-language"
                                                    }
                                                    key={Obj.id}
                                                    type="button"
                                                    onClick={() =>
                                                      this.selectedStartAddress(
                                                        Obj
                                                      )
                                                    }
                                                  >
                                                    {Obj.address +
                                                      " " +
                                                      Obj.address2 +
                                                      " " +
                                                      Obj.city +
                                                      " " +
                                                      Obj.state +
                                                      " " +
                                                      Obj.zipcode}
                                                  </button>
                                                );
                                              }
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {this.state.addressLayout.map(
                                (addItem, index) => {
                                  return (
                                    <div className="form-group ">
                                      <label htmlFor="email">
                                        {this.props.t(addItem.label)}
                                      </label>
                                      {addItem.startName === "startState" ? (
                                        <div className="select-icon">
                                          <div className="set-language set-Country">
                                            <div className="set-language-dropdown set-Country-dropdown">
                                              <div className="dropdown">
                                                <button
                                                  className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                                  type="button"
                                                  disabled={
                                                    this.state
                                                      .viewReimbursementData
                                                      ? true
                                                      : false
                                                  }
                                                  data-toggle="dropdown"
                                                >
                                                  {this.state
                                                    .newReimbursementMultipleRecord
                                                    .startState === ""
                                                    ? t("Select")
                                                    : Object.entries(
                                                      this.state.statesDist
                                                    ).map(([key, value]) => (
                                                      <span>
                                                        {" "}
                                                        {this.state
                                                          .newReimbursementMultipleRecord
                                                          .startState === key
                                                          ? value
                                                          : ""}{" "}
                                                      </span>
                                                    ))}
                                                </button>
                                                <div className="dropdown-menu dropdown-menuBottom">
                                                  {Object.entries(
                                                    this.state.statesDist
                                                  ).map(([key, value]) => {
                                                    return (
                                                      <button
                                                        className={
                                                          this.state
                                                            .newReimbursementMultipleRecord
                                                            .startState !== key
                                                            ? "dropdown-item itemPadding"
                                                            : "dropdown-item active-language"
                                                        }
                                                        key={key}
                                                        value={value}
                                                        type="button"
                                                        onClick={(e) =>
                                                          this.handleInputAddressStartstate(
                                                            e,
                                                            key,
                                                            value
                                                          )
                                                        }
                                                        onBlur={(e) =>
                                                          this.manualAddress(e)
                                                        }
                                                      >
                                                        {" "}
                                                        {this.state
                                                          .newReimbursementMultipleRecord
                                                          .startState === key
                                                          ? value
                                                          : value}
                                                      </button>
                                                    );
                                                  })}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={this.props.t(
                                            addItem.placeholder
                                          )}
                                          name={addItem.startName}
                                          onChange={(e) =>
                                            this.handleInputAddress(e)
                                          }
                                          onBlur={this.manualAddress}
                                          disabled={
                                            this.state.viewReimbursementData
                                              ? true
                                              : false
                                          }
                                          value={
                                            addItem.startName ===
                                              "startAddress1"
                                              ? this.state
                                                .newReimbursementMultipleRecord
                                                .startAddress1
                                              : addItem.startName ===
                                                "startAddress2"
                                                ? this.state
                                                  .newReimbursementMultipleRecord
                                                  .startAddress2
                                                : addItem.startName ===
                                                  "startCity"
                                                  ? this.state
                                                    .newReimbursementMultipleRecord
                                                    .startCity
                                                  : addItem.startName ===
                                                    "startZipCode"
                                                    ? this.state
                                                      .newReimbursementMultipleRecord
                                                      .startZipCode
                                                    : ""
                                          }
                                        />
                                      )}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                            <div className="end-address">
                              <h4>{t("End address")}</h4>
                              <div className="form-group">
                              <label htmlFor="sel1">{t("Previously used or saved address")}</label>
                                <div className="select-icon">
                                  <div className="set-language set-Country">
                                    <div className="set-language-dropdown set-Country-dropdown">
                                      <div className="dropdown">
                                        <button
                                          className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                          type="button"
                                          data-toggle="dropdown"
                                          disabled={
                                            this.state.viewReimbursementData
                                              ? true
                                              : false
                                          }
                                        >
                                          {this.state.selectedEndAddressId !==
                                            ""
                                            ? this.state.myTravelNewReimburesementsAdd.map(
                                              (Obj) => {
                                                if (
                                                  Obj.id ===
                                                  this.state
                                                    .selectedEndAddressId
                                                )
                                                  return (
                                                    <span>
                                                      {Obj.address}{" "}
                                                      {Obj.address2} {Obj.key}{" "}
                                                      {Obj.zipcode} {Obj.city} {Obj.state}
                                                    </span>
                                                  );
                                              }
                                            )
                                            : t("Select a saved location")}
                                        </button>

                                        <div className="dropdown-menu dropdown-menuHeight" style={{ maxHeight: "260px" }}>
                                          <button
                                            className={
                                              this.state.selectedEndAddressId !== " "
                                                ? "dropdown-item"
                                                : "dropdown-item active-language"
                                            }
                                            type="button"
                                            onClick={() =>this.setState(
                                            {selectedStartAddressId: "",selectedStartAddressIdName: t("Select a saved location" ), },() => {})}>
                                            {t("Select a saved location")}
                                          </button>
                                          {this.state.myTravelNewReimburesementsAdd.map(
                                            (Obj) => {
                                              if (
                                                Obj.address == null &&
                                                Obj.address2 == null &&
                                                Obj.city == null &&
                                                Obj.state == null &&
                                                Obj.zipcode == null
                                              ) {
                                                return (
                                                  <button
                                                    className={
                                                      this.state
                                                        .selectedEndAddressId !==
                                                        Obj.id
                                                        ? "dropdown-item itemPadding"
                                                        : "dropdown-item active-language"
                                                    }
                                                    key={Obj.address}
                                                    type="button"
                                                    value={Obj.name}
                                                    onClick={() =>
                                                      this.selectedEndAddress(
                                                        Obj
                                                      )
                                                    }
                                                  >
                                                    {Obj.address} {Obj.address2}{" "}
                                                    {Obj.key} {Obj.zipcode}
                                                  </button>
                                                );
                                              } if (
                                                Obj.address == null &&
                                                Obj.address2 == null &&
                                                Obj.city == null &&
                                                Obj.state == null &&
                                                Obj.zipcode == null
                                              ) {
                                                return (
                                                  <button
                                                    className={
                                                      this.state
                                                        .selectedEndAddressId !==
                                                        Obj.id
                                                        ? "dropdown-item itemPadding"
                                                        : "dropdown-item active-language"
                                                    }
                                                    key={Obj.id}
                                                  >
                                                    {Obj.address +
                                                      " " +
                                                      Obj.address2 +
                                                      " " +
                                                      Obj.state +
                                                      " " +
                                                      Obj.zipcode}
                                                  </button>
                                                );
                                              } else if (
                                                Obj.address == null &&
                                                Obj.address2 == null &&
                                                Obj.city == null &&
                                                Obj.state == null &&
                                                Obj.zipcode == null
                                              ) {
                                                return (
                                                  <button
                                                    className={
                                                      this.state
                                                        .selectedEndAddressId !==
                                                        Obj.id
                                                        ? "dropdown-item itemPadding"
                                                        : "dropdown-item active-language"
                                                    }
                                                    key={Obj.id}
                                                    type="button"
                                                    onClick={() =>
                                                      this.selectedEndAddress(
                                                        Obj
                                                      )
                                                    }
                                                    value={Obj.id}
                                                  >
                                                    {Obj.address +
                                                      " " +
                                                      Obj.address2 +
                                                      " " +
                                                      Obj.state +
                                                      " " +
                                                      Obj.zipcode}
                                                  </button>
                                                );
                                              } else if (
                                                Obj.address == null &&
                                                Obj.address2 == null &&
                                                Obj.city == null &&
                                                Obj.state == null &&
                                                Obj.zipcode == null
                                              ) {
                                                return (
                                                  <button
                                                    className={
                                                      this.state
                                                        .selectedEndAddressId !==
                                                        Obj.id
                                                        ? "dropdown-item itemPadding"
                                                        : "dropdown-item active-language"
                                                    }
                                                    key={Obj.id}
                                                    type="button"
                                                    value={Obj.id}
                                                    onClick={() =>
                                                      this.selectedEndAddress(
                                                        Obj
                                                      )
                                                    }
                                                  >
                                                    {Obj.address +
                                                      " " +
                                                      Obj.address2 +
                                                      " " +
                                                      Obj.state +
                                                      " " +
                                                      Obj.zipcode}
                                                  </button>
                                                );
                                              } else if (
                                                Obj.address == null &&
                                                Obj.address2 == null &&
                                                Obj.city == null &&
                                                Obj.state == null &&
                                                Obj.zipcode == null
                                              ) {
                                                return (
                                                  <button
                                                    className={
                                                      this.state
                                                        .selectedEndAddressId !==
                                                        Obj.id
                                                        ? "dropdown-item itemPadding"
                                                        : "dropdown-item active-language"
                                                    }
                                                    key={Obj.id}
                                                    type="button"
                                                    onClick={() =>
                                                      this.selectedEndAddress(
                                                        Obj
                                                      )
                                                    }
                                                    value={Obj.id}
                                                  >
                                                    {Obj.address +
                                                      " " +
                                                      Obj.address2 +
                                                      " " +
                                                      Obj.state +
                                                      " " +
                                                      Obj.zipcode}
                                                  </button>
                                                );
                                              } else {
                                                return (
                                                  <button
                                                    className={
                                                      this.state
                                                        .selectedEndAddressId !==
                                                        Obj.id
                                                        ? "dropdown-item itemPadding"
                                                        : "dropdown-item active-language"
                                                    }
                                                    key={Obj.id}
                                                    type="button"
                                                    onClick={() =>
                                                      this.selectedEndAddress(
                                                        Obj
                                                      )
                                                    }
                                                    value={Obj.id}
                                                  >
                                                    {Obj.address +
                                                      " " +
                                                      Obj.address2 +
                                                      " " +
                                                      Obj.state +
                                                      " " +
                                                      Obj.zipcode}
                                                  </button>
                                                );
                                              }
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {this.state.addressLayout.map(
                                (addItem, index) => {
                                  return (
                                    <div className="form-group ">
                                      <label htmlFor="email">
                                        {this.props.t(addItem.label)}
                                      </label>
                                      {addItem.label === "State" ? (
                                        <div className="select-icon">
                                          <div className="set-language set-Country">
                                            <div className="set-language-dropdown set-Country-dropdown">
                                              <div className="dropdown">
                                                <button
                                                  className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                                  type="button"
                                                  disabled={
                                                    this.state
                                                      .viewReimbursementData
                                                      ? true
                                                      : false
                                                  }
                                                  data-toggle="dropdown"
                                                >
                                                  {this.state
                                                    .newReimbursementMultipleRecord
                                                    .endState === ""
                                                    ? t("Select")
                                                    : Object.entries(
                                                      this.state.statesDist
                                                    ).map(([key, value]) => (
                                                      <span>
                                                        {" "}
                                                        {this.state
                                                          .newReimbursementMultipleRecord
                                                          .endState === key
                                                          ? value
                                                          : ""}{" "}
                                                      </span>
                                                    ))}
                                                </button>
                                                <div className="dropdown-menu dropdown-menuBottom">
                                                  {Object.entries(
                                                    this.state.statesDist
                                                  ).map(([key, value]) => {
                                                    return (
                                                      <button
                                                        className={
                                                          this.state
                                                            .newReimbursementMultipleRecord
                                                            .endState !== key
                                                            ? "dropdown-item itemPadding"
                                                            : "dropdown-item active-language"
                                                        }
                                                        key={key}
                                                        value={value}
                                                        type="button"
                                                        onClick={(e) =>
                                                          this.handleInputAddressendstate(
                                                            e,
                                                            key,
                                                            value
                                                          )
                                                        }
                                                        onBlur={(e) =>
                                                          this.manualAddress(e)
                                                        }
                                                      >
                                                        {" "}
                                                        {this.state
                                                          .newReimbursementMultipleRecord
                                                          .endState === key
                                                          ? value
                                                          : value}
                                                      </button>
                                                    );
                                                  })}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={this.props.t(
                                            addItem.placeholder
                                          )}
                                          name={addItem.endName}
                                          onChange={(e) =>
                                            this.handleInputAddress(e)
                                          }
                                          onBlur={this.manualAddress}
                                          disabled={
                                            this.state.viewReimbursementData
                                              ? true
                                              : false
                                          }
                                          value={
                                            addItem.endName === "endAddress1"
                                              ? this.state
                                                .newReimbursementMultipleRecord
                                                .endAddress1
                                              : addItem.endName ===
                                                "endAddress2"
                                                ? this.state
                                                  .newReimbursementMultipleRecord
                                                  .endAddress2
                                                : addItem.endName === "endCity"
                                                  ? this.state
                                                    .newReimbursementMultipleRecord
                                                    .endCity
                                                  : addItem.endName === "endZipCode"
                                                    ? this.state
                                                      .newReimbursementMultipleRecord
                                                      .endZipCode
                                                    : ""
                                          }
                                        />
                                      )}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="btn-wrap">
                      {this.state.viewReimbursementData ? (
                        ""
                      ) : !this.state.itemTypeUpdateButton ? (
                        <button
                          className="submit-btn"
                          type="submit"
                          onClick={(e) => this.newReimbursementsSubmit(e)}
                        >
                          {t("Submit")}
                        </button>
                      ) : (
                        <button
                          className="submit-btn"
                          type="submit"
                          onClick={(e) =>
                            this.newReimbursementsUpdate(
                              e,
                              this.state.newReimbursementMultipleRecord.type_id
                            )
                          }
                        >
                          {t("Update")}
                        </button>
                      )}
                      <button
                        className="cancel-btn"
                        onClick={() => this.itemTypeFormClose()}
                      >
                        {t("Cancel")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          </Modal>

          <Modal
            isOpen={this.state.addNewReimbursementFormConfirmation}
            onRequestClose={() =>
              this.addNewReimbursementFormConfirmationClose()
            }
            ariaHideApp={false}
            style={RequestHasBeenSubmitedCustomStyles}
          >
            <>
              <div className="green_mark">
                <img
                  src="/media/misc/Green_Tick_Mark_icon.png"
                  alt="Unable to load"
                  width="20%"
                />

                <p>
                  {t("New reimbursement request has been submitted")}
                  <br />
                  {t("Do you want to submit another reimbursement")} ?
                </p>

                <button
                  className="btn btn-primary yes-btn"
                  style={{ marginLeft: "0px" }}
                  onClick={() => this.newReimbursementFormOpen("Add")}
                >
                  {t("Yes")}
                </button>
                <button
                  className="btn btn-danger no-btn"
                  style={{ marginLeft: "10px" }}
                  onClick={() =>
                    this.addNewReimbursementFormConfirmationClose()
                  }
                >
                  {t("No")}
                </button>
              </div>
            </>
          </Modal>

          {/*Receipts List Modal */}
          <Modal
            isOpen={this.state.ModalCounter}
            onRequestClose={() => {
              this.reimbursementsReceiptsCloseList();
            }}
            ariaHideApp={false}
            style={ViewReceiptsModalCustomStyles}
          >
            <div className="modal-wrap">
              <div className="modal-header">
                <h4>{t("View receipts")}</h4>
                <img
                  title={t("Close")}
                  onClick={() => {
                    this.reimbursementsReceiptsCloseList();
                  }}
                  src="/media/misc/close.svg"
                  alt="unable to load"
                />
              </div>
              <div className="modal-content view-receipt-content">
                <div className="view-files-wrap">
                  {this.state.receiptsList.map((Obj) => {
                    var name = Obj.name;
                    var ext = name.substr(name.lastIndexOf(".") + 1);
                    if (ext !== "") {
                      return (
                        <div className="file-row">
                          <div className="file-name">
                            <div className="file-format">
                              {ext === "png" ||
                                ext === "jpg" ||
                                ext === "jpeg" ||
                                ext === "gif" ||
                                ext === "jfif" ? (
                                <img
                                  src="/media/misc/image-file.svg"
                                  alt="unable to load"
                                />
                              ) : ext === "pptx" || ext === "ppt" ? (
                                <img
                                  src="/media/images/powerpoint-ppt.svg"
                                  alt="unable to load"
                                />
                              ) : ext === "txt" ||
                                ext === "doc" ||
                                ext === "docx" ? (
                                <img
                                  src="/media/misc/word-doc.svg"
                                  alt="unable to load"
                                />
                              ) : ext === "xlsx" ||
                                ext === "xls" ||
                                ext === "csv" ? (
                                <img
                                  src="/media/misc/excel.svg"
                                  alt="unable to load"
                                />
                              ) : ext === "pdf" ? (
                                <img
                                  src="/media/misc/pdf-file.svg"
                                  alt="unable to load"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                            <p>{Obj.name}</p>
                          </div>
                          <div className="action-btn-wrap">
                            <button
                              type="button"
                              className="btn m-0 p-0"
                              title={t("View")}
                            >
                              <img
                                onClick={(e) => {
                                  this.receiptsView(e, ext, Obj.hash, Obj.name);
                                }}
                                src="/media/images/view.svg"
                                alt="unable to load"
                              />
                            </button>
                            <button
                              type="button"
                              className="btn m-0 p-0"
                              title={t("Download")}
                            >
                              <img
                                onClick={() => {
                                  this.receiptsDownload(ext, Obj.hash);
                                }}
                                src="/media/misc/download.svg"
                                alt="unable to load"
                              />
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </Modal>

          {/*Receipts Show Modal*/}
          <Modal
            isOpen={this.state.isView}
            onRequestClose={() => {
              this.receiptsClose();
            }}
            ariaHideApp={false}
            style={
              this.state.receiptsType === "png" ||
                this.state.receiptsType === "jpg" ||
                this.state.receiptsType === "jpeg" ||
                this.state.receiptsType === "gif" ||
                this.state.receiptsType === "jfif"
                ? ViewReceiptsModalCustomStyles
                : coustamStyleDocumnetFilesOpen
            }
          >
            <div className="modal-wrap">
              {this.state.receiptsType === "png" ||
                this.state.receiptsType === "jpg" ||
                this.state.receiptsType === "jpeg" ||
                this.state.receiptsType === "gif" ||
                this.state.receiptsType === "jfif" ? (
                ""
              ) : (
                <>
                  <div className="modal-header">
                    <h4>{this.state.receiptsName}</h4>
                    <img
                      title={t("Close")}
                      onClick={() => {
                        this.receiptsClose();
                      }}
                      src="/media/misc/close.svg"
                      alt="unable to load"
                    />
                  </div>
                </>
              )}
              {this.state.receiptsType === "png" ||
                this.state.receiptsType === "jpg" ||
                this.state.receiptsType === "jpeg" ||
                this.state.receiptsType === "gif" ||
                this.state.receiptsType === "jfif" ? (
                <Lightbox
                  mainSrc={this.state.showReceipts}
                  enableZoom={false}
                  onCloseRequest={() => {
                    this.receiptsClose();
                  }}
                />
              ) : this.state.receiptsType === "pptx" ||
                this.state.receiptsType === "ppt" ||
                this.state.receiptsType === "doc" ||
                this.state.receiptsType === "docx" ||
                this.state.receiptsType === "xlsx" ||
                this.state.receiptsType === "xls" ? (
                <iframe
                  src={`https://view.officeapps.live.com/op/embed.aspx?src=${this.state.showReceipts}`}
                  width="100%"
                  height="600px"
                  frameBorder="0"
                ></iframe>
              ) : this.state.receiptsType === "txt" ||
                this.state.receiptsType === "csv" ||
                this.state.receiptsType === "pdf" ? (
                <embed
                  type="application/pdf"
                  src={`${this.state.showReceipts}`}
                  width="100%"
                  height="600px"
                  frameBorder="0"
                />
              ) : (
                ""
              )}
            </div>
          </Modal>

          {/* Warning Popup Show */}
          <Modal
            isOpen={this.state.Warning}
            onRequestClose={() => {
              this.warningMessageClose();
            }}
            ariaHideApp={false}
            style={Note}
          >
            <>
              <div className="modal-wrap">
                <div className="modal-header">
                  <h4>{t("Note")}</h4>
                  <img
                    title={t("Close")}
                    onClick={() => {
                      this.warningMessageClose();
                    }}
                    src="/media/misc/close.svg"
                    alt="unable to load"
                  />
                </div>
                <div className="note" style={{ paddingBottom: "20px" }}>
                  <img
                    src="/media/misc/newRequestNote1.png"
                    width="40"
                    height="40"
                    alt=""
                    className="error-icon"
                  />
                  <label className="sign-out-text">
                    {" "}
                    {this.state.newWarningMessage}
                  </label>
                  <button
                    className="btn btn-primary no-btn filter-btn"
                    onClick={() => {
                      this.warningMessageClose();
                    }}
                  >
                    {t("Ok")}
                  </button>
                </div>
              </div>
            </>
          </Modal>
          <ToastContainer />
        </div>
      </Suspense>
    );
  }
}

const RenderRow = (props) => {
  const history = useHistory();
  const { t } = useTranslation(["Common"]);
  const dashboardPayment = (
    studyId,
    siteId,
    conditionsReimbursements,
    conditionsStipends,
    conditionsTaravales,
    conditionsId,
    status
  ) => {
    localStorage.setItem("SiteId", siteId);
    localStorage.setItem("StudiesId", studyId);
    localStorage.setItem("ConditionsReimbursements", conditionsReimbursements);
    localStorage.setItem("ConditionsStipends", conditionsStipends);
    localStorage.setItem("ConditionsTaravales", conditionsTaravales);
    localStorage.setItem("ConditionsId", conditionsId);
    localStorage.setItem("Status", status);
    history.push("/dashboard");
  };
  return props.keys.map((key, index) => {
    if (
      (props.tableName === t("Payment Summary") && index + 1 === 5) ||
      (props.tableName === t("Stipend") && index + 1 === 4)
    ) {
      return (
        <td
          onClick={
            props.tableName === t("Payment Summary")
              ? () => {
                props.onClickData(props.data);
              }
              : ""
          }
        >
          {props.data.Status === "2.0" ? (
            <button className="status-paid" disabled>
              {" "}
              {t("Approved")}
            </button>
          ) : props.data.Status === "1.0" ? (
            <button className="status-unpaid" disabled>
              {t("Pending")}
            </button>
          ) : props.data.Status === "1.1" ? (
            <button className="status-review" disabled>
              {t("Reviewed")}
            </button>
          ) : props.data.Status === "0.0" ? (
            <button className="status-draft" disabled>
              {t("Draft")}
            </button>
          ) : props.data.Status === "4.0" ? (
            <button className="status-cancelled" disabled>
              {t("Cancelled")}
            </button>
          ) : props.data.Status === "3.0" ? (
            <button className="status-denied" disabled>
              {t("Denied")}
            </button>
          ) : props.data.Status === "5.0" ? (
            <button className="status-recalled" disabled>
              {t("Recalled")}
            </button>
          ) : (
            "-"
          )}
        </td>
      );
    } else if (
      (props.tableName === t("Payment Summary") && index + 1 === 2) ||
      (props.tableName === t("Stipend") && index + 1 === 2)
    ) {
      return (
        <td
          onClick={
            props.tableName === t("Payment Summary")
              ? () => {
                props.onClickData(props.data);
              }
              : ""
          }
        >
          {props.tableName === t("Payment Summary")
            ? Number(props.data.Reimbursementamount).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
            : props.tableName === t("Stipend")
              ? Number(props.data.Stipendamount).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
              : ""}
        </td>
      );
    } else if (props.tableName === t("Payment Summary") && index + 1 === 4) {
      return (
        <td onClick={() => props.onClickData(props.data)}>
          {moment
            .utc(props.data.Submitdate)
            .local()
            .format("DD-MMM-YYYY HH:mm")}
        </td>
      );
    } else if (
      (props.tableName === t("Stipend") && index + 1 === 3) ||
      (props.tableName === t("My travel") && index + 1 === 3)
    ) {
      return (
        <td>
          {props.tableName === t("Stipend")
            ? moment(props.data.Completeddate).format("DD-MMM-YYYY")
            : props.tableName === t("My travel")
              ? moment(props.data.Traveldate).format("DD-MMM-YYYY")
              : ""}
        </td>
      );
    } else if (props.tableName === t("My travel") && index + 1 === 2) {
      return props.data.Visitdatetime.substr(11, 8) === "00:00:00" ? (
        <td>{moment(props.data.Visitdatetime).format("DD-MMM-YYYY")}</td>
      ) : (
        <td>{moment(props.data.Visitdatetime).format("DD-MMM-YYYY HH:mm")}</td>
      );
    } else if (props.tableName === t("My travel") && index + 1 === 5) {
      return (
        <td>
          {props.data.Status === "1" && props.data.Patient_Save  && localStorage.getItem("Status") !== "" ? (
            <button className="status-unpaid" disabled>
              {t("Pending")}
            </button>
          ) : props.data.Status === "2" ? (
            <button className="status-paid" disabled>
              {t("Approved")}
            </button>
          ) : props.data.Status === "3" ? (
            <button className="status-denied" disabled>
              {t("Denied")}
            </button>
          ) : props.data.Status === "4" ? (
            <button className="status-cancelled" disabled>
              {t("Cancelled")}
            </button>
          ) : props.data.Status === "5" ? (
            <button className="status-paid" disabled>
              {t("Booked")}
            </button>
          ) :
          props.data.Status === "6" ? (
            <button className="status-cancelled" disabled>
              {t("Received")}
            </button>
          ) : (
            "-"
          )}
        </td>
      );
    } else if (
      props.tableName === t("My Studies") ||
      props.tableName === t("Payment Summary")
    ) {
      return props.data[key.Name] !== undefined ||
        props.data[key.Name] !== null ? (
        <td
          key={props.data[key.Name]}
          onClick={
            props.tableName === t("My Studies")
              ? () =>
                dashboardPayment(
                  props.data.StudyId,
                  props.data.SiteId,
                  props.data.ConditionsReimbursements,
                  props.data.ConditionsStipends,
                  props.data.ConditionsTaravales,
                  props.data.ConditionsId,
                  props.data.Status
                )
              : props.tableName === t("Payment Summary")
                ? () => props.onClickData(props.data)
                : ""
          }
        >
          {String(props.data[key.Name])}
        </td>
      ) : (
        <td
          onClick={
            props.tableName === t("My Studies")
              ? ""
              : props.tableName === t("Payment Summary")
                ? () => props.onClickData(props.data)
                : ""
          }
        >
          -
        </td>
      );
    } else {
      return props.data[key.Name] != undefined ||
        props.data[key.Name] != null ? (
        <td key={props.data[key.Name]}>{String(props.data[key.Name])}</td>
      ) : (
        <td>-</td>
      );
    }
  });
};
export default withTranslation()(withRouter(CommonGrid));
