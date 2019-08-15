import React from 'react';
import { Provider } from 'react-redux'
import { store } from '../Store/store.js';
import Routes from '../Router/Routes'

function App() {

  return (
    <Provider store={store} >
      <Routes />
    </Provider>
  );
}

export default App;
