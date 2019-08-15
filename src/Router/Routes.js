import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

//Components
import LoginUser from '../Components/LoginPage/LoginUser'
import UpdateAndLoadGameInfo from '../Components/GameInfoPage/UpdateAndLoadGameInfo'


export default class Routes extends Component {
    render(){

        return(
            <Switch>
                <Route exact path='/' component={LoginUser}/>
                <Route exact path='/LessonInSteam' component={UpdateAndLoadGameInfo}/>
            </Switch>
        );
    };
}