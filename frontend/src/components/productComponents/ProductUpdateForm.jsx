import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
//we have to create a thunk function for creating a goal
import {getProducts,reset,updateProduct} from '../../features/products/productSlice'
import {Link, useNavigate} from "react-router-dom";


function ProductUpdateForm(){

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const navigate = useNavigate()
    //initialize our dispatch
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth )

    useEffect(() => {

        setName(localStorage.getItem('NAME'));
        setPrice(localStorage.getItem('PRICE'));
        setQuantity(localStorage.getItem('QUANTITY'));

        if(!user){
            navigate('/login')
        }

        //dispatch our goals
        // get the goals from the back end put in the line 19 goals, so we can access it
        dispatch(getProducts())

        return () => {
            dispatch(reset())
        }
    }, [user,navigate, dispatch]);

    const onSubmit = e => {
        e.preventDefault()

        const productData = {
            name,
            price,
            quantity,
        }

        //dispatch the function call updateProduct
        //pass the object with details
        dispatch(updateProduct(productData))

        //clear the form
        setName('')
        setPrice('')
        setQuantity('')
    }

    return(
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        name='name'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="price">Product Price</label>
                    <input
                        type="text"
                        name='price'
                        id='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="quantity">Product Quantity</label>
                    <input
                        type="text"
                        name='quantity'
                        id='quantity'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <ul>
                        <li>
                            <button className = 'update-btn' type='submit'>UPDATE PRODUCT</button>
                            <Link to='/products'><button type='reset' className='update-btn'>BACK TO PRODUCTS</button></Link>
                        </li>
                    </ul>
                </div>
            </form>
        </section>

    )
}

export default ProductUpdateForm