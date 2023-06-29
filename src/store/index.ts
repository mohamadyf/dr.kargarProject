import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export const store = createStore(rootReducer,applyMiddleware(thunk))

export type TypeReducer<Sta,Act> = (state: Sta|undefined, actions: Act) => Sta

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch