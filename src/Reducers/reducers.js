const initialState = {
    gameList: [],
    selectedGameTitle: "",
    selectedGameTime: 0
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

    return newState;
}