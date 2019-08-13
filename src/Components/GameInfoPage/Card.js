import React, { Component } from 'react';
//import { store } from '../../Store/store.js';

class Card extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <div>
                <h3>
                    {this.props.title}
                </h3>
                <h4 style={this.props.selectStyles}>
                    {this.props.text}
                </h4>
            </div>
        )
    }
}

export default Card;