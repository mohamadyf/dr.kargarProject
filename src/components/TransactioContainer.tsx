import React from 'react'
import { useAppSelector } from '../store/StoreHooks';
import { getShamsiDetailSate, whatIsDateFieldName } from '../utilities/TransactionFunctionss';
import TransactionCard from './TransactionCard'

interface TransactioContainerProps{
  date: string
}

const TransactioContainer:React.FC<TransactioContainerProps> = ({date}) => {
  const { transactionData } = useAppSelector((state) => ({
    transactionData: state.transaction.transactionData,
  }));

  const renderDate = ()=>{
    for (const transData of transactionData) {
      if(transData[whatIsDateFieldName(transData)].toDateString()===date){
        return getShamsiDetailSate(transData[whatIsDateFieldName(transData)])
      }
    }
  }

  return (
    <div className='transaction-container'>
      <div className='transaction-header'>
        <p>{renderDate()}</p>
      </div>
      <div className='transaction-card-container'>
        {transactionData.filter(transData=> transData[whatIsDateFieldName(transData)].toDateString()===date)
          .map((transSameDate,index)=> <TransactionCard transactionDetails={transSameDate} date={date} key={index}/>) //getting the transactions that in the same date and show them
        }
      </div>
    </div>
  )
}

export default TransactioContainer