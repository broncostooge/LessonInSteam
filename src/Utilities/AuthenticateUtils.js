import * as Msal from 'msal';
import { store } from '../Store/store'

var msalConfig = {
    auth: {
        clientId: "d9c5b326-a070-4d7c-a71d-34cf289567b7",
        authority: "https://login.microsoftonline.com/common"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};


var graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};

// create a request object for login or token request calls
// In scenarios with incremental consent, the request object can be further customized
var requestObj = {
    scopes: ["user.read"]
};

var myMSALObj = new Msal.UserAgentApplication(msalConfig);

// Register Callbacks for redirect flow
// myMSALObj.handleRedirectCallbacks(acquireTokenRedirectCallBack, acquireTokenErrorRedirectCallBack);
myMSALObj.handleRedirectCallback(authRedirectCallBack);

export function signIn(props) {
    myMSALObj.loginPopup(requestObj).then(function (loginResponse) {
        store.dispatch({ type: 'SET_ISAUTHENTICATED', isAuthenticated: true });
        store.dispatch({ type: 'SET_ACCOUNT', account: loginResponse });
        props.history.push('/VerifySteamUser')
    }).catch(function (error) {
        //Please check the console for errors
        console.log(error);
    });
}

export function signOut(props) {
    myMSALObj.logout();

    store.dispatch({ type: 'SET_ISAUTHENTICATED', isAuthenticated: false });
    store.dispatch({ type: 'SET_ACCOUNT', account: null });

    props.history.push('/')
}

function acquireTokenPopupAndCallMSGraph() {
    //Always start with acquireTokenSilent to obtain a token in the signed in user from cache
    myMSALObj.acquireTokenSilent(requestObj).then(function (tokenResponse) {
        callMSGraph(graphConfig.graphMeEndpoint, tokenResponse.accessToken, graphAPICallback);
    }).catch(function (error) {
        console.log(error);
        // Upon acquireTokenSilent failure (due to consent or interaction or login required ONLY)
        // Call acquireTokenPopup(popup window) 
        if (requiresInteraction(error.errorCode)) {
            myMSALObj.acquireTokenPopup(requestObj).then(function (tokenResponse) {
                callMSGraph(graphConfig.graphMeEndpoint, tokenResponse.accessToken, graphAPICallback);
            }).catch(function (error) {
                console.log(error);
            });
        }
    });
}

function callMSGraph(theUrl, accessToken, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200)
            callback(JSON.parse(this.responseText));
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xmlHttp.send();
}

function graphAPICallback(data) {
    //document.getElementById("json").innerHTML = JSON.stringify(data, null, 2);
}

//This function can be removed if you do not need to support IE
function acquireTokenRedirectAndCallMSGraph() {
    //Always start with acquireTokenSilent to obtain a token in the signed in user from cache
    myMSALObj.acquireTokenSilent(requestObj).then(function (tokenResponse) {
        callMSGraph(graphConfig.graphMeEndpoint, tokenResponse.accessToken, graphAPICallback);
    }).catch(function (error) {
        console.log(error);
        // Upon acquireTokenSilent failure (due to consent or interaction or login required ONLY)
        // Call acquireTokenRedirect
        if (requiresInteraction(error.errorCode)) {
            myMSALObj.acquireTokenRedirect(requestObj);
        }
    });
}

function authRedirectCallBack(error, response) {
    if (error) {
        console.log(error);
    } else {
        if (response.tokenType === "access_token") {
            callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, graphAPICallback);
        } else {
            console.log("token type is:" + response.tokenType);
        }
    }
}

function requiresInteraction(errorCode) {
    if (!errorCode || !errorCode.length) {
        return false;
    }
    return errorCode === "consent_required" ||
        errorCode === "interaction_required" ||
        errorCode === "login_required";
}

// Browser check variables
var ua = window.navigator.userAgent;
var msie = ua.indexOf('MSIE ');
var msie11 = ua.indexOf('Trident/');
//var msedge = ua.indexOf('Edge/');
var isIE = msie > 0 || msie11 > 0;
//var isEdge = msedge > 0;

//If you support IE, our recommendation is that you sign-in using Redirect APIs
//If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check

// can change this to default an experience outside browser use
var loginType = isIE ? "REDIRECT" : "POPUP";

// runs on page load, change config to try different login types to see what is best for your application
if (loginType === 'POPUP') {
    if (myMSALObj.getAccount()) {// avoid duplicate code execution on page load in case of iframe and popup window.
        //showWelcomeMessage();
        acquireTokenPopupAndCallMSGraph();
    }
}
else if (loginType === 'REDIRECT') {
    document.getElementById("SignIn").onclick = function () {
        myMSALObj.loginRedirect(requestObj);
    };

    if (myMSALObj.getAccount() && !myMSALObj.isCallback(window.location.hash)) {// avoid duplicate code execution on page load in case of iframe and popup window.
        //showWelcomeMessage();
        acquireTokenRedirectAndCallMSGraph();
    }
} else {
    console.error('Please set a valid login type');
}