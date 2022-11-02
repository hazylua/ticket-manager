import { combineReducers } from 'redux';

import endpoints from './query';
import ticketsSlice from './tickets';

export const rootReducer = combineReducers({
  [endpoints.reducerPath]: endpoints.reducer,
  [ticketsSlice.name]: ticketsSlice.reducer,
});
