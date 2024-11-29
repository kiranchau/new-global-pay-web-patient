import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSubheader } from "../../../_common/layout";
import { ProfileOverview } from "./ProfileOverview";
import { ProfileCard } from "./components/ProfileCard";

export default function UserProfilePage() {
  const suhbeader = useSubheader();
  suhbeader.setTitle("User profile");
  return (
    <div className="d-flex flex-row">
      <ProfileCard></ProfileCard>
      <div className="flex-row-fluid ml-lg-8">
        <Switch>
          <Redirect
            from="/user-profile"
            exact={true}
            to="/user-profile/personal-information-readonly"
          />
          <Route
            path="/user-profile/profile-overview"
            component={ProfileOverview}
          />
        </Switch>
      </div>
    </div>
  );
}
