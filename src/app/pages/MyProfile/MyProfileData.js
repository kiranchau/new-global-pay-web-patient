import React, { Component } from "react";
import { SideNav } from "../Layout/SideNav";
import { Header } from "../Layout/Header";
import { Footer } from "../Layout/Footer";
import moment from "moment";
import Modal from "react-modal";
import {
  allCountriesStatestimezones,
  myProfile,
  myProfileImageUpload,
  myProgileImageGet,
  removeImage,
} from "../../modules/Auth/_redux/authCrud";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Loading from "react-loading-bar";
import "react-loading-bar/dist/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
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

class MyProfileData extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.replaceRef = React.createRef(null);
    this.state = {
      loader: true,
      profileFirstName: "",
      profileLastName: "",
      profileBirthDate: "",
      profileEmailAddress: "",
      profileAddress: "",
      profileAddress2: "",
      profileCity: "",
      profilePhoneNumber: "",
      profileHomePhoneNumber: "",
      profileCountry: "",
      profileState: "",
      profileZipCode: "",
      profileState_enabled: 0,
      profileZipCode_enabled: 0,
      imageGet: "",
      imageData: localStorage.getItem("ImageUpdate"),
      removeImageModal: false,
      allCountries: [],
      manageStates: [],
      updateState: [],
      file: "",
      imageLogo: "",
      sideMenu: false,
      travelPreferences: false,
      replaceProfilePicutre: false,
    };
    this.imageUploading = this.imageUploading.bind(this);
    this.toastId = React.createRef(null);
  }

  componentDidMount() {
    localStorage.getItem("ConditionsReimbursements") === "0" &&
      localStorage.getItem("ConditionsStipends") === "0"
      ? this.setState({ sideMenu: false }, () => { })
      : localStorage.getItem("ConditionsReimbursements") === "1"
        ? this.setState({ sideMenu: true }, () => { })
        : localStorage.getItem("ConditionsStipends") === "1"
          ? this.setState({ sideMenu: true }, () => { })
          : this.setState({ sideMenu: false }, () => { });

    localStorage.getItem("ConditionsTaravales") === "1"
      ? this.setState({ travelPreferences: true }, () => { })
      : this.setState({ travelPreferences: false }, () => { });

    this.setState({ loader: true });
    myProfile(localStorage.getItem("id"))
      .then((value) => {
        this.setState(
          {
            profileState: value.data.record.state,
            profileCountry: value.data.record.country,
            profileFirstName: value.data.record.firstname,
            profileLastName: value.data.record.lastname,
            profileBirthDate: value.data.record.dob,
            profileEmailAddress: value.data.record.emailaddress,
            profileAddress: value.data.record.address,
            profileAddress2: value.data.record.address2,
            profileCity: value.data.record.city,
            profileZipCode: value.data.record.zipcode,
            profilePhoneNumber: value.data.record.phone_mobile,
            profileHomePhoneNumber: value.data.record.phone_home,
            imageLogo:
              value.data.record.firstname.charAt(0) +
              value.data.record.lastname.charAt(0),
          },
          () => { }
        );
        this.setState({ loader: false });
      })
      .catch((err) => {
        this.setState({ loader: false });
      })
      .finally(() => {
        this.countries();
      });
  }

  //Dropdown countries api calling.
  countries = () => {
    allCountriesStatestimezones()
      .then((value) => {
        this.setState(
          {
            manageStates: value.data.states,
            allCountries: value.data.countries,
          },
          () => {
            this.state.allCountries.map((country) => {
              if (this.state.profileCountry === country.code) {
                this.setState(
                  {
                    profileState_enabled: country.state_enabled,
                    profileZipCode_enabled: country.zipcode_enabled,
                  },
                  () => { }
                );
              }
            });
          }
        );
      })
      .catch((err) => { });
  };

  //Image uploading api calling.
  async imageUploading(e) {
    this.setState({ loader: true }, () => { });
    if (
      e.target.files[0] === undefined ||
      e.target.files[0] === null ||
      e.target.files[0] === ""
    ) {
    } else {
      this.state.file = e.target.files[0];
    }
    myProfileImageUpload(this.state.file, localStorage.getItem("id"))
      .then((res) => {
        this.setState({ imageGet: res.data.hash });
        this.setState(
          {
            imageData: `${process.env.REACT_APP_API_URL}/api/v1/profile?hash=${res.data.hash}`,
            imageGet: res.data.hash,
          },
          () => { }
        );
        localStorage.setItem("ImageUpdate", this.state.imageData);
        if (!toast.isActive(this.toastId.current)) {
          this.toastId.current = toast.success(
            this.props.t("Profile picture uploaded successfully."),
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
      })
      .catch((error) => {
        this.setState({ loader: false }, () => { });
      })
      .finally(() => {
        myProgileImageGet(this.state.imageGet)
          .then((value) => {
            this.setState(
              {
                imageData:
                  this.state.imageGet !== ""
                    ? `${process.env.REACT_APP_API_URL}/api/v1/profile?hash=${this.state.imageGet}`
                    : localStorage.getItem("ImageUpdate"),
              },
              () => { }
            );
            this.childMethod("Next");
            this.setState({ loader: false }, () => { });
          })
          .catch((error) => {
            this.setState({ loader: false }, () => { });
          });
      });
    this.setState({ replaceProfilePicutre: false }, () => { });
  }

  //Image Remove fapi calling.
  imageRemoveal = () => {
    this.setState({ loader: true });
    let data = { user: localStorage.getItem("id") };
    removeImage(data)
      .then((val) => {
        this.setState(
          {
            removeImageModal: false,
            imageData: "",
          },
          () => { }
        );
        localStorage.setItem("ImageUpdate", "");
        this.childMethod("Next");
        this.setState({ loader: false });
      })
      .catch((err) => {
        this.setState({ loader: false });
      });
  };

  //Parent-to-child component call data update.
  childMethod = (type) => {
    if (type === "Next") {
      this.myRef.current.childFunction1();
    }
  };

  render() {
    const { t } = this.props;
    let temp = [];
    Object.entries(this.state.manageStates).map((key, value) => {
      if (key[0] === this.state.profileCountry) {
        temp = key[1];
        this.state.updateState = temp;
      }
    });
    this.state.manageStates = this.state.updateState;

    return (
      <div>
        <main className="dashboard-wrap inner-page">
          <div className="">
            <Loading
              show={this.state.loader}
              color="#2d8f84"
              showSpinner={false}
            />
            <SideNav
              sideMenu={this.state.sideMenu}
              travelPreferences={this.state.travelPreferences}
            />
            <div className="right-section left-space">
              <Header
                ref={this.myRef}
                travelPreferences={this.state.travelPreferences}
                title={t("My Account")}
              />
              <div className="middle-content-padding">
                <div className="my-profile-wrap">
                  <div className="container-fluid p-0">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="upload-img-wrap">
                          <div className="upload-img">
                            <div className="image">
                              {this.state.imageData !== "" ? (
                                <img
                                  src={this.state.imageData}
                                  alt=""
                                  width="100%"
                                  onLoad={() => this.childMethod("Next")}
                                />
                              ) : (
                                <span>{this.state.imageLogo}</span>
                              )}
                            </div>
                            <div className="edit-icon">
                              {this.state.imageData !== "" ? (
                                <img
                                  src="/media/misc/edit-icon.png"
                                  alt="Unable to load"
                                  onClick={() => {
                                    this.setState(
                                      { replaceProfilePicutre: true },
                                      () => { }
                                    );
                                  }}
                                  width="100%"
                                />
                              ) : (
                                <>
                                  <input
                                    className="upload-input"
                                    type="file"
                                    alt="Los Angeles"
                                    width="100%"
                                    title={
                                      this.state.imageData !== ""
                                        ? ""
                                        : t("No file selected")
                                    }
                                    onChange={(e) => {
                                      this.imageUploading(e);
                                    }}
                                  />
                                  <img
                                    src="/media/misc/edit-icon.png"
                                    alt="Unable to load"
                                    title={t("Add profile")}
                                    width="100%"
                                  />
                                </>
                              )}
                            </div>
                          </div>
                          {this.state.imageData === "" ? (
                            <></>
                          ) : (
                            <Link
                              onClick={() =>
                                this.setState(
                                  { removeImageModal: true },
                                  () => { }
                                )
                              }
                              href="#"
                              className="mt-3 remove-pic"
                            >
                              {t("Remove picture")}
                            </Link>
                          )}
                          <div className="user-name">
                            <h4>
                              {this.state.imageLogo === ""
                                ? ""
                                : this.state.profileFirstName +
                                " " +
                                this.state.profileLastName}
                            </h4>
                            <p>
                              {this.state.profileAddress !== ""
                                ? this.state.profileAddress + ", "
                                : ""}

                              {this.state.profileAddress2 !== ""
                                ? this.state.profileAddress2 + ", "
                                : ""}
                              {this.state.profileCity}
                              {(this.state.profileZipCode_enabled === '0' ? "" : this.state.profileZipCode !== '' ? ", " + this.state.profileZipCode : "")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="personal-info">
                          <div className="personal-info-header">
                            <h4>{t("Profile")}</h4>
                            <p>
                              <b>{t("Note")} : </b>
                              {t(
                                "If you require support or if you need to update your profile information,"
                              )}
                              <br />{" "}
                              {t(
                                "please contact your clinical site for assistance."
                              )}
                            </p>
                          </div>
                          <form>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="firstName">
                                    {t("First name")}
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    disabled
                                    value={this.state.profileFirstName}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="lastName">
                                    {t("Last name")}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                    value={this.state.profileLastName}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="lastName">
                                    {t("Date Of Birth")}
                                  </label>


                                  <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                    value={moment(this.state.profileBirthDate).format('D-MMM-YYYY')}
                                  />


                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="email">
                                    {t("Email address")}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                    value={this.state.profileEmailAddress}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="pNumber">
                                    {t("Mobile Phone Number")}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                    value={this.state.profilePhoneNumber}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="pNumber">
                                    {t("Home Phone Number")}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                    value={this.state.profileHomePhoneNumber}
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="sel1">{t("Country")}</label>
                                  <div className="select-icon">
                                    <select
                                      id="sel1"
                                      disabled
                                      name="country"
                                      value={this.state.profileCountry}
                                    >

                                      {
                                        Object.entries(this.state.allCountries).map(([key, value]) => {
                                          if (this.state.profileCountry === value.code) {
                                            return (
                                              <option key={key} value={value.code}
                                                Selected={this.state.profileCountry === value.code ? value.name : ""}>
                                                {value.name}</option>)

                                          } else {
                                            return (
                                              <option key={key} value={value.code}  >

                                                {value.name}</option>)
                                          }
                                        })
                                      }
                                    </select>
                                    <i className="fa fa-caret-down"></i>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  {this.state.profileState_enabled === '0' ? (
                                    <></>
                                  ) : (
                                    <>
                                      <label htmlFor="sel1">{t("State/Region/Province")}</label>
                                      <div className="select-icon">
                                        <select
                                          disabled
                                          id="sel1"
                                          value={this.state.profileState}
                                        >
                                          {this.state.manageStates.length ===
                                            0 ? (
                                            <option
                                              value={this.state.profileState}
                                            >
                                              {this.state.profileState}
                                            </option>
                                          ) : (
                                            Object.entries(
                                              this.state.manageStates
                                            ).map(([key, value]) => {
                                              if (this.state.profileState === key) {
                                                return (
                                                  <option key={key} value={key} Selected={this.state.profileState === key ? value : ""}>
                                                    {value}
                                                  </option>
                                                )
                                              } else {
                                                return (
                                                  <option key={key} value={key} >
                                                    {value}
                                                  </option>
                                                )
                                              }
                                            })
                                          )}
                                        </select>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
            <Modal
              isOpen={this.state.removeImageModal}
              onRequestClose={() =>
                this.setState({ removeImageModal: false }, () => { })
              }
              style={customStyles}
              ariaHideApp={false}
              className="remove-pic-modal"
            >
              <>
                <div className="pb-4 pt-3 pl-4 pr-4">
                  {t("Remove profile picture")}?
                </div>
                <button
                  className="btn btn-primary yes-btn ml-0"
                  onClick={() => this.imageRemoveal()}
                >
                  {t("Yes")}
                </button>
                <button
                  className="btn btn-danger no-btn"
                  style={{ marginLeft: "10px" }}
                  onClick={() =>
                    this.setState({ removeImageModal: false }, () => { })
                  }
                >
                  {t("No")}
                </button>
              </>
            </Modal>
            <Modal
              isOpen={this.state.replaceProfilePicutre}
              onRequestClose={() =>
                this.setState({ replaceProfilePicutre: false }, () => { })
              }
              style={customStyles}
              ariaHideApp={false}
              className="remove-pic-modal"
            >
              <>
                <div className="pb-4 pt-3 pl-4 pr-4">
                  {t("Replace profile picture")}?
                </div>
                <input
                  type="file"
                  ref={this.replaceRef}
                  onChange={(e) => {
                    this.imageUploading(e);
                  }}
                  style={{ display: "none" }}
                />
                <button
                  className="btn btn-primary yes-btn ml-0"
                  onClick={() => {
                    this.replaceRef.current.click();
                  }}
                >
                  {t("Yes")}
                </button>
                <button
                  className="btn btn-danger no-btn"
                  style={{ marginLeft: "10px" }}
                  onClick={() =>
                    this.setState({ replaceProfilePicutre: false }, () => { })
                  }
                >
                  {t("No")}
                </button>
              </>
            </Modal>
          </div>
        </main>
        <ToastContainer />
      </div>
    );
  }
}
export default withTranslation()(MyProfileData);
