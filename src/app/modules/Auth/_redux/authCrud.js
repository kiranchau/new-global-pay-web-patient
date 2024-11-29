import axios from "axios"
import moment from "moment";
export const config1 = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
}

export const config2 = {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
}


export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/api/v1/signin`
export const SignOut_URL = `${process.env.REACT_APP_API_URL}/api/v1/signout?user=`
export const Reimbursements_URL = `${process.env.REACT_APP_API_URL}/api/v1/patients/reimbursements?user=`
export const MyTravel_URL = `${process.env.REACT_APP_API_URL}/api/v1/patients/travelrequests?user=`
export const Studies_URL = `${process.env.REACT_APP_API_URL}/api/v1/patients/studies?patient_id=`
export const Profile_URL = `${process.env.REACT_APP_API_URL}/api/v1/patients/info?user=`
export const TravelPreference_GET_URL = `${process.env.REACT_APP_API_URL}/api/v1/patients/travelpreference?user=`
export const AllCountries_States_timezones_URL = `${process.env.REACT_APP_API_URL}/api/v1/settings?ver=2`
export const Reset_Password_URL = `${process.env.REACT_APP_API_URL}/api/v1/accounts/password?user=`
export const Forgot_Password_URL = `${process.env.REACT_APP_API_URL}/api/v1/forgot-password-new`
export const TravelPreferences_POST_URL = `${process.env.REACT_APP_API_URL}/api/v1/patients/travelpreference?user=`
export const NewReimbursement_Visit_Name_URL = `${process.env.REACT_APP_API_URL}/api/v1/studies/visits/`
export const NewReimbursement_Item_Type_URL = `${process.env.REACT_APP_API_URL}/api/v1/list/reimbursement-item-types?user=`
export const NewReimbursement_Upload_URL = `${process.env.REACT_APP_API_URL}/api/v1/patients/requests/upload?user=`
export const NewReimbursement_Post_URL = `${process.env.REACT_APP_API_URL}/api/v1/patients/reimbursements?user=`
export const MyProfileImageUpload_URL = `${process.env.REACT_APP_API_URL}/api/v1/patients/account/file?user=`
export const MyProgileImageGet_URL = `${process.env.REACT_APP_API_URL}/api/v1/profile?hash=`
export const Stipend_URL = `${process.env.REACT_APP_API_URL}/api/v1/visits/`
export const NewRequest_Post_URL = `${process.env.REACT_APP_API_URL}/api/v1/patients/travelrequests?user=`
export const MultiLanguage_URL = `${process.env.REACT_APP_API_URL}/api/v1/languages?user=`
export const Reimbursement_Attachements_URL = `${process.env.REACT_APP_API_URL}/api/v1/attachments/`
export const MyStudies_URL = `${process.env.REACT_APP_API_URL}/api/v1/patients/mystudies?user=`
export const Notification_URL = `${process.env.REACT_APP_API_URL}/api/v1/travel_notifications?user=`
export const Download_Attachement_URL = `${process.env.REACT_APP_API_URL}/api/v1/attachments_download/`
export const Token_URL = `${process.env.REACT_APP_API_URL}/api/v1/validate-token`
export const MyTravel_New_Reimbursement_Address_URL = `${process.env.REACT_APP_API_URL}/api/v1/sites/locations/undefined?patient_id=`
export const MyTravel_New_Reimbursement_Amount_Cal_URL = `${process.env.REACT_APP_API_URL}/api/v1/patients/requests/compute-distance-amount?user=`
export const Gloabal_Reset_Password_URL = `${process.env.REACT_APP_API_URL}/api/v1/reset-password`
export const User_Notification_Count_URL = `${process.env.REACT_APP_API_URL}/api/v1/notifications?user=`
export const Remove_Img_URL = `${process.env.REACT_APP_API_URL}/api/v1/remove-profile-pic/?user=`
export const All_Notification_URL = `${process.env.REACT_APP_API_URL}/api/v1/all-notifications/?study_id=`
export const Archieved_Notification_URL = `${process.env.REACT_APP_API_URL}/api/v1/archieved-notifications/?user=`
export const Remove_Notifiaction_URL = `${process.env.REACT_APP_API_URL}/api/v1/hide-notifications/?NotificationID=`
export const Change_Language_URL = `${process.env.REACT_APP_API_URL}/api/v1/update-language?user=`
export const Undo_Notificaton_URL = `${process.env.REACT_APP_API_URL}/api/v1/undo-notifications/?NotificationID=`
export const Patient_Push_Notification_URL = `${process.env.REACT_APP_API_URL}/api/v1/change-notifications-status/?user=`
export const BarChart_URL = `${process.env.REACT_APP_API_URL}/api/v1/dashboard-graphs-data?user=`
export const Email_Verifications_URL = `${process.env.REACT_APP_API_URL}/api/v1/accounts/email/confirm`
export const Flight_Time_Preferences_URL = `${process.env.REACT_APP_API_URL}/api/v1/flight-time-pref?user=`
export const Seating_Preferences_URL = `${process.env.REACT_APP_API_URL}/api/v1/flight-seat-pref?user=`
export const Password_Set_URL = `${process.env.REACT_APP_API_URL}/api/v1/reset-password`

//-------------Please Do Not Delete Not this Use -------
export const REQUEST_PASSWORD_URL = `${process.env.REACT_APP_API_URL}/api/auth/forgotpasswordSentMail`
export const REGISTER_URL = `${process.env.REACT_APP_API_URL}/api/auth/register`
//--------------------------------------------------------------------------------





export function login(req) {
  const params = new URLSearchParams()
  params.append("emailaddress", req.emailaddress)
  params.append("password", req.password)
  params.append("code", req.code)
  params.append("_type", req._type)
  return axios.post(LOGIN_URL, params, config1)
}

export function tokenFirebase(req) {
  const params = new URLSearchParams()
  params.append("PatientID", req.PatientID)
  params.append("DeviceID", req.DeviceID)
  params.append("TokenID", req.TokenID)
  params.append("DeviceType", req.DeviceType)
  params.append("Method", req.Method)
  return axios.post(Token_URL, params, config1)
}

export function tokenFirebaseSignOut(req) {
  const params = new URLSearchParams()
  params.append("TokenID", req.TokenID)
  params.append("Method", req.Method)
  return axios.post(Token_URL, params, config1)
}


export function changeLanguagesApi(id, req) {
  const params = new URLSearchParams()
  params.append("lang", req.lang)
  return axios.post(Change_Language_URL + `${id}`, params, config1)
}

export function resetPasswordData(req, id) {
  const params = new URLSearchParams()
  params.append("current_password", req.oldPassword)
  params.append("password", req.newPassword)
  params.append("_password", req.confirmPassword)
  return axios.post(Reset_Password_URL + `${id}`, params, config1)
}

export function globalResetPassword(req) {
  const params = new URLSearchParams()
  params.append("resetcode", req.code)
  params.append("password", req.newPassword)
  params.append("_password", req.repeatPassword)
  return axios.post(Gloabal_Reset_Password_URL, params, config1)
}

export function removeImage(req) {
  const params = new URLSearchParams()
  params.append("user", req.user)
  return axios.post(Remove_Img_URL, params, config1)
}

export function forgotPasswordData(req) {
  const params = new URLSearchParams()
  params.append("emailaddress", req.emailaddress)
  return axios.post(Forgot_Password_URL, params, config1)
}

export function newRequestImgUpload(file, id) {
  var fData = new FormData();
  fData.append("file", file)
  return axios.post(NewReimbursement_Upload_URL + `${id}`, fData, config2)
}

export function myProfileImageUpload(file, id) {
  var fData = new FormData();
  fData.append("file", file)
  return axios.post(MyProfileImageUpload_URL + `${id}`, fData, config2)
}

export function myTravelNewReiAmountCalculated(req, id) {
  const params = new URLSearchParams()
  params.append("start[address]", req.Startaddress1)
  params.append("start[address2]", req.Startaddress2)
  params.append("start[city]", req.Startcity)
  params.append("start[state]", req.Startstate)
  params.append("start[zipcode]", req.Startzipcode)
  params.append("end[address]", req.Endaddress1)
  params.append("end[address2]", req.Endaddress2)
  params.append("end[city]", req.Endcity)
  params.append("end[state]", req.Endstate)
  params.append("end[zipcode]", req.Endzipcode)
  params.append("patient_id", req.patient_id)
  params.append("type_id", req.type_id)
  params.append("study_id", req.study_id)
  params.append("roundtrip", req.roundtrip)
  return axios.post(MyTravel_New_Reimbursement_Amount_Cal_URL + `${id}`, params, config1)
}

export function travelPreferencePost(req, id) {
  const params = new URLSearchParams()
  params.append("patient_id", req.patient_id)
  params.append("id", req.TravelPreferencesId)
  params.append("firstname", req.firstName)
  params.append("middle", req.middleName)
  params.append("lastname", req.lastName)
  params.append("dob", req.dateOfBirth)
  params.append("address_same_patient", req.sameAddressAsPatient)
  params.append("emailaddress", req.emailAddress)
  params.append("phone_home", req.homePhoneNumber)
  params.append("phone_mobile", req.mobileNumber)
  params.append("address", req.address1)
  params.append("address2", req.address2)
  params.append("city", req.city)
  params.append("state", req.state)
  params.append("zipcode", req.postalCode)
  params.append("country", req.country)
  params.append("flight_time1", req.firstChoice)
  params.append("flight_time2", req.secondChoice)
  params.append("flight_time3", req.thirdChoice)
  params.append("ground_travel_choice1",req.gTSFirstChoice)
  params.append("ground_travel_choice2",req.gTSSecondChoice)
  params.append("ground_travel_choice3",req.gTSThirdChoice)
  params.append("ground_travel_accommodations",req.groundTravelSpecialAccommodations)
  params.append("flight_seat", req.seatingPreferences)
  params.append("flight_airline", req.airlinePreferences)
  params.append("flight_airport", req.airportPreferences)
  params.append("flight_frequent_flyer", req.frequentFlye)
  params.append("flight_has_trans", req.transportationAirport)
  params.append("flight_accommodations", req.airLineSpecialAccommodations)
  params.append("hotel_chain", req.hotelChainPreference)
  params.append("hotel_room", req.roomPreferences)
  params.append("hotel_accommodations", req.hotelSpecialAccommodations)
  return axios.post(TravelPreferences_POST_URL + `${id}`, params, config1)
}

export function emailVerifications(req) {
  const params = new URLSearchParams()
  params.append("code", req.code)
  return axios.post(Email_Verifications_URL, params, config1)
}

export function newPasswordSet(req){
  const params = new URLSearchParams()
  params.append("resetcode",req.code)
  params.append("password",req.newPassword)
  params.append("_password",req.repeatPassword)
  return axios.post(Password_Set_URL, params, config1)
}

export function signOut(id) {
  const params = new URLSearchParams()
  return axios.post(SignOut_URL + `${id}`, params, config1)
}

export function newReimbursement_Post(req, itemTypeData, id) {
  const params = new URLSearchParams()
  params.append("status", req.newReStatus)
  params.append("study_id", req.StudiesID)
  params.append("site_id", req.SiteID)
  params.append("visit_id", req.newReVisit)

  for (var i = 0; i < itemTypeData.length; i++) {
    params.append("items[" + i + "][type_id]", itemTypeData[i].type_id)
    params.append("items[" + i + "][amount]", itemTypeData[i].amount)
    params.append("items[" + i + "][distance]", itemTypeData[i].distance)
    params.append("items[" + i + "][notes]", itemTypeData[i].notes)
    params.append("items[" + i + "][date_travel]", moment(itemTypeData[i].travelDate).format("YYYY-MM-DD"))
    params.append("items[" + i + "][address_start][address]", itemTypeData[i].startAddress1)
    params.append("items[" + i + "][address_start][address2]", itemTypeData[i].startAddress2)
    params.append("items[" + i + "][address_start][city]", itemTypeData[i].startCity)
    params.append("items[" + i + "][address_start][state]", itemTypeData[i].startState)
    params.append("items[" + i + "][address_start][zipcode]", itemTypeData[i].startZipCode)
    params.append("items[" + i + "][address_end][address]", itemTypeData[i].endAddress1)
    params.append("items[" + i + "][address_end][address2]", itemTypeData[i].endAddress2)
    params.append("items[" + i + "][address_end][city]", itemTypeData[i].endCity)
    params.append("items[" + i + "][address_end][state]", itemTypeData[i].endState)
    params.append("items[" + i + "][address_end][zipcode]", itemTypeData[i].endZipCode)
    params.append("items[" + i + "][_amount_required]", itemTypeData[i].amountRequired)
    params.append("items[" + i + "][_upload_required]", itemTypeData[i].uploadRequired)
    params.append("items[" + i + "][roundtrip]", itemTypeData[i].roundTrip)

    for (var j = 0; j < itemTypeData[i].files.length; j++) {
      params.append("items[" + i + "][files][" + j + "][hash]", itemTypeData[i].files[j].hash)
      params.append("items[" + i + "][files][" + j + "][name]", itemTypeData[i].files[j].name)
      params.append("items[" + i + "][files][" + j + "][size]", itemTypeData[i].files[j].size)
      params.append("items[" + i + "][files][" + j + "][mime]", itemTypeData[i].files[j].mime)
      params.append("items[" + i + "][files][" + j + "][thumbnail]", itemTypeData[i].files[j].thumbnail)
      params.append("items[" + i + "][file_hashes][" + j + "]", itemTypeData[i].files[j].hash)
    }
  }

  return axios.post(NewReimbursement_Post_URL + `${id}`, params, config1)
}

export function newRequest_Post(id, req, myTravelReqData) {
  const params = new URLSearchParams()
  params.append("patient_id", req.Patient_id)
  params.append("study_id", req.StudiesID)
  params.append("site_id", req.SiteID)
  params.append("visit_id", req.Visit_Id)
  params.append("submitted_by", req.submitted_by)
  params.append("visit_start_date", req.Visit_Start_Date)
  params.append("travel_start_date", req.Travel_Start_Date)
  params.append("travel_end_date", req.Travel_End_Date)
  params.append("comment", req.Comment)
  params.append("visit_end_date", req.Visit_Start_Date)
  params.append("patient_save", req.Patient_Save)
  params.append("id", req.id_data)
  params.append("date_added", req.date_added)

  for (var i = 0; i < myTravelReqData.length; i++) {
      if (myTravelReqData[i].valueName.toLowerCase() === "air" ||
        myTravelReqData[i].valueName.toLowerCase() === "ground" ||
        myTravelReqData[i].valueName.toLowerCase() === "hotel"
      ) {
        params.append("_travel_types[" + i + "][id]", myTravelReqData[i].id)
        params.append("_travel_types[" + i + "][selected]", 1)
        params.append("_travel_types[" + i + "][travel_request_id]", myTravelReqData[i].travel_types_id)
        params.append("_travel_types[" + i + "][label]", myTravelReqData[i].valueName.toLowerCase())
        params.append("_travel_types[" + i + "][departure_date]", myTravelReqData[i].depentureDates + " " + myTravelReqData[i].depentureTime)
        params.append("_travel_types[" + i + "][return_date]", myTravelReqData[i].returnDate + " " + myTravelReqData[i].returnTime)
      }
  }
  return axios.post(NewRequest_Post_URL + `${id}`, params, config1)
}

export function removeNotification(id) {
  const params = new URLSearchParams()
  return axios.post(Remove_Notifiaction_URL + `${id}`, params, config1)
}

export function barChartShowData(id, Study_id) {
  return axios.get(BarChart_URL + `${id}&studyID=` + `${Study_id}`, config1);
}

export function flightTimePreferencesURL(id) {
  return axios.get(Flight_Time_Preferences_URL + id, config1);
}

export function seatingPreferencesURL(id) {
  return axios.get(Seating_Preferences_URL + id, config1);
}

export function undoNotification(id) {
  return axios.get(Undo_Notificaton_URL + `${id}`, config1)
}

export function allNotification(Study_id, id) {
  return axios.get(All_Notification_URL + `${Study_id}&user=` + `${id}`, config1)
}

export function archievedNotification(id, Study_id) {
  return axios.get(Archieved_Notification_URL + `${id}&study_id=` + `${Study_id}`, config1)
}

export function notificationsDashboard(id, Study_id) {
  return axios.get(Notification_URL + `${id}` + '&study_id=' + `${Study_id}`, config1);
}

export function userNotifications(id) {
  return axios.get(User_Notification_Count_URL + `${id}`, config1)
}

export function myTravelNewReimbursementAddress(Patient_id, User_id) {
  return axios.get(MyTravel_New_Reimbursement_Address_URL + `${Patient_id}&user=` + `${User_id}`, config1)
}

export function reimbursements(id, Study_id, Start_date, End_date) {
  return axios.get(Reimbursements_URL + `${id}` + '&study_id=' + `${Study_id}` + '&date_start=' + `${Start_date}` + '&date_end=' + `${End_date}`, config1)
}

export function patientPushNotification(id, parameter) {
  return axios.get(Patient_Push_Notification_URL + `${id}&status=` + `${parameter}`, config1)
}

export function myStudies(user_id) {
  return axios.get(MyStudies_URL + `${user_id}`, config1)
}

export function myTravel(id, Study_id, Start_date, End_date) {
  return axios.get(MyTravel_URL + `${id}` + '&study_id=' + `${Study_id}` + '&date_start=' + `${Start_date}` + '&date_end=' + `${End_date}`, config1)
}

export function studiesList(id) {
  return axios.get(Studies_URL + `${id}` + "&user=" + `${id}`, config1)
}

export function myProgileImageGet(hash) {
  return axios.get(MyProgileImageGet_URL + `${hash}`, config1)
}

export function myProfile(id) {
  return axios.get(Profile_URL + `${id}`, config1)
}

export function travelPreferencesGet(id) {
  return axios.get(TravelPreference_GET_URL + `${id}`, config1)
}

export function reimbursementAttachements(data) {
  return axios.get(Reimbursement_Attachements_URL + `${data}`, config2);
}

export function downloadAttachements(data) {
  return axios.get(Download_Attachement_URL + `${data}`, config2);
}

export function allCountriesStatestimezones() {
  return axios.get(AllCountries_States_timezones_URL, config1)
}

export function newReimbursementVisitName(StudiesId, SiteId, id) {
  return axios.get(NewReimbursement_Visit_Name_URL + `${StudiesId}/sites/` + `${SiteId}?user=` + `${id}`, config1)
}

export function stipendData(StudiesId, id, SiteId, Start_date, End_date) {
  if (Start_date === null || Start_date === undefined || Start_date === "" || End_date === null || End_date === undefined || End_date === "") {
    return axios.get(Stipend_URL + `${StudiesId}?user=` + `${id}&site_id=` + `${SiteId}`, config1)
  } else {
    return axios.get(Stipend_URL + `${StudiesId}?user=` + `${id}&site_id=` + `${SiteId}&date_start=` + `${Start_date}&date_end=` + `${End_date}`, config1)
  }
}

export function newReimbursementItemType(id) {
  return axios.get(NewReimbursement_Item_Type_URL + `${id}`, config1)
}

export function multiLanguage(id) {
  return axios.get(MultiLanguage_URL + `${id}`, config1);
}