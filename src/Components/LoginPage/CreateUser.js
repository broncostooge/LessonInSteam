import React, { Component } from 'react';
//import { LoginUser, GetUserSteamGamesFromDB, GetUserSteamGamesFromSteamAPI } from '../Utilities/APIUtils.js'

class CreateUser extends Component {
    constructor (props) {
        super(props);
        this.state = {
            gamelist: [],
            gamePrice: [],
            offset: 0
        }

        this.GetUserSteamGamesFromSteamAPI = this.GetUserSteamGamesFromSteamAPI.bind(this);
    }

    async GetUserSteamGamesFromSteamAPI(){
        const username = document.getElementById("username").value;
      
        const data = {
          userName: username
        }
      
        let headers = new Headers();
      
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
      /*
        await fetch('https://lessoninsteamservices.azurewebsites.net/GetUserSteamGameInfoFromSteamAPI', {
          method: "PUT",
          body: JSON.stringify(data),
          headers: headers
        })
        .then(response => response.json())
        .then(json => console.log(json));
        */

        await fetch(' http://localhost:57766/GetUserSteamGameInfoFromSteamAPI', {
          method: "PUT",
          body: JSON.stringify(data),
          headers: headers
        })
        .then(response => response.json())
        .then(json => this.setState((state, props) => {
            return {gamelist: json};
        }));
/*
        this.state.gamelist.map((game, index, offset) => {
            setTimeout(() =>{
                return this.GetSteamGameInfoFromSteamAPI(game.appid);
            }, 1000 + (index * 100))
        })
*/
      }

    async GetSteamGameInfoFromDB(appId){
        const data = {
          appId: appId
        }
      
        let headers = new Headers();
      
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        await fetch(' http://localhost:57766/GetSteamGameInfoFromDB', {
          method: "PUT",
          body: JSON.stringify(data),
          headers: headers
        })
        .then(response => response.json())
        .then(json => this.setState((state, props) => {
            return {gamePrice: json};
        }));
    }

    render(){
        let gameList = null;

        let selectStyles = {
            display: "none"
        }

        if(this.state.gamelist.length > 0){
            gameList = this.state.gamelist.map((element, index) => {
                return <option key={index} value="{element.name}">{element.name} - </option>;
            });

            selectStyles = {
                display: ""
            }
        }

        return(
            <div>
                <input id="username" placeholder="Username" type="text"></input>
                {/*<input id="password" placeholder="Password" type="password"></input>
                <button onClick={LoginUser}>Submit</button>
                <button onClick={GetUserSteamGamesFromDB}>GetUserSteamGamesFromDB</button>*/}
                <button onClick={() => this.GetSteamGameInfoFromSteamAPI("57690")}>GetSteamGameInfoFromSteamAPI</button>
                <button onClick={this.GetUserSteamGamesFromSteamAPI}>GetUserSteamGamesFromSteamAPI</button>
                <select style={selectStyles}>{gameList}</select>
            </div>
        )
    }
}

export default CreateUser;