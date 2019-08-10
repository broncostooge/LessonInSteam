import myReducer from '../Reducers/reducers.js'
import { createStore } from 'redux';

export const store = createStore(myReducer);