import React, { Component } from 'react';
import { store } from '../../Store/store.js';
import { UpdateAndLoadGameInfoFromSteamAPI, SetBackgroundImage, VerifySteamUserName } from '../../Utilities/APIUtils.js'

class ListOfSteamGames extends Component {
    render(){

        const selectedGameTime = store.getState().selectedGameTime;
        const selectedGameTitle = store.getState().selectedGameTitle;
        const gameList = store.getState().gameList;
        const topFiveGames = store.getState().topFiveGames;

        let GTInYearTime = 0;
        let GTInDayTime = 0;
        let GTInMileTime = 0;
        let GTInApolloTripTime = 0;
        let GTInCoastToCoastTripTime = 0;
        let GTInOGStarWarsFilmTime = 0;
        let GTInFootballSeasonTime = 0;
        let GTInFootballGameTime = 0;
        

        let gameListToDisplay = null;
        let topFiveGamesToDisplay = null;
        let allOption = null;
        let selectStyles = {
            display: "none"
        }

        if(gameList.length > 0){

            let totalPlaytimeForever = 0;

            GTInYearTime = (((selectedGameTime/60)/24)/365).toFixed(2);
            GTInDayTime = ((selectedGameTime/60)/24).toFixed(2);
            GTInMileTime = (selectedGameTime/10).toFixed(2);
            GTInApolloTripTime = (selectedGameTime/6165).toFixed(2);
            GTInCoastToCoastTripTime = (selectedGameTime/13440).toFixed(2);
            GTInOGStarWarsFilmTime = (selectedGameTime/1360).toFixed(2);
            GTInFootballSeasonTime = (selectedGameTime/3072).toFixed(2);
            GTInFootballGameTime = (selectedGameTime/192).toFixed(2);
            
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
                <select onChange={SetBackgroundImage} id="gameList" style={selectStyles}>{allOption}{gameListToDisplay}</select>
            </div>
        )
    }
}

export default ListOfSteamGames;