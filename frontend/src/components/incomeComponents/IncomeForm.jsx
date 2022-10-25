import {useState} from "react";
import {useDispatch} from "react-redux";
//we have to create a thunk function for creating a goal
import {createIncome} from '../../features/incomes/incomeSlice'

function IncomeForm(){

    //state for the form
    const [formData, setFormData] = useState({
        description:'',
        amount:'',
    })

    //de-structure the fields from that
    const {description, amount} = formData;

    const dispatch = useDispatch()

    const onChange = (e) => {
        //we pass function to set form data
        //we are setting form data to an object
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    const onSubmit = e => {
        e.preventDefault()

        const incomeData = {
            description,
            amount,
        }

        //dispatch the function call createIncome
        //pass the object with the text
        dispatch(createIncome(incomeData))
        //clear the form
        //setText('')
    }

    return(
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="description">Income Description</label>
                    <input
                        type="text"
                        name='description'
                        id='description'
                        value={description}
                        onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="text"
                        name='amount'
                        id='amount'
                        value={amount}
                        onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <button
                        className = 'submit-btn'
                        type='submit'>
                        ADD INCOME
                    </button>

                </div>
            </form>
        </section>

    )
}

export default IncomeForm