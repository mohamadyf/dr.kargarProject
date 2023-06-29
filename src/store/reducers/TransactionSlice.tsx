import { TypeReducer } from "..";
import {ActionConstansTypes} from "../actions/actionTypes";

export type TransactionType = "trip_financials" | "payments" | "misc_expenses" | "concurrency_costs";

export interface TransnactionStateType {
    loading: boolean
    transactionData: any[]
    errorFetch: boolean,
    filterName: TransactionType | "all",
    dates: any[]
}

const initialState:TransnactionStateType = {
    transactionData: [],
    loading: true,
    errorFetch: false,
    filterName:"all",
    dates: []
}


const transactionReducer: TypeReducer <TransnactionStateType,any> = (state = initialState, action)=>{
    switch(action.type){

        case ActionConstansTypes.FETCH_DATA:
            return{
                ...state,
                loading: action.payload.loading,
                transactionData: [],
                filterName: action.payload.filterName,
                errorFetch: action.payload.errorFetch,
                dates: [],
            }

            case ActionConstansTypes.FETCH_DATA_SUCCESS:
                return{
                    ...state,
                    transactionData: action.payload.transactionData,
                    loading: false,
                    dates: action.payload.dates,
                    filterName: action.payload.filterName
                }

            case ActionConstansTypes.FETCH_DATA_FAILURE:
                return{
                    ...state,
                    transactionData: [],
                    filterName: action.payload.filterName,
                    dates: [],
                    loading:false,
                    errorFetch: action.payload.errorFetch
                }

            case ActionConstansTypes.FETCH_DATA_FILTER:
                return{
                    ...state,
                    transactionData: action.payload.transactionData,
                    filterName: action.payload.filterName,
                    dates: action.payload.dates,
                    loading:false
                }
        default:
            return state;
    }
}

export default transactionReducer;