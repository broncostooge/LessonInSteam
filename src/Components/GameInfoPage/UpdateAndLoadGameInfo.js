import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../Content/CSS/index.css';
import { store } from '../../Store/store.js';
import { UpdateAndLoadGameInfoFromSteamAPI, UpdateGameTitleAndTime } from '../../Utilities/APIUtils.js'

class UpdateAndLoadGameInfo extends Component {
    constructor (props) {
        super(props);

        document.getElementById("root").style.backgroundImage = 'url(https://images3.alphacoders.com/693/693872.jpg)';
        document.getElementById("root").style.backgroundSize = 'cover';

        this.HandleEvent = this.HandleEvent.bind(this);
    }

    
    HandleEvent(){
        const backgroundImageSourceURLbegin = "https://steamcdn-a.akamaihd.net/steam/apps/";
        const backgroundImageSourceURLend = "/page_bg_generated_v6b.jpg"
        let elementById_root = document.getElementById("root");
        
        const selectObject = document.getElementById("gameList");
        let selectedOptionValue = null;

        if(selectObject.selectedIndex > -1)
        {
            selectedOptionValue = selectObject.options[selectObject.selectedIndex].value;  
        }

        if(selectedOptionValue !== "All"){
            elementById_root.style.backgroundImage = 'url(' + backgroundImageSourceURLbegin + selectedOptionValue + backgroundImageSourceURLend + ')';
        }
        else{
            elementById_root.style.backgroundImage = 'url(https://images3.alphacoders.com/693/693872.jpg)';
        }
        elementById_root.style.backgroundSize = 'cover';

        UpdateGameTitleAndTime();
    }

    render(){
        const selectedGameTime = store.getState().selectedGameTime;
        const selectedGameTitle = store.getState().selectedGameTitle;
        const gameList = store.getState().gameList;

        let gameListToDisplay = null;
        let allOption = null;
        let selectStyles = {
            display: "none"
        }

        if(gameList.length > 0){

            let totalPlaytimeForever = 0;

            gameListToDisplay = gameList.map((element, index) => {
                totalPlaytimeForever += element.playtime_forever;
                return <option key={index} value={element.appid} gamename={element.name} time={element.playtime_forever}>{element.name} - {element.playtime_forever}</option>;
            });

            allOption = <option key="All" value="All" gamename="All" time={totalPlaytimeForever}>All - {totalPlaytimeForever} mins</option>;

            selectStyles = {
                display: ""
            }
            
        }
        
        return(
        <div>
                <input id="username" placeholder="Username" type="text"></input>
                <button onClick={UpdateAndLoadGameInfoFromSteamAPI}>UpdateAndLoadGameInfoFromSteamAPI</button>
                <select onChange={this.HandleEvent} id="gameList" style={selectStyles}>{allOption}{gameListToDisplay}</select>
                <h1 style={selectStyles}>{store.getState().selectedGameTitle}</h1>
                <h2 style={selectStyles}>{store.getState().selectedGameTime} mins</h2>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        gameList: state.gameList,
        selectedGameTitle: state.selectedGameTitle,
        selectedGameTime: state.selectedGameTime
    };
}

export default connect(mapStateToProps)(UpdateAndLoadGameInfo);