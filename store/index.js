import { configureStore } from '@reduxjs/toolkit';

import endpoints from './query';
import { rootReducer } from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredPaths: [endpoints.reducerPath],
      },
      thunk: true,
    }).concat(endpoints.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
