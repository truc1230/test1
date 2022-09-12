import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { PersistedState } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';

import { authSlice } from './Auth';
import { sampleSlice } from './Sample';

const PersistVersion = 1;

// @see https://github.com/reduxjs/redux-toolkit/issues/121#issuecomment-480621931
// Create a Persist-Config
const persistConfig = {
  key: 'WixDashboard',
  storage,
  version: PersistVersion,
  whitelist: [],
  blacklist: [],
  migrate: (state: PersistedState) => {
    // eslint-disable-next-line no-underscore-dangle
    if (PersistVersion !== state?._persist.version) {
      return Promise.resolve(null as unknown as PersistedState);
    }
    return Promise.resolve(state);
  },
};

const rootReducer = combineReducers({
  sample: sampleSlice.reducer,
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: persistedReducer,
  // @see https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistor = persistStore(store);

export const getStoreState = store.getState;

export default store;
