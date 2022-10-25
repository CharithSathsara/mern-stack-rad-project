import {useState} from "react";
import {useDispatch} from "react-redux";
//we have to create a thunk function for creating a goal
import {createCustomer} from '../../features/customers/customerSlice'

function CustomerForm(){

    //state for the form
    const [formData, setFormData] = useState({
        name:'',
        address:'',
        mobileNumber:'',
    })

    //de-structure the fields from that
    const {name, address, mobileNumber} = formData;

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

        const customerData = {
            name,
            address,
            mobileNumber,
        }

        //dispatch the function call createCustomer
        //pass the object with the text
        dispatch(createCustomer(customerData))
        //clear the form
        //setText('')
    }

    return(
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Customer Name</label>
                    <input
                        type="text"
                        name='name'
                        id='name'
                        value={name}
                        onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="address">Customer Address</label>
                    <input
                        type="text"
                        name='address'
                        id='address'
                        value={address}
                        onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="mobileNumber">Customer Mobile Number</label>
                    <input
                        type="text"
                        name='mobileNumber'
                        id='mobileNumber'
                        value={mobileNumber}
                        onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <button
                        className = 'submit-btn'
                        type='submit'>
                        ADD CUSTOMER
                    </button>

                </div>
            </form>
        </section>

    )
}

export default CustomerForm