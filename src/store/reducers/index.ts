import { combineReducers } from "redux";
import transactionReducer from "./TransactionSlice";

const rootReducer = combineReducers({
    transaction: transactionReducer
})

export default rootReducer