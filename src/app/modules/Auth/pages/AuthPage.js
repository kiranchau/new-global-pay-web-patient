import React from "react"
import { Switch, Redirect } from "react-router-dom"
import { ContentRoute } from "../../../../_common/layout"
import EmailVerified from "./EmailVerified"
import ForgotPassword  from './ForgotPassword'
import Login from "./Login"
import { NewPasswordSet } from "./NewPasswordSet"
import { PasswordReset } from "./PasswordReset"


export function AuthPage() {
  return (
    <>
      <div>
        <Switch>
          <ContentRoute path="/auth/login" component={Login} />
          <ContentRoute path="/auth/forgot-password" component={ForgotPassword} />
          <ContentRoute path="/auth/email-verified" component={EmailVerified} />
          <ContentRoute path="/auth/password-reset" component={PasswordReset} />
          <ContentRoute path="/auth/new-password-set" component={NewPasswordSet} />
          <Redirect from="/auth" exact={true} to="/auth/login" />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </>
  )
}
