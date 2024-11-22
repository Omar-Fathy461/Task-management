import { configureStore, combineReducers} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import boardsSlice from "./slices/boardsSlice";

const rootPersistConfig = {
    key:"root",
    storage,
    whitelist:["boards"]
};

const rootReducer = combineReducers({
    boards: boardsSlice
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});



const persistor = persistStore(store)
export {store, persistor};