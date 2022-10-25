import { useDispatch } from 'react-redux'
import { deleteIncome } from '../../features/incomes/incomeSlice'
import {Link} from "react-router-dom";
import React from "react";

function IncomeItem({income}){

    const dispatch = useDispatch()

    function setData(income) {
        console.log(income);
        localStorage.setItem('ID', income._id);
        localStorage.setItem('DESCRIPTION', income.description);
        localStorage.setItem('AMOUNT', income.amount);
    }

    return (
        <div className='item'>
            <div>{new Date(income.createdAt).toLocaleString('en-US')}</div>
            <h3>Description: {income.description}</h3>
            <h3>Amount : Rs. {income.amount}</h3>
            <br/>
            <button onClick={() => dispatch(deleteIncome(income._id))} className='del-btn'>
                DELETE
            </button>
            <Link to={`/update-income/${income._id}`}>
                <button onClick={() => setData(income)} className='update-btn'>UPDATE</button>
            </Link>
        </div>
    )
}

export default IncomeItem