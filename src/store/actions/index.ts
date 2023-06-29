import axios from "axios"
import { AppDispatch } from ".."
import { mergeTransactionsToOneArray, replaceEnglishToPresianNumber, sortTransActionInTime, whatIsDateFieldName } from "../../utilities/TransactionFunctionss"
import { TransactionType } from "../reducers/TransactionSlice"
import { ActionConstansTypes } from "./actionTypes"

const actionTransactionCreator = (actType: any, loading=false, errorFetch=false, filterName: TransactionType|"all" ="all", transactionData:any[]=[], dates: any[]=[]) => {
    return{
        type: actType,
        payload: {
            loading,
            transactionData,
            errorFetch,
            filterName,
            dates
        }
    }
}

function getInitialState (data: any) {
    const mergedTransData = mergeTransactionsToOneArray(data)
    const sortedDataInTime =sortTransActionInTime(mergedTransData)
    return sortedDataInTime;
}

function filterTransactionCreate(state:any[], filterName: TransactionType, searchName:string="") {    
    let filterState = state.filter(obj=>obj.transType === filterName)
    if(searchName){
        searchName = replaceEnglishToPresianNumber(searchName)
        filterState = filterState.filter(obj=>new RegExp(searchName).test(obj["source_title"]))
    }
    return filterState
}

function getAllDates (data: any[]) {
    let dateArray:any[] = [];    
    data.map(obj=>{
        if (!dateArray.includes(obj[whatIsDateFieldName(obj)].toDateString())){
            dateArray.push(obj[whatIsDateFieldName(obj)].toDateString())
        }
         
    })
    return dateArray
}


export const fetchTransActionData = (filterName: TransactionType|"all"="all", searchName:string="") => (dispatch: AppDispatch)=>{
        dispatch(actionTransactionCreator(ActionConstansTypes.FETCH_DATA,true,false))

        axios.get("data.json")
        .then(res=> {        
            const transData = getInitialState(res.data)
            if(filterName==="all"){
                const dates = getAllDates(transData)
                dispatch(actionTransactionCreator(ActionConstansTypes.FETCH_DATA_SUCCESS, false, false, "all", transData,dates))
            }else{
                if(filterName==="trip_financials" && searchName){
                    const filterState = filterTransactionCreate(transData, filterName, searchName)
                    if(filterState.length){
                        const dates = getAllDates(filterState)
                        dispatch(actionTransactionCreator(ActionConstansTypes.FETCH_DATA_FILTER, false, false, filterName,filterState, dates))
                    }
                    else{
                        dispatch(actionTransactionCreator(ActionConstansTypes.FETCH_DATA_FAILURE,false,true, "trip_financials"))
                    }
                }
                else{
                    const filterState = filterTransactionCreate(transData, filterName)
                    const dates = getAllDates(filterState)
                    dispatch(actionTransactionCreator(ActionConstansTypes.FETCH_DATA_FILTER, false, false, filterName,filterState, dates))
                }
            }
        })
        .catch((err)=> {dispatch(actionTransactionCreator(ActionConstansTypes.FETCH_DATA_FAILURE, false, true))})
}