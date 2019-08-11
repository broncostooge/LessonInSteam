import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../Content/CSS/index.css';
import { store } from '../../Store/store.js';
import { UpdateAndLoadGameInfoFromSteamAPI, UpdateGameTitleAndTime, SetBackgroundImage } from '../../Utilities/APIUtils.js'

class UpdateAndLoadGameInfo extends Component {
    constructor (props) {
        super(props);

        document.getElementById("root").style.backgroundImage = 'url(https://images3.alphacoders.com/693/693872.jpg)';
        document.getElementById("root").style.backgroundSize = 'cover';
    }

    render(){
        const selectedGameTime = store.getState().selectedGameTime;
        const selectedGameTitle = store.getState().selectedGameTitle;
        const gameList = store.getState().gameList;
        const topFiveGames = store.getState().topFiveGames;

        let gameListToDisplay = null;
        let topFiveGamesToDisplay = null;
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

            topFiveGamesToDisplay = topFiveGames.map((element, index) => {
                let imgIconURL = 'http://media.steampowered.com/steamcommunity/public/images/apps/' + element.appid + '/' + element.img_icon_url + '.jpg'
                let imgLogoURL = 'http://media.steampowered.com/steamcommunity/public/images/apps/' + element.appid + '/' + element.img_logo_url + '.jpg'
                return <p key={index}>{index + 1}) <img alt={element.gamename} src={imgIconURL}/> {element.name} - {element.playtime_forever}<img alt={element.gamename} src={imgLogoURL}/></p>
            })

            selectStyles = {
                display: ""
            }
            
        }
        
        return(
        <div>
                <input id="username" placeholder="Username" type="text"></input>
                <button onClick={UpdateAndLoadGameInfoFromSteamAPI}>UpdateAndLoadGameInfoFromSteamAPI</button>
                <select onChange={SetBackgroundImage} id="gameList" style={selectStyles}>{allOption}{gameListToDisplay}</select>
                <h1 style={selectStyles}>{selectedGameTitle}</h1>
                <h2 style={selectStyles}>{selectedGameTime} mins</h2>
                <h3 style={selectStyles}>Top 5 Games</h3>
                <h4>{topFiveGamesToDisplay}</h4>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        gameList: state.gameList,
        selectedGameTitle: state.selectedGameTitle,
        selectedGameTime: state.selectedGameTime,
        topFiveGames: state.topFiveGames
    };
}

export default connect(mapStateToProps)(UpdateAndLoadGameInfo);