import React from 'react'
import { convertMiladiToShamsi, whatIsDateFieldName } from '../utilities/TransactionFunctionss'
import { mapEngToPer } from '../utilities/TransactionFunctionss/Constants'

interface TransactionCardProps {
    transactionDetails: any
    date: string
}

const TransactionCard:React.FC<TransactionCardProps> = ({transactionDetails, date}) => {
//function that know the field for amount is final_price or amount in data array
  const finalOrAmount = () => {
    return "final_price" in transactionDetails ? "final_price" : "amount"
  }

  const returnShamsi = (dateParam: string) => {
    const date = new Date(dateParam)
    return convertMiladiToShamsi(new Date(date).getFullYear(), new Date(date).getMonth()+1, new Date(date).getDay())[0]
  }

  //function for put zero to days and hours that have one digit to put zero before them like "08"
  const putZero = (numb: number)=>{
    if(numb<10 && numb>=0){
      return `0${numb}`
    }
    return numb;
  }

  return (
    <div className='transaction-card-detail-container'>
        <div className='transaction-card-details'>
          <div className='m-down'>
            <span>{returnShamsi(date)}، </span>
            <span>{putZero(new Date(transactionDetails[whatIsDateFieldName(transactionDetails)]).getHours())}:{putZero(new Date(transactionDetails[whatIsDateFieldName(transactionDetails)]).getMinutes())}</span>
          </div>
          <h4 className={`m-down ${transactionDetails[finalOrAmount()]>=0 ? "success" : "error"}`}>{mapEngToPer[transactionDetails.transType]}</h4>
          {"source_title" in transactionDetails ? <p className='m-down'>{`کوریر: ${transactionDetails["source_title"]}`}</p>:null}
          {"hub" in transactionDetails ? <p>{`شعبه: ${transactionDetails["hub"].title}`}</p>:null}
          {"start_date" in transactionDetails ? <p>{`خرید ظرفیت، از تاریخ ${returnShamsi(transactionDetails.start_date)} تا تاریخ ${returnShamsi(transactionDetails.end_date)}`}</p>:null}
        </div>
        <div>
          <p className={`transaction-card-price ${transactionDetails[finalOrAmount()]>=0 ? "success" : "error"}`}>{(transactionDetails[finalOrAmount()].toLocaleString())}</p>
        </div>
    </div>
  )
}

export default TransactionCard