import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import technicianReducer from './slices/technicianSlice';
import adminReducer from './slices/adminSlice'


const rootReducer = combineReducers({
    user:userReducer,
    technician:technicianReducer,
    admin:adminReducer
})


const persistConfig={
    key:'root',
    storage,
    whitelist:['user','technician','admin']
}


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
        reducer:persistedReducer
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;