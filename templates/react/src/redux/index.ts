import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {persistReducer, persistStore} from "redux-persist";
import {GlobalReducer, IGlobalState} from "./global";
import storage from "redux-persist/lib/storage";

export interface IGeneralStore {
    global: IGlobalState,
}

export interface IAction<T, D> {
    type: T
    payload: D
}

export const rootReducer = combineReducers({
    global: persistReducer({key: 'global', storage}, GlobalReducer),
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
const persist = persistStore(store)
export {
    store,
    persist
}
