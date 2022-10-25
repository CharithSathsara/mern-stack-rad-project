import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
//we have to create a thunk function for creating a goal
import {getIncomes,reset,updateIncome} from '../../features/incomes/incomeSlice'
import {Link, useNavigate} from "react-router-dom";


function IncomeUpdateForm(){

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const navigate = useNavigate()
    //initialize our dispatch
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth )

    useEffect(() => {

        setDescription(localStorage.getItem('DESCRIPTION'));
        setAmount(localStorage.getItem('AMOUNT'));

        if(!user){
            navigate('/login')
        }

        //dispatch our goals
        // get the goals from the back end put in the line 19 goals, so we can access it
        dispatch(getIncomes())

        return () => {
            dispatch(reset())
        }
    }, [user,navigate, dispatch]);

    const onSubmit = e => {
        e.preventDefault()

        const incomeData = {
        
            description,
            amount,
        }

        //dispatch the function call updateProduct
        //pass the object with details
        dispatch(updateIncome(incomeData))

        //clear the form
        setAmount('')
        setDescription('')
    }

    return(
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name='description'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="price">Amount</label>
                    <input
                        type="text"
                        name='amount'
                        id='amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <ul>
                        <li>
                            <button className = 'update-btn' type='submit'>UPDATE INCOME</button>
                            <Link to='/incomes'><button type='reset' className='update-btn'>BACK TO INCOME</button></Link>
                        </li>
                    </ul>
                </div>
            </form>
        </section>

    )
}

export default IncomeUpdateForm