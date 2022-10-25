import { useDispatch } from 'react-redux'
import { deleteCustomer } from '../../features/customers/customerSlice'
import {Link} from "react-router-dom";
import React from "react";

function CustomerItem({customer}){

    const dispatch = useDispatch()

    function setData(customer) {
        console.log(customer);
        localStorage.setItem('ID', customer._id);
        localStorage.setItem('NAME', customer.name);
        localStorage.setItem('ADDRESS', customer.address);
        localStorage.setItem('MOBILENUMBER', customer.mobileNumber);
    }

    return (
        <div className='item'>
            <div>{new Date(customer.createdAt).toLocaleString('en-US')}</div>
            <h3>Name: {customer.name}</h3>
            <h3>Customer Address : {customer.address}</h3>
            <h3>Customer MobileNumber: {customer.mobileNumber}</h3>
            <br/>
            <button onClick={() => dispatch(deleteCustomer(customer._id))} className='del-btn'>
                DELETE
            </button>
            <Link to={`/update-customer/${customer._id}`}>
                <button onClick={() => setData(customer)} className='update-btn'>UPDATE</button>
            </Link>
        </div>
    )
}

export default CustomerItem