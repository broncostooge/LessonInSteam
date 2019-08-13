//MODULES
import React, { Component } from 'react';
import { connect } from 'react-redux';
//FUNCTIONS
import { store } from '../../Store/store.js';
import { UpdateAndLoadGameInfoFromSteamAPI, SetBackgroundImage, VerifySteamUserName } from '../../Utilities/APIUtils.js'
//COMPONENTS
import Grid from '@material-ui/core/Grid';
import Card from './Card.js'
//CONTENT
import '../../Content/CSS/index.css';
import '../../Content/CSS/MainPage.css';
import steamLogo from '../../Content/Images/Steam-Banner.jpg'

class UpdateAndLoadGameInfo extends Component {
    constructor (props) {
        super(props);

        document.getElementById("root").style.backgroundImage = 'url(https://images3.alphacoders.com/693/693872.jpg)';
        document.getElementById("root").style.backgroundSize = 'cover';
    }

    render(){
        const selectedGameTime = store.getState().selectedGameTime;
        const selectedGameTitle = store.getState().selectedGameTitle;
        const selectedGameAppID = store.getState().selectedGameAppID;
        const selectedGameLogoURL = store.getState().selectedGameLogoURL;
        let logoImageSrc = 'http://media.steampowered.com/steamcommunity/public/images/apps/' + selectedGameAppID + '/' + selectedGameLogoURL + '.jpg';
        const gameList = store.getState().gameList;
        const topFiveGames = store.getState().topFiveGames;

        const starWarsTitle = "Star Wars";
        const coastToCoastTitle = "Coast to Coast";
        const footballTitle = "Football";
        const apolloTitle = "Apollo 11";
        const milesTitle = "Miles";
        const timeInDayAndYearTitle = "Game Time Played In Years";
        const topFiveGamesTitle = "Top 5 Games";

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
        
        let starWarsText = null;
        let coastToCoastText = null;
        let footballText = null;
        let apolloText = null;
        let milesText = null;
        let timeInDayAndYearText = null;
        let topFiveGamesText = null;
        let gameInfoText = null;

        let gameInfoTitle = null;

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
                return <p key={index}>{index + 1}) 
                    <img alt={element.gamename} src={imgIconURL}/> {element.name} - {element.playtime_forever}
                    </p>
            })

            selectStyles = {
                display: ""
            }
            
            starWarsText = "You could have seen the Original Star Wars Trilogy " + GTInOGStarWarsFilmTime + " times (Orignal Star Wars Trilogy Running Time: 22 hours and 40 minutes)";
            coastToCoastText = "You could have taken the coast to coast drive across America" + GTInCoastToCoastTripTime + " times (Average time 224 hours)";
            footballText = "You have played through " + GTInFootballSeasonTime + " season of football or " + GTInFootballGameTime + " games of football";
            apolloText = "You could have taken " + GTInApolloTripTime + " trips to the moon in Apollo 11! (It took Apollo 11 4 days, 6 hours, and 45 minutes to reach the moon)";
            milesText = "You could have run " + GTInMileTime + " miles! (Average mile time 10 mins/mile)";
            timeInDayAndYearText = GTInYearTime +" years or " + GTInDayTime + " days";
            gameInfoText = selectedGameTime + " mins";
            topFiveGamesText = topFiveGamesToDisplay;
            
            gameInfoTitle = selectedGameTitle;

            if(selectedGameTitle === "All")
            {
                logoImageSrc = steamLogo;
            }
        }
        
        return(
            <div>
                <Grid container spacing={0}>
                    <Grid className='InnerGrid' item xs={4}>
                        <Card styles = {selectStyles} title = {starWarsTitle} text = {starWarsText} />
                    </Grid>
                    <Grid className='InnerGridInput' item xs={2}>
                        <input onChange={VerifySteamUserName}id="username" placeholder="Username" type="text"></input>
                        <button onClick={UpdateAndLoadGameInfoFromSteamAPI}>UpdateAndLoadGameInfoFromSteamAPI</button>
                    </Grid>
                    <Grid className='InnerGridInput' item xs={2}>
                        <select onChange={SetBackgroundImage} id="gameList" style={selectStyles}>{allOption}{gameListToDisplay}</select>
                    </Grid>
                    <Grid className='InnerGrid' item xs={4}>
                        <Card styles = {selectStyles} title = {timeInDayAndYearTitle} text = {timeInDayAndYearText} />
                    </Grid>
                    
                    <Grid className='InnerGrid' item xs={4}>test
                        <Card styles = {selectStyles} title = {coastToCoastTitle} text = {coastToCoastText} />
                    </Grid>
                    <Grid className='InnerGridMainParent' item xs={4}>

                        <Card styles = {selectStyles} title = {gameInfoTitle} text = {gameInfoText} />
                        <img className = 'MainInfoLogo' style={selectStyles} alt={selectedGameAppID} src={logoImageSrc}/>
                    </Grid>
                    <Grid className='InnerGrid' item xs={4}>
                        <Card styles = {selectStyles} title = {milesTitle} text = {milesText} />
                    </Grid>

                    <Grid className='InnerGrid' item xs={4}>
                        <Card styles = {selectStyles} title = {footballTitle} text = {footballText} />
                    </Grid>
                    <Grid className='InnerGrid' item xs={4}>
                        <Card styles = {selectStyles} title = {apolloTitle} text = {apolloText} />
                    </Grid>
                    <Grid className='InnerGrid' item xs={4}>
                        <Card styles = {selectStyles} title = {topFiveGamesTitle} text = {topFiveGamesText} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        gameList: state.gameList,
        selectedGameTitle: state.selectedGameTitle,
        selectedGameTime: state.selectedGameTime,
        topFiveGames: state.topFiveGames,
        selectedGameAppID: state.selectedGameAppID,
        selectedGameLogoURL: state.selectedGameLogoURL
    };
}

export default connect(mapStateToProps)(UpdateAndLoadGameInfo);