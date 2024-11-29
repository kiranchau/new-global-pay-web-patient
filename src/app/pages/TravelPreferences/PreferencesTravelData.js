import React, { Component } from 'react'
import { Row, Tab, Col, Nav, } from 'react-bootstrap';
import { allCountriesStatestimezones, flightTimePreferencesURL, myProfile, seatingPreferencesURL, travelPreferencePost, travelPreferencesGet } from '../../modules/Auth/_redux/authCrud';
import { Footer } from '../Layout/Footer';
import { Header } from '../Layout/Header';
import { SideNav } from '../Layout/SideNav';
import { withTranslation } from 'react-i18next';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gtsData from './gtsData';



class PreferencesTravelData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TravelPreferences: [],
      allCountries: [],
      selecteStateCaregiverEmergencyContact: [],
      // selecteStateCarPicUP: [],
      // selecteStateCarDropOff: [],
      StateCaregiverEmergencyContact: [],
      // StateCarPicUP: [],
      // StateCarDropOff: [],
      TravelPreferencesId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      emailAddress: "",
      mobileNumber: "",
      homePhoneNumber: "",
      sameAddressAsPatient: "",
      country: "00",
      countryName: "",
      countryState_enabled: 0,
      countryZipCode_enabled: 0,
      countryStateCodeValid: null,
      address1: "",
      address2: "",
      city: "",
      Loader: false,
      state: "",
      postalCode: "",
      // countryPicUpLocation: "",
      // countryPicUpState_enabled: 0,
      // countryPicUpZipCode_enabled: 0,
      // countryPicUpStateCodeValid: null,
      // carPicUpAddress: "",
      // carPicUpAddress2: "",
      // carPicUpCity: "",
      // carPicUpState: "",
      // carPicUpPostalCode: "",
      // carPicUpSpecialAccommodations: "",
      // carDropOffLocation: "",
      // countryDropOffState_enabled: 0,
      // countryDropOffZipCode_enabled: 0,
      // countryDropOffStateCodeValid: null,
      // carDropOffCompanyAddress1: "",
      // carDropOffCompanyAddress2: "",
      // carDropOffCity: "",
      // carDropOffState: "",
      // carDropOffPostalCode: "",
      // carDropOffSpecialAccommodations: "",
      maxGroundTravel: "",
      gTSFirstChoice: "",
      gTSSecondChoice: "",
      gTSThirdChoice: "",
      groundTravelSpecialAccommodations: "",
      firstChoice: "",
      firstChoiceName: "",
      secondChoice: "",
      secondChoiceName: "",
      thirdChoice: "",
      thirdChoiceName: "",
      flightTimePreferencesFirstChoice: [],
      flightTimePreferencesSecondChoice: [],
      flightTimePreferencesThirdChoice: [],
      seatingPreferences: "0",
      seatingPreferencesName: "",
      seatingPreferencesChoice: [],
      airlinePreferences: "",
      airportPreferences: "",
      frequentFlye: "",
      transportationAirport: "",
      transportationAirportName: "",
      airLineSpecialAccommodations: "",
      hotelChainPreference: "",
      roomPreferences: "",
      hotelSpecialAccommodations: "",
      postData: [],
      profileData: [],
      profileDataCountry: "",
      profileDataCountryName: "",
      profileDataState_enabled: 0,
      profileDataZipCode_enabled: 0,
      profileDataStateCodeValid: null,
      profileDataAddress1: "",
      profileDataAddress2: "",
      profileDataCity: "",
      profileDataState: "",
      profileDataPostalCode: "",
      maxCarPicUpLocation: null,
      maxCarDropOffLocation: null,
      maxAirLine: null,
      maxHotel: null,
      counter: 250,
      sideMenu: false,
      travelPreferences: false,
      hotelReservationForm: false,
      airLineReservationForm: false,
      carServicesForm: false,
      careGiverEmergencyContactForm: false,
      groundTravelForm: false,
      formData: 0,
      emailError: "",
      email: ""
    };
    this.toastId = React.createRef(null);
  }

  validateEmail = (e) => {
    this.setState({ emailError: "" }, () => { })
    this.setState({ emailAddress: e.target.value })
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,2})+$/ //eslint-disable-line

    if (e.target.value) {
      if (!regEmail.test(this.state.emailAddress)) {
        this.setState({ emailError: this.props.t("Please enter a valid email address.") }, () => { })
      } else {
        this.setState({ emailError: "" }, () => { })
        this.setState({ emailAddress: e.target.value })
      }
    } else {
      this.setState({ emailError: "" }, () => { })
    }

  }

  componentDidMount() {
    this.setState({ Loader: true }, () => { })
    this.accessOfConditions();
    this.myProfileData();
  }

  accessOfConditions = () => {
    if (
      localStorage.getItem("ConditionsReimbursements") === "1" &&
      localStorage.getItem("ConditionsStipends") === "1" &&
      localStorage.getItem('ConditionsTaravales') === "0"
    ) {
      this.setState({ sideMenu: true, travelPreferences: false }, () => { })
    } else if (
      localStorage.getItem("ConditionsReimbursements") !== "1" &&
      localStorage.getItem("ConditionsStipends") !== "1" &&
      localStorage.getItem('ConditionsTaravales') !== "0"
    ) {
      this.setState({ sideMenu: false, travelPreferences: true }, () => { })
      this.props.history.push("/dashboard");
    } else if (
      localStorage.getItem("ConditionsReimbursements") === "1" &&
      localStorage.getItem("ConditionsStipends") !== "1" &&
      localStorage.getItem('ConditionsTaravales') !== "0"
    ) {
      this.setState({ sideMenu: true, travelPreferences: true }, () => { })
      this.props.history.push("/dashboard");
    } else if (
      localStorage.getItem("ConditionsReimbursements") !== "1" &&
      localStorage.getItem("ConditionsStipends") === "1" &&
      localStorage.getItem('ConditionsTaravales') !== "0"
    ) {
      this.setState({ sideMenu: true, travelPreferences: true }, () => { })
      this.props.history.push("/dashboard");
    } else if (
      localStorage.getItem("ConditionsReimbursements") !== "1" &&
      localStorage.getItem("ConditionsStipends") !== "1" &&
      localStorage.getItem('ConditionsTaravales') === "0"
    ) {
      this.setState({ sideMenu: false, travelPreferences: false }, () => { })
    } else if (
      localStorage.getItem("ConditionsReimbursements") === "1" &&
      localStorage.getItem("ConditionsStipends") === "1" &&
      localStorage.getItem('ConditionsTaravales') !== "0"
    ) {
      this.setState({ sideMenu: true, travelPreferences: true }, () => { })
      this.props.history.push("/dashboard");
    } else if (
      localStorage.getItem("ConditionsReimbursements") === "1" &&
      localStorage.getItem("ConditionsStipends") !== "1" &&
      localStorage.getItem('ConditionsTaravales') === "0"
    ) {
      this.setState({ sideMenu: true, travelPreferences: false }, () => { })
    } else if (
      localStorage.getItem("ConditionsReimbursements") !== "1" &&
      localStorage.getItem("ConditionsStipends") === "1" &&
      localStorage.getItem('ConditionsTaravales') === "0"
    ) {
      this.setState({ sideMenu: true, travelPreferences: false }, () => { })
    }
  }

  //Travel Preference all form Data get in the api data and bind.
  myProfileData = () => {
    myProfile(localStorage.getItem('id'))
      .then((value) => {
        if (!value.data.record) {
          this.setState({
            profileDataCountry: "",
            profileDataAddress1: "",
            profileDataAddress2: "",
            profileDataCity: "",
            profileDataState: "",
            profileDataPostalCode: "",
          }, () => {
          })
        } else {
          this.setState({
            profileDataCountry: value.data.record.country,
            profileDataAddress1: value.data.record.address,
            profileDataAddress2: value.data.record.address2,
            profileDataCity: value.data.record.city,
            profileDataState: value.data.record.state,
            profileDataPostalCode: value.data.record.zipcode,
          }, () => {
          })
        }

      }).catch((err) => {
        this.setState({ Loader: false })
      }).finally(() => {
        travelPreferencesGet(localStorage.getItem('id'))
          .then((value => {
            if (!value.data.record) {
              this.setState({
                TravelPreferences: [],
                TravelPreferencesId: "",
                firstName: "",
                middleName: "",
                lastName: "",
                emailAddress: "",
                mobileNumber: "",
                homePhoneNumber: "",
                sameAddressAsPatient: "",
                country: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                postalCode: "",
                // countryPicUpLocation: "",
                // carPicUpAddress: "",
                // carPicUpAddress2: "",
                // carPicUpCity: "",
                // carPicUpState: "",
                // carPicUpPostalCode: "",
                // carPicUpSpecialAccommodations: "",
                // carDropOffLocation: "",
                // carDropOffCompanyAddress1: "",
                // carDropOffCompanyAddress2: "",
                // carDropOffCity: "",
                // carDropOffState: "",
                // carDropOffPostalCode: "",
                // carDropOffSpecialAccommodations: "",
                gTSFirstChoice: "",
                gTSSecondChoice: "",
                gTSThirdChoice: "",
                groundTravelSpecialAccommodations: "",
                firstChoice: "",
                secondChoice: "",
                thirdChoice: "",
                seatingPreferences: "",
                airlinePreferences: "",
                airportPreferences: "",
                frequentFlye: "",
                transportationAirport: "",
                airLineSpecialAccommodations: "",
                hotelChainPreference: "",
                roomPreferences: "",
                hotelSpecialAccommodations: "",
              }, () => { })
            } else {
              this.setState({
                TravelPreferences: value.data.record,
                TravelPreferencesId: value.data.record.id,
                firstName: value.data.record.firstname,
                middleName: value.data.record.middle,
                lastName: value.data.record.lastname,
                emailAddress: value.data.record.emailaddress,
                mobileNumber: value.data.record.phone_mobile,
                homePhoneNumber: value.data.record.phone_home,
                sameAddressAsPatient: value.data.record.address_same_patient === "1" ? true : false,
                country: value.data.record.country,
                address1: value.data.record.address,
                address2: value.data.record.address2,
                city: value.data.record.city,
                state: value.data.record.state,
                postalCode: value.data.record.zipcode,
                // countryPicUpLocation: value.data.record.car_pickup_country,
                // carPicUpAddress: value.data.record.car_pickup_address,
                // carPicUpAddress2: value.data.record.car_pickup_address2,
                // carPicUpCity: value.data.record.car_pickup_city,
                // carPicUpState: value.data.record.car_pickup_state,
                // carPicUpPostalCode: value.data.record.car_pickup_zipcode,
                // carPicUpSpecialAccommodations: value.data.record.car_pickup_accommodations,
                // carDropOffLocation: value.data.record.car_dropoff_country,
                // carDropOffCompanyAddress1: value.data.record.car_dropoff_address,
                // carDropOffCompanyAddress2: value.data.record.car_dropoff_address2,
                // carDropOffCity: value.data.record.car_dropoff_city,
                // carDropOffState: value.data.record.car_dropoff_state,
                // carDropOffPostalCode: value.data.record.car_dropoff_zipcode,
                // carDropOffSpecialAccommodations: value.data.record.car_dropoff_accommodations,
                gTSFirstChoice: value.data.record.ground_travel_choice1,
                gTSSecondChoice: value.data.record.ground_travel_choice2,
                gTSThirdChoice: value.data.record.ground_travel_choice3,
                groundTravelSpecialAccommodations:
                  value.data.record.ground_travel_accommodations,
                firstChoice: value.data.record.flight_time1,
                secondChoice: value.data.record.flight_time2,
                thirdChoice: value.data.record.flight_time3,
                seatingPreferences: value.data.record.flight_seat,
                airlinePreferences: value.data.record.flight_airline,
                airportPreferences: value.data.record.flight_airport,
                frequentFlye: value.data.record.flight_frequent_flyer,
                transportationAirport: value.data.record.flight_has_trans,
                airLineSpecialAccommodations: value.data.record.flight_accommodations,
                hotelChainPreference: value.data.record.hotel_chain,
                roomPreferences: value.data.record.hotel_room,
                hotelSpecialAccommodations: value.data.record.hotel_accommodations,
              }, () => { })
            }

            // if (this.state.firstName === "0") {
            //   this.setState(
            //     { firstNameName: this.props.t("Enter First Name ") },
            //     () => { }
            //   );
            // }
            // if (this.state.middleName === "0") {
            //   this.setState(
            //     { middleNameName: this.props.t("Enter Middle Name ") },
            //     () => { }
            //   );
            // }
            // if (this.state.lastName === "0") {
            //   this.setState(
            //     { lastNameName: this.props.t("Enter Last Name ") },
            //     () => { }
            //   );
            // }
            // if (this.state.emailAddress === "0") {
            //   this.setState(
            //     { emailAddressName: this.props.t("Enter Email  ") },
            //     () => { }
            //   );
            // }
            // if (this.state.mobileNumber === "0") {
            //   this.setState(
            //     { mobileNumberName: this.props.t("Enter Mobile ") },
            //     () => { }
            //   );
            // }
            // if (this.state.homePhoneNumber === "0") {
            //   this.setState(
            //     { homePhoneNumberName: this.props.t("Enter homePhoneNumber ") },
            //     () => { }
            //   );
            // }

            // if (this.state.address1 === "0") {
            //   this.setState(
            //     { address1Name: this.props.t("Enter address1 ") },
            //     () => { }
            //   );
            // }
            // if (this.state.address2 === "0") {
            //   this.setState(
            //     { address2Name: this.props.t("Enter address2 ") },
            //     () => { }
            //   );
            // }
            // if (this.state.city === "0") {
            //   this.setState(
            //     { cityName: this.props.t("Enter city ") },
            //     () => { }
            //   );
            // }
            // if (this.state.state === "0") {

            //   this.setState(
            //     { stateName: this.props.t("Select state") },
            //     () => { }
            //   );
            // }
            // if (this.state.postalCode === "0") {
            //   this.setState(
            //     { postalCodeName: this.props.t("Enter postalCode ") },
            //     () => { }
            //   );
            // }

            // if (this.state.gTSFirstChoice === "0") {
            //   this.setState(
            //     { gTSFirstChoiceName: this.props.t("No Value Selected") },
            //     () => { }
            //   );
            // }
            // if (this.state.gTSSecondChoice === "0") {
            //   this.setState(
            //     { gTSSecondChoiceName: this.props.t("No Value Selected") },
            //     () => { }
            //   );
            // }
            // if (this.state.gTSThirdChoice === "0") {
            //   this.setState(
            //     { gTSThirdChoiceName: this.props.t("No Value Selected") },
            //     () => { }
            //   );
            // }

            // if (this.state.firstChoice === "0") {
            //   this.setState(
            //     { firstChoiceName: this.props.t("Select time") },
            //     () => { }
            //   );
            // }
            // if (this.state.secondChoice === "0") {
            //   this.setState(
            //     { secondChoiceName: this.props.t("Select time") },
            //     () => { }
            //   );
            // }
            // if (this.state.thirdChoice === "0") {
            //   this.setState(
            //     { thirdChoiceName: this.props.t("Select time") },
            //     () => { }
            //   );
            // }
            // if (this.state.seatingPreferences === "0") {
            //   this.setState(
            //     { seatingPreferencesName: this.props.t("Select seat") },
            //     () => { }
            //   );
            // }
            // if (this.state.transportationAirport === "0") {
            //   this.setState(
            //     {
            //       transportationAirportName: this.props.t(
            //         "Select transportation"
            //       ),
            //     },
            //     () => { }
            //   );
            // }
            if (!this.state.sameAddressAsPatient) {
              if (
                this.state.firstName !== "" &&
                this.state.middleName !== "" &&
                this.state.lastName !== "" &&
                this.state.emailAddress !== "" &&
                this.state.mobileNumber !== "" &&
                this.state.homePhoneNumber !== "" &&
                this.state.country !== "00" &&
                this.state.address1 !== "" &&
                this.state.address2 !== "" &&
                this.state.city !== "" &&
                this.state.state !== "" &&
                this.state.postalCode !== "") {
                this.setState({ careGiverEmergencyContactForm: true }, () => { })
              } else {
                this.setState({ careGiverEmergencyContactForm: false }, () => { })
              }
            } else {
              if (
                this.state.firstName !== "" &&
                this.state.middleName !== "" &&
                this.state.lastName !== "" &&
                this.state.emailAddress !== "" &&
                this.state.mobileNumber !== "" &&
                this.state.homePhoneNumber !== "" &&
                this.state.profileDataCountry !== "" &&
                this.state.profileDataAddress1 !== "" &&
                this.state.profileDataAddress2 !== "" &&
                this.state.profileDataCity !== "" &&
                this.state.profileDataState !== "" &&
                this.state.profileDataPostalCode !== ""
              ) {

                this.setState({ careGiverEmergencyContactForm: true }, () => { })
              } else {
                this.setState({ careGiverEmergencyContactForm: false }, () => { })
              }
            }
            if (
              this.state.gTSFirstChoice !== "0" &&
              this.state.gTSSecondChoice !== "0" &&
              this.state.gTSThirdChoice !== "0" &&
              this.state.groundTravelSpecialAccommodations !== ""
            ) {
              this.setState({ groundTravelForm: true }, () => { });
            } else {
              this.setState({ groundTravelForm: false }, () => { });
            }

            if (
              this.state.firstChoice !== "0" &&
              this.state.secondChoice !== "0" &&
              this.state.thirdChoice !== "0" &&
              this.state.seatingPreferences !== "0" &&
              this.state.airlinePreferences !== "" &&
              this.state.airportPreferences !== "" &&
              this.state.frequentFlye !== "" &&
              this.state.transportationAirport !== "0" &&
              this.state.airLineSpecialAccommodations !== ""
            ) {
              this.setState({ airLineReservationForm: true }, () => { });
            } else {
              this.setState({ airLineReservationForm: false }, () => { });
            }

            if (
              this.state.hotelChainPreference !== "" &&
              this.state.roomPreferences !== "" &&
              this.state.hotelSpecialAccommodations !== ""
            ) {
              this.setState({ hotelReservationForm: true }, () => { });
            } else {
              this.setState({ hotelReservationForm: false }, () => { })
            }

            let formCounterValue = [];
            formCounterValue.push(this.state.careGiverEmergencyContactForm)
            formCounterValue.push(this.state.groundTravelForm)
            formCounterValue.push(this.state.airLineReservationForm)
            formCounterValue.push(this.state.hotelReservationForm)
            const formCouterValueDone = formCounterValue.filter((value) => value).length;
            this.state.formData = formCouterValueDone;

            // let counterCarPicUpLocation = 250;
            // this.state.maxCarPicUpLocation = counterCarPicUpLocation - this.state.carPicUpSpecialAccommodations.length
            // let counterDropOffLocation = 250;
            // this.state.maxCarDropOffLocation = counterDropOffLocation - this.state.carDropOffSpecialAccommodations.length

            let counterGroundTravel = 250;
            this.state.maxGroundTravel = counterGroundTravel - this.state.groundTravelSpecialAccommodations.length;


            let counterAirLine = 250;
            this.state.maxAirLine = counterAirLine - this.state.airLineSpecialAccommodations.length

            let counterHotel = 250;
            this.state.maxHotel = counterHotel - this.state.hotelSpecialAccommodations.length
            this.ChangeCheck = this.ChangeCheck.bind(this)
            this.setState({ Loader: false }, () => { });
          }))
          .catch((error) => {
            this.setState({ Loader: false }, () => { });
          }).finally(() => {
            allCountriesStatestimezones().then((value) => {
              this.setState({
                allCountries: value.data.countries,
                StateCaregiverEmergencyContact: value.data.states,
                // StateCarPicUP: value.data.states,
                // StateCarDropOff: value.data.states,
              }, () => {
                this.state.allCountries.map((objCountries) => {
                  if (this.state.profileDataCountry === objCountries.code) {
                    this.setState({
                      profileDataCountryName: objCountries.name,
                      profileDataState_enabled: objCountries.state_enabled,
                      profileDataZipCode_enabled: objCountries.zipcode_enabled,
                    }, () => { })
                  }
                  if (this.state.country === objCountries.code) {
                    this.setState({
                      countryName: objCountries.name,
                      countryState_enabled: objCountries.state_enabled,
                      countryZipCode_enabled: objCountries.zipcode_enabled,
                    }, () => { })
                  }
                  // if (this.state.countryPicUpLocation === objCountries.code) {
                  //   this.setState({
                  //     countryPicUpState_enabled: objCountries.state_enabled,
                  //     countryPicUpZipCode_enabled: objCountries.zipcode_enabled,
                  //   }, () => { })
                  // }
                  // if (this.state.carDropOffLocation === objCountries.code) {
                  //   this.setState({
                  //     countryDropOffState_enabled: objCountries.state_enabled,
                  //     countryDropOffZipCode_enabled: objCountries.zipcode_enabled,
                  //   }, () => { })
                  // }
                })
              })
              this.setState({ Loader: false }, () => { });
            }).catch((err) => {
              this.setState({ Loader: false }, () => { });
            }).finally(() => { this.accessOfConditions(); })
          })
      })

    flightTimePreferencesURL(localStorage.getItem('id'))
      .then((value) => {
        if (value.data.status === 0) {
          this.state.flightTimePreferencesFirstChoice = value.data.records
          this.state.flightTimePreferencesSecondChoice = value.data.records
          this.state.flightTimePreferencesThirdChoice = value.data.records
        }
      }).catch((err) => { })

    seatingPreferencesURL(localStorage.getItem('id'))
      .then((value) => {
        if (value.data.status === 0) {
          this.state.seatingPreferencesChoice = value.data.records
        }
      })
  }

  //Cargiver emergency contact form country OnChange function.
  loadCountryData(code, name, key, value) {
    let temp = [];
    let check = false;
    Object.entries(this.state.StateCaregiverEmergencyContact).map(
      (key, value) => {
        if (this.state.sameAddressAsPatient) {
          if (key[0] === code) {
            temp = key[1];
            check = true;
          }
        } else {
          if (key[0] === this.state.profileDataCountry) {
            temp = key[1];
            check = true;
          }
        }
      }
    );
    this.state.selecteStateCaregiverEmergencyContact = temp;
    this.setState(
      {
        country: code,
        countryName: name,
        state: "state",

      },
      () => {
        this.state.allCountries.map((objCountries) => {
          if (!this.state.sameAddressAsPatient) {
            if (this.state.country === objCountries.code) {
              this.setState(
                {
                  countryState_enabled: objCountries.state_enabled,
                  countryZipCode_enabled: objCountries.zipcode_enabled,
                  countryStateCodeValid: check,
                },
                () => { }
              );
            }
          } else {
            if (this.state.profileDataCountry === objCountries.code) {
              this.setState(
                {
                  profileDataState_enabled: objCountries.state_enabled,
                  profileDataZipCode_enabled: objCountries.zipcode_enabled,
                  countryStateCodeValid: check,
                },
                () => { }
              );
            }
          }
        });
      }
    );
  }


  //Car pic up the location form country OnChange function.
  // loadCountryPicUpLocation(e) {
  //   let check = false;
  //   let temp = [];
  //   Object.entries(this.state.StateCarPicUP).map((key, value) => {
  //     if (key[0] === e.target.value) {
  //       temp = key[1]
  //       check = true;
  //     }
  //   });
  //   this.state.selecteStateCarPicUP = temp;
  //   this.setState({
  //     countryPicUpLocation: e.target.value
  //   }, () => {
  //     this.state.allCountries.map((objCountries) => {
  //       if (this.state.countryPicUpLocation === objCountries.code) {
  //         this.setState({
  //           countryPicUpState_enabled: objCountries.state_enabled,
  //           countryPicUpZipCode_enabled: objCountries.zipcode_enabled,
  //           countryPicUpStateCodeValid: check
  //         }, () => {
  //         })
  //       }
  //     })
  //   })
  // }

  //Car drop off the location form country onChange function.
  // loadCarDropOffLocation(e) {
  //   let check = false;
  //   let temp = [];
  //   Object.entries(this.state.StateCarDropOff).map((key, value) => {
  //     if (key[0] === e.target.value) {
  //       temp = key[1]
  //       check = true;
  //     }
  //   });
  //   this.state.selecteStateCarDropOff = temp;
  //   this.setState({
  //     carDropOffLocation: e.target.value
  //   }, () => {
  //     this.state.allCountries.map((objCountries) => {
  //       if (this.state.carDropOffLocation === objCountries.code) {
  //         this.setState({
  //           countryDropOffState_enabled: objCountries.state_enabled,
  //           countryDropOffZipCode_enabled: objCountries.zipcode_enabled,
  //           countryDropOffStateCodeValid: check
  //         }, () => {
  //         })
  //       }
  //     })
  //   })
  // }

  //Car pic up the special accommodations counter.
  // carPickUpSpecialAccommodations = (e) => {
  //   let counter = e.target.value
  //   this.setState({ maxCarPicUpLocation: 250 - counter.length }, () => { })
  //   this.setState({ carPicUpSpecialAccommodations: e.target.value }, () => { })
  // }

  //Car drop off the special accommodations counter.
  // carDropOffSpecialAccommodations = (e) => {
  //   let counter = e.target.value
  //   this.setState({ maxCarDropOffLocation: 250 - counter.length }, () => { })
  //   this.setState({ carDropOffSpecialAccommodations: e.target.value }, () => { })
  // }

  //air line special accommodations counter.
  airLineSpecialAccommodations = (e) => {
    let counter = e.target.value
    this.setState({ maxAirLine: 250 - counter.length }, () => { })
    this.setState({ airLineSpecialAccommodations: e.target.value }, () => { })
  }
  groundTravelSpecialAccommodations = (e) => {
    let counter = e.target.value;
    this.setState({ maxGroundTravel: 250 - counter.length }, () => { });
    this.setState(
      { groundTravelSpecialAccommodations: e.target.value },
      () => { }
    );
  };

  //Hotel special accommodations counter.
  hotelSpecialAccommodations = (e) => {
    let counter = e.target.value
    this.setState({ maxHotel: 250 - counter.length }, () => { })
    this.setState({ hotelSpecialAccommodations: e.target.value }, () => { })
  }

  //Travel Preferences form Data update all form
  SaveData() {
    this.setState({ Loader: true }, () => { })
    let data = {
      patient_id: localStorage.getItem('id'),
      TravelPreferencesId: this.state.TravelPreferencesId,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      emailAddress: this.state.emailAddress,
      mobileNumber: this.state.mobileNumber,
      homePhoneNumber: this.state.homePhoneNumber,
      sameAddressAsPatient: this.state.sameAddressAsPatient ? "1" : "0",
      country: this.state.country,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      postalCode: this.state.postalCode,
      // countryPicUpLocation: this.state.countryPicUpLocation,
      // carPicUpAddress: this.state.carPicUpAddress,
      // carPicUpAddress2: this.state.carPicUpAddress2,
      // carPicUpCity: this.state.carPicUpCity,
      // carPicUpState: this.state.carPicUpState,
      // carPicUpPostalCode: this.state.carPicUpPostalCode,
      // carPicUpSpecialAccommodations: this.state.carPicUpSpecialAccommodations,
      // carDropOffLocation: this.state.carDropOffLocation,
      // carDropOffCompanyAddress1: this.state.carDropOffCompanyAddress1,
      // carDropOffCompanyAddress2: this.state.carDropOffCompanyAddress2,
      // carDropOffCity: this.state.carDropOffCity,
      // carDropOffState: this.state.carDropOffState,
      // carDropOffPostalCode: this.state.carDropOffPostalCode,
      // carDropOffSpecialAccommodations: this.state.carDropOffSpecialAccommodations,
      gTSFirstChoice: this.state.gTSFirstChoice,
      gTSSecondChoice: this.state.gTSSecondChoice,
      gTSThirdChoice: this.state.gTSThirdChoice,

      groundTravelSpecialAccommodations: this.state
        .groundTravelSpecialAccommodations,
      firstChoice: this.state.firstChoice,
      secondChoice: this.state.secondChoice,
      thirdChoice: this.state.thirdChoice,
      seatingPreferences: this.state.seatingPreferences,
      airlinePreferences: this.state.airlinePreferences,
      airportPreferences: this.state.airportPreferences,
      frequentFlye: this.state.frequentFlye,
      transportationAirport: this.state.transportationAirport,
      airLineSpecialAccommodations: this.state.airLineSpecialAccommodations,
      hotelChainPreference: this.state.hotelChainPreference,
      roomPreferences: this.state.roomPreferences,
      hotelSpecialAccommodations: this.state.hotelSpecialAccommodations,
    }
    if (this.state.emailError !== "") {
      this.setState({ Loader: false }, () => { })
    } else {
      travelPreferencePost(data, localStorage.getItem('id'))
        .then((res) => {
          if (res.data.status === 0) {
            this.setState({ Loader: false }, () => { })
            this.myProfileData();
            if (!toast.isActive(this.toastId.current)) {
              this.toastId.current = toast.success(this.props.t("Data successfully updated"), {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
            }
          }
        }).catch((err) => {
          this.setState({ Loader: false }, () => { })
        })
    }

  }

  //Checkbox value check or not assigned the value state.
  ChangeCheck(e) {
    const checked = e.target.checked;
    this.setState({
      sameAddressAsPatient: checked,
      countryName: "",
      state: ""
    })
    this.setState({
      country: null
    });

    this.setState({
      address1: ''
    });
    this.setState({
      address2: ''
    });
    this.setState({
      city: ''
    });

    this.setState({
      postalCode: ''
    });

  }

  //Parent-to-child component call data update.
  handleToUpdate = (someArg) => {
    this.componentDidMount();
  }
  stateChange = (states) => {
    if (states === "State") {
      this.setState({ state: "" }, () => { });
    } else {
      this.setState({ state: states }, () => { });
    }
  };
  render() {
    const { t } = this.props;
    let temp = [];
    let check = false;
    Object.entries(this.state.StateCaregiverEmergencyContact).map(
      (key, value) => {
        if (!this.state.sameAddressAsPatient) {
          if (key[0] === this.state.country) {
            temp = key[1];
            check = true;
          }
        }
        else {
          if (key[0] === this.state.profileDataCountry) {
            temp = key[1];
            check = true;
          }
          else {
            if (key[0] === this.state.state) {
              temp = key[1];
              check = true;
            }
          }

        }
      }

    );
    this.state.countryStateCodeValid = check;
    this.state.selecteStateCaregiverEmergencyContact = temp;

    // let temp1 = [];
    // let check1 = false;
    // Object.entries(this.state.selecteStateCaregiverEmergencyContact).map((key, value) => {
    //   if (key[0] === this.state.countryPicUpLocation) {
    //     temp1 = key[1];
    //     check1 = true;
    //   }
    // });
    // this.state.countryPicUpStateCodeValid = check1;
    // this.state.selecteStateCarPicUP = temp1;

    // let temp2 = [];
    // let check2 = false;
    // Object.entries(this.state.StateCarDropOff).map((key, value) => {
    //   if (key[0] === this.state.carDropOffLocation) {
    //     temp2 = key[1];
    //     check2 = true;
    //   }
    // });
    // this.state.countryDropOffStateCodeValid = check2;
    // this.state.selecteStateCarDropOff = temp2;


    return (
      <div>
        <main className="travel-preferences-wrap inner-page">
          <div className="">
            <Loading
              show={this.state.Loader}
              color="#2d8f84"
              showSpinner={false}
            />
            <SideNav sideMenu={this.state.sideMenu} travelPreferences={this.state.travelPreferences} />
            <div className="right-section left-space">
              <Header handleToUpdate={() => this.handleToUpdate.bind(this)} travelPreferences={this.state.travelPreferences} title={t("Travel Preferences")} />
              <div className="middle-content-padding">
                <div className="travel-content">
                  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                      <Col sm={3}>
                        <div className='Tabs-section card'>
                          <Nav variant="pills" className="flex-column">
                            {this.state.formData === 4 ?
                              <label className='info-text'>{t("Thank you for completing all of your travel preferences.")}</label>
                              :
                              <label className='info-text'>{t("You have completed")} {this.state.formData} {t("of 4 of your travel preferences.")}</label>
                            }
                            <Nav.Item>
                              <Nav.Link eventKey="first">
                                <div className='tab-text'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23.201" height="23.2" viewBox="0 0 23.201 23.2">
                                    <g id="Layer_2" data-name="Layer 2" transform="translate(0.519 0.5)">
                                      <g id="hospital_call_phone_medical_doctor_care_healthcare_help_emergency_service" data-name="hospital, call, phone, medical, doctor, care, healthcare, help, emergency, service" transform="translate(-0.019)">
                                        <path id="Path_576" data-name="Path 576" d="M10.511,54.546a6.672,6.672,0,0,0,9.436,0,1.383,1.383,0,0,0,0-1.953l-2.361-2.363a2.529,2.529,0,0,0-2.845-.5c-1.228.569-3.259.679-5.969-2.029s-2.6-4.739-2.029-5.966a2.529,2.529,0,0,0-.5-2.845L3.886,36.532a1.381,1.381,0,0,0-1.953,0,6.677,6.677,0,0,0,0,9.436ZM2.317,36.916a.839.839,0,0,1,1.186,0l2.363,2.363a1.986,1.986,0,0,1,.386,2.234C5.61,42.9,5.46,45.161,8.389,48.089c1.925,1.922,3.562,2.52,4.852,2.52a4.073,4.073,0,0,0,1.726-.382,1.987,1.987,0,0,1,2.234.386l2.363,2.363a.84.84,0,0,1,0,1.186,6.13,6.13,0,0,1-8.669,0L2.317,45.585a6.137,6.137,0,0,1,0-8.669Z" transform="translate(0.019 -34.3)" stroke="#75dc00" strokeWidth="1" />
                                        <path id="Path_577" data-name="Path 577" d="M262.891,2.526h-2.255V.271A.271.271,0,0,0,260.365,0H256.6a.271.271,0,0,0-.271.271V2.526h-2.255a.271.271,0,0,0-.271.271V6.566a.271.271,0,0,0,.271.271h2.255V9.091a.271.271,0,0,0,.271.271h3.768a.271.271,0,0,0,.271-.271V6.837h2.255a.271.271,0,0,0,.271-.271V2.8A.271.271,0,0,0,262.891,2.526Zm-.271,3.769h-2.255a.271.271,0,0,0-.271.271V8.82h-3.226V6.566a.271.271,0,0,0-.271-.271h-2.255V3.068H256.6a.271.271,0,0,0,.271-.271V.542h3.226V2.8a.271.271,0,0,0,.271.271h2.255Z" transform="translate(-240.96)" stroke="#75dc00" strokeWidth="1" />
                                      </g>
                                    </g>
                                  </svg>
                                  <span>{t("Caregiver emergency contact")}</span>
                                </div>
                                {
                                  this.state.careGiverEmergencyContactForm ?
                                    <div className='check-icon'>
                                      <img className="visit-icon" alt="" src="/media/images/check.png" />
                                    </div>
                                    : <></>
                                }
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">
                                <div className='tab-text'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25.876" height="21.5" viewBox="0 0 25.876 21.5">
                                    <g id="car-svgrepo-com" transform="translate(0.25 -40.275)">
                                      <path id="Path_587" data-name="Path 587" d="M56.724,194.4H75.209a.4.4,0,1,0,0-.81H56.724a.4.4,0,1,0,0,.81Z" transform="translate(-53.278 -144.798)" stroke="#000" strokeWidth="0.5" />
                                      <path id="Path_588" data-name="Path 588" d="M25.023,50.681l-1.047-1.648-.392-1.575h.847a.4.4,0,0,0,0-.81H23.383L22.326,42.4a2.571,2.571,0,0,0-2.4-1.879H5.454A2.571,2.571,0,0,0,3.05,42.4L1.993,46.647H.945a.4.4,0,0,0,0,.81h.847L1.4,49.032.353,50.681A2.58,2.58,0,0,0,0,51.894v5.866a.4.4,0,0,0,.4.4H.54V61.12a.4.4,0,0,0,.4.4H5.205a.4.4,0,0,0,.4-.4V59.379a.4.4,0,0,0-.81,0v1.336H1.35V58.164H24.026v2.551H20.576V59.379a.4.4,0,0,0-.81,0V61.12a.4.4,0,0,0,.4.4h4.261a.4.4,0,0,0,.4-.4V58.164h.135a.4.4,0,0,0,.4-.4V51.894A2.58,2.58,0,0,0,25.023,50.681ZM.81,51.894a1.8,1.8,0,0,1,.226-.779l1.082-1.7a.406.406,0,0,0,.051-.119L3.836,42.6a1.779,1.779,0,0,1,1.618-1.265H19.922A1.779,1.779,0,0,1,21.541,42.6l1.666,6.692a.406.406,0,0,0,.051.119l1.082,1.7a1.8,1.8,0,0,1,.226.779v5.461H18.533l-.978-2.447a.4.4,0,0,0-.376-.255H8.2a.4.4,0,0,0-.376.255l-.978,2.447H.81V51.894Zm16.851,5.461H7.715l.756-1.892h8.434l.756,1.892Z" stroke="#000" strokeWidth="0.5" />
                                      <path id="Path_589" data-name="Path 589" d="M30.4,237.965h1.524a2.189,2.189,0,0,0,0-4.378H30.7a.4.4,0,0,0,0,.81h1.225a1.379,1.379,0,1,1,0,2.759H30.4a.4.4,0,0,0,0,.81Z" transform="translate(-28.38 -182.638)" stroke="#000" strokeWidth="0.5" />
                                      <path id="Path_590" data-name="Path 590" d="M363.733,235.776a2.192,2.192,0,0,0,2.189,2.189h1.524a.4.4,0,0,0,0-.81h-1.524a1.379,1.379,0,1,1,0-2.759h1.225a.4.4,0,0,0,0-.81h-1.225A2.192,2.192,0,0,0,363.733,235.776Z" transform="translate(-344.094 -182.638)" stroke="#000" strokeWidth="0.5" />
                                    </g>
                                  </svg>
                                  <span>{t("Ground Travel Services")}</span>
                                </div>
                                {
                                  this.state.groundTravelForm ?
                                    <div className='check-icon'>
                                      <img className="visit-icon" alt="" src="/media/images/check.png" />
                                    </div>
                                    : <></>
                                }
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="third">
                                <div className='tab-text'>
                                  <svg id="aeroplane-svgrepo-com" xmlns="http://www.w3.org/2000/svg" width="23.472" height="23.524" viewBox="0 0 23.472 23.524">
                                    <g id="Group_287" data-name="Group 287" transform="translate(0)">
                                      <path id="Path_591" data-name="Path 591" d="M22.776.938A3.214,3.214,0,0,0,20.484,0,3.5,3.5,0,0,0,18,1.044l-3.37,3.6L3.039,1.176.777,3.439a1.268,1.268,0,0,0,0,1.794l.072.072L9.543,10.09,6.479,13.414a4.728,4.728,0,0,0-.6.737L2.086,13.17.574,14.682a1.135,1.135,0,0,0,0,1.6l.081.081,4.322,2.192.229.229L7.4,23.111l.081.081a1.134,1.134,0,0,0,1.6,0L10.6,21.681l-1-3.867a4.731,4.731,0,0,0,.7-.578l3.339-3.078,4.772,8.671.049.09.072.072a1.268,1.268,0,0,0,1.794,0l2.263-2.262L19.1,9.061,22.67,5.718a3.514,3.514,0,0,0,1.043-2.392A3.212,3.212,0,0,0,22.776.938ZM21.671,4.684,17.464,8.619l3.5,11.7-1.48,1.48-5.471-9.942-4.7,4.332-.021.02a3.2,3.2,0,0,1-.849.613l-.525.259L9,21.245l-.618.618-1.994-3.93-.554-.554L1.9,15.387l.618-.618,4.1,1.062L6.88,15.3a3.2,3.2,0,0,1,.627-.876l4.338-4.7L1.969,4.281,3.449,2.8l11.62,3.478,3.953-4.226a2.072,2.072,0,0,1,1.462-.615,1.766,1.766,0,0,1,1.791,1.847A2.068,2.068,0,0,1,21.671,4.684Z" transform="translate(-0.243)" />
                                    </g>
                                  </svg>
                                  <span>{t("Airline Reservations")}</span>
                                </div>
                                {
                                  this.state.airLineReservationForm ?
                                    <div className='check-icon'>
                                      <img className="visit-icon" alt="" src="/media/images/check.png" />
                                    </div>
                                    : <></>
                                }
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="fourth">
                                <div className='tab-text'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="29.871" height="27.54" viewBox="0 0 29.871 27.54">
                                    <g id="hotel-svgrepo-com" transform="translate(0 -19.973)">
                                      <g id="Group_289" data-name="Group 289" transform="translate(0 19.973)">
                                        <g id="Group_288" data-name="Group 288" transform="translate(0 0)">
                                          <path id="Path_592" data-name="Path 592" d="M29.276,27.463h-6.6V20.568a.6.6,0,0,0-.6-.6H7.786a.6.6,0,0,0-.6.6v6.895H.6a.6.6,0,0,0-.6.6v18.86a.6.6,0,0,0,.6.6H29.276a.6.6,0,0,0,.6-.6V28.058A.6.6,0,0,0,29.276,27.463ZM7.191,46.323h-6V28.653h6Zm9.943,0h-1.6V44.7a.6.6,0,0,0-1.19,0v1.624h-1.6v-4.48h4.4Zm4.355,0H18.324V41.248a.6.6,0,0,0-.6-.6H12.141a.6.6,0,0,0-.6.6v5.075H8.381V21.163H21.489Zm7.191,0h-6V28.653h6Z" transform="translate(0 -19.973)" />
                                        </g>
                                      </g>
                                      <g id="Group_291" data-name="Group 291" transform="translate(9.602 28.327)">
                                        <g id="Group_290" data-name="Group 290" transform="translate(0 0)">
                                          <path id="Path_593" data-name="Path 593" d="M168.57,163.169h-3.4a.6.6,0,0,0-.6.6v3.4a.6.6,0,0,0,.6.6h3.4a.6.6,0,0,0,.6-.6v-3.4A.6.6,0,0,0,168.57,163.169Zm-.6,3.4h-2.206v-2.206h2.206Z" transform="translate(-164.578 -163.169)" />
                                        </g>
                                      </g>
                                      <g id="Group_293" data-name="Group 293" transform="translate(15.682 28.327)">
                                        <g id="Group_292" data-name="Group 292" transform="translate(0 0)">
                                          <path id="Path_594" data-name="Path 594" d="M272.8,163.169h-3.4a.6.6,0,0,0-.6.6v3.4a.6.6,0,0,0,.6.6h3.4a.6.6,0,0,0,.6-.6v-3.4A.6.6,0,0,0,272.8,163.169Zm-.6,3.4H270v-2.206H272.2Z" transform="translate(-268.806 -163.169)" />
                                        </g>
                                      </g>
                                      <g id="Group_295" data-name="Group 295" transform="translate(23.431 29.485)">
                                        <g id="Group_294" data-name="Group 294">
                                          <path id="Path_595" data-name="Path 595" d="M405.489,183.019h-3.276a.6.6,0,0,0-.6.6v3.276a.6.6,0,0,0,.6.6h3.276a.6.6,0,0,0,.6-.6v-3.276A.6.6,0,0,0,405.489,183.019Zm-.6,3.276h-2.086v-2.086h2.086Z" transform="translate(-401.618 -183.019)" />
                                        </g>
                                      </g>
                                      <g id="Group_297" data-name="Group 297" transform="translate(23.431 35.286)">
                                        <g id="Group_296" data-name="Group 296" transform="translate(0 0)">
                                          <path id="Path_596" data-name="Path 596" d="M405.489,282.441h-3.276a.6.6,0,0,0-.6.6v3.276a.6.6,0,0,0,.6.6h3.276a.6.6,0,0,0,.6-.6v-3.276A.6.6,0,0,0,405.489,282.441Zm-.6,3.276h-2.086v-2.086h2.086Z" transform="translate(-401.618 -282.441)" />
                                        </g>
                                      </g>
                                      <g id="Group_299" data-name="Group 299" transform="translate(23.431 41.093)">
                                        <g id="Group_298" data-name="Group 298">
                                          <path id="Path_597" data-name="Path 597" d="M405.489,381.982h-3.276a.6.6,0,0,0-.6.6v3.276a.6.6,0,0,0,.6.6h3.276a.6.6,0,0,0,.6-.6v-3.276A.6.6,0,0,0,405.489,381.982Zm-.6,3.276h-2.086v-2.086h2.086Z" transform="translate(-401.618 -381.982)" />
                                        </g>
                                      </g>
                                      <g id="Group_301" data-name="Group 301" transform="translate(1.952 29.485)">
                                        <g id="Group_300" data-name="Group 300">
                                          <path id="Path_598" data-name="Path 598" d="M37.326,183.019H34.05a.6.6,0,0,0-.6.6v3.276a.6.6,0,0,0,.6.6h3.276a.6.6,0,0,0,.6-.6v-3.276A.6.6,0,0,0,37.326,183.019Zm-.6,3.276H34.645v-2.086h2.086Z" transform="translate(-33.455 -183.019)" />
                                        </g>
                                      </g>
                                      <g id="Group_303" data-name="Group 303" transform="translate(1.952 35.286)">
                                        <g id="Group_302" data-name="Group 302" transform="translate(0 0)">
                                          <path id="Path_599" data-name="Path 599" d="M37.326,282.441H34.05a.6.6,0,0,0-.6.6v3.276a.6.6,0,0,0,.6.6h3.276a.6.6,0,0,0,.6-.6v-3.276A.6.6,0,0,0,37.326,282.441Zm-.6,3.276H34.645v-2.086h2.086Z" transform="translate(-33.455 -282.441)" />
                                        </g>
                                      </g>
                                      <g id="Group_305" data-name="Group 305" transform="translate(1.952 41.093)">
                                        <g id="Group_304" data-name="Group 304">
                                          <path id="Path_600" data-name="Path 600" d="M37.326,381.982H34.05a.6.6,0,0,0-.6.6v3.276a.6.6,0,0,0,.6.6h3.276a.6.6,0,0,0,.6-.6v-3.276A.6.6,0,0,0,37.326,381.982Zm-.6,3.276H34.645v-2.086h2.086Z" transform="translate(-33.455 -381.982)" />
                                        </g>
                                      </g>
                                      <g id="Group_307" data-name="Group 307" transform="translate(9.602 34.353)">
                                        <g id="Group_306" data-name="Group 306">
                                          <path id="Path_601" data-name="Path 601" d="M168.57,266.458h-3.4a.6.6,0,0,0-.6.6v3.4a.6.6,0,0,0,.6.6h3.4a.6.6,0,0,0,.6-.6v-3.4A.6.6,0,0,0,168.57,266.458Zm-.6,3.4h-2.206v-2.206h2.206Z" transform="translate(-164.578 -266.458)" />
                                        </g>
                                      </g>
                                      <g id="Group_309" data-name="Group 309" transform="translate(15.682 34.353)">
                                        <g id="Group_308" data-name="Group 308">
                                          <path id="Path_602" data-name="Path 602" d="M272.8,266.458h-3.4a.6.6,0,0,0-.6.6v3.4a.6.6,0,0,0,.6.6h3.4a.6.6,0,0,0,.6-.6v-3.4A.6.6,0,0,0,272.8,266.458Zm-.6,3.4H270v-2.206H272.2Z" transform="translate(-268.806 -266.458)" />
                                        </g>
                                      </g>
                                      <g id="Group_311" data-name="Group 311" transform="translate(14.34 42.406)">
                                        <g id="Group_310" data-name="Group 310">
                                          <path id="Path_603" data-name="Path 603" d="M246.4,404.49a.6.6,0,0,0-.6.6v.055a.6.6,0,0,0,1.19,0v-.055A.6.6,0,0,0,246.4,404.49Z" transform="translate(-245.801 -404.49)" />
                                        </g>
                                      </g>
                                      <g id="Group_313" data-name="Group 313" transform="translate(13.456 22.615)">
                                        <g id="Group_312" data-name="Group 312">
                                          <path id="Path_604" data-name="Path 604" d="M233.25,65.266c-.235,0-.47.084-.47.283v1.476h-1.2V65.549c0-.2-.235-.283-.47-.283s-.47.084-.47.283v3.831c0,.193.235.289.47.289s.47-.1.47-.289V67.748h1.2v1.632c0,.193.235.289.47.289s.47-.1.47-.289V65.549C233.72,65.35,233.485,65.266,233.25,65.266Z" transform="translate(-230.642 -65.266)" />
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                  <span>{t("Hotel Reservations")}</span>
                                </div>
                                {
                                  this.state.hotelReservationForm ?
                                    <div className='check-icon'>
                                      <img className="visit-icon" alt="" src="/media/images/check.png" />
                                    </div>
                                    : <></>
                                }
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </div>
                      </Col>
                      <Col sm={9}>
                        <div className='Tabs-content card'>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <form className="emergency-contact-form">
                                <div className="container">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("First name")}
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={t("Enter first name")}
                                          onChange={(e) =>
                                            this.setState({
                                              firstName: e.target.value,
                                            })
                                          }
                                          value={this.state.firstName}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Middle name")}
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={t("Enter middle name")}
                                          onChange={(e) =>
                                            this.setState({
                                              middleName: e.target.value,
                                            })
                                          }
                                          value={this.state.middleName}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Last name")}
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={t("Enter last name")}
                                          onChange={(e) =>
                                            this.setState({
                                              lastName: e.target.value,
                                            })
                                          }
                                          value={this.state.lastName}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Email address")}
                                        </label>
                                        <input
                                          type="text "
                                          className="form-control"
                                          placeholder={t("Enter email address")}
                                          onChange={(e) =>
                                            this.validateEmail(e)
                                          }
                                          onKeyDown={(e) => {
                                            if (e.key === " ") {
                                              e.preventDefault();
                                            }
                                          }}
                                          value={this.state.emailAddress}
                                        />
                                        <span className="color-red">
                                          {this.state.emailError}
                                        </span>
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Mobile Phone Number")}
                                        </label>
                                        <input
                                          type="tel"
                                          className="form-control"
                                          onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                              event.preventDefault();
                                            }
                                          }}
                                          placeholder={t(
                                            "Enter mobile phone number"
                                          )}
                                          onChange={(e) =>
                                            this.setState({
                                              mobileNumber: e.target.value,
                                            })
                                          }
                                          value={this.state.mobileNumber}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Home Phone Number")}
                                        </label>
                                        <input
                                          type="tel"
                                          className="form-control"
                                          placeholder={t(
                                            "Enter home phone number"
                                          )}
                                          onChange={(e) =>
                                            this.setState({
                                              homePhoneNumber: e.target.value,
                                            })
                                          }
                                          onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                              event.preventDefault();
                                            }
                                          }}
                                          value={this.state.homePhoneNumber}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group same-addess">
                                        <input
                                          type="checkbox"
                                          onChange={(e) => this.ChangeCheck(e)}
                                          checked={
                                            this.state.sameAddressAsPatient
                                          }
                                        />
                                        <label htmlFor="email">
                                          {t("Same Address as Patient")}
                                        </label>
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="sel1">
                                          {t("Country")}
                                        </label>
                                        <div className="set-language set-Country">
                                          <div className="set-language-dropdown set-Country-dropdown">
                                            <div className="dropdown">
                                              <button
                                                className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                                disabled={this.state.sameAddressAsPatient ? 1 : 0} type="button" data-toggle="dropdown">

                                                {" "}
                                                {this.state.sameAddressAsPatient ? this.state.profileDataCountryName : this.state.countryName !== ""
                                                  ? this.state.countryName : t("Select Country")}


                                              </button>
                                              <div className="dropdown-menu dropdown-menuTop">
                                                <button
                                                  type="button"
                                                  className={this.state.country !== "00" ? "dropdown-item" : "dropdown-item active-language"}
                                                  onClick={() =>
                                                    this.loadCountryData("00", "Select Country")} >

                                                  {t("Select Country")}

                                                </button>
                                                {Object.entries(
                                                  this.state.allCountries
                                                ).map(([key, value]) => (
                                                  <button
                                                    className={
                                                      this.state.country !== value.code ? "dropdown-item" : "dropdown-item active-language"}
                                                    key={key} type="button" onClick={() => this.loadCountryData(value.code, value.name)}>
                                                    {this.state.country === value.code ? value.name : value.name}
                                                  </button>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Address 1")}
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          disabled={
                                            this.state.sameAddressAsPatient
                                              ? 1
                                              : 0
                                          }
                                          placeholder={t("Enter address 1")}
                                          onChange={(e) =>
                                            this.setState({
                                              address1: e.target.value,
                                            })
                                          }
                                          value={
                                            this.state.sameAddressAsPatient
                                              ? this.state.profileDataAddress1
                                              : this.state.address1
                                          }
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Address 2")}
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          disabled={
                                            this.state.sameAddressAsPatient
                                              ? 1
                                              : 0
                                          }
                                          placeholder={t("Enter address 2")}
                                          onChange={(e) =>
                                            this.setState({
                                              address2: e.target.value,
                                            })
                                          }
                                          value={
                                            this.state.sameAddressAsPatient
                                              ? this.state.profileDataAddress2
                                              : this.state.address2
                                          }
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="sel1">
                                          {t("City")}
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          disabled={
                                            this.state.sameAddressAsPatient
                                              ? 1
                                              : 0
                                          }
                                          placeholder={t("Enter city")}
                                          onChange={(e) =>
                                            this.setState({
                                              city: e.target.value,
                                            })
                                          }
                                          value={
                                            this.state.sameAddressAsPatient
                                              ? this.state.profileDataCity
                                              : this.state.city
                                          }
                                        />
                                      </div>
                                      <div className="select-group">
                                        {(this.state.sameAddressAsPatient &&
                                          this.state
                                            .profileDataState_enabled === "0" &&
                                          !this.state.countryStateCodeValid) ||
                                          (!this.state.sameAddressAsPatient &&
                                            this.state.countryState_enabled ===
                                            "0" &&
                                            !this.state.countryStateCodeValid) ? (
                                          <></>
                                        ) : (this.state.sameAddressAsPatient &&
                                          this.state
                                            .profileDataState_enabled ===
                                          "1" &&
                                          !this.state
                                            .countryStateCodeValid) ||
                                          (!this.state.sameAddressAsPatient &&
                                            this.state.countryState_enabled ===
                                            "1" &&
                                            !this.state
                                              .countryStateCodeValid) ? (
                                          <div className="form-group">
                                            <label htmlFor="sel1">
                                              {t("State/Region/Province")}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              disabled={
                                                this.state.sameAddressAsPatient
                                                  ? 1
                                                  : 0
                                              }
                                              onChange={(e) =>
                                                this.setState({
                                                  state: e.target.value,
                                                })
                                              }
                                              value={
                                                this.state.sameAddressAsPatient
                                                  ? this.state.profileDataState
                                                  : this.state.state
                                              }
                                            />
                                            {Object.entries(
                                              this.state
                                                .selecteStateCaregiverEmergencyContact
                                            ).map(([key, value]) => (
                                              <option key={key} value={key}>
                                                {value}
                                              </option>
                                            ))}
                                          </div>
                                        ) : (this.state.sameAddressAsPatient &&
                                          this.state
                                            .profileDataState_enabled ===
                                          "1" &&
                                          this.state.countryStateCodeValid) ||
                                          (!this.state.sameAddressAsPatient &&
                                            this.state.countryState_enabled ===
                                            "1" &&
                                            this.state
                                              .countryStateCodeValid) ? (
                                          <div className="form-group">
                                            <label htmlFor="sel1">
                                              {t("State/Region/Province")}
                                            </label>
                                            <div className="set-language set-Country">
                                              <div className="set-language-dropdown set-Country-dropdown">
                                                <div className="dropdown">

                                                  <button className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                                    disabled={this.state.sameAddressAsPatient ? 1 : 0} type="button" data-toggle="dropdown" >
                                                    {/* {this.state .sameAddressAsPatient && this.state.state === ""  && this.state.profileDataState === ""   ? t("select") :""}      */}
                                                    {this.state.sameAddressAsPatient && this.state.profileDataState === "" || !this.state.sameAddressAsPatient && this.state.state === "state" ? "select"

                                                      : (Object.entries(this.state.selecteStateCaregiverEmergencyContact).map(([key, value]) =>
                                                      (<span>{!this.state.sameAddressAsPatient && this.state.state === key ? value
                                                        : this.state.sameAddressAsPatient && this.state.profileDataState === key ? value : ""}</span>)))}


                                                  </button>

                                                  <div className="dropdown-menu dropdown-menuBottom">
                                                    <button
                                                      className={
                                                        this.state.state !== "0" ? "dropdown-item" : "dropdown-item active-language"}
                                                      type="button"
                                                      onChange={() => this.stateChange("State")} >
                                                    </button>
                                                    {Object.entries(this.state.selecteStateCaregiverEmergencyContact).map(([key, value]) => (
                                                      <button className={this.state.state !== key ? "dropdown-item" : "dropdown-item active-language"}
                                                        type="button" onClick={() => this.stateChange(key, value)} > {this.state.state === key ? value : value}
                                                      </button>
                                                    ))}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                        {(this.state.sameAddressAsPatient &&
                                          this.state
                                            .profileDataZipCode_enabled ===
                                          "0") ||
                                          (!this.state.sameAddressAsPatient &&
                                            this.state.countryZipCode_enabled ===
                                            "0") ? (
                                          <></>
                                        ) : (
                                          <div className="form-group">
                                            <label htmlFor="sel1">
                                              {t("Postal code")}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              disabled={
                                                this.state.sameAddressAsPatient
                                                  ? 1
                                                  : 0
                                              }
                                              placeholder={t(
                                                "Enter postal code"
                                              )}
                                              onChange={(e) =>
                                                this.setState({
                                                  postalCode: e.target.value,
                                                })
                                              }
                                              onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                  event.preventDefault();
                                                }
                                              }}
                                              value={
                                                this.state.sameAddressAsPatient
                                                  ? this.state
                                                    .profileDataPostalCode
                                                  : this.state.postalCode
                                              }
                                            />
                                          </div>
                                        )}
                                      </div>
                                      <div className="update-btn text-right">
                                        <button
                                          type="button"
                                          onClick={(e) => this.SaveData(e)}
                                          className="btn-primary view-btn"
                                        >
                                          {t("Update")}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <form className="car-service-form">
                                <div className="container">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("1st choice")}
                                        </label>
                                        <div className="set-language set-Country">
                                          <div className="set-language-dropdown set-Country-dropdown">
                                            <div className="dropdown">
                                              <button
                                                className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                                type="button"
                                                data-toggle="dropdown"
                                              >
                                                {this.state.gTSFirstChoice !==
                                                  "0" && this.state.gTSFirstChoice !== ""
                                                  ? gtsData.map((item) => {
                                                    if (
                                                      item.code ===
                                                      this.state
                                                        .gTSFirstChoice
                                                    )
                                                      return (
                                                        <span>
                                                          {item.label}
                                                        </span>
                                                      );
                                                  })
                                                  : t("No Value Selected")}
                                              </button>
                                              <div className="dropdown-menu dropdown-menuHeight dropdown-menuTop">
                                                <button
                                                  type="button"
                                                  className={
                                                    this.state
                                                      .gTSFirstChoice !== "0"
                                                      ? "dropdown-item"
                                                      : "dropdown-item active-language"
                                                  }
                                                  onClick={() =>
                                                    this.setState(
                                                      {
                                                        gTSFirstChoice: "0", gTSFirstChoiceName: t("No Value Selected"),
                                                      }, () => { })} >
                                                  {t("No Value Selected")}
                                                </button>
                                                {gtsData.map((item) => {
                                                  if (
                                                    item.code ===
                                                    this.state
                                                      .gTSSecondChoice ||
                                                    item.code ===
                                                    this.state.gTSThirdChoice
                                                  )
                                                    return;
                                                  return (
                                                    <button
                                                      className={
                                                        this.state
                                                          .gTSFirstChoice !==
                                                          item.code
                                                          ? "dropdown-item"
                                                          : "dropdown-item active-language"
                                                      }
                                                      key={item.code}
                                                      type="button"
                                                      onClick={() =>
                                                        this.setState(
                                                          {
                                                            gTSFirstChoice:
                                                              item.code,
                                                            gTSFirstChoiceName:
                                                              item.label,
                                                          },
                                                          () => { }
                                                        )
                                                      }
                                                    >
                                                      {this.state
                                                        .gTSFirstChoice ===
                                                        item.code
                                                        ? item.label
                                                        : item.label}
                                                    </button>
                                                  );
                                                })}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("2nd choice")}
                                        </label>
                                        <div className="set-language set-Country">
                                          <div className="set-language-dropdown set-Country-dropdown">
                                            <div className="dropdown">
                                              <button
                                                className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                                type="button"
                                                data-toggle="dropdown"
                                              >
                                                {" "}
                                                {this.state.gTSSecondChoice !==
                                                  "0" && this.state.gTSSecondChoice !== ""
                                                  ? gtsData.map((item) => {
                                                    if (
                                                      item.code ===
                                                      this.state
                                                        .gTSSecondChoice
                                                    )
                                                      return (
                                                        <span>
                                                          {item.label}
                                                        </span>
                                                      );
                                                  })
                                                  : t("No Value Selected")}
                                              </button>
                                              <div className="dropdown-menu dropdown-menuHeight dropdown-menuTop">
                                                <button
                                                  type="button"
                                                  className={
                                                    this.state
                                                      .gTSSecondChoicee !== "0"
                                                      ? "dropdown-item"
                                                      : "dropdown-item active-language"
                                                  }
                                                  onClick={() =>
                                                    this.setState(
                                                      {
                                                        gTSSecondChoice: "0",
                                                        gTSSecondChoiceName: t(
                                                          "No Value Selected"
                                                        ),
                                                      },
                                                      () => { }
                                                    )
                                                  }
                                                >
                                                  {t("No Value Selected")}
                                                </button>
                                                {gtsData.map((item) => {
                                                  if (
                                                    item.code ===
                                                    this.state
                                                      .gTSFirstChoice ||
                                                    item.code ===
                                                    this.state.gTSThirdChoice
                                                  )
                                                    return;
                                                  return (
                                                    <button
                                                      className={
                                                        this.state
                                                          .gTSSecondChoice !==
                                                          item.code
                                                          ? "dropdown-item"
                                                          : "dropdown-item active-language"
                                                      }
                                                      key={item.code}
                                                      type="button"
                                                      onClick={() =>
                                                        this.setState(
                                                          {
                                                            gTSSecondChoice:
                                                              item.code,
                                                            gTSSecondChoiceName:
                                                              item.label,
                                                          },
                                                          () => { }
                                                        )
                                                      }
                                                    >
                                                      {this.state
                                                        .gTSSecondChoice ===
                                                        item.code
                                                        ? item.label
                                                        : item.label}
                                                    </button>
                                                  );
                                                })}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("3rd choice")}
                                        </label>
                                        <div className="set-language set-Country">
                                          <div className="set-language-dropdown set-Country-dropdown">
                                            <div className="dropdown">
                                              <button
                                                className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                                type="button"
                                                data-toggle="dropdown"
                                              >
                                                {" "}
                                                {this.state.gTSThirdChoice !==
                                                  "0" && this.state.gTSThirdChoice !== ""
                                                  ? gtsData.map((item) => {
                                                    if (
                                                      item.code ===
                                                      this.state
                                                        .gTSThirdChoice
                                                    )
                                                      return (
                                                        <span>
                                                          {item.label}
                                                        </span>
                                                      );
                                                  })
                                                  : t("No Value Selected")}
                                              </button>
                                              <div className="dropdown-menu dropdown-menuHeight dropdown-menuTop">
                                                <button
                                                  type="button"
                                                  className={
                                                    this.state
                                                      .gTSThirdChoice !== "0"
                                                      ? "dropdown-item"
                                                      : "dropdown-item active-language"
                                                  }
                                                  onClick={() =>
                                                    this.setState(
                                                      {
                                                        gTSThirdChoice: "0",
                                                        gTSThirdChoiceName: t(
                                                          "No Value Selected"
                                                        ),
                                                      },
                                                      () => { }
                                                    )
                                                  }
                                                >
                                                  {t("No Value Selected")}
                                                </button>
                                                {gtsData.map((item) => {
                                                  if (
                                                    item.code ===
                                                    this.state
                                                      .gTSFirstChoice ||
                                                    item.code ===
                                                    this.state.gTSSecondChoice
                                                  )
                                                    return;
                                                  return (
                                                    <button
                                                      className={
                                                        this.state
                                                          .gTSThirdChoice !==
                                                          item.code
                                                          ? "dropdown-item"
                                                          : "dropdown-item active-language"
                                                      }
                                                      key={item.code}
                                                      type="button"
                                                      onClick={() =>
                                                        this.setState(
                                                          {
                                                            gTSThirdChoice:
                                                              item.code,
                                                            gTSThirdChoiceName:
                                                              item.label,
                                                          },
                                                          () => { }
                                                        )
                                                      }
                                                    >
                                                      {this.state
                                                        .gTSThirdChoice ===
                                                        item.code
                                                        ? item.label
                                                        : item.label}
                                                    </button>
                                                  );
                                                })}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Special accommodations")}
                                        </label>
                                        <span className="color-red">
                                          {" (" +
                                            this.state.maxGroundTravel +
                                            " " +
                                            t("characters left") +
                                            ")"}
                                        </span>
                                        <textarea
                                          type="email "
                                          maxLength="250"
                                          className="form-control"
                                          placeholder={t(
                                            "Enter special accommodations"
                                          )}
                                          onChange={(e) =>
                                            this.groundTravelSpecialAccommodations(
                                              e
                                            )
                                          }
                                          value={
                                            this.state
                                              .groundTravelSpecialAccommodations
                                          }
                                        />
                                      </div>

                                      <div className="update-btn text-right">
                                        <button
                                          type="button"
                                          onClick={(e) => this.SaveData(e)}
                                          className="btn-primary view-btn"
                                        >
                                          {t("Update")}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                              <form className="air-reservation-form">
                                <div className="container">
                                  <h5 className="form-head">
                                    <b>{t("Flight time preferences")}</b>
                                  </h5>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("1st choice")}
                                        </label>
                                        <div className="set-language set-Country">
                                          <div className="set-language-dropdown set-Country-dropdown">
                                            <div className="dropdown">
                                              <button
                                                className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                                type="button"
                                                data-toggle="dropdown"
                                              >
                                                {this.state.firstChoice !== "0" && this.state.firstChoice !== ""
                                                  ? this.state.flightTimePreferencesFirstChoice.map(
                                                    (Obj) => {
                                                      if (
                                                        Obj.id ===
                                                        this.state.firstChoice
                                                      )
                                                        return (
                                                          <span>
                                                            {Obj.name}
                                                          </span>
                                                        );
                                                    }
                                                  )
                                                  : t("Select time")}
                                              </button>
                                              <div className="dropdown-menu dropdown-menuHeight dropdown-menuTop">
                                                <button
                                                  type="button"
                                                  className={
                                                    this.state.firstChoice !==
                                                      "0"
                                                      ? "dropdown-item"
                                                      : "dropdown-item active-language"
                                                  }
                                                  onClick={() =>
                                                    this.setState(
                                                      {
                                                        firstChoice: "0",
                                                        firstChoiceName: t(
                                                          "Select time"
                                                        ),
                                                      },
                                                      () => { }
                                                    )
                                                  }
                                                >
                                                  {t("Select time")}
                                                </button>

                                                {this.state.flightTimePreferencesFirstChoice.map(
                                                  (Obj) => {
                                                    if (
                                                      Obj.id ===
                                                      this.state
                                                        .secondChoice ||
                                                      Obj.id ===
                                                      this.state.thirdChoice
                                                    )
                                                      return;
                                                    return (
                                                      <button
                                                        className={
                                                          this.state
                                                            .firstChoice !==
                                                            Obj.id
                                                            ? "dropdown-item"
                                                            : "dropdown-item active-language"
                                                        }
                                                        key={Obj.id}
                                                        type="button"
                                                        onClick={() =>
                                                          this.setState(
                                                            {
                                                              firstChoice:
                                                                Obj.id,
                                                              firstChoiceName:
                                                                Obj.name,
                                                            },
                                                            () => { }
                                                          )
                                                        }
                                                      >
                                                        {this.state
                                                          .firstChoice ===
                                                          Obj.id
                                                          ? Obj.name
                                                          : Obj.name}
                                                      </button>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("2nd choice")}
                                        </label>
                                        <div className="set-language set-Country">
                                          <div className="set-language-dropdown set-Country-dropdown">
                                            <div className="dropdown">
                                              <button
                                                className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                                type="button"
                                                data-toggle="dropdown"
                                              >
                                                {" "}
                                                {this.state.secondChoice !== "0" && this.state.secondChoice !== ""
                                                  ? this.state.flightTimePreferencesFirstChoice.map(
                                                    (Obj) => {
                                                      if (
                                                        Obj.id ===
                                                        this.state
                                                          .secondChoice
                                                      )
                                                        return (
                                                          <span>
                                                            {Obj.name}
                                                          </span>
                                                        );
                                                    }
                                                  )
                                                  : t("Select time")}
                                              </button>
                                              <div className="dropdown-menu dropdown-menuHeight dropdown-menuTop">
                                                <button
                                                  type="button"
                                                  className={
                                                    this.state.secondChoice !==
                                                      "0"
                                                      ? "dropdown-item"
                                                      : "dropdown-item active-language"
                                                  }
                                                  onClick={() =>
                                                    this.setState(
                                                      {
                                                        secondChoice: "0",
                                                        secondChoiceName: t(
                                                          "Select time"
                                                        ),
                                                      },
                                                      () => { }
                                                    )
                                                  }
                                                >
                                                  {t("Select time")}
                                                </button>
                                                {this.state.flightTimePreferencesFirstChoice.map(
                                                  (Obj) => {
                                                    if (
                                                      Obj.id ===
                                                      this.state
                                                        .firstChoice ||
                                                      Obj.id ===
                                                      this.state.thirdChoice
                                                    )
                                                      return;
                                                    return (
                                                      <button
                                                        className={
                                                          this.state
                                                            .secondChoice !==
                                                            Obj.id
                                                            ? "dropdown-item"
                                                            : "dropdown-item active-language"
                                                        }
                                                        key={Obj.id}
                                                        type="button"
                                                        onClick={() =>
                                                          this.setState(
                                                            {
                                                              secondChoice:
                                                                Obj.id,
                                                              secondChoiceName:
                                                                Obj.name,
                                                            },
                                                            () => { }
                                                          )
                                                        }
                                                      >
                                                        {this.state
                                                          .secondChoice ===
                                                          Obj.id
                                                          ? Obj.name
                                                          : Obj.name}
                                                      </button>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("3rd choice")}
                                        </label>
                                        <div className="set-language set-Country">
                                          <div className="set-language-dropdown set-Country-dropdown">
                                            <div className="dropdown">
                                              <button
                                                className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                                type="button"
                                                data-toggle="dropdown"
                                              >
                                                {" "}
                                                {this.state.thirdChoice !== "" && this.state.thirdChoice !== "0"
                                                  ? this.state.flightTimePreferencesFirstChoice.map(
                                                    (Obj) => {
                                                      if (
                                                        Obj.id ===
                                                        this.state.thirdChoice
                                                      )
                                                        return (
                                                          <span>
                                                            {Obj.name}
                                                          </span>
                                                        );
                                                    }
                                                  )
                                                  : t("Select time")}
                                              </button>
                                              <div className="dropdown-menu dropdown-menuHeight dropdown-menuTop">
                                                <button
                                                  type="button"
                                                  className={
                                                    this.state.thirdChoice !==
                                                      "0"
                                                      ? "dropdown-item"
                                                      : "dropdown-item active-language"
                                                  }
                                                  onClick={() =>
                                                    this.setState(
                                                      {
                                                        thirdChoice: "0",
                                                        thirdChoiceName: t(
                                                          "Select time"
                                                        ),
                                                      },
                                                      () => { }
                                                    )
                                                  }
                                                >
                                                  {t("Select time")}
                                                </button>
                                                {this.state.flightTimePreferencesFirstChoice.map(
                                                  (Obj) => {
                                                    if (
                                                      Obj.id ===
                                                      this.state
                                                        .firstChoice ||
                                                      Obj.id ===
                                                      this.state.secondChoice
                                                    )
                                                      return;
                                                    return (
                                                      <button
                                                        className={
                                                          this.state
                                                            .thirdChoice !==
                                                            Obj.id
                                                            ? "dropdown-item"
                                                            : "dropdown-item active-language"
                                                        }
                                                        key={Obj.id}
                                                        type="button"
                                                        onClick={() =>
                                                          this.setState(
                                                            {
                                                              thirdChoice:
                                                                Obj.id,
                                                              thirdChoiceName:
                                                                Obj.name,
                                                            },
                                                            () => { }
                                                          )
                                                        }
                                                      >
                                                        {this.state
                                                          .secondChoice ===
                                                          Obj.id
                                                          ? Obj.name
                                                          : Obj.name}
                                                      </button>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Seating preferences")}
                                        </label>
                                        <div className="set-language set-Country">
                                          <div className="set-language-dropdown set-Country-dropdown">
                                            <div className="dropdown">
                                              <button
                                                className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                                type="button"
                                                data-toggle="dropdown"
                                              >
                                                {this.state.seatingPreferences !== "0" && this.state.seatingPreferences !== ""

                                                  ? this.state.seatingPreferencesChoice.map(
                                                    (Obj) => {
                                                      if (
                                                        Obj.id ===
                                                        this.state
                                                          .seatingPreferences
                                                      )
                                                        return (
                                                          <span>
                                                            {Obj.name}
                                                          </span>
                                                        );
                                                    }
                                                  )
                                                  : t("Select seat")}
                                              </button>
                                              <div className="dropdown-menu dropdown-menuHeight dropdown-menuTop">
                                                <button
                                                  type="button"
                                                  className={
                                                    this.state
                                                      .seatingPreferences !==
                                                      "0"
                                                      ? "dropdown-item"
                                                      : "dropdown-item active-language"
                                                  }
                                                  onClick={() =>
                                                    this.setState(
                                                      {
                                                        seatingPreferences: "0",
                                                        seatingPreferencesName: t(
                                                          "Select seat"
                                                        ),
                                                      },
                                                      () => { }
                                                    )
                                                  }
                                                >
                                                  {t("Select seat")}
                                                </button>
                                                {this.state.seatingPreferencesChoice.map(
                                                  (Obj) => {
                                                    return (
                                                      <button
                                                        key={Obj.id}
                                                        type="button"
                                                        className={
                                                          this.state
                                                            .seatingPreferences !==
                                                            Obj.id
                                                            ? "dropdown-item"
                                                            : "dropdown-item active-language"
                                                        }
                                                        onClick={() =>
                                                          this.setState(
                                                            {
                                                              seatingPreferences:
                                                                Obj.id,
                                                              seatingPreferencesName:
                                                                Obj.name,
                                                            },
                                                            () => { }
                                                          )
                                                        }
                                                      >
                                                        {Obj.name}
                                                      </button>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Airline preferences")}
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={t(
                                            "Enter airline preferences"
                                          )}
                                          onChange={(e) =>
                                            this.setState({
                                              airlinePreferences:
                                                e.target.value,
                                            })
                                          }
                                          value={this.state.airlinePreferences}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Airport preferences")}
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={t(
                                            "Enter airport preferences"
                                          )}
                                          onChange={(e) =>
                                            this.setState({
                                              airportPreferences:
                                                e.target.value,
                                            })
                                          }
                                          value={this.state.airportPreferences}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t(
                                            "Frequent flyer # (If applicable)"
                                          )}
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={t(
                                            "Enter frequent flyer"
                                          )}
                                          onChange={(e) =>
                                            this.setState({
                                              frequentFlye: e.target.value,
                                            })
                                          }
                                          value={this.state.frequentFlye}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Transportation From/To airport")}
                                        </label>{" "}
                                        <div className="set-language set-Country">
                                          <div className="set-language-dropdown set-Country-dropdown">
                                            <div className="dropdown">
                                              <button
                                                className="btn btn-secondary dropdown-toggle dropdown-toggle-padding"
                                                type="button"
                                                data-toggle="dropdown"
                                              >
                                                {this.state.transportationAirport === ""

                                                  ? t("Select transportation")
                                                  : this.state
                                                    .transportationAirport ===
                                                    "0"
                                                    ? t("Select transportation")
                                                    : this.state
                                                      .transportationAirport ===
                                                      "1"
                                                      ? t("No")
                                                      : this.state
                                                        .transportationAirport ===
                                                        "2"
                                                        ? t("Yes")
                                                        : ""}
                                              </button>
                                              <div className="dropdown-menu dropdown-menuHeight dropdown-menuTop">
                                                <button
                                                  type="button"
                                                  className={
                                                    this.state
                                                      .transportationAirport ===
                                                      "0"
                                                      ? "dropdown-item active-language"
                                                      : "dropdown-item"
                                                  }
                                                  onClick={() =>
                                                    this.setState(
                                                      {
                                                        transportationAirport:
                                                          "0",
                                                        transportationAirportName: t(
                                                          "Select transportation"
                                                        ),
                                                      },
                                                      () => { }
                                                    )
                                                  }
                                                >
                                                  {t("Select transportation")}
                                                </button>
                                                <button
                                                  type="button"
                                                  className={
                                                    this.state
                                                      .transportationAirport ===
                                                      "1"
                                                      ? "dropdown-item active-language"
                                                      : "dropdown-item"
                                                  }
                                                  onClick={() =>
                                                    this.setState(
                                                      {
                                                        transportationAirport:
                                                          "1",
                                                        transportationAirportName: t(
                                                          "No"
                                                        ),
                                                      },
                                                      () => { }
                                                    )
                                                  }
                                                >
                                                  {t("No")}
                                                </button>
                                                <button
                                                  type="button"
                                                  className={
                                                    this.state
                                                      .transportationAirport ===
                                                      "2"
                                                      ? "dropdown-item active-language"
                                                      : "dropdown-item"
                                                  }
                                                  onClick={() =>
                                                    this.setState(
                                                      {
                                                        transportationAirport:
                                                          "2",
                                                        transportationAirportName: t(
                                                          "Yes"
                                                        ),
                                                      },
                                                      () => { }
                                                    )
                                                  }
                                                >
                                                  {t("Yes")}
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="email">{t("Special accommodations")}</label>
                                    <span className='color-red'>{" (" + this.state.maxAirLine + " " + t("characters left") + ")"}</span>
                                    <textarea type="email "
                                      maxLength="250"
                                      className="form-control"
                                      placeholder={t("Enter special accommodations")}
                                      onChange={(e) => this.airLineSpecialAccommodations(e)}
                                      value={this.state.airLineSpecialAccommodations}
                                    />
                                  </div>
                                  <div className="col-md-12">
                                    <div className="update-btn text-right">
                                      <button
                                        type="button"
                                        onClick={(e) => this.SaveData(e)}
                                        className="btn-primary view-btn"
                                      >
                                        {t("Update")}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                              <form className="hotel-reservation-form">
                                <div className="container">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Hotel chain preferences")}
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={t(
                                            "Enter hotel chain preferences"
                                          )}
                                          onChange={(e) =>
                                            this.setState({
                                              hotelChainPreference:
                                                e.target.value,
                                            })
                                          }
                                          value={
                                            this.state.hotelChainPreference
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Room preferences")}
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={t(
                                            "Enter hotel room preferences"
                                          )}
                                          onChange={(e) =>
                                            this.setState({
                                              roomPreferences: e.target.value,
                                            })
                                          }
                                          value={this.state.roomPreferences}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label htmlFor="email">
                                          {t("Special accommodations")}
                                        </label>
                                        <span className="color-red">
                                          {" (" +
                                            this.state.maxHotel +
                                            " " +
                                            t("characters left") +
                                            ")"}
                                        </span>
                                        <textarea
                                          type="email "
                                          maxLength="250"
                                          className="form-control"
                                          placeholder={t(
                                            "Enter special accommodations"
                                          )}
                                          onChange={(e) =>
                                            this.hotelSpecialAccommodations(e)
                                          }
                                          value={
                                            this.state
                                              .hotelSpecialAccommodations
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="update-btn text-right">
                                        <button
                                          type="button"
                                          onClick={(e) => this.SaveData(e)}
                                          className="btn-primary view-btn"
                                        >
                                          {t("Update")}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </Tab.Pane>
                          </Tab.Content>
                        </div>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>

              </div>
              <Footer />
            </div>
          </div>
        </main >
        <ToastContainer
        />
      </div >
    )
  }
}
export default withTranslation()(PreferencesTravelData)
