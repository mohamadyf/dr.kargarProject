import React from 'react'
import { fetchTransActionData } from '../store/actions';
import { useAppDispatch, useAppSelector } from '../store/StoreHooks';
import LoadingSpinner from './LoadingSpinner';
import SelectBox from './SelectBox';
import TransactioContainer from './TransactioContainer';

const Transaction = () => {
    const dispatch = useAppDispatch();
    const { dates, errorFetch } = useAppSelector((state) => ({
      dates: state.transaction.dates,
      errorFetch: state.transaction.errorFetch,
    }));
  
    React.useEffect(() => {
        dispatch<any>(fetchTransActionData('all'))
    }, []);

    
  return (
    <div className="transaction">
        <SelectBox />
        {dates.length !== 0
        ? dates.map((date,index) => <TransactioContainer key={index} date={date} />)
        : !errorFetch ? <LoadingSpinner/> : <p>هیچ تراکنشی یافت نشد</p>}
    </div>
  )
}

export default Transaction