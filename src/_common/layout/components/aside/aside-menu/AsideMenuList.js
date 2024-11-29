import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_helpers";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/AddBox";
import ProductListIcon from "@material-ui/icons/LineStyleTwoTone";
import ProductAddIcon from "@material-ui/icons/AddRounded";
import AdminMessageIcon from "@material-ui/icons/Message";
import UserMessagesIcon from "@material-ui/icons/VerifiedUser";
import AppUserIcon from "@material-ui/icons/Apps";
import SubsCribeIcon from "@material-ui/icons/Subscriptions";

export const AsideMenuList = () => {
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [paramId, setparamId] = useState(0);
  const [PId, setPId] = useState(-1);
  const [activeItemId, setActiveItemId] = React.useState("");
  const [isMenuClicked, setisMenuClicked] = useState(false);
  const [QuestionHeader, setQuestionHeader] = useState(
    "/Questions/QuestionsList"
  );
  const [MessagesHeader, setMessagesHeader] = useState(
    "/Messages/AdminMessages"
  );
  const [UsersHeader, setUsersHeader] = useState("/Users/AppUsers");
  const [ProductHeader, setProductHeader] = useState(
    "/Products/ProductCategoryList"
  );
  const [surveyHeader, setSurveyHeader] = useState("/Surveys/SurveyList");
  useEffect(() => {
    setPId(-1);
    if (location.pathname.match(/\d+/g) !== null) {
      setPId(location.pathname.match(/\d+/g)[0]);
    }
    //function for HighLight headers and respective submenus 
    setHighlightedHeader();
    if (location.pathname.includes('\RewardAction')) {
      setActiveItemId('/Rewards');
    } else if (location.pathname.includes('\AccomplishAction')) {
      if(localStorage.getItem('AccomplishActionPageName')==='ReportedSpamsView')
      {
        setActiveItemId('/ReportedSpam');
      }else
      {
        setActiveItemId('/Accomplishments');
      }
    }else
     if(location.pathname.includes('\Accomplishment_Likes_comments'))
    {
      setActiveItemId('/Accomplishments');
    }else if(location.pathname.includes('/Users/UserView/'))
    {
      setActiveItemId('/Users/AppUsers');
      setUsersHeader("/Users/AppUsers");
    }else if(location.pathname.includes('/UserView/') || (location.pathname.includes('/WealthCoinAction/'))){
      setActiveItemId('/Wealth_coins')
    }
  }, [location.pathname]);

  const setHighlightedHeader = () => {
    // highlight selected Questions side menu header and respective sub menu
    if (location.pathname.includes("Questions")) 
    {
      if (location.pathname.includes("/Questions/QuestionDelete")) {
        setActiveItemId("/Questions/QuestionsList");
        setQuestionHeader("/Questions/QuestionsList");
        } else if(location.pathname.includes("/Questions/QuestionEdit"))  {
          setActiveItemId("/Questions/QuestionAdd");
          setQuestionHeader("/Questions/QuestionAdd");
        }else{
        setActiveItemId(location.pathname);
        setQuestionHeader(location.pathname);
      }

      setMessagesHeader("/Messages/AdminMessages");
      setUsersHeader("/Users/AppUsers");
      setProductHeader("/Products/ProductCategoryList");
      setSurveyHeader("/Surveys/SurveyList");
      // highlight selected Messages side menu header and respective sub menu
    } else if (location.pathname.includes("Messages"))
     {
      if (location.pathname.includes("/Messages/SendMessage")) {
        setActiveItemId("/Messages/AdminMessages");
        setMessagesHeader("/Messages/AdminMessages");
      } else {
        setActiveItemId(location.pathname);
        setMessagesHeader(location.pathname);
      }
      setQuestionHeader("/Questions/QuestionsList");

      setUsersHeader("/Users/AppUsers");
      setProductHeader("/Products/ProductCategoryList");
      setSurveyHeader("/Surveys/SurveyList");
      // highlight selected Users side menu header and respective sub menu
    } else if (location.pathname.includes("Users")) {
      if (
        location.pathname.includes("/Users/FitnessData") ||
        location.pathname.includes("/Users/FriendsView")
      ) {
        setActiveItemId("/Users/AppUsers");
        setUsersHeader("/Users/AppUsers");
      } else {
        setUsersHeader(location.pathname);
      }
      setQuestionHeader("/Questions/QuestionsList");
      setMessagesHeader("/Messages/AdminMessages");

      setProductHeader("/Products/ProductCategoryList");
      setSurveyHeader("/Surveys/SurveyList");

      // highlight selected Products side menu header and respective sub menu
    } else if (location.pathname.includes("Products")) 
    {
      if (location.pathname.includes("/Products/ProductCategoryDelete")) {
        setActiveItemId("/Products/ProductCategoryList");
        setProductHeader("/Products/ProductCategoryList");
      } else if (location.pathname.includes("/Products/ProductAllDelete")) {
        setActiveItemId("/Products/ProductList");
        setProductHeader("/Products/ProductList");
      }  
      else if(location.pathname.includes("/Products/ProductCategoryEdit"))  {
        setActiveItemId("/Products/ProductCategoryAdd");
        setProductHeader("/Products/ProductCategoryAdd");
      }
      else if(location.pathname.includes("/Products/ProductEdit"))  {
        setActiveItemId("/Products/ProductAdd");
        setProductHeader("/Products/ProductAdd");
      }
      else {
        setActiveItemId(location.pathname);
        setProductHeader(location.pathname);
      }

      setQuestionHeader("/Questions/QuestionsList");
      setMessagesHeader("/Messages/AdminMessages");
      setUsersHeader("/Users/AppUsers");

      setSurveyHeader("/Surveys/SurveyList");
      // highlight selected Surveys side menu header and respective sub menu
    } else if (location.pathname.includes("Surveys")) 
    {
      if (location.pathname.includes("/Surveys/SurveyDelete")) {
        setActiveItemId("/Surveys/SurveyList");
        setSurveyHeader("/Surveys/SurveyList");
      } else if (location.pathname.includes("/Surveys/SurveyResponseView/")) {
        setActiveItemId("/Surveys/SurveyResponseList");
        setSurveyHeader("/Surveys/SurveyResponseList");
      } else if (
        location.pathname.includes("/Surveys/DomainNotesResponseView/")
      ) {
        setActiveItemId("/Surveys/DomainNotesResponse");
        setSurveyHeader("/Surveys/DomainNotesResponse");
      }else  if (
        location.pathname.includes("/Surveys/SurveyEdit/")
      ) {
        setActiveItemId("/Surveys/SurveyAdd");
        setSurveyHeader("/Surveys/SurveyAdd");
      } else {
        setActiveItemId(location.pathname);
        setSurveyHeader(location.pathname);
      }

      setQuestionHeader("/Questions/QuestionsList");
      setMessagesHeader("/Messages/AdminMessages");
      setUsersHeader("/Users/AppUsers");
      setProductHeader("/Products/ProductCategoryList");
    }
  };
 

  return (
    <React.Fragment>
      {/* Sidebar Overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        <Navigation
          activeItemId={activeItemId === "" ? location.pathname : activeItemId}
          onSelect={({ itemId }) => {
            setisMenuClicked(true);
            setparamId(0);
            if (itemId.match(/[0-9]/g, "")) {
              var dltNumfromURL = itemId.replace(/[0-9]/g, "");
              var addmenuURL = dltNumfromURL;
               history.push(addmenuURL);
            } else {
              history.push(itemId);
            }
          }}
          items={[
            {
              title: "Dashboard",
              itemId: "/dashboard",
              // Optional
              elemBefore: () => (
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/dash.svg")}
                  />
                </span>
              ),
            },
            {
              title: "Accomplishments",
              itemId: "/Accomplishments",
              elemBefore: () => (
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Design/accomplish.svg"
                    )}
                  />
                </span>
              ),
            },

            {
              title: "Rewards",
              itemId: "/Rewards",
              elemBefore: () => (
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/reward.svg")}
                  />
                </span>
              ),
            },

            {
              title: "Products",
              itemId: ProductHeader,
              elemBefore: () => (
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/product.svg")}
                  />
                </span>
              ),

              subNav: [
                {
                  title: "Products Category List",
                  itemId: "/Products/ProductCategoryList",
                  elemBefore: () => <ListIcon />,
                },
                {
                  title: "Products Category Add",
                  itemId:
                    "/Products/ProductCategoryAdd" ,
                     elemBefore: () => <AddIcon />,
                },
                {
                  title: "Product List",
                  itemId: "/Products/ProductList",
                  elemBefore: () => <ProductListIcon />,
                },
                {
                  title: "Product Add",
                  itemId:
                    "/Products/ProductAdd",
                  elemBefore: () => <ProductAddIcon />,
                },
              ],
            },
            {
              title: "Questions",
              itemId: QuestionHeader,
              elemBefore: () => (
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/question.svg")}
                  />
                </span>
              ),
              subNav: [
                {
                  title: "Questions List",
                  itemId: "/Questions/QuestionsList",
                  elemBefore: () => <ListIcon />,
                },
                {
                  title: "Question Add",

                  itemId:
                    "/Questions/QuestionAdd",
                  elemBefore: () => <AddIcon />,
                },
              ],
            },
            {
              title: "Surveys",
              itemId: surveyHeader,
              elemBefore: () => (
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/survey.svg")}
                  />
                </span>
              ),
              subNav: [
                {
                  title: "Survey List",
                  itemId: "/Surveys/SurveyList",
                  elemBefore: () => <ListIcon />,
                },
                {
                  title: "Survey Add",
                  itemId: "/Surveys/SurveyAdd",
                  elemBefore: () => <AddIcon />,
                },
                {
                  title: "Survey Response List",
                  itemId: "/Surveys/SurveyResponseList",
                  elemBefore: () => <ProductListIcon />,
                },
                {
                  title: "Domain Notes Response",
                  itemId: "/Surveys/DomainNotesResponse",
                  elemBefore: () => <ProductListIcon />,
                },
              ],
            },
            {
              title: "Messages",
              itemId: MessagesHeader,
              elemBefore: () => (
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/message.svg")}
                  />
                </span>
              ),
              subNav: [
                {
                  title: "Admin Messages",
                  itemId: "/Messages/AdminMessages",
                  elemBefore: () => <AdminMessageIcon />,
                },
                {
                  title: "User Messages",
                  itemId: "/Messages/UserMessages",
                  elemBefore: () => <UserMessagesIcon />,
                },
              ],
            },
            {
              title: "WealthCoins",
              itemId: "/Wealth_coins",
              elemBefore: () => (
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/wealth.svg")}
                  />
                </span>
              ),
            },
            {
              title: "Users",
              itemId: UsersHeader,
              elemBefore: () => (
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/user.svg")}
                  />
                </span>
              ),
              subNav: [
                {
                  title: "App Users",
                  itemId: "/Users/AppUsers",
                  elemBefore: () => <AppUserIcon />,
                },
                {
                  title: "Subscribed Users",
                  itemId: "/Users/SubscribedUsers",
                  elemBefore: () => <SubsCribeIcon />,
                },
              ],
            },
            {
              title: "Notification",
              itemId: "/Notifications",
              elemBefore: () => (
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Design/notification.svg"
                    )}
                  />
                </span>
              ),
            },
            {
              title: "Reported Spam",
              itemId: "/ReportedSpam",
              elemBefore: () => (
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/report.svg")}
                  />
                </span>
              ),
            },
          ]}
        />
      </div>
    </React.Fragment>
  );
};
