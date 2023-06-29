import React, { useEffect } from 'react'
import { fetchTransActionData } from '../store/actions';
import { useAppDispatch, useAppSelector } from '../store/StoreHooks';

const engTrans: any = [
    "all",
    "trip_financials",
    "payments",
    "misc_expenses" ,
    "concurrency_costs",
]

const perTrans: any = [
    "همه هزینه ها",
    "هزینه سفر",
    "هزینه شارژ حساب",
    "هزینه متفرقه",
    "هزینه خرید ظرفیت",
]

const SelectBox = () => {
    const dispatch = useAppDispatch()
    const { filterName } = useAppSelector((state) => ({
        filterName: state.transaction.filterName,
    }));

    const [filterTrans, setFilterTrans] = React.useState(engTrans[0])
    const [searchName, setSearchName] = React.useState("")

    useEffect(()=>{
        if(filterTrans !== "trip_financials"){
            dispatch<any>(fetchTransActionData(filterTrans))
        }else{
            if(searchName){
                dispatch<any>(fetchTransActionData("trip_financials",searchName))
            }
            else{
                dispatch<any>(fetchTransActionData("trip_financials"))
            }
        }

    },[searchName, filterTrans,dispatch])
    
    const handleChange = (e: any)=>{
        dispatch<any>(fetchTransActionData(e.target.value,""))
        setFilterTrans(e.target.value,)
        setSearchName("")
    }

    const changeInput = (e: any) => {
        setSearchName(e.target.value)
    }

  return (
    <div className="selectbox">
        <p>{engTrans.indexOf(filterName)!==0 ? perTrans[engTrans.indexOf(filterName)] : "همه هزینه ها"}</p>
        <div className='searchbar'>
            <select name="filterTrans" value={filterTrans} onChange={handleChange} defaultValue="all">
                {engTrans.map((eng:string,index:number)=><option value={eng} key={index}>{perTrans[index]}</option>)}
            </select>
            <input name='searchName' value={searchName} onChange={changeInput} placeholder='جست و جوی کوریر...' className={`searchbar-input ${filterTrans!=="trip_financials" ? "hidden" : null}`}/>
        </div>
    </div>

  )
}

export default SelectBox