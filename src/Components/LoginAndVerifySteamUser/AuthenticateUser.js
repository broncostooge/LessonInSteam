import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import Button from '@material-ui/core/Button';
import { signIn } from '../../Utilities/AuthenticateUtils.js'
import { store } from '../../Store/store'

class AuthenticateUser extends Component {
  
    constructor(props){
      super(props)
      this.state = {
      }
    }

    render(){
        return(
            
            <Provider store={store} >
                <div>
                    <h1 id="Title">Lesson In Steam</h1>
                    <Button id="SignIn" variant="contained" color="primary" onClick={() => signIn(this.props)}>Authenticate</Button>
                </div>
            </Provider>
        )
    }
}

function mapStateToProps(state) {
    return { 
    };
}

export default connect(mapStateToProps)(AuthenticateUser);