const initialState = {
    gameList: [],
    selectedGameTitle: "",
    selectedGameTime: 0,
    topFiveGames: []
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

    return newState;
}