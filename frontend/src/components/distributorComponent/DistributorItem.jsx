import { useDispatch } from 'react-redux'
import { deleteDistributor } from '../../features/distributers/distributerSlice'
import { Link } from "react-router-dom";
import React from "react";

function DistributorItem({ distributor }) {

    const dispatch = useDispatch()

    function setData(distributor) {
        console.log(distributor);
        localStorage.setItem('ID', distributor._id);
        localStorage.setItem('NAME', distributor.name);
        localStorage.setItem('PRODUCT', distributor.product);
        localStorage.setItem('ADDRESS', distributor.address);
    }

    return (
        <div className='item'>
            <div>{new Date(distributor.createdAt).toLocaleString('en-US')}</div>
            <h3>Name: {distributor.name}</h3>
            <h3>Product  : {distributor.product}</h3>
            <h3>Address: {distributor.address}</h3>
            <br />
            <button onClick={() => dispatch(deleteDistributor(distributor._id))} className='del-btn'>
                DELETE
            </button>
            <Link to={`/update-distributor/${distributor._id}`}>
                <button onClick={() => setData(distributor)} className='update-btn'>UPDATE</button>
            </Link>
        </div>
    )
}

export default DistributorItem;