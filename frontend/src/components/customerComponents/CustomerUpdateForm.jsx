import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
//we have to create a thunk function for creating a goal
import {getCustomers,reset,updateCustomer} from '../../features/customers/customerSlice'
import {Link, useNavigate} from "react-router-dom";


function CustomerUpdateForm(){

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    const navigate = useNavigate()
    //initialize our dispatch
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth )

    useEffect(() => {

        setName(localStorage.getItem('NAME'));
        setAddress(localStorage.getItem('ADDRESS'));
        setMobileNumber(localStorage.getItem('MOBILENUMBER'));

        if(!user){
            navigate('/login')
        }

        //dispatch our goals
        // get the goals from the back end put in the line 19 goals, so we can access it
        dispatch(getCustomers())

        return () => {
            dispatch(reset())
        }
    }, [user,navigate, dispatch]);

    const onSubmit = e => {
        e.preventDefault()

        const customerData = {
            name,
            address,
            mobileNumber,
        }

        //dispatch the function call updateProduct
        //pass the object with details
        dispatch(updateCustomer(customerData))

        //clear the form
        setName('')
        setAddress('')
        setMobileNumber('')
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
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="address">Customer Address</label>
                    <input
                        type="text"
                        name='address'
                        id='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="mobileNumber">Customer Mobile Number</label>
                    <input
                        type="text"
                        name='mobileNumber'
                        id='mobileNumber'
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <ul>
                        <li>
                            <button className = 'update-btn' type='submit'>UPDATE CUSTOMER</button>
                            <Link to='/customers'><button type='reset' className='update-btn'>BACK TO CUSTOMERS</button></Link>
                        </li>
                    </ul>
                </div>
            </form>
        </section>

    )
}

export default CustomerUpdateForm