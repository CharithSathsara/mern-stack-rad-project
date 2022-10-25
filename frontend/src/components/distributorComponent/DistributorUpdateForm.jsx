import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//we have to create a thunk function for creating a goal
import { getDistributors, reset, updateDistributor } from '../../features/distributers/distributerSlice'
import { Link, useNavigate } from "react-router-dom";


function DistributorUpdateForm() {

    const [name, setName] = useState('');
    const [product, setProduct] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate()
    //initialize our dispatch
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {

        setName(localStorage.getItem('NAME'));
        setProduct(localStorage.getItem('PRODUCT'));
        setAddress(localStorage.getItem('ADDRESS'));

        if (!user) {
            navigate('/login')
        }

        //dispatch our goals
        // get the goals from the back end put in the line 19 goals, so we can access it
        dispatch(getDistributors())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, dispatch]);

    const onSubmit = e => {
        e.preventDefault()

        const distributorData = {
            name,
            product,
            address,
        }

        //dispatch the function call updateDistributor
        //pass the object with details
        dispatch(updateDistributor(distributorData))

        //clear the form
        setName('')
        setProduct('')
        setAddress('')
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Distributor Name</label>
                    <input
                        type="text"
                        name='name'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="product">Distributor Product</label>
                    <input
                        type="text"
                        name='product'
                        id='product'
                        value={product}
                        onChange={(e) => setProduct(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="address">Distributor Address</label>
                    <input
                        type="text"
                        name='address'
                        id='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className='form-group'>
                    <ul>
                        <li>
                            <button className='update-btn' type='submit'>UPDATE DISTRIBUTOR</button>
                            <Link to='/distributors'><button type='reset' className='update-btn'>BACK TO DISTRIBUTORS</button></Link>
                        </li>
                    </ul>
                </div>
            </form>
        </section>

    )
}

export default DistributorUpdateForm