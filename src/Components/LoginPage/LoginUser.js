import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { VerifySteamUserName, UpdateAndLoadGameInfoFromSteamAPI } from '../../Utilities/APIUtils.js'
import { store } from '../../Store/store'
import LinearProgress from '@material-ui/core/LinearProgress';

class LoginUser extends Component {
  
    constructor(props){
      super(props)
      this.state = {
      }
    }

    render(){
        
        return(
            
            <Provider store={store} >
                <div>
                    <TextField onChange={VerifySteamUserName} id="username" placeholder="Username" type="text" />

                        <Button variant="contained" color="primary" onClick={() => UpdateAndLoadGameInfoFromSteamAPI(this.props)}>UpdateAndLoadGameInfoFromSteamAPI</Button>

                </div>
            </Provider>
        )
    }
}

function mapStateToProps(state) {
    return { 
    };
}

export default connect(mapStateToProps)(LoginUser);