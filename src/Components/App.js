import React from 'react';
import { Provider } from 'react-redux'
import { store } from '../Store/store.js';
import UpdateAndLoadGameInfo from './GameInfoPage/UpdateAndLoadGameInfo';
import MainPage from './GameInfoPage/MainPage';

function App() {

  return (
    <Provider store={store} >
      <MainPage />
      {/*<UpdateAndLoadGameInfo />*/}
    </Provider>
  );
}

export default App;
