import {useState} from "react";
import {useDispatch} from "react-redux";
//we have to create a thunk function for creating a goal
import {createProduct} from '../../features/products/productSlice'

function ProductForm(){

    //state for the form
    const [formData, setFormData] = useState({
        name:'',
        price:'',
        quantity:'',
    })

    //de-structure the fields from that
    const {name, price, quantity} = formData;

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

        const productData = {
            name,
            price,
            quantity,
        }

        //dispatch the function call createProduct
        //pass the object with the text
        dispatch(createProduct(productData))
        //clear the form
        //setText('')
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
                        onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="price">Product Price</label>
                    <input
                        type="text"
                        name='price'
                        id='price'
                        value={price}
                        onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="quantity">Product Quantity</label>
                    <input
                        type="text"
                        name='quantity'
                        id='quantity'
                        value={quantity}
                        onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <button
                        className = 'submit-btn'
                        type='submit'>
                        ADD PRODUCT
                    </button>

                </div>
            </form>
        </section>

    )
}

export default ProductForm