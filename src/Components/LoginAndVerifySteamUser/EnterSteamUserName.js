import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { VerifySteamUserName, UpdateAndLoadGameInfoFromSteamAPI } from '../../Utilities/APIUtils.js'
import { signOut } from '../../Utilities/AuthenticateUtils.js'
import { store } from '../../Store/store'

class EnterSteamUserName extends Component {
  
    constructor(props){
      super(props)
      this.state = {
      }
    }

    render(){
        const styles = {
            display: 'none'
        }
        return(
            <Provider store={store} >
                <div>
                    <h1 id="Title">Lesson In Steam</h1>
                    <TextField onChange={VerifySteamUserName} className="" id="username" label="Steam Username" type="text" />
                    <p id="SteamNamveVerifyInfo"></p><br/>
                    <Button style={styles} id="VerifySteamNameButton" variant="contained" color="primary" onClick={() => UpdateAndLoadGameInfoFromSteamAPI(this.props)}>UpdateAndLoadGameInfoFromSteamAPI</Button><br/>
                    <Button id="SignOut" variant="contained" color="primary" onClick={() => signOut(this.props)}>SignOut</Button>
                </div>
            </Provider>
        )
    }
}

function mapStateToProps(state) {
    return { 
    };
}

export default connect(mapStateToProps)(EnterSteamUserName);