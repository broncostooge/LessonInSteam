import React from 'react';
import { Provider } from 'react-redux'
import { store } from '../Store/store.js';
import UpdateAndLoadGameInfo from './GameInfoPage/UpdateAndLoadGameInfo';

function App() {

  return (
    <Provider store={store} >
      <UpdateAndLoadGameInfo />
    </Provider>
  );
}

export default App;
