import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  Login: "[Login] Action",
  UserInfo: "[UserInfo] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  Global_notification_Requested: "[Request notification_global] Action",

  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
  SetStudy: "[Set study] Action",   
  SetCtmsStudyId: "[Set ctms_studyId] Action",
  Setnotifications: "[Set notifications] Action",
  NotificationsRequested: "[Request notifications] Action",

  CtmsDocRequested: "[Request ctmsDoc] Action",
  SetCtmsDocations: "[Set ctmsDoc] Action",

  SharedDocRequested: "[Request SharedDoc] Action",
  SetSharedDocations: "[Set SharedDoc] Action",
  Setlogo: "[Set logo] Action",
  Global_noti_loaded: "[Load notification_global] Auth API",


};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  userInfo:undefined,
};

export const reducer = persistReducer(
  { storage, key: "v726-demo1-auth", whitelist: ["authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }
      case actionTypes.UserInfo: {
        const { userInfo } = action.payload;

        return { ...state, userInfo };
      }
      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined};
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken) => ({ type: actionTypes.Login, payload: { authToken } }),
  userInfo: (userInfo) => ({ type: actionTypes.UserInfo, payload: { userInfo } }),
  register: (authToken) => ({
    type: actionTypes.Register,
    payload: { authToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user },
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
  setstudies_action: (studies) => ({ type: actionTypes.SetStudy, payload: { studies } }),
  requestNotification: (notifications) => ({
    type: actionTypes.NotificationsRequested,
    payload: { notifications },
  }),
  setnotifications_action: (notifications) => ({ type: actionTypes.Setnotifications, payload: { notifications } }),

  requesCTMSdDoc: (docsCTMS) => ({
    type: actionTypes.CtmsDocRequested,
    payload: { docsCTMS },
  }),

  setCtmsdDoc_action: (CtmsDoc) => ({ type: actionTypes.SetCtmsDocations, payload: { CtmsDoc } }),

  requesShareddDoc: (docpp) => ({
    type: actionTypes.SharedDocRequested,
    payload: { docpp },
  }),

  setSharedDoc_action: (docpp) => ({ type: actionTypes.SetSharedDocations, payload: { docpp } }),

  setlogo_action: (logo) => ({ type: actionTypes.Setlogo, payload: { logo } }),

  requestGlobal_notification: (notification) => ({
    type: actionTypes.Global_notification_Requested,
    payload: { notification },
  }),

  set_global_not: (Global_notification) => ({ type: actionTypes.Global_noti_loaded, payload: { Global_notification } }),
  setCTMS_studyID_action: (ctms_studyID) => ({ type: actionTypes.SetCtmsStudyId, payload: { ctms_studyID } }),



};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {

    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    yield put(actions.fulfillUser());
  });

}

