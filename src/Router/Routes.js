import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { store } from '../Store/store';

//Components
import EnterSteamUserName from '../Components/LoginAndVerifySteamUser/EnterSteamUserName'
import AuthenticateUser from '../Components/LoginAndVerifySteamUser/AuthenticateUser'
import UpdateAndLoadGameInfo from '../Components/GameInfoPage/UpdateAndLoadGameInfo'


export default class Routes extends Component {
    render(){

        const PrivateRoute = ({ component: Component, ...rest}) => (
            <Route {...rest} render={(props) => (
                store.getState().isAuthenticated === true
                ? <Component {...props} />
                : <Redirect to="/"/>
            )} />
        )

        return(
            <Switch>
                <Route exact path='/' component={EnterSteamUserName}/>
                <Route exact path='/VerifySteamUser' component={EnterSteamUserName}/>
                <Route exact path='/LessonInSteam' component={UpdateAndLoadGameInfo}/>
                {/*<Route exact path='/VerifySteamUser' component={EnterSteamUserName}/>
                <Route exact path='/LessonInSteam' component={UpdateAndLoadGameInfo}/>*/}
            </Switch>
        );
    };
}