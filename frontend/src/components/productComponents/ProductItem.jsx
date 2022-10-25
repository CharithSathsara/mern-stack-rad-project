import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../features/products/productSlice'
import {Link} from "react-router-dom";
import React from "react";

function ProductItem({product}){

    const dispatch = useDispatch()

    function setData(product) {
        console.log(product);
        localStorage.setItem('ID', product._id);
        localStorage.setItem('NAME', product.name);
        localStorage.setItem('PRICE', product.price);
        localStorage.setItem('QUANTITY', product.quantity);
    }

    return (
        <div className='item'>
            <div>{new Date(product.createdAt).toLocaleString('en-US')}</div>
            <h3>Name: {product.name}</h3>
            <h3>Product Price : Rs. {product.price}</h3>
            <h3>Product Quantity: {product.quantity} Units</h3>
            <br/>
            <button onClick={() => dispatch(deleteProduct(product._id))} className='del-btn'>
                DELETE
            </button>
            <Link to={`/update-product/${product._id}`}>
                <button onClick={() => setData(product)} className='update-btn'>UPDATE</button>
            </Link>
        </div>
    )
}

export default ProductItem