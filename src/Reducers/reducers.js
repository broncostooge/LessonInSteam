const initialState = {
    gameList: [],
    selectedGameTitle: "",
    selectedGameTime: 0,
    topFiveGames: [],
    selectedGameAppID: 0,
    selectedGameLogoURL: ""

};

export default (state = initialState, action) => {
    const newState = {...state};

    //SET GAMELIST
    if (action.type === 'SET_GAME_LIST'){
        newState.gameList = action.gameList;
    }

    //SET SELECTED GAME TITLE
    if (action.type === 'SET_SELECTED_GAME_TITLE'){
        newState.selectedGameTitle = action.gameTitle;
    }

    //SET SELECTED GAME TIME
    if (action.type === 'SET_SELECTED_GAME_TIME'){
        newState.selectedGameTime = action.gameTime;
    }

    //SET TOP FIVE GAMES
    if (action.type === 'SET_TOP_FIVE_GAMES'){
        newState.topFiveGames = action.topFiveGames;
    }

    //SET SELECTED GAME APP ID
    if (action.type === 'SET_SELECTED_GAME_APP_ID'){
        newState.selectedGameAppID = action.selectedGameAppID;
    }

    //SET SELECTED GAME LOGO URL
    if (action.type === 'SET_SELECTED_GAME_LOGO_URL'){
        newState.selectedGameLogoURL = action.selectedGameLogoURL;
    }

    return newState;
}