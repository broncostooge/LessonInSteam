import React, { Component } from 'react';
import { LoginUser, GetUserSteamGames } from '../Utilities/APIUtils.js'

class CreateUser extends Component {
  render(){
        return(
            <div>
                <input id="username" placeholder="Username" type="text"></input>
                <input id="password" placeholder="Password" type="password"></input>
                <button onClick={LoginUser}>Submit</button>
                <button onClick={GetUserSteamGames}>GetUserSteamGames</button>
            </div>
        )
    }
}

export default CreateUser;