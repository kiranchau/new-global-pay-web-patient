
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { createBrowserHistory } from 'history';
const accountSubject = new BehaviorSubject(null);
export const history = createBrowserHistory();



export const socialConnectService = {
    login,
    apiAuthenticate,
    logout,
    cleardata,
    google_login,
    account: accountSubject.asObservable(),
    get accountValue() { return accountSubject.value; }
};
let accounts = [];

async function login() {
    // login with facebook then authenticate with the API to get a JWT auth token
    const { authResponse } = await new Promise(window.FB.login);
    if (!authResponse) return;

 const data=  await apiAuthenticate(authResponse.accessToken);
return data;
}
let account

async function apiAuthenticate(accessToken) {

    await axios.get(`https://graph.facebook.com/v8.0/me?fields=id%2Cname%2Cemail&access_token=${accessToken}`)
        .then(response => {
            const { data } = response;
            if (data.error) {}

            if (true) {
                // create new account if first time logging in
                 account = {
                    facebookId: data.id,
                    name: data.name,
                    extraInfo: `This is some extra info about ${data.name} that is saved in the API`
                }
                accounts.push(account);
                localStorage.setItem("accountsKey", JSON.stringify(account));
                accountSubject.next(account);

            }
        });

return account
}


function cleardata() {
    accountSubject.next(null);
    accounts = [];
    history.push("/login")
}


function logout() {
    // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
    window.FB.api('/me/permissions', 'delete', () => window.FB.logout());
    accountSubject.next(null);
    accounts = [];
}

function google_login(res) {
}