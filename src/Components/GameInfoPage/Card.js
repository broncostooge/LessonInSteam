import React, { Component } from 'react';
//import { store } from '../../Store/store.js';

class Card extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        const gif = <iframe src="https://giphy.com/embed/xTiTnJK44NXT46iKYM" width="480" height="345" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>;

        return(
            <div>
                <h3>
                    {this.props.title}
                </h3>
                <h4 style={this.props.selectStyles}>
                    {this.props.text}
                </h4>
                {this.props.gif}
            </div>
        )
    }
}

export default Card;